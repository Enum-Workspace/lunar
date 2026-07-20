export function headerString(headers, name) {
    const value = headers[name];
    return Array.isArray(value) ? value[0] : value;
}
//# sourceMappingURL=headers.js.map