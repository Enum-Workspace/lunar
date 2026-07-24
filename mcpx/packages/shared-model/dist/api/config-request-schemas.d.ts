import { z } from "zod/v4";
export declare const toolGroupUpdateSchema: z.ZodObject<{
    description: z.ZodOptional<z.ZodString>;
    services: z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodArray<z.ZodString>, z.ZodLiteral<"*">]>>;
    owner: z.ZodOptional<z.ZodEnum<{
        user: "user";
        "dynamic-capabilities": "dynamic-capabilities";
    }>>;
    name: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type ToolGroupUpdate = z.infer<typeof toolGroupUpdateSchema>;
