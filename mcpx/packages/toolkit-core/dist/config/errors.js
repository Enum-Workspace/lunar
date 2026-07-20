export class ConfigConsumerError extends Error {
}
export class ConfigConsumerAlreadyRegisteredError extends ConfigConsumerError {
    constructor(consumerName) {
        super(`Config consumer "${consumerName}" is already registered.`);
        this.name = "ConfigConsumerAlreadyRegisteredError";
    }
}
export class ConfigUpdateRejectedError extends ConfigConsumerError {
    failedUpdates;
    constructor(failedUpdates) {
        const aggErrors = failedUpdates
            .map((f) => `${f.consumerName}: ${f.error.message}`)
            .join(", ");
        super(`Failed to update config for consumers [${aggErrors}]`);
        this.failedUpdates = failedUpdates;
        this.name = "ConfigUpdateRejectedError";
    }
}
export class ConfigFailedToCommitError extends ConfigConsumerError {
    consumerName;
    error;
    constructor(consumerName, error) {
        super(`Failed to commit config for consumer: ${consumerName}`);
        this.consumerName = consumerName;
        this.error = error;
        this.name = "ConfigFailedToCommitError";
    }
}
export class ConfigInTransitError extends ConfigConsumerError {
    constructor() {
        super("Config is currently being updated, please wait for the update to complete.");
        this.name = "ConfigInTransitError";
    }
}
//# sourceMappingURL=errors.js.map