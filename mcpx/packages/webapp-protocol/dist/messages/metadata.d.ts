import z from "zod/v4";
declare const metadataSchema: z.ZodObject<{
    id: z.ZodString;
    correlationId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type Metadata = z.infer<typeof metadataSchema>;
export declare function Envelope<T extends z.ZodTypeAny>(payload: T): z.ZodObject<{
    metadata: typeof metadataSchema;
    payload: T;
}, z.core.$strip>;
export type EnvelopedMessage<T> = {
    metadata: Metadata;
    payload: T;
};
export declare function wrapInEnvelope<T>(props: {
    payload: T;
    id?: string;
    correlationId?: string;
}): EnvelopedMessage<T>;
export declare function safeParseEnvelopedMessage<T>(payloadSchema: z.ZodType<T>): (enveloped: unknown) => z.ZodSafeParseResult<EnvelopedMessage<T>>;
export {};
