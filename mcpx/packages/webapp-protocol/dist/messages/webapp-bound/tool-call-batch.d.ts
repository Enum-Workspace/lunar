import z from "zod/v4";
export declare const toolCallErrorType: z.ZodEnum<{
    tool_error: "tool_error";
    call_failed: "call_failed";
}>;
export declare const toolCallEventSchema: z.ZodObject<{
    timestamp: z.ZodCoercedDate<unknown>;
    serverName: z.ZodString;
    toolName: z.ZodString;
    clientName: z.ZodOptional<z.ZodString>;
    consumerTag: z.ZodOptional<z.ZodString>;
    durationMs: z.ZodNumber;
    errorType: z.ZodNullable<z.ZodEnum<{
        tool_error: "tool_error";
        call_failed: "call_failed";
    }>>;
    catalogItemId: z.ZodOptional<z.ZodUUID>;
}, z.core.$strip>;
export declare const toolCallBatchPayloadSchema: z.ZodObject<{
    events: z.ZodArray<z.ZodObject<{
        timestamp: z.ZodCoercedDate<unknown>;
        serverName: z.ZodString;
        toolName: z.ZodString;
        clientName: z.ZodOptional<z.ZodString>;
        consumerTag: z.ZodOptional<z.ZodString>;
        durationMs: z.ZodNumber;
        errorType: z.ZodNullable<z.ZodEnum<{
            tool_error: "tool_error";
            call_failed: "call_failed";
        }>>;
        catalogItemId: z.ZodOptional<z.ZodUUID>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type ToolCallErrorType = z.infer<typeof toolCallErrorType>;
export type ToolCallEvent = z.infer<typeof toolCallEventSchema>;
export type ToolCallEventInput = z.input<typeof toolCallEventSchema>;
export type ToolCallBatchPayload = z.infer<typeof toolCallBatchPayloadSchema>;
