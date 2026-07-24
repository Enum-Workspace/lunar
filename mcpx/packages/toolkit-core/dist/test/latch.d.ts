export interface Latch {
    promise: Promise<void>;
    resolve: () => void;
}
/** Creates a one-shot promise gate. Call resolve() to unblock anyone awaiting promise. */
export declare function createLatch(): Latch;
//# sourceMappingURL=latch.d.ts.map