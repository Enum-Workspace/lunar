import { z } from "zod/v4";
export declare const dynamicCapabilitiesMatchingPayloadSchema: z.ZodObject<{
    systemPrompt: z.ZodString;
    userMessage: z.ZodString;
}, z.core.$strip>;
export declare const dynamicCapabilitiesMatchingResponseSchema: z.ZodObject<{
    tools: z.ZodArray<z.ZodObject<{
        serverName: z.ZodString;
        toolName: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const dynamicCapabilitiesMatchingAckSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    status: z.ZodLiteral<"success">;
    result: z.ZodObject<{
        tools: z.ZodArray<z.ZodObject<{
            serverName: z.ZodString;
            toolName: z.ZodString;
        }, z.core.$strip>>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    status: z.ZodLiteral<"error">;
    error: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    status: z.ZodLiteral<"unsupported">;
}, z.core.$strip>]>;
export type DynamicCapabilitiesMatchingPayload = z.infer<typeof dynamicCapabilitiesMatchingPayloadSchema>;
export type DynamicCapabilitiesMatchingResponse = z.infer<typeof dynamicCapabilitiesMatchingResponseSchema>;
export type DynamicCapabilitiesMatchingAck = z.infer<typeof dynamicCapabilitiesMatchingAckSchema>;
