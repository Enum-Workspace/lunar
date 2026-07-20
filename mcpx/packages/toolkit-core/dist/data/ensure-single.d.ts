import { Logger } from "winston";
/**
 * Creates a function that extracts the first element from an array and logs a warning
 * if multiple elements are found. Useful for queries that should return at most one result
 * but are fetched as arrays.
 *
 * Usage:
 * ```typescript
 * const ensure = ensureSingle(logger, "active setup");
 * const setup = ensure(setups);
 * ```
 *
 * @param logger - Winston logger instance
 * @param resourceName - Name of the resource for logging (e.g., "active setup", "user profile")
 * @param predicate - Optional predicate to filter items before extraction
 * @returns A function that extracts single items from arrays
 */
export declare function ensureSingle<T>(logger: Logger, resourceName: string, predicate?: (item: T) => boolean): (items: T[]) => T | null;
//# sourceMappingURL=ensure-single.d.ts.map