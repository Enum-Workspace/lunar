import { makeError } from "../data/index.js";
import { ConfigConsumerAlreadyRegisteredError, ConfigUpdateRejectedError, ConfigFailedToCommitError, ConfigInTransitError, } from "./errors.js";
import { loggableError } from "../logging/index.js";
import { systemClock } from "../time/index.js";
export class ConfigManager {
    postCommitHook = undefined;
    consumers = [];
    consumerNames = new Set();
    _isUpdateInProgress = false;
    _currentVersion = 0;
    get currentVersion() {
        return this._currentVersion;
    }
    _currentConfig;
    get currentConfig() {
        return this._currentConfig;
    }
    _lastModified;
    get lastModified() {
        return this._lastModified;
    }
    logger;
    happyPathLogLevel;
    clock;
    /**
     * @param initialConfig
     * This is the initial config that the manager will start with.
     *
     * @param postCommit
     * This is a function that will be called after the config is successfully updated.
     * It can be used to perform any additional actions that need to happen after the config is updated,
     * e.g., logging, persistence, etc.
     */
    constructor(initialConfig, logger, options) {
        this._currentConfig = initialConfig;
        const clock = options?.clock || systemClock;
        this._lastModified = clock.now();
        this.logger = logger.child({ component: "ConfigManager" });
        this.happyPathLogLevel = options?.happyPathLogLevel || "debug";
        this.clock = clock;
    }
    registerPostCommitHook(postCommit) {
        if (this.postCommitHook) {
            this.logger.warn("Post commit hook is already registered, ignoring");
            return;
        }
        this.postCommitHook = postCommit;
    }
    /**
     * Register a new consumer to the config manager.
     * The consumer will be notified when the config is updated.
     * All consumers must be registered before the first update.
     * If a consumer with the same name is already registered,
     * this will throw a `ConfigConsumerAlreadyRegisteredError`.
     * Since this is expected to be called upon boot, throwing is perhaps desirable
     * so the host application can fail fast and not start with an invalid state.
     */
    registerConsumer(consumer) {
        this.logger[this.happyPathLogLevel](`Registering consumer: ${consumer.name}`);
        if (this.consumerNames.has(consumer.name)) {
            this.logger.error(`Consumer with name ${consumer.name} is already registered`);
            throw new ConfigConsumerAlreadyRegisteredError(consumer.name);
        }
        this.consumerNames.add(consumer.name);
        this.consumers.push(consumer);
        this.logger[this.happyPathLogLevel](`Consumer registered: ${consumer.name}`);
    }
    /**
     * Bootstraps the ConfigManager, propagating the initial config to all consumers.
     * This is called after all consumers are registered and before the host application
     * starts serving requests.
     */
    async bootstrap() {
        this.logger[this.happyPathLogLevel]("Bootstrapping ConfigManager");
        await this._updateConfig(this._currentConfig).catch((e) => {
            const error = makeError(e);
            this.logger.error(`Failed to bootstrap ConfigManager: ${error.message}`);
            return Promise.reject(error);
        });
        this.logger[this.happyPathLogLevel]("ConfigManager bootstrapped successfully");
    }
    /**
     * Update the config atomically.
     * This will prepare all consumers for the new config, commit the new config,
     * and roll-back if any consumer fails.
     * If an update is already in progress, this will throw a `ConfigInTransitError`.
     * If the update is successful, the current config will be updated to the new config.
     */
    async updateConfig(newConfig) {
        return await this.atomically(async () => await this._updateConfig(newConfig));
    }
    async _updateConfig(newConfig) {
        const prepareStart = Date.now();
        const results = await Promise.all(this.consumers.map(async (consumer) => {
            const consumerStart = Date.now();
            try {
                this.logger[this.happyPathLogLevel](`Preparing config for consumer: ${consumer.name}`);
                await consumer.prepareConfig(newConfig);
                const consumerTime = Date.now() - consumerStart;
                this.logger[this.happyPathLogLevel](`Config prepared for consumer: ${consumer.name} (${consumerTime}ms)`);
                return { _type: "success", consumerName: consumer.name };
            }
            catch (e) {
                const error = makeError(e);
                this.logger.error(`Failed to prepare config for consumer: ${consumer.name}`, loggableError(error));
                return {
                    _type: "error",
                    consumerName: consumer.name,
                    error,
                };
            }
        }));
        this.logger.debug(`All consumers prepared in ${Date.now() - prepareStart}ms`);
        const failedUpdates = results.filter((result) => result._type === "error");
        if (failedUpdates.length > 0) {
            for (const consumer of this.consumers) {
                this.logger[this.happyPathLogLevel](`Rolling back config for consumer: ${consumer.name}`);
                consumer.rollbackConfig();
                this.logger[this.happyPathLogLevel](`Config rolled back for consumer: ${consumer.name}`);
            }
            return Promise.reject(new ConfigUpdateRejectedError(failedUpdates));
        }
        const commitStart = Date.now();
        for (const consumer of this.consumers) {
            const consumerCommitStart = Date.now();
            try {
                this.logger[this.happyPathLogLevel](`Committing config for consumer: ${consumer.name}`);
                await consumer.commitConfig();
                const consumerCommitTime = Date.now() - consumerCommitStart;
                this.logger[this.happyPathLogLevel](`Config committed for consumer: ${consumer.name} (${consumerCommitTime}ms)`);
            }
            catch (e) {
                this.logger.error(`Failed to commit config for consumer: ${consumer.name}, rolling back all consumers`, loggableError(e));
                for (const consumer of this.consumers) {
                    consumer.rollbackConfig();
                }
                this.logger[this.happyPathLogLevel]("Config rolled back for all consumers due to commit failure, version is not bumped up", { version: this._currentVersion });
                const error = makeError(e);
                return Promise.reject(new ConfigFailedToCommitError(consumer.name, error));
            }
        }
        // Once commit is successful, update the current config and metadata
        this._currentConfig = newConfig;
        this._currentVersion += 1;
        this._lastModified = this.clock.now();
        this.logger.debug(`All consumers committed in ${Date.now() - commitStart}ms`);
        // Run post-commit hook if it exists
        const postCommitStart = Date.now();
        try {
            if (this.postCommitHook) {
                this.logger[this.happyPathLogLevel]("Executing post commit hook");
                await this.postCommitHook(newConfig);
                const postCommitTime = Date.now() - postCommitStart;
                this.logger[this.happyPathLogLevel](`Post commit hook executed successfully (${postCommitTime}ms)`);
            }
        }
        catch (_e) {
            // Nothing really to do here as this module does not log
        }
        this.logger[this.happyPathLogLevel]("Config updated and committed across all consumers successfully", { version: this._currentVersion });
        return Promise.resolve();
    }
    // Note: this method is deliberately *not* an `async` method to avoid race conditions
    atomically(action) {
        if (this._isUpdateInProgress) {
            return Promise.reject(new ConfigInTransitError());
        }
        this._isUpdateInProgress = true;
        return action().finally(() => {
            this._isUpdateInProgress = false;
        });
    }
}
//# sourceMappingURL=manager.js.map