import { z } from "zod/v4";
export declare const skillNameSlugRegex: RegExp;
export declare const skillCapabilityGroupItemSchema: z.ZodObject<{
    catalogItemId: z.ZodUUID;
    tools: z.ZodUnion<readonly [z.ZodArray<z.ZodString>, z.ZodLiteral<"*">]>;
    prompts: z.ZodUnion<readonly [z.ZodArray<z.ZodString>, z.ZodLiteral<"*">]>;
}, z.core.$strip>;
export type SkillCapabilityGroupItem = z.infer<typeof skillCapabilityGroupItemSchema>;
export declare const skillCapabilityGroupSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    items: z.ZodArray<z.ZodObject<{
        catalogItemId: z.ZodUUID;
        tools: z.ZodUnion<readonly [z.ZodArray<z.ZodString>, z.ZodLiteral<"*">]>;
        prompts: z.ZodUnion<readonly [z.ZodArray<z.ZodString>, z.ZodLiteral<"*">]>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type SkillCapabilityGroup = z.infer<typeof skillCapabilityGroupSchema>;
export declare const skillAuthorSchema: z.ZodObject<{
    setupOwnerId: z.ZodString;
    displayName: z.ZodString;
}, z.core.$strip>;
export type SkillAuthor = z.infer<typeof skillAuthorSchema>;
export declare const skillDraftSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    body: z.ZodString;
    exposeAsPrompt: z.ZodDefault<z.ZodBoolean>;
    capabilityGroup: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        items: z.ZodArray<z.ZodObject<{
            catalogItemId: z.ZodUUID;
            tools: z.ZodUnion<readonly [z.ZodArray<z.ZodString>, z.ZodLiteral<"*">]>;
            prompts: z.ZodUnion<readonly [z.ZodArray<z.ZodString>, z.ZodLiteral<"*">]>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type SkillDraft = z.infer<typeof skillDraftSchema>;
export declare const skillSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    body: z.ZodString;
    exposeAsPrompt: z.ZodDefault<z.ZodBoolean>;
    capabilityGroup: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        items: z.ZodArray<z.ZodObject<{
            catalogItemId: z.ZodUUID;
            tools: z.ZodUnion<readonly [z.ZodArray<z.ZodString>, z.ZodLiteral<"*">]>;
            prompts: z.ZodUnion<readonly [z.ZodArray<z.ZodString>, z.ZodLiteral<"*">]>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    id: z.ZodUUID;
    author: z.ZodObject<{
        setupOwnerId: z.ZodString;
        displayName: z.ZodString;
    }, z.core.$strip>;
    updatedAt: z.ZodCoercedDate<unknown>;
}, z.core.$strip>;
export type Skill = z.infer<typeof skillSchema>;
export declare const skillCatalogResponseSchema: z.ZodObject<{
    skills: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        description: z.ZodString;
        body: z.ZodString;
        exposeAsPrompt: z.ZodDefault<z.ZodBoolean>;
        capabilityGroup: z.ZodOptional<z.ZodObject<{
            name: z.ZodOptional<z.ZodString>;
            items: z.ZodArray<z.ZodObject<{
                catalogItemId: z.ZodUUID;
                tools: z.ZodUnion<readonly [z.ZodArray<z.ZodString>, z.ZodLiteral<"*">]>;
                prompts: z.ZodUnion<readonly [z.ZodArray<z.ZodString>, z.ZodLiteral<"*">]>;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
        id: z.ZodUUID;
        author: z.ZodObject<{
            setupOwnerId: z.ZodString;
            displayName: z.ZodString;
        }, z.core.$strip>;
        updatedAt: z.ZodCoercedDate<unknown>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type SkillCatalogResponse = z.infer<typeof skillCatalogResponseSchema>;
export declare const upsertSkillRequestSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    body: z.ZodString;
    exposeAsPrompt: z.ZodDefault<z.ZodBoolean>;
    capabilityGroup: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        items: z.ZodArray<z.ZodObject<{
            catalogItemId: z.ZodUUID;
            tools: z.ZodUnion<readonly [z.ZodArray<z.ZodString>, z.ZodLiteral<"*">]>;
            prompts: z.ZodUnion<readonly [z.ZodArray<z.ZodString>, z.ZodLiteral<"*">]>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type UpsertSkillRequest = z.input<typeof upsertSkillRequestSchema>;
export declare const updateSkillDetailsRequestSchema: z.ZodObject<{
    description: z.ZodString;
    name: z.ZodString;
    body: z.ZodString;
    exposeAsPrompt: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type UpdateSkillDetailsRequest = z.input<typeof updateSkillDetailsRequestSchema>;
export declare const updateSkillCapabilitiesRequestSchema: z.ZodObject<{
    capabilityGroup: z.ZodOptional<z.ZodNullable<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        items: z.ZodArray<z.ZodObject<{
            catalogItemId: z.ZodUUID;
            tools: z.ZodUnion<readonly [z.ZodArray<z.ZodString>, z.ZodLiteral<"*">]>;
            prompts: z.ZodUnion<readonly [z.ZodArray<z.ZodString>, z.ZodLiteral<"*">]>;
        }, z.core.$strip>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type UpdateSkillCapabilitiesRequest = z.input<typeof updateSkillCapabilitiesRequestSchema>;
export declare const enabledSkillsResponseSchema: z.ZodObject<{
    enabled: z.ZodArray<z.ZodObject<{
        subject: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"consumerTag">;
            value: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            kind: z.ZodLiteral<"clientName">;
            value: z.ZodString;
        }, z.core.$strip>]>;
        skillIds: z.ZodArray<z.ZodUUID>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type EnabledSkillsResponse = z.infer<typeof enabledSkillsResponseSchema>;
export declare const createSkillResponseSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodString;
    body: z.ZodString;
    exposeAsPrompt: z.ZodDefault<z.ZodBoolean>;
    capabilityGroup: z.ZodOptional<z.ZodObject<{
        name: z.ZodOptional<z.ZodString>;
        items: z.ZodArray<z.ZodObject<{
            catalogItemId: z.ZodUUID;
            tools: z.ZodUnion<readonly [z.ZodArray<z.ZodString>, z.ZodLiteral<"*">]>;
            prompts: z.ZodUnion<readonly [z.ZodArray<z.ZodString>, z.ZodLiteral<"*">]>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    id: z.ZodUUID;
    author: z.ZodObject<{
        setupOwnerId: z.ZodString;
        displayName: z.ZodString;
    }, z.core.$strip>;
    updatedAt: z.ZodCoercedDate<unknown>;
}, z.core.$strip>;
export type CreateSkillResponse = z.infer<typeof createSkillResponseSchema>;
