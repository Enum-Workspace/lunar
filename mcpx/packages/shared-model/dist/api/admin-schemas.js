import { z } from "zod/v4";
export const userRoleSchema = z.enum(["admin", "member"]);
const personalIdentitySchema = z.object({
    mode: z.literal("personal"),
});
// Present when an admin is editing this space on its behalf (OBO). Mirrors the
// hub's webapp-protocol oboEditor shape.
const oboEditorSchema = z.object({
    adminDisplayName: z.string().optional(),
    adminEmail: z.string().optional(),
});
// Present on a user's identity while they have an active OBO edit elsewhere.
const oboEditingTargetSchema = z.object({
    spaceName: z.string().optional(),
});
const enterpriseIdentitySchema = z.object({
    mode: z.literal("enterprise"),
    entity: z.discriminatedUnion("entityType", [
        z.object({
            entityType: z.literal("space"),
            spaceKind: z.enum(["HOSTED_MCP_SERVER", "AGENT_CONNECTOR"]).optional(),
            spaceName: z.string().optional(),
            editedBy: oboEditorSchema.optional(),
        }),
        z.object({
            entityType: z.literal("user"),
            role: userRoleSchema,
            editingOnBehalfOf: oboEditingTargetSchema.optional(),
        }),
    ]),
});
const strictnessFeatureEnabledResponseSchema = z.object({
    strictnessFeatureEnabled: z.literal(true),
    isStrict: z.boolean(),
    adminOverride: z.boolean(),
});
const strictnessFeatureDisabledResponseSchema = z.object({
    strictnessFeatureEnabled: z.literal(false),
});
export const identitySchema = z.discriminatedUnion("mode", [
    personalIdentitySchema,
    enterpriseIdentitySchema,
]);
// GET /identity response (public)
export const getIdentityResponseSchema = z.object({
    identity: identitySchema,
});
// GET /admin/strictness and POST /admin/strictness response
export const strictnessResponseSchema = z.discriminatedUnion("strictnessFeatureEnabled", [
    strictnessFeatureDisabledResponseSchema,
    strictnessFeatureEnabledResponseSchema,
]);
// POST /admin/strictness request
export const setStrictnessRequestSchema = z.object({
    override: z.boolean(),
});
