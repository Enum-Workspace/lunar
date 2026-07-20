import z from "zod/v4";
export declare const toolGroupOwnerSchema: z.ZodEnum<{
    user: "user";
    "dynamic-capabilities": "dynamic-capabilities";
}>;
export type ToolGroupOwner = z.infer<typeof toolGroupOwnerSchema>;
export declare const singleToolGroupSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    services: z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodArray<z.ZodString>, z.ZodLiteral<"*">]>>;
    owner: z.ZodOptional<z.ZodEnum<{
        user: "user";
        "dynamic-capabilities": "dynamic-capabilities";
    }>>;
}, z.core.$strip>;
export type ToolGroup = z.infer<typeof singleToolGroupSchema>;
export declare const toolGroupSchema: z.ZodDefault<z.ZodArray<z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    services: z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodArray<z.ZodString>, z.ZodLiteral<"*">]>>;
    owner: z.ZodOptional<z.ZodEnum<{
        user: "user";
        "dynamic-capabilities": "dynamic-capabilities";
    }>>;
}, z.core.$strip>>>;
export declare const oidcAuthSchema: z.ZodObject<{
    issuer: z.ZodString;
    audience: z.ZodString;
    rolesClaim: z.ZodDefault<z.ZodString>;
    resource: z.ZodString;
    jwksUri: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type OidcAuthConfig = z.infer<typeof oidcAuthSchema>;
export declare const authSchema: z.ZodDefault<z.ZodObject<{
    enabled: z.ZodDefault<z.ZodUnion<[z.ZodBoolean, z.ZodPipe<z.ZodPipe<z.ZodString, z.ZodTransform<boolean, string>>, z.ZodBoolean>]>>;
    mode: z.ZodOptional<z.ZodEnum<{
        apikey: "apikey";
        oidc: "oidc";
    }>>;
    header: z.ZodOptional<z.ZodString>;
    oidc: z.ZodOptional<z.ZodObject<{
        issuer: z.ZodString;
        audience: z.ZodString;
        rolesClaim: z.ZodDefault<z.ZodString>;
        resource: z.ZodString;
        jwksUri: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>>;
export type ParamExtensionOverrideValue = null | string | number | boolean | {
    [key: string]: ParamExtensionOverrideValue;
} | Array<ParamExtensionOverrideValue>;
export type ExtensionDescription = {
    action: "append" | "rewrite";
    text: string;
};
export type ToolExtensionParamsRecord = {
    [paramName: string]: {
        value?: ParamExtensionOverrideValue;
        description?: ExtensionDescription;
    };
};
