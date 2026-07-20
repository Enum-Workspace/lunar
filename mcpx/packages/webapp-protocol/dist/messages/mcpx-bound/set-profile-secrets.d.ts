import z from "zod/v4";
export declare const setProfileSecretsPayloadSchema: z.ZodObject<{
    profileSecrets: z.ZodRecord<z.ZodString, z.ZodString>;
    timestamp: z.ZodNumber;
}, z.core.$strip>;
export type SetProfileSecretsPayload = z.infer<typeof setProfileSecretsPayloadSchema>;
