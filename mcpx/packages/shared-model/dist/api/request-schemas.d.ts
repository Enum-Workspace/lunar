import { z } from "zod/v4";
export declare const HEADER_VALIDATION_REGEX: RegExp;
export declare const HEADER_PARAMS_EXTRACTION_REGEX: RegExp;
export declare const isValidHeaderTemplateString: (value: string) => boolean;
export declare const envValueSchema: z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
    fromEnv: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    fromSecret: z.ZodString;
}, z.core.$strip>, z.ZodNull]>;
export declare function isEmptyPrefilled(value: z.infer<typeof envValueSchema> | undefined): boolean;
export declare const envRequirementSchema: z.ZodPipe<z.ZodDiscriminatedUnion<[z.ZodObject<{
    kind: z.ZodLiteral<"required">;
    prefilled: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        fromEnv: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        fromSecret: z.ZodString;
    }, z.core.$strip>, z.ZodNull]>>;
    description: z.ZodOptional<z.ZodString>;
    isSecret: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>, z.ZodObject<{
    kind: z.ZodLiteral<"optional">;
    prefilled: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        fromEnv: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        fromSecret: z.ZodString;
    }, z.core.$strip>, z.ZodNull]>>;
    description: z.ZodOptional<z.ZodString>;
    isSecret: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>, z.ZodObject<{
    kind: z.ZodLiteral<"fixed">;
    prefilled: z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        fromEnv: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        fromSecret: z.ZodString;
    }, z.core.$strip>, z.ZodNull]>;
    description: z.ZodOptional<z.ZodString>;
    isSecret: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>]>, z.ZodTransform<{
    kind: "required";
    isSecret: boolean;
    prefilled?: string | {
        fromEnv: string;
    } | {
        fromSecret: string;
    } | null | undefined;
    description?: string | undefined;
} | {
    kind: "optional";
    isSecret: boolean;
    prefilled?: string | {
        fromEnv: string;
    } | {
        fromSecret: string;
    } | null | undefined;
    description?: string | undefined;
} | {
    kind: "fixed";
    prefilled: string | {
        fromEnv: string;
    } | {
        fromSecret: string;
    } | null;
    isSecret: boolean;
    description?: string | undefined;
}, {
    kind: "required";
    isSecret: boolean;
    prefilled?: string | {
        fromEnv: string;
    } | {
        fromSecret: string;
    } | null | undefined;
    description?: string | undefined;
} | {
    kind: "optional";
    isSecret: boolean;
    prefilled?: string | {
        fromEnv: string;
    } | {
        fromSecret: string;
    } | null | undefined;
    description?: string | undefined;
} | {
    kind: "fixed";
    prefilled: string | {
        fromEnv: string;
    } | {
        fromSecret: string;
    } | null;
    isSecret: boolean;
    description?: string | undefined;
}>>;
export declare const envRequirementsSchema: z.ZodRecord<z.ZodString, z.ZodPipe<z.ZodDiscriminatedUnion<[z.ZodObject<{
    kind: z.ZodLiteral<"required">;
    prefilled: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        fromEnv: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        fromSecret: z.ZodString;
    }, z.core.$strip>, z.ZodNull]>>;
    description: z.ZodOptional<z.ZodString>;
    isSecret: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>, z.ZodObject<{
    kind: z.ZodLiteral<"optional">;
    prefilled: z.ZodOptional<z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        fromEnv: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        fromSecret: z.ZodString;
    }, z.core.$strip>, z.ZodNull]>>;
    description: z.ZodOptional<z.ZodString>;
    isSecret: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>, z.ZodObject<{
    kind: z.ZodLiteral<"fixed">;
    prefilled: z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        fromEnv: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        fromSecret: z.ZodString;
    }, z.core.$strip>, z.ZodNull]>;
    description: z.ZodOptional<z.ZodString>;
    isSecret: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>]>, z.ZodTransform<{
    kind: "required";
    isSecret: boolean;
    prefilled?: string | {
        fromEnv: string;
    } | {
        fromSecret: string;
    } | null | undefined;
    description?: string | undefined;
} | {
    kind: "optional";
    isSecret: boolean;
    prefilled?: string | {
        fromEnv: string;
    } | {
        fromSecret: string;
    } | null | undefined;
    description?: string | undefined;
} | {
    kind: "fixed";
    prefilled: string | {
        fromEnv: string;
    } | {
        fromSecret: string;
    } | null;
    isSecret: boolean;
    description?: string | undefined;
}, {
    kind: "required";
    isSecret: boolean;
    prefilled?: string | {
        fromEnv: string;
    } | {
        fromSecret: string;
    } | null | undefined;
    description?: string | undefined;
} | {
    kind: "optional";
    isSecret: boolean;
    prefilled?: string | {
        fromEnv: string;
    } | {
        fromSecret: string;
    } | null | undefined;
    description?: string | undefined;
} | {
    kind: "fixed";
    prefilled: string | {
        fromEnv: string;
    } | {
        fromSecret: string;
    } | null;
    isSecret: boolean;
    description?: string | undefined;
}>>>;
export declare const AllowedCommands: z.ZodEnum<{
    npx: "npx";
    uvx: "uvx";
    docker: "docker";
    node: "node";
}>;
export declare const secretKeysSchema: z.ZodArray<z.ZodString>;
export type SecretKeys = z.infer<typeof secretKeysSchema>;
export declare const createTargetServerStdioRequestSchema: z.ZodObject<{
    type: z.ZodDefault<z.ZodLiteral<"stdio">>;
    args: z.ZodDefault<z.ZodArray<z.ZodString>>;
    command: z.ZodEnum<{
        npx: "npx";
        uvx: "uvx";
        docker: "docker";
        node: "node";
    }>;
    env: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        fromEnv: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        fromSecret: z.ZodString;
    }, z.core.$strip>, z.ZodNull]>>>>;
    icon: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    catalogItemId: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export declare const createTargetServerSSESchema: z.ZodObject<{
    type: z.ZodLiteral<"sse">;
    url: z.ZodString;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        fromEnv: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        fromSecret: z.ZodString;
    }, z.core.$strip>, z.ZodNull]>>>;
    icon: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    catalogItemId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const createTargetServerStreamableHttpSchema: z.ZodObject<{
    type: z.ZodLiteral<"streamable-http">;
    url: z.ZodString;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        fromEnv: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        fromSecret: z.ZodString;
    }, z.core.$strip>, z.ZodNull]>>>;
    icon: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    catalogItemId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const createTargetServerRequestSchema: z.ZodUnion<readonly [z.ZodObject<{
    type: z.ZodDefault<z.ZodLiteral<"stdio">>;
    args: z.ZodDefault<z.ZodArray<z.ZodString>>;
    command: z.ZodEnum<{
        npx: "npx";
        uvx: "uvx";
        docker: "docker";
        node: "node";
    }>;
    env: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        fromEnv: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        fromSecret: z.ZodString;
    }, z.core.$strip>, z.ZodNull]>>>>;
    icon: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    catalogItemId: z.ZodOptional<z.ZodString>;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"sse">;
    url: z.ZodString;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        fromEnv: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        fromSecret: z.ZodString;
    }, z.core.$strip>, z.ZodNull]>>>;
    icon: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    catalogItemId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"streamable-http">;
    url: z.ZodString;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        fromEnv: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        fromSecret: z.ZodString;
    }, z.core.$strip>, z.ZodNull]>>>;
    icon: z.ZodOptional<z.ZodString>;
    name: z.ZodString;
    catalogItemId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>]>;
