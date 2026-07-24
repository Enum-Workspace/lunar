import { z } from "zod/v4";
export declare const auditLogEventTypeSchema: z.ZodEnum<{
    tool_used: "tool_used";
    prompt_used: "prompt_used";
    resource_read: "resource_read";
    target_server_added: "target_server_added";
    target_server_removed: "target_server_removed";
    agent_permission_updated: "agent_permission_updated";
    catalog_updated: "catalog_updated";
}>;
export type AuditLogEventType = z.infer<typeof auditLogEventTypeSchema>;
export declare const auditLogEntrySchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    timestamp: z.ZodCoercedDate<unknown>;
    createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    eventType: z.ZodLiteral<"tool_used">;
    payload: z.ZodObject<{
        toolName: z.ZodString;
        targetServerName: z.ZodString;
        args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        consumerTag: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    timestamp: z.ZodCoercedDate<unknown>;
    createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    eventType: z.ZodLiteral<"prompt_used">;
    payload: z.ZodObject<{
        promptName: z.ZodString;
        targetServerName: z.ZodString;
        args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        consumerTag: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    timestamp: z.ZodCoercedDate<unknown>;
    createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    eventType: z.ZodLiteral<"resource_read">;
    payload: z.ZodObject<{
        resourceUri: z.ZodString;
        targetServerName: z.ZodString;
        consumerTag: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    timestamp: z.ZodCoercedDate<unknown>;
    createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    eventType: z.ZodLiteral<"target_server_added">;
    payload: z.ZodObject<{
        name: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    timestamp: z.ZodCoercedDate<unknown>;
    createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    eventType: z.ZodLiteral<"target_server_removed">;
    payload: z.ZodObject<{
        name: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    timestamp: z.ZodCoercedDate<unknown>;
    createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    eventType: z.ZodLiteral<"agent_permission_updated">;
    payload: z.ZodObject<{
        name: z.ZodString;
        identityType: z.ZodEnum<{
            consumers: "consumers";
            clientNames: "clientNames";
        }>;
        addedServers: z.ZodArray<z.ZodString>;
        removedServers: z.ZodArray<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>, z.ZodObject<{
    timestamp: z.ZodCoercedDate<unknown>;
    createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    eventType: z.ZodLiteral<"catalog_updated">;
    payload: z.ZodObject<{
        addedServers: z.ZodArray<z.ZodString>;
        removedServers: z.ZodArray<z.ZodString>;
        approvedToolsChanges: z.ZodArray<z.ZodObject<{
            serverName: z.ZodString;
            addedTools: z.ZodArray<z.ZodString>;
            removedTools: z.ZodArray<z.ZodString>;
        }, z.core.$strip>>;
        approvedPromptsChanges: z.ZodDefault<z.ZodArray<z.ZodObject<{
            serverName: z.ZodString;
            addedPrompts: z.ZodArray<z.ZodString>;
            removedPrompts: z.ZodArray<z.ZodString>;
        }, z.core.$strip>>>;
    }, z.core.$strip>;
}, z.core.$strip>]>;
export type AuditLogEntry = z.infer<typeof auditLogEntrySchema>;
export declare const auditLogsQuerySchema: z.ZodObject<{
    eventType: z.ZodPipe<z.ZodOptional<z.ZodUnion<readonly [z.ZodEnum<{
        tool_used: "tool_used";
        prompt_used: "prompt_used";
        resource_read: "resource_read";
        target_server_added: "target_server_added";
        target_server_removed: "target_server_removed";
        agent_permission_updated: "agent_permission_updated";
        catalog_updated: "catalog_updated";
    }>, z.ZodArray<z.ZodEnum<{
        tool_used: "tool_used";
        prompt_used: "prompt_used";
        resource_read: "resource_read";
        target_server_added: "target_server_added";
        target_server_removed: "target_server_removed";
        agent_permission_updated: "agent_permission_updated";
        catalog_updated: "catalog_updated";
    }>>]>>, z.ZodTransform<("tool_used" | "prompt_used" | "resource_read" | "target_server_added" | "target_server_removed" | "agent_permission_updated" | "catalog_updated")[] | undefined, "tool_used" | "prompt_used" | "resource_read" | "target_server_added" | "target_server_removed" | "agent_permission_updated" | "catalog_updated" | ("tool_used" | "prompt_used" | "resource_read" | "target_server_added" | "target_server_removed" | "agent_permission_updated" | "catalog_updated")[] | undefined>>;
    limit: z.ZodDefault<z.ZodOptional<z.ZodCoercedNumber<unknown>>>;
}, z.core.$strip>;
export type AuditLogsQuery = z.infer<typeof auditLogsQuerySchema>;
export declare const auditLogsResponseSchema: z.ZodObject<{
    events: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
        timestamp: z.ZodCoercedDate<unknown>;
        createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
        eventType: z.ZodLiteral<"tool_used">;
        payload: z.ZodObject<{
            toolName: z.ZodString;
            targetServerName: z.ZodString;
            args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            consumerTag: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>, z.ZodObject<{
        timestamp: z.ZodCoercedDate<unknown>;
        createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
        eventType: z.ZodLiteral<"prompt_used">;
        payload: z.ZodObject<{
            promptName: z.ZodString;
            targetServerName: z.ZodString;
            args: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            consumerTag: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>, z.ZodObject<{
        timestamp: z.ZodCoercedDate<unknown>;
        createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
        eventType: z.ZodLiteral<"resource_read">;
        payload: z.ZodObject<{
            resourceUri: z.ZodString;
            targetServerName: z.ZodString;
            consumerTag: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>, z.ZodObject<{
        timestamp: z.ZodCoercedDate<unknown>;
        createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
        eventType: z.ZodLiteral<"target_server_added">;
        payload: z.ZodObject<{
            name: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>, z.ZodObject<{
        timestamp: z.ZodCoercedDate<unknown>;
        createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
        eventType: z.ZodLiteral<"target_server_removed">;
        payload: z.ZodObject<{
            name: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>, z.ZodObject<{
        timestamp: z.ZodCoercedDate<unknown>;
        createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
        eventType: z.ZodLiteral<"agent_permission_updated">;
        payload: z.ZodObject<{
            name: z.ZodString;
            identityType: z.ZodEnum<{
                consumers: "consumers";
                clientNames: "clientNames";
            }>;
            addedServers: z.ZodArray<z.ZodString>;
            removedServers: z.ZodArray<z.ZodString>;
        }, z.core.$strip>;
    }, z.core.$strip>, z.ZodObject<{
        timestamp: z.ZodCoercedDate<unknown>;
        createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
        eventType: z.ZodLiteral<"catalog_updated">;
        payload: z.ZodObject<{
            addedServers: z.ZodArray<z.ZodString>;
            removedServers: z.ZodArray<z.ZodString>;
            approvedToolsChanges: z.ZodArray<z.ZodObject<{
                serverName: z.ZodString;
                addedTools: z.ZodArray<z.ZodString>;
                removedTools: z.ZodArray<z.ZodString>;
            }, z.core.$strip>>;
            approvedPromptsChanges: z.ZodDefault<z.ZodArray<z.ZodObject<{
                serverName: z.ZodString;
                addedPrompts: z.ZodArray<z.ZodString>;
                removedPrompts: z.ZodArray<z.ZodString>;
            }, z.core.$strip>>>;
        }, z.core.$strip>;
    }, z.core.$strip>]>>;
}, z.core.$strip>;
export type AuditLogsResponse = z.infer<typeof auditLogsResponseSchema>;
