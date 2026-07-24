import z from "zod/v4";
export declare const setPersonalSkillsPayloadSchema: z.ZodObject<{
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
export type SetPersonalSkillsPayload = z.infer<typeof setPersonalSkillsPayloadSchema>;
