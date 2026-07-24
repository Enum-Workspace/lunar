import z from "zod/v4";
export declare const setOauthCredentialsPayloadSchema: z.ZodObject<{
    oauthCredentials: z.ZodRecord<z.ZodString, z.ZodString>;
    timestamp: z.ZodNumber;
}, z.core.$strip>;
export type SetOauthCredentialsPayload = z.infer<typeof setOauthCredentialsPayloadSchema>;
