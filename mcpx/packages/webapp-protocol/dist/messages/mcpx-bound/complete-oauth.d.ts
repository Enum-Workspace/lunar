import z from "zod/v4";
export declare const completeOAuthPayloadSchema: z.ZodObject<{
    serverName: z.ZodString;
    authorizationCode: z.ZodString;
    state: z.ZodString;
}, z.core.$strip>;
