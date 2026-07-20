export declare class GracefulShutdown {
    private static cleanupFns;
    static registerCleanup(name: string, fn: () => void): void;
    static registerCleanup(name: string, fn: () => Promise<void>): void;
    static shutdown(): Promise<void>;
}
//# sourceMappingURL=graceful-shutdown.d.ts.map