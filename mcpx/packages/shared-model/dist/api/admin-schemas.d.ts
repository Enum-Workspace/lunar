import { z } from "zod/v4";
export declare const userRoleSchema: z.ZodEnum<{
    admin: "admin";
    member: "member";
}>;
export type UserRole = z.infer<typeof userRoleSchema>;
declare const strictnessFeatureEnabledResponseSchema: z.ZodObject<{
    strictnessFeatureEnabled: z.ZodLiteral<true>;
    isStrict: z.ZodBoolean;
    adminOverride: z.ZodBoolean;
}, z.core.$strip>;
export declare const identitySchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    mode: z.ZodLiteral<"personal">;
}, z.core.$strip>, z.ZodObject<{
    mode: z.ZodLiteral<"enterprise">;
    entity: z.ZodDiscriminatedUnion<[z.ZodObject<{
        entityType: z.ZodLiteral<"space">;
        spaceKind: z.ZodOptional<z.ZodEnum<{
            HOSTED_MCP_SERVER: "HOSTED_MCP_SERVER";
            AGENT_CONNECTOR: "AGENT_CONNECTOR";
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
        editingOnBehalfOf: z.ZodOptional<z.ZodObject<{
            spaceName: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>]>;
}, z.core.$strip>]>;
export declare const getIdentityResponseSchema: z.ZodObject<{
    identity: z.ZodDiscriminatedUnion<[z.ZodObject<{
        mode: z.ZodLiteral<"personal">;
    }, z.core.$strip>, z.ZodObject<{
        mode: z.ZodLiteral<"enterprise">;
        entity: z.ZodDiscriminatedUnion<[z.ZodObject<{
            entityType: z.ZodLiteral<"space">;
            spaceKind: z.ZodOptional<z.ZodEnum<{
                HOSTED_MCP_SERVER: "HOSTED_MCP_SERVER";
                AGENT_CONNECTOR: "AGENT_CONNECTOR";
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
            editingOnBehalfOf: z.ZodOptional<z.ZodObject<{
                spaceName: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>>;
        }, z.core.$strip>]>;
    }, z.core.$strip>]>;
}, z.core.$strip>;
export declare const strictnessResponseSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    strictnessFeatureEnabled: z.ZodLiteral<false>;
}, z.core.$strip>, z.ZodObject<{
    strictnessFeatureEnabled: z.ZodLiteral<true>;
    isStrict: z.ZodBoolean;
    adminOverride: z.ZodBoolean;
}, z.core.$strip>]>;
export declare const setStrictnessRequestSchema: z.ZodObject<{
    override: z.ZodBoolean;
}, z.core.$strip>;
export type Identity = z.infer<typeof identitySchema>;
export type GetIdentityResponse = z.infer<typeof getIdentityResponseSchema>;
export type StrictnessResponse = z.infer<typeof strictnessResponseSchema>;
export type StrictnessFeatureEnabledResponse = z.infer<typeof strictnessFeatureEnabledResponseSchema>;
export type SetStrictnessRequest = z.infer<typeof setStrictnessRequestSchema>;
export {};
