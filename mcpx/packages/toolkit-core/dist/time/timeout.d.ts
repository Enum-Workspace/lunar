export declare class TimeoutError extends Error {
    readonly timeoutMs: number;
    constructor(message: string, timeoutMs: number);
}
export declare function withTimeout<T>(promise: Promise<T>, timeoutMs: number, operation?: string): Promise<T>;
//# sourceMappingURL=timeout.d.ts.map