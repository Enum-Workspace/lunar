import { Logger } from "winston";
import { IntervalClock } from "../time/clock.js";
export interface BatchBufferConfig {
    flushIntervalMs: number;
    maxBufferSize: number;
}
export interface BatchBufferOptions<T> extends BatchBufferConfig {
    name: string;
    onFlush: (items: T[]) => void | Promise<void>;
    logger: Logger;
    clock?: IntervalClock;
}
export declare class BatchBuffer<T> {
    private readonly options;
    private buffer;
    private flushIntervalId;
    private readonly clock;
    constructor(options: BatchBufferOptions<T>);
    start(): void;
    stop(): void;
    shutdown(): Promise<void>;
    add(items: T[]): void;
    private flush;
}
//# sourceMappingURL=batch-buffer.d.ts.map