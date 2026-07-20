import { z } from "zod/v4";
import { skillDraftSchema, skillSchema } from "@mcpx/shared-model";
export const saveSkillPayloadSchema = skillDraftSchema;
export const updateSkillPayloadSchema = skillDraftSchema.extend({
    id: z.uuidv7(),
});
export const deleteSkillPayloadSchema = z.object({
    id: z.uuidv7(),
});
export const skillErrorCodeSchema = z.enum(["not_found"]);
// save and update return the persisted resource, the same skillSchema set-skills carries.
export const skillWriteAckSchema = z.discriminatedUnion("success", [
    z.object({ success: z.literal(true), skill: skillSchema }),
    z.object({
        success: z.literal(false),
        error: z.string(),
        errorCode: skillErrorCodeSchema.optional(),
    }),
]);
export const deleteSkillAckSchema = z.discriminatedUnion("success", [
    z.object({ success: z.literal(true) }),
    z.object({
        success: z.literal(false),
        error: z.string(),
        errorCode: skillErrorCodeSchema.optional(),
    }),
]);
