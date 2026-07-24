export function stringifyEq(a, b) {
    const replacer = (_key, value) => {
        if (value instanceof Set)
            return [...value].sort();
        if (value instanceof Map)
            return [...value.entries()].sort();
        if (value instanceof Date)
            return value.toISOString();
        return value;
    };
    return JSON.stringify(a, replacer) === JSON.stringify(b, replacer);
}
//# sourceMappingURL=equality.js.map