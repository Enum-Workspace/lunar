export interface Clock {
    now(): Date;
}
export declare const systemClock: Clock;
export interface MutableClock extends Clock {
    advanceBy(ms: number): void;
    set(date: Date): void;
}
export declare class ManualClock implements MutableClock {
    private epochMs;
    constructor(startAt?: Date);
    now(): Date;
    advanceBy(ms: number): void;
    set(date: Date): void;
}
export interface IntervalClock {
    setInterval: (fn: () => void, ms: number) => NodeJS.Timeout;
    clearInterval: (id: NodeJS.Timeout) => void;
}
export declare const systemIntervalClock: IntervalClock;
export interface ManualIntervalClock extends IntervalClock {
    tick: () => void;
}
export declare function createManualIntervalClock(): ManualIntervalClock;
//# sourceMappingURL=clock.d.ts.map