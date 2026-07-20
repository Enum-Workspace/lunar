export type Measurement<T> = {
    duration: number;
    success: true;
    result: T;
} | {
    duration: number;
    success: false;
    error: Error;
};
export declare function measureNonFailable<T>(f: () => Promise<T>): Promise<Measurement<T>>;
//# sourceMappingURL=measure.d.ts.map