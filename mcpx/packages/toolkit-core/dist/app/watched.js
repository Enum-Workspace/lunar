// A simple class to watch a value and notify listeners when it changes.
// A custom `equalFn` can be provided to determine if the new value is different from the current one.
export class Watched {
    value;
    equalFn;
    listeners = [];
    constructor(initialValue, equalFn) {
        this.value = initialValue;
        this.equalFn = equalFn || ((a, b) => a === b);
    }
    get() {
        return this.value;
    }
    set(newValue) {
        if (this.equalFn(this.value, newValue)) {
            return;
        }
        this.value = newValue;
        this.notifyListeners();
    }
    addListener(listener) {
        this.listeners.push(listener);
    }
    notifyListeners() {
        for (const listener of this.listeners) {
            listener(this.value);
        }
    }
}
//# sourceMappingURL=watched.js.map