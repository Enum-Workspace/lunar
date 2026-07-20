import z from "zod/v4";
export declare const initiateOAuthPayloadSchema: z.ZodObject<{
    serverName: z.ZodString;
    callbackUrl: z.ZodString;
}, z.core.$strip>;
