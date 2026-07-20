import z from "zod/v4";
export const toolCallErrorType = z.enum(["tool_error", "call_failed"]);
export const toolCallEventSchema = z.object({
    timestamp: z.coerce.date(),
    serverName: z.string(),
    toolName: z.string(),
    clientName: z.string().optional(),
    consumerTag: z.string().optional(),
    durationMs: z.number(),
    errorType: toolCallErrorType.nullable(),
    catalogItemId: z.uuid().optional(),
});
export const toolCallBatchPayloadSchema = z.object({
    events: z.array(toolCallEventSchema),
});
