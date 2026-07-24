import z from "zod/v4";
export declare const oauthAuthorizationRequiredPayloadSchema: z.ZodObject<{
    serverName: z.ZodString;
    authorizationUrl: z.ZodString;
    state: z.ZodString;
    userCode: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
