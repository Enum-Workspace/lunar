export interface NameNormalizationEntry {
    canonicalName: string;
    patterns: string[];
}
export declare const AGENT_REGISTRY: NameNormalizationEntry[];
export declare function resolveCanonicalName(rawName: string, entries: NameNormalizationEntry[]): string;