export declare const updateTargetServerStdioRequestSchema: z.ZodObject<{
    command: z.ZodEnum<{
        npx: "npx";
        uvx: "uvx";
        docker: "docker";
        node: "node";
    }>;
    type: z.ZodDefault<z.ZodLiteral<"stdio">>;
    args: z.ZodDefault<z.ZodArray<z.ZodString>>;
    env: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        fromEnv: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        fromSecret: z.ZodString;
    }, z.core.$strip>, z.ZodNull]>>>>;
    icon: z.ZodOptional<z.ZodString>;
    catalogItemId: z.ZodOptional<z.ZodString>;
}, z.core.$strict>;
export declare const updateTargetServerSSESchema: z.ZodObject<{
    type: z.ZodLiteral<"sse">;
    icon: z.ZodOptional<z.ZodString>;
    catalogItemId: z.ZodOptional<z.ZodString>;
    url: z.ZodString;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        fromEnv: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        fromSecret: z.ZodString;
    }, z.core.$strip>, z.ZodNull]>>>;
}, z.core.$strip>;
export declare const updateTargetServerStreamableHttpSchema: z.ZodObject<{
    type: z.ZodLiteral<"streamable-http">;
    icon: z.ZodOptional<z.ZodString>;
    catalogItemId: z.ZodOptional<z.ZodString>;
    url: z.ZodString;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        fromEnv: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        fromSecret: z.ZodString;
    }, z.core.$strip>, z.ZodNull]>>>;
}, z.core.$strip>;
export declare const updateTargetServerRequestSchema: z.ZodUnion<readonly [z.ZodObject<{
    command: z.ZodEnum<{
        npx: "npx";
        uvx: "uvx";
        docker: "docker";
        node: "node";
    }>;
    type: z.ZodDefault<z.ZodLiteral<"stdio">>;
    args: z.ZodDefault<z.ZodArray<z.ZodString>>;
    env: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        fromEnv: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        fromSecret: z.ZodString;
    }, z.core.$strip>, z.ZodNull]>>>>;
    icon: z.ZodOptional<z.ZodString>;
    catalogItemId: z.ZodOptional<z.ZodString>;
}, z.core.$strict>, z.ZodObject<{
    type: z.ZodLiteral<"sse">;
    icon: z.ZodOptional<z.ZodString>;
    catalogItemId: z.ZodOptional<z.ZodString>;
    url: z.ZodString;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        fromEnv: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        fromSecret: z.ZodString;
    }, z.core.$strip>, z.ZodNull]>>>;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"streamable-http">;
    icon: z.ZodOptional<z.ZodString>;
    catalogItemId: z.ZodOptional<z.ZodString>;
    url: z.ZodString;
    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        fromEnv: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        fromSecret: z.ZodString;
    }, z.core.$strip>, z.ZodNull]>>>;
}, z.core.$strip>]>;
export declare const applyRawAppConfigRequestSchema: z.ZodObject<{
    yaml: z.ZodPipe<z.ZodString, z.ZodTransform<any, string>>;
}, z.core.$strict>;
export declare const applyParsedAppConfigRequestSchema: z.ZodRecord<z.ZodString, z.ZodUnknown>;
export declare const initiateServerAuthRequestSchema: z.ZodObject<{
    callbackUrl: z.ZodOptional<z.ZodURL>;
}, z.core.$strip>;
export declare const saveSetupRequestSchema: z.ZodObject<{
    description: z.ZodString;
}, z.core.$strip>;
export declare const createServerFromCatalogRequestSchema: z.ZodObject<{
    envValues: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
        fromEnv: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        fromSecret: z.ZodString;
    }, z.core.$strip>, z.ZodNull]>>>;
}, z.core.$strip>;
export type RawCreateTargetServerRequest = z.input<typeof createTargetServerRequestSchema>;
export type RawUpdateTargetServerRequest = Omit<RawCreateTargetServerRequest, "name">;
export type TargetServerRequest = z.infer<typeof createTargetServerRequestSchema>;
export interface TargetServerName {
    name: string;
}
export interface SerializedAppConfig {
    yaml: string;
    version: number;
    lastModified: Date;
}
export type UpdateTargetServerRequest = z.infer<typeof updateTargetServerRequestSchema>;
export type ApplyParsedAppConfigRequest = z.infer<typeof applyParsedAppConfigRequestSchema>;
export type EnvRequirement = z.infer<typeof envRequirementSchema>;
export type EnvRequirements = z.infer<typeof envRequirementsSchema>;
export type CreateServerFromCatalogRequest = z.infer<typeof createServerFromCatalogRequestSchema>;
export type InitiateServerAuthResult = {
    status: 200;
    data: {
        authorizationUrl: null;
        userCode: null;
        msg: string;
        targetServerName: string;
    };
} | {
    status: 202;
    data: {
        authorizationUrl: string;
        userCode: string | null;
        msg: string;
        targetServerName: string;
    };
};
export declare const dynamicCapabilitiesStatusResponseSchema: z.ZodObject<{
    consumerTag: z.ZodString;
    enabled: z.ZodBoolean;
}, z.core.$strip>;
export type DynamicCapabilitiesStatusResponse = z.infer<typeof dynamicCapabilitiesStatusResponseSchema>;
