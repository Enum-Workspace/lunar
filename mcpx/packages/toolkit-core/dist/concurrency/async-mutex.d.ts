/**
 * An asynchronous mutex that serializes access to a critical section.
 *
 * Operations are queued and executed one at a time in order.
 * If an operation fails, subsequent operations still proceed (no deadlock).
 *
 * WARNING: NESTED CALLS WILL DEADLOCK!
 * Do NOT call withLock from within a function already holding the lock:
 *
 * ```typescript
 * // THIS WILL DEADLOCK:
 * await mutex.withLock(async () => {
 *   await mutex.withLock(async () => { ... }); // Inner waits for outer, outer waits for inner
 * });
 * ```
 *
 * The inner call queues behind the outer call, but the outer call awaits the inner.
 * This creates a circular wait that hangs forever.
 */
export declare class AsyncMutex {
    private queue;
    /**
     * Execute a function while holding the lock.
     * Only one function can execute at a time - others wait in queue.
     *
     * @param fn - The async function to execute while holding the lock
     * @returns The result of the function
     * @throws Re-throws any error from fn after releasing the lock
     */
    withLock<T>(fn: () => Promise<T>): Promise<T>;
}
//# sourceMappingURL=async-mutex.d.ts.map