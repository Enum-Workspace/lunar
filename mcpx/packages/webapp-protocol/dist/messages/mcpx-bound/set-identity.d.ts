import { userRoleSchema } from "@mcpx/shared-model/api";
import z from "zod/v4";
declare const oboEditorSchema: z.ZodObject<{
    adminDisplayName: z.ZodOptional<z.ZodString>;
    adminEmail: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const oboEditingTargetSchema: z.ZodObject<{
    spaceName: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
declare const spaceKindSchema: z.ZodEnum<{
    HOSTED_MCP_SERVER: "HOSTED_MCP_SERVER";
    AGENT_CONNECTOR: "AGENT_CONNECTOR";
    SANDBOX_ANALYSIS: "SANDBOX_ANALYSIS";
}>;
export declare const setIdentityPayloadSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    entityType: z.ZodLiteral<"space">;
    spaceKind: z.ZodOptional<z.ZodEnum<{
        HOSTED_MCP_SERVER: "HOSTED_MCP_SERVER";
        AGENT_CONNECTOR: "AGENT_CONNECTOR";
        SANDBOX_ANALYSIS: "SANDBOX_ANALYSIS";
    }>>;
    spaceName: z.ZodOptional<z.ZodString>;
    editedBy: z.ZodOptional<z.ZodObject<{
        adminDisplayName: z.ZodOptional<z.ZodString>;
        adminEmail: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>, z.ZodObject<{
    entityType: z.ZodLiteral<"user">;
    role: z.ZodEnum<{
        admin: "admin";
        member: "member";
    }>;
    displayName: z.ZodOptional<z.ZodString>;
    editingOnBehalfOf: z.ZodOptional<z.ZodObject<{
        spaceName: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>]>;
export type UserRole = z.infer<typeof userRoleSchema>;
export type OboEditor = z.infer<typeof oboEditorSchema>;
export type OboEditingTarget = z.infer<typeof oboEditingTargetSchema>;
export type SpaceKind = z.infer<typeof spaceKindSchema>;
export type SetIdentityPayload = z.infer<typeof setIdentityPayloadSchema>;
export {};
