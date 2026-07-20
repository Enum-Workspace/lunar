/**
 * Build a fully featured env helper set from a Zod schema.
 * @param schema         Zod object that validates your variables.
 * @param nonSecretKeys  Keys that may be logged or surfaced in plain text.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createEnv(schema, nonSecretKeys) {
    let cachedEnv;
    /** Parse once, then cache. */
    function getEnv(vars = process.env) {
        if (!cachedEnv)
            cachedEnv = schema.parse(vars);
        return cachedEnv;
    }
    /** Re‑parse, useful in tests. */
    function resetEnv(vars = process.env) {
        cachedEnv = schema.parse(vars);
    }
    /** Redact every property except those in nonSecretKeys. */
    function redactEnv(obj) {
        return Object.fromEntries(Object.entries(obj).map(([k, v]) => nonSecretKeys.includes(k)
            ? [k, v]
            : [k, "***REDACTED***"]));
    }
    /** Proxy so callers can keep writing `env.X` without running getEnv first. */
    const env = new Proxy({}, {
        get(_, prop) {
            return getEnv()[prop];
        },
        ownKeys() {
            return Reflect.ownKeys(getEnv());
        },
        getOwnPropertyDescriptor(_, prop) {
            return Object.getOwnPropertyDescriptor(getEnv(), prop);
        },
    });
    return { env, getEnv, resetEnv, redactEnv };
}
//# sourceMappingURL=env-factory.js.map