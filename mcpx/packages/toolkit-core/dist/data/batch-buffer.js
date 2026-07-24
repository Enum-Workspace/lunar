import { loggableError } from "../logging/errors.js";
import { systemIntervalClock } from "../time/clock.js";
export class BatchBuffer {
    options;
    buffer = [];
    flushIntervalId = null;
    clock;
    constructor(options) {
        this.options = options;
        this.clock = options.clock ?? systemIntervalClock;
    }
    start() {
        this.stop();
        this.flushIntervalId = this.clock.setInterval(() => {
            this.flush().catch((e) => {
                this.options.logger.error(`Failed to flush ${this.options.name} buffer`, { error: loggableError(e) });
            });
        }, this.options.flushIntervalMs);
    }
    stop() {
        if (this.flushIntervalId) {
            this.clock.clearInterval(this.flushIntervalId);
            this.flushIntervalId = null;
        }
    }
    async shutdown() {
        this.stop();
        await this.flush();
    }
    add(items) {
        this.buffer.push(...items);
        if (this.buffer.length >= this.options.maxBufferSize) {
            this.flush().catch((e) => {
                this.options.logger.error(`Failed to flush ${this.options.name} buffer on size limit`, { error: loggableError(e) });
            });
        }
    }
    async flush() {
        if (this.buffer.length === 0)
            return;
        const toFlush = this.buffer;
        this.buffer = [];
        this.options.logger.debug(`Flushing ${this.options.name} buffer (${toFlush.length} items)`);
        await this.options.onFlush(toFlush);
    }
}
//# sourceMappingURL=batch-buffer.js.map