import z from "zod/v4";
export declare const idpStatusSchema: z.ZodObject<{
    enabled: z.ZodBoolean;
    mode: z.ZodEnum<{
        apikey: "apikey";
        oidc: "oidc";
        off: "off";
    }>;
    reachable: z.ZodOptional<z.ZodBoolean>;
    realm: z.ZodOptional<z.ZodString>;
    issuer: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type IdpStatus = z.infer<typeof idpStatusSchema>;
export declare const idpUserSchema: z.ZodObject<{
    id: z.ZodString;
    username: z.ZodString;
    email: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    enabled: z.ZodBoolean;
    groups: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export type IdpUser = z.infer<typeof idpUserSchema>;
export declare const getIdpUsersResponseSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    username: z.ZodString;
    email: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    enabled: z.ZodBoolean;
    groups: z.ZodArray<z.ZodString>;
}, z.core.$strip>>;
export declare const createIdpUserRequestSchema: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodOptional<z.ZodEmail>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
    group: z.ZodString;
}, z.core.$strip>;
export type CreateIdpUserRequest = z.infer<typeof createIdpUserRequestSchema>;
export declare const updateIdpUserRequestSchema: z.ZodObject<{
    enabled: z.ZodBoolean;
}, z.core.$strip>;
export type UpdateIdpUserRequest = z.infer<typeof updateIdpUserRequestSchema>;
export declare const setIdpUserGroupRequestSchema: z.ZodObject<{
    group: z.ZodString;
}, z.core.$strip>;
export type SetIdpUserGroupRequest = z.infer<typeof setIdpUserGroupRequestSchema>;
export declare const resetIdpPasswordRequestSchema: z.ZodObject<{
    password: z.ZodString;
    temporary: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export type ResetIdpPasswordRequest = z.infer<typeof resetIdpPasswordRequestSchema>;
export declare const idpGroupSchema: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
}, z.core.$strip>;
export type IdpGroup = z.infer<typeof idpGroupSchema>;
export declare const getIdpGroupsResponseSchema: z.ZodArray<z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
}, z.core.$strip>>;
export declare const createIdpGroupRequestSchema: z.ZodObject<{
    name: z.ZodString;
}, z.core.$strip>;
export type CreateIdpGroupRequest = z.infer<typeof createIdpGroupRequestSchema>;
