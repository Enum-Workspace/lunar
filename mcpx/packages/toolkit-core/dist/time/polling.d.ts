export declare class PollingExhaustedError extends Error {
    constructor();
}
export declare class PollingAbortedError extends Error {
    constructor();
}
export declare function withAsyncPolling<T, S extends T>(props: {
    maxAttempts: number;
    sleepTimeMs: number;
    getValue: () => Promise<T>;
    found: (value: T) => value is S;
    signal?: AbortSignal;
}): Promise<S>;
export declare function withPolling<T, S extends T>(props: {
    maxAttempts: number;
    sleepTimeMs: number;
    getValue: () => T;
    found: (value: T) => value is S;
    signal?: AbortSignal;
}): Promise<S>;
//# sourceMappingURL=polling.d.ts.map