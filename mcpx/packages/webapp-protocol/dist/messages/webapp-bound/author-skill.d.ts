import { z } from "zod/v4";
export declare const saveSkillPayloadSchema: z.ZodObject<{
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
export type SaveSkillPayload = z.output<typeof saveSkillPayloadSchema>;
export declare const updateSkillPayloadSchema: z.ZodObject<{
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
}, z.core.$strip>;
export type UpdateSkillPayload = z.output<typeof updateSkillPayloadSchema>;
export declare const deleteSkillPayloadSchema: z.ZodObject<{
    id: z.ZodUUID;
}, z.core.$strip>;
export type DeleteSkillPayload = z.output<typeof deleteSkillPayloadSchema>;
export declare const skillErrorCodeSchema: z.ZodEnum<{
    not_found: "not_found";
}>;
export type SkillErrorCode = z.infer<typeof skillErrorCodeSchema>;
export declare const skillWriteAckSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    success: z.ZodLiteral<true>;
    skill: z.ZodObject<{
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
}, z.core.$strip>, z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodString;
    errorCode: z.ZodOptional<z.ZodEnum<{
        not_found: "not_found";
    }>>;
}, z.core.$strip>]>;
export type SkillWriteAck = z.infer<typeof skillWriteAckSchema>;
export declare const deleteSkillAckSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    success: z.ZodLiteral<true>;
}, z.core.$strip>, z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodString;
    errorCode: z.ZodOptional<z.ZodEnum<{
        not_found: "not_found";
    }>>;
}, z.core.$strip>]>;
export type DeleteSkillAck = z.infer<typeof deleteSkillAckSchema>;
