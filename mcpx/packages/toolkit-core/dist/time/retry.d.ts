export declare function withRetries<T>(props: {
    maxAttempts: number;
    sleepTimeMs: number;
    operation: () => Promise<T>;
    onError?: (error: unknown, attempt: number) => void;
}): Promise<T>;
//# sourceMappingURL=retry.d.ts.map