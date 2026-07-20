import { z } from "zod/v4";
/**
 * Build a fully featured env helper set from a Zod schema.
 * @param schema         Zod object that validates your variables.
 * @param nonSecretKeys  Keys that may be logged or surfaced in plain text.
 */
export declare function createEnv<S extends z.ZodType<any>>(schema: S, nonSecretKeys: readonly (keyof z.infer<S>)[]): {
    env: z.infer<S>;
    getEnv: (vars?: NodeJS.ProcessEnv) => z.infer<S>;
    resetEnv: (vars?: NodeJS.ProcessEnv) => void;
    redactEnv: <T extends Record<string, unknown>>(obj: T) => T;
};
//# sourceMappingURL=env-factory.d.ts.map