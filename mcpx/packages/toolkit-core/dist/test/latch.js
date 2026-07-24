/** Creates a one-shot promise gate. Call resolve() to unblock anyone awaiting promise. */
export function createLatch() {
    let resolve;
    const promise = new Promise((r) => {
        resolve = r;
    });
    return { promise, resolve };
}
//# sourceMappingURL=latch.js.map