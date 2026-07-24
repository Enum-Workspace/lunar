export declare class Watched<T> {
    private value;
    private equalFn;
    private listeners;
    constructor(initialValue: T, equalFn?: (a: T, b: T) => boolean);
    get(): T;
    set(newValue: T): void;
    addListener(listener: (value: T) => void): void;
    private notifyListeners;
}
//# sourceMappingURL=watched.d.ts.map