// --- Wall clock (what time is it now?) ---
// Production: pass systemClock. Tests: pass new ManualClock() and call advanceBy() to control time.
export const systemClock = {
    now: () => new Date(),
};
export class ManualClock {
    epochMs;
    constructor(startAt = new Date()) {
        this.epochMs = startAt.getTime();
    }
    now() {
        return new Date(this.epochMs);
    }
    advanceBy(ms) {
        this.epochMs += ms;
    }
    set(date) {
        this.epochMs = date.getTime();
    }
}
export const systemIntervalClock = {
    setInterval: (fn, ms) => setInterval(fn, ms),
    clearInterval: (id) => clearInterval(id),
};
export function createManualIntervalClock() {
    let registeredFn = null;
    return {
        setInterval(fn) {
            registeredFn = fn;
            return 0;
        },
        clearInterval() {
            registeredFn = null;
        },
        tick() {
            registeredFn?.();
        },
    };
}
//# sourceMappingURL=clock.js.map