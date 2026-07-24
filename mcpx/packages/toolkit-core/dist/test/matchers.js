// Recursively sort object keys and array elements for reliable comparison
export function normalizeForComparison(obj) {
    if (obj === null || obj === undefined) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj
            .map((item) => normalizeForComparison(item))
            .sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
    }
    if (typeof obj === "object") {
        const result = {};
        const keys = Object.keys(obj).sort();
        for (const key of keys) {
            result[key] = normalizeForComparison(obj[key]);
        }
        return result;
    }
    return obj;
}
export function toEqualNormalized(received, expected) {
    const normalizedReceived = normalizeForComparison(received);
    const normalizedExpected = normalizeForComparison(expected);
    expect(normalizedReceived).toEqual(normalizedExpected);
}
//# sourceMappingURL=matchers.js.map