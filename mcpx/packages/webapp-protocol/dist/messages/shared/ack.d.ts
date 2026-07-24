import z from "zod/v4";
export declare const ackSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    ok: z.ZodLiteral<true>;
}, z.core.$strip>, z.ZodObject<{
    ok: z.ZodLiteral<false>;
    failureMessage: z.ZodOptional<z.ZodString>;
}, z.core.$strip>]>;
export type Ack = z.infer<typeof ackSchema>;
