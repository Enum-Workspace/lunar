import { z } from "zod/v4";
// ============================================================================
// Dynamic Capabilities Matching Schemas
// ============================================================================
export const dynamicCapabilitiesMatchingPayloadSchema = z.object({
    systemPrompt: z.string(),
    userMessage: z.string(),
});
export const dynamicCapabilitiesMatchingResponseSchema = z.object({
    tools: z.array(z.object({
        serverName: z.string(),
        toolName: z.string(),
    })),
});
// ============================================================================
// Ack Schema Builder
// ============================================================================
function buildAckSchema(resultSchema) {
    return z.discriminatedUnion("status", [
        z.object({
            status: z.literal("success"),
            result: resultSchema,
        }),
        z.object({
            status: z.literal("error"),
            error: z.string(),
        }),
        z.object({
            status: z.literal("unsupported"),
        }),
    ]);
}
export const dynamicCapabilitiesMatchingAckSchema = buildAckSchema(dynamicCapabilitiesMatchingResponseSchema);
