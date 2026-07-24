/**
 * Normalizes server names to lowercase and trimmed.
 * Used for case-insensitive server name matching across the system.
 */
export declare function normalizeServerName(name: string): string;
/**
 * Simple, stable filename sanitizer.
 * Covers common invalid chars, trims, avoids hidden files.
 */
export declare function sanitizeFilename(input: string): string;
//# sourceMappingURL=string-sanitation.d.ts.map