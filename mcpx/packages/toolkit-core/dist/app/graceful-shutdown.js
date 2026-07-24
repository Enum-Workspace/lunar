// Graceful shutdown handling.
// The `cleanupFns` array will hold functions that need to be called.
// The functions will be executed in reverse order of their registration.
export class GracefulShutdown {
    static cleanupFns = [];
    static registerCleanup(name, fn) {
        const wrapped = () => Promise.resolve().then(() => fn());
        this.cleanupFns.unshift({ name, fn: wrapped });
    }
    static async shutdown() {
        for (const { name, fn } of this.cleanupFns) {
            try {
                console.log(`Running cleanup for ${name}...`);
                await fn();
                console.log(`Cleanup for ${name} completed.`);
            }
            catch (error) {
                console.error(`Error during cleanup for ${name}. Shutting down with exit code 1`, error);
                process.exit(1);
            }
        }
        console.log("All cleanup functions executed successfully, shutting down with exit code 0");
        process.exit(0);
    }
}
//# sourceMappingURL=graceful-shutdown.js.map