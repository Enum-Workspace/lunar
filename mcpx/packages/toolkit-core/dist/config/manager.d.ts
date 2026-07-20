import { Logger } from "winston";
import { ConfigConsumer } from "./consumer.js";
import { Clock } from "../time/index.js";
export declare class ConfigManager<T> {
    private postCommitHook?;
    private consumers;
    private consumerNames;
    private _isUpdateInProgress;
    private _currentVersion;
    get currentVersion(): number;
    private _currentConfig;
    get currentConfig(): T;
    private _lastModified;
    get lastModified(): Date;
    private logger;
    private happyPathLogLevel;
    private clock;
    /**
     * @param initialConfig
     * This is the initial config that the manager will start with.
     *
     * @param postCommit
     * This is a function that will be called after the config is successfully updated.
     * It can be used to perform any additional actions that need to happen after the config is updated,
     * e.g., logging, persistence, etc.
     */
    constructor(initialConfig: T, logger: Logger, options?: {
        happyPathLogLevel?: "info" | "debug";
        clock?: Clock;
    });
    registerPostCommitHook(postCommit: (committedConfig: T) => Promise<void>): void;
    /**
     * Register a new consumer to the config manager.
     * The consumer will be notified when the config is updated.
     * All consumers must be registered before the first update.
     * If a consumer with the same name is already registered,
     * this will throw a `ConfigConsumerAlreadyRegisteredError`.
     * Since this is expected to be called upon boot, throwing is perhaps desirable
     * so the host application can fail fast and not start with an invalid state.
     */
    registerConsumer(consumer: ConfigConsumer<T>): void;
    /**
     * Bootstraps the ConfigManager, propagating the initial config to all consumers.
     * This is called after all consumers are registered and before the host application
     * starts serving requests.
     */
    bootstrap(): Promise<void>;
    /**
     * Update the config atomically.
     * This will prepare all consumers for the new config, commit the new config,
     * and roll-back if any consumer fails.
     * If an update is already in progress, this will throw a `ConfigInTransitError`.
     * If the update is successful, the current config will be updated to the new config.
     */
    updateConfig(newConfig: T): Promise<void>;
    private _updateConfig;
    private atomically;
}
//# sourceMappingURL=manager.d.ts.map