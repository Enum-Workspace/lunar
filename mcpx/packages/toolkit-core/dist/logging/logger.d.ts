import { Logger } from "winston";
import { RequestHandler } from "express";
export type LogLevel = "error" | "warn" | "info" | "http" | "verbose" | "debug" | "silly";
export declare function normalizeKey(key: string): string;
export declare const DEFAULT_REDACT_KEYS: ReadonlySet<string>;
export declare function isSensitiveKey(key: string, normalizedKeys: ReadonlySet<string>): boolean;
export declare function redactObject(obj: Record<string, unknown>, keysToRedact: ReadonlySet<string>): Record<string, unknown>;
export interface LunarLogger extends Logger {
    get telemetry(): Logger;
}
interface LunarTelemetryLabels {
    service: string;
    version: string;
    instance_id: string;
    lunar_key: string;
}
export interface LunarTelemetryOptions {
    service: string;
    host: string;
    user: string;
    password: string;
    labels: LunarTelemetryLabels;
    minTelemetryMirrorLevel?: LogLevel;
}
export declare const noOpLogger: LunarLogger;
export declare function buildLogger(props?: {
    logLevel: string;
    label?: string;
    telemetry?: LunarTelemetryOptions;
    redactKeys?: Set<string>;
}): LunarLogger;
export declare function redactUrl(url: string): string;
export declare function accessLogFor(logger: Logger, ignore?: {
    method: string;
    path: string;
}[], level?: LogLevel): RequestHandler;
export {};
//# sourceMappingURL=logger.d.ts.map