import { z } from "zod/v4";
import { enabledSkillsSchema } from "../config/next-version.js";
// ============ Skill Domain Model ============
// A skill is inert instruction text (SKILL.md: name, description, body) plus an optional
// capability group. The single shape that gets authored, stored, pushed, adopted, and served.
// Lives in the lowest layer; the hub→MCPX wire format and the admin-ui API build on it.
const capabilitySelectionSchema = z.union([
    z.array(z.string()),
    z.literal("*"),
]);
export const skillNameSlugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
// Per catalog item, the tools and prompts this skill's capability group selects.
// Either list may be "*" (all from that item) or empty (none).
export const skillCapabilityGroupItemSchema = z.object({
    catalogItemId: z.uuid(),
    tools: capabilitySelectionSchema,
    prompts: capabilitySelectionSchema,
});
export const skillCapabilityGroupSchema = z.object({
    name: z.string().optional(),
    items: z.array(skillCapabilityGroupItemSchema),
});
// displayName powers "by <author>" attribution.
export const skillAuthorSchema = z.object({
    setupOwnerId: z.string(),
    displayName: z.string(),
});
// The authored core, before Hub mints metadata.
export const skillDraftSchema = z.object({
    // name/description caps mirror the agentskills.io SKILL.md spec.
    name: z.string().trim().min(1).max(64).regex(skillNameSlugRegex),
    description: z.string().trim().min(1).max(1024),
    body: z.string().trim(),
    // Also project the Prompt / `/slash` face, not just the skill:// Resource.
    exposeAsPrompt: z.boolean().default(true),
    capabilityGroup: skillCapabilityGroupSchema.optional(),
});
// Authored core plus Hub-minted metadata.
export const skillSchema = skillDraftSchema.extend({
    id: z.uuidv7(),
    author: skillAuthorSchema,
    updatedAt: z.coerce.date(),
});
export const skillCatalogResponseSchema = z.object({
    skills: z.array(skillSchema),
});
export const upsertSkillRequestSchema = skillDraftSchema;
export const updateSkillDetailsRequestSchema = skillDraftSchema.omit({
    capabilityGroup: true,
});
export const updateSkillCapabilitiesRequestSchema = z.object({
    capabilityGroup: skillCapabilityGroupSchema.nullable().optional(),
});
export const enabledSkillsResponseSchema = z.object({
    enabled: z.array(enabledSkillsSchema),
});
export const createSkillResponseSchema = skillSchema;
