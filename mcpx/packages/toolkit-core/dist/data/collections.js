// A function to remove `null`s and/or `undefined`s from an array (immutable)
export function compact(xs) {
    return xs.flatMap((x) => (x ? [x] : []));
}
// Return the unique values from an array, preserving the input's original order.
// Uses Set semantics: primitives dedupe by value; objects, arrays, and class
// instances (e.g. Date, Map) dedupe by reference identity, not by structural equality.
export function distinct(xs) {
    return Array.from(new Set(xs));
}
// A function to remove `null`s and/or `undefined`s from an object (immutable)
export function compactRecord(record) {
    return Object.fromEntries(Object.entries(record).flatMap(([key, value]) => value ? [[key, value]] : []));
}
// A function to index array items by a string that can be
// extracted from each item. In case of plural items, the last item
// will be used for the index.
// (immutable)
export function indexBy(xs, groupByF) {
    return xs.reduce((res, item) => {
        const group = groupByF(item);
        res[group] = item;
        return res;
    }, {});
}
// A function to group array items by a string that can be
// extracted from each item
export function groupBy(xs, groupByF) {
    return xs.reduce((res, item) => {
        const group = groupByF(item);
        res[group] = [...(res[group] || []), item];
        return res;
    }, {});
}
// Split an array into chunks of a given size
export function chunk(array, size) {
    if (size <= 0)
        return [];
    return array.reduce((acc, item, index) => {
        if (index % size === 0) {
            return [...acc, [item]];
        }
        const lastChunk = acc[acc.length - 1] ?? [];
        return [...acc.slice(0, -1), [...lastChunk, item]];
    }, []);
}
export function mapValues(obj, mapF) {
    return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, mapF(value)]));
}
// Implementation signature (not public — TS overload boilerplate).
export function partition(items, predicate) {
    return items.reduce(([matching, rest], item) => predicate(item)
        ? [[...matching, item], rest]
        : [matching, [...rest, item]], [[], []]);
}
//# sourceMappingURL=collections.js.map