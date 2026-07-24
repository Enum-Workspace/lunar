export declare function compact<X>(xs: Array<X | null | undefined>): X[];
export declare function distinct<X>(xs: X[]): X[];
export declare function compactRecord<T>(record: Record<string, T | null | undefined>): Record<string, T>;
export declare function indexBy<X>(xs: X[], groupByF: (x: X) => string): {
    [group: string]: X;
};
export declare function groupBy<X>(xs: X[], groupByF: (x: X) => string): {
    [group: string]: X[];
};
export declare function chunk<T>(array: T[], size: number): T[][];
export declare function mapValues<A, B>(obj: Record<string, A>, mapF: (a: A) => B): Record<string, B>;
export declare function partition<T, U extends T>(items: readonly T[], predicate: (item: T) => item is U): [U[], Exclude<T, U>[]];
export declare function partition<T>(items: readonly T[], predicate: (item: T) => boolean): [T[], T[]];
//# sourceMappingURL=collections.d.ts.map