/**
 * Recursively normalize objects and arrays to sorted structures for deterministic hashing.
 * This ensures that objects with the same content but different key/element order
 * produce the same hash.
 *
 * - Objects are converted to sorted arrays of [key, value] tuples
 * - Arrays are sorted by their JSON representation after normalization
 *
 * **IMPORTANT EDGE CASES:**
 * - Empty objects {} and empty arrays [] produce the SAME hash (both normalize to [])
 * - `undefined` values become `null` in JSON.stringify, so they hash identically
 * - Top-level `undefined` is not supported (use hashObject on objects/arrays/primitives only)
 */
export declare function normalizeForHashing(obj: unknown): unknown;
/**
 * Compute a SHA-256 hash of an object after normalizing it for deterministic hashing.
 */
export declare function hashObject(obj: unknown): string;
/**
 * Deterministic stringify that preserves array order while sorting object keys.
 * `undefined` is normalized to `null` for parity with JSON.stringify behavior in objects/arrays.
 */
export declare function stableStringify(value: unknown): string;
/**
 * Compute SHA-256 using stableStringify() so object key order is ignored
 * while array order remains significant.
 */
export declare function hashStableObject(obj: unknown): string;
//# sourceMappingURL=hashing.d.ts.map