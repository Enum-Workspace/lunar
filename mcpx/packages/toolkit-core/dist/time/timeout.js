export class TimeoutError extends Error {
    timeoutMs;
    constructor(message, timeoutMs) {
        super(message);
        this.timeoutMs = timeoutMs;
        this.name = "TimeoutError";
    }
}
export async function withTimeout(promise, timeoutMs, operation) {
    const operationDesc = operation ?? "Operation";
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new TimeoutError(`${operationDesc} timed out after ${timeoutMs}ms`, timeoutMs)), timeoutMs);
        promise.then((value) => {
            clearTimeout(timer);
            resolve(value);
        }, (error) => {
            clearTimeout(timer);
            reject(error);
        });
    });
}
//# sourceMappingURL=timeout.js.map