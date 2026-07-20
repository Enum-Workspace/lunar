export class PollingExhaustedError extends Error {
    constructor() {
        super("Polling exhausted");
        this.name = "PollingExhaustedError";
    }
}
export class PollingAbortedError extends Error {
    constructor() {
        super("Polling aborted");
        this.name = "PollingAbortedError";
    }
}
export async function withAsyncPolling(props) {
    const { maxAttempts, sleepTimeMs, getValue, found, signal } = props;
    let attempts = 0;
    let value;
    while (attempts < maxAttempts) {
        if (signal?.aborted) {
            return Promise.reject(new PollingAbortedError());
        }
        value = await getValue();
        if (found(value)) {
            return value;
        }
        attempts++;
        if (attempts < maxAttempts) {
            await new Promise((resolve) => setTimeout(resolve, sleepTimeMs));
        }
    }
    return Promise.reject(new PollingExhaustedError());
}
export async function withPolling(props) {
    return withAsyncPolling({
        ...props,
        getValue: async () => props.getValue(),
    });
}
//# sourceMappingURL=polling.js.map