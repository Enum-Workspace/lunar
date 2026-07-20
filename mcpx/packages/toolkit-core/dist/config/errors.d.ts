export declare class ConfigConsumerError extends Error {
}
export declare class ConfigConsumerAlreadyRegisteredError extends ConfigConsumerError {
    constructor(consumerName: string);
}
export declare class ConfigUpdateRejectedError extends ConfigConsumerError {
    readonly failedUpdates: {
        consumerName: string;
        error: Error;
    }[];
    constructor(failedUpdates: {
        consumerName: string;
        error: Error;
    }[]);
}
export declare class ConfigFailedToCommitError extends ConfigConsumerError {
    readonly consumerName: string;
    readonly error: Error;
    constructor(consumerName: string, error: Error);
}
export declare class ConfigInTransitError extends ConfigConsumerError {
    constructor();
}
//# sourceMappingURL=errors.d.ts.map