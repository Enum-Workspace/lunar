export interface LoggableError {
    errorName: string;
    errorMessage: string;
    errorStack?: string;
}
export declare function loggableError(e: unknown): LoggableError;
export interface LoggableHttpErrorInput {
    status: number;
    /** Reduced to a bounded `bodyPreview`; never logged raw. Omit for secrets. */
    body?: unknown;
    /** Extra non-sensitive context (e.g. setupOwnerId). */
    [key: string]: unknown;
}
/**
 * Shapes an HTTP response for logging without leaking the raw body: always
 * emits a bounded `bodyPreview`, never `body`. Spread into log metadata:
 *   logger.error("...", { ...loggableHttpError({ status, body, setupOwnerId }) })
 */
export declare function loggableHttpError({ status, body, ...context }: LoggableHttpErrorInput): Record<string, unknown>;
//# sourceMappingURL=errors.d.ts.map