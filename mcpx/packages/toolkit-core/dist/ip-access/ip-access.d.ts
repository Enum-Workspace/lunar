import { RequestHandler } from "express";
import ipaddr from "ipaddr.js";
import { Logger } from "winston";
type Bits = number;
export type CompiledRange = [ipaddr.IPv4 | ipaddr.IPv6, Bits];
export declare function compileRanges(ranges: string[]): CompiledRange[];
export declare function ipAllowed(ip: string, compiled: CompiledRange[]): boolean;
export declare function makeIpAllowlistMiddleware(compiled: CompiledRange[] | undefined, logger: Logger): RequestHandler;
export {};
//# sourceMappingURL=ip-access.d.ts.map