import z from "zod/v4";
import { ToolExtensionParamsRecord } from "./config.js";
export declare const defaultAllowConsumerConfig: z.ZodObject<{
    _type: z.ZodLiteral<"default-allow">;
    consumerGroupKey: z.ZodOptional<z.ZodString>;
    block: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export declare const defaultBlockConsumerConfig: z.ZodObject<{
    _type: z.ZodLiteral<"default-block">;
    consumerGroupKey: z.ZodOptional<z.ZodString>;
    allow: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export declare const consumerConfigSchema: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodUnion<readonly [z.ZodObject<{
    _type: z.ZodLiteral<"default-allow">;
    consumerGroupKey: z.ZodOptional<z.ZodString>;
    block: z.ZodArray<z.ZodString>;
}, z.core.$strip>, z.ZodObject<{
    _type: z.ZodLiteral<"default-block">;
    consumerGroupKey: z.ZodOptional<z.ZodString>;
    allow: z.ZodArray<z.ZodString>;
}, z.core.$strip>]>>;
export declare const permissionsSchema: z.ZodObject<{
    default: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodUnion<readonly [z.ZodObject<{
        _type: z.ZodLiteral<"default-allow">;
        consumerGroupKey: z.ZodOptional<z.ZodString>;
        block: z.ZodArray<z.ZodString>;
    }, z.core.$strip>, z.ZodObject<{
        _type: z.ZodLiteral<"default-block">;
        consumerGroupKey: z.ZodOptional<z.ZodString>;
        allow: z.ZodArray<z.ZodString>;
    }, z.core.$strip>]>>;
    consumers: z.ZodRecord<z.ZodString, z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodUnion<readonly [z.ZodObject<{
        _type: z.ZodLiteral<"default-allow">;
        consumerGroupKey: z.ZodOptional<z.ZodString>;
        block: z.ZodArray<z.ZodString>;
    }, z.core.$strip>, z.ZodObject<{
        _type: z.ZodLiteral<"default-block">;
        consumerGroupKey: z.ZodOptional<z.ZodString>;
        allow: z.ZodArray<z.ZodString>;
    }, z.core.$strip>]>>>;
    clientNames: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodUnion<readonly [z.ZodObject<{
        _type: z.ZodLiteral<"default-allow">;
        consumerGroupKey: z.ZodOptional<z.ZodString>;
        block: z.ZodArray<z.ZodString>;
    }, z.core.$strip>, z.ZodObject<{
        _type: z.ZodLiteral<"default-block">;
        consumerGroupKey: z.ZodOptional<z.ZodString>;
        allow: z.ZodArray<z.ZodString>;
    }, z.core.$strip>]>>>>>;
}, z.core.$strip>;
export declare const scopeSubjectSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    kind: z.ZodLiteral<"consumerTag">;
    value: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    kind: z.ZodLiteral<"clientName">;
    value: z.ZodString;
}, z.core.$strip>]>;
export type ScopeSubject = z.infer<typeof scopeSubjectSchema>;
export declare function scopeSubjectKey(subject: ScopeSubject): string;
export declare function scopeSubjectsEqual(a: ScopeSubject, b: ScopeSubject): boolean;
export declare const enabledSkillsSchema: z.ZodObject<{
    subject: z.ZodDiscriminatedUnion<[z.ZodObject<{
        kind: z.ZodLiteral<"consumerTag">;
        value: z.ZodString;
    }, z.core.$strip>, z.ZodObject<{
        kind: z.ZodLiteral<"clientName">;
        value: z.ZodString;
    }, z.core.$strip>]>;
    skillIds: z.ZodArray<z.ZodUUID>;
}, z.core.$strip>;
export type EnabledSkills = z.infer<typeof enabledSkillsSchema>;
export declare const skillsConfigSchema: z.ZodDefault<z.ZodOptional<z.ZodObject<{
    enabled: z.ZodDefault<z.ZodArray<z.ZodObject<{
        subject: z.ZodDiscriminatedUnion<[z.ZodObject<{
            kind: z.ZodLiteral<"consumerTag">;
            value: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            kind: z.ZodLiteral<"clientName">;
            value: z.ZodString;
        }, z.core.$strip>]>;
        skillIds: z.ZodArray<z.ZodUUID>;
    }, z.core.$strip>>>;
}, z.core.$strip>>>;
export type SkillsConfig = z.infer<typeof skillsConfigSchema>;
export declare const toolExtensionParamsSchema: z.ZodType<ToolExtensionParamsRecord>;
export declare const toolExtensionSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodObject<{
        action: z.ZodEnum<{
            append: "append";
            rewrite: "rewrite";
        }>;
        text: z.ZodString;
    }, z.core.$strip>>;
    overrideParams: z.ZodType<ToolExtensionParamsRecord, unknown, z.core.$ZodTypeInternals<ToolExtensionParamsRecord, unknown>>;
}, z.core.$strip>;
export declare const toolExtensionsServiceSchema: z.ZodRecord<z.ZodString, z.ZodObject<{
    childTools: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        description: z.ZodOptional<z.ZodObject<{
            action: z.ZodEnum<{
                append: "append";
                rewrite: "rewrite";
            }>;
            text: z.ZodString;
        }, z.core.$strip>>;
        overrideParams: z.ZodType<ToolExtensionParamsRecord, unknown, z.core.$ZodTypeInternals<ToolExtensionParamsRecord, unknown>>;
    }, z.core.$strip>>;
}, z.core.$strip>>;
export declare const toolExtensionsSchema: z.ZodDefault<z.ZodOptional<z.ZodObject<{
    services: z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodObject<{
        childTools: z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            description: z.ZodOptional<z.ZodObject<{
                action: z.ZodEnum<{
                    append: "append";
                    rewrite: "rewrite";
                }>;
                text: z.ZodString;
            }, z.core.$strip>>;
            overrideParams: z.ZodType<ToolExtensionParamsRecord, unknown, z.core.$ZodTypeInternals<ToolExtensionParamsRecord, unknown>>;
        }, z.core.$strip>>;
    }, z.core.$strip>>>;
}, z.core.$strip>>>;
declare const credentialFieldSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    type: z.ZodLiteral<"literal">;
    value: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    type: z.ZodLiteral<"envRef">;
    envName: z.ZodString;
}, z.core.$strip>]>;
export declare const singleServerAttributesSchema: z.ZodObject<{
    inactive: z.ZodBoolean;
}, z.core.$strip>;
export declare const targetServerAttributesSchema: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
    inactive: z.ZodBoolean;
}, z.core.$strip>>>>;
export declare const staticOAuthProviderSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    authMethod: z.ZodLiteral<"client_credentials">;
    credentials: z.ZodUnion<readonly [z.ZodObject<{
        clientId: z.ZodDiscriminatedUnion<[z.ZodObject<{
            type: z.ZodLiteral<"literal">;
            value: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"envRef">;
            envName: z.ZodString;
        }, z.core.$strip>]>;
        clientSecret: z.ZodDiscriminatedUnion<[z.ZodObject<{
            type: z.ZodLiteral<"literal">;
            value: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"envRef">;
            envName: z.ZodString;
        }, z.core.$strip>]>;
    }, z.core.$strip>, z.ZodPipe<z.ZodObject<{
        clientId: z.ZodString;
        clientSecret: z.ZodString;
    }, z.core.$strip>, z.ZodTransform<{
        clientId: {
            type: "literal";
            value: string;
        };
        clientSecret: {
            type: "literal";
            value: string;
        };
    }, {
        clientId: string;
        clientSecret: string;
    }>>, z.ZodPipe<z.ZodObject<{
        clientIdEnv: z.ZodString;
        clientSecretEnv: z.ZodString;
    }, z.core.$strip>, z.ZodTransform<{
        clientId: {
            type: "envRef";
            envName: string;
        };
        clientSecret: {
            type: "envRef";
            envName: string;
        };
    }, {
        clientIdEnv: string;
        clientSecretEnv: string;
    }>>]>;
    scopes: z.ZodArray<z.ZodString>;
    tokenAuthMethod: z.ZodEnum<{
        client_secret_basic: "client_secret_basic";
        client_secret_post: "client_secret_post";
        client_secret_jwt: "client_secret_jwt";
        private_key_jwt: "private_key_jwt";
        tls_client_auth: "tls_client_auth";
        self_signed_tls_client_auth: "self_signed_tls_client_auth";
    }>;
}, z.core.$strip>, z.ZodObject<{
    authMethod: z.ZodLiteral<"device_flow">;
    credentials: z.ZodUnion<readonly [z.ZodObject<{
        clientId: z.ZodDiscriminatedUnion<[z.ZodObject<{
            type: z.ZodLiteral<"literal">;
            value: z.ZodString;
        }, z.core.$strip>, z.ZodObject<{
            type: z.ZodLiteral<"envRef">;
            envName: z.ZodString;
        }, z.core.$strip>]>;
    }, z.core.$strip>, z.ZodPipe<z.ZodObject<{
        clientId: z.ZodString;
    }, z.core.$strip>, z.ZodTransform<{
        clientId: {
            type: "literal";
            value: string;
        };
    }, {
        clientId: string;
    }>>, z.ZodPipe<z.ZodObject<{
        clientIdEnv: z.ZodString;
    }, z.core.$strip>, z.ZodTransform<{
        clientId: {
            type: "envRef";
            envName: string;
        };
    }, {
        clientIdEnv: string;
    }>>]>;
    scopes: z.ZodArray<z.ZodString>;
    endpoints: z.ZodObject<{
        deviceAuthorizationUrl: z.ZodString;
        tokenUrl: z.ZodString;
        userVerificationUrl: z.ZodString;
    }, z.core.$strip>;
}, z.core.$strip>]>;
export declare const staticOAuthSchema: z.ZodOptional<z.ZodObject<{
    mapping: z.ZodRecord<z.ZodString, z.ZodString>;
    providers: z.ZodRecord<z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
        authMethod: z.ZodLiteral<"client_credentials">;
        credentials: z.ZodUnion<readonly [z.ZodObject<{
            clientId: z.ZodDiscriminatedUnion<[z.ZodObject<{
                type: z.ZodLiteral<"literal">;
                value: z.ZodString;
            }, z.core.$strip>, z.ZodObject<{
                type: z.ZodLiteral<"envRef">;
                envName: z.ZodString;
            }, z.core.$strip>]>;
            clientSecret: z.ZodDiscriminatedUnion<[z.ZodObject<{
                type: z.ZodLiteral<"literal">;
                value: z.ZodString;
            }, z.core.$strip>, z.ZodObject<{
                type: z.ZodLiteral<"envRef">;
                envName: z.ZodString;
            }, z.core.$strip>]>;
        }, z.core.$strip>, z.ZodPipe<z.ZodObject<{
            clientId: z.ZodString;
            clientSecret: z.ZodString;
        }, z.core.$strip>, z.ZodTransform<{
            clientId: {
                type: "literal";
                value: string;
            };
            clientSecret: {
                type: "literal";
                value: string;
            };
        }, {
            clientId: string;
            clientSecret: string;
        }>>, z.ZodPipe<z.ZodObject<{
            clientIdEnv: z.ZodString;
            clientSecretEnv: z.ZodString;
        }, z.core.$strip>, z.ZodTransform<{
            clientId: {
                type: "envRef";
                envName: string;
            };
            clientSecret: {
                type: "envRef";
                envName: string;
            };
        }, {
            clientIdEnv: string;
            clientSecretEnv: string;
        }>>]>;
        scopes: z.ZodArray<z.ZodString>;
        tokenAuthMethod: z.ZodEnum<{
            client_secret_basic: "client_secret_basic";
            client_secret_post: "client_secret_post";
            client_secret_jwt: "client_secret_jwt";
            private_key_jwt: "private_key_jwt";
            tls_client_auth: "tls_client_auth";
            self_signed_tls_client_auth: "self_signed_tls_client_auth";
        }>;
    }, z.core.$strip>, z.ZodObject<{
        authMethod: z.ZodLiteral<"device_flow">;
        credentials: z.ZodUnion<readonly [z.ZodObject<{
            clientId: z.ZodDiscriminatedUnion<[z.ZodObject<{
                type: z.ZodLiteral<"literal">;
                value: z.ZodString;
            }, z.core.$strip>, z.ZodObject<{
                type: z.ZodLiteral<"envRef">;
                envName: z.ZodString;
            }, z.core.$strip>]>;
        }, z.core.$strip>, z.ZodPipe<z.ZodObject<{
            clientId: z.ZodString;
        }, z.core.$strip>, z.ZodTransform<{
            clientId: {
                type: "literal";
                value: string;
            };
        }, {
            clientId: string;
        }>>, z.ZodPipe<z.ZodObject<{
            clientIdEnv: z.ZodString;
        }, z.core.$strip>, z.ZodTransform<{
            clientId: {
                type: "envRef";
                envName: string;
            };
        }, {
            clientIdEnv: string;
        }>>]>;
        scopes: z.ZodArray<z.ZodString>;
        endpoints: z.ZodObject<{
            deviceAuthorizationUrl: z.ZodString;
            tokenUrl: z.ZodString;
            userVerificationUrl: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>]>>;
}, z.core.$strip>>;
export type ToolExtensionParams = z.infer<typeof toolExtensionParamsSchema>;
export type ToolExtension = z.infer<typeof toolExtensionSchema>;
export type ToolExtensionsService = z.infer<typeof toolExtensionsServiceSchema>;
export type ToolExtensions = z.infer<typeof toolExtensionsSchema>;
export type ConsumerConfig = z.infer<typeof consumerConfigSchema>;
export type Permissions = z.infer<typeof permissionsSchema>;
export declare const createPermissionConsumerRequestSchema: z.ZodObject<{
    name: z.ZodString;
    config: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodUnion<readonly [z.ZodObject<{
        _type: z.ZodLiteral<"default-allow">;
        consumerGroupKey: z.ZodOptional<z.ZodString>;
        block: z.ZodArray<z.ZodString>;
    }, z.core.$strip>, z.ZodObject<{
        _type: z.ZodLiteral<"default-block">;
        consumerGroupKey: z.ZodOptional<z.ZodString>;
        allow: z.ZodArray<z.ZodString>;
    }, z.core.$strip>]>>;
}, z.core.$strip>;
export type CreatePermissionConsumerRequest = z.infer<typeof createPermissionConsumerRequestSchema>;
export type StaticOAuthProvider = z.infer<typeof staticOAuthProviderSchema>;
export type StaticOAuth = z.infer<typeof staticOAuthSchema>;
export type CredentialField = z.infer<typeof credentialFieldSchema>;
export declare const appConfigSchema: z.ZodObject<{
    permissions: z.ZodObject<{
        default: z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodUnion<readonly [z.ZodObject<{
            _type: z.ZodLiteral<"default-allow">;
            consumerGroupKey: z.ZodOptional<z.ZodString>;
            block: z.ZodArray<z.ZodString>;
        }, z.core.$strip>, z.ZodObject<{
            _type: z.ZodLiteral<"default-block">;
            consumerGroupKey: z.ZodOptional<z.ZodString>;
            allow: z.ZodArray<z.ZodString>;
        }, z.core.$strip>]>>;
        consumers: z.ZodRecord<z.ZodString, z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodUnion<readonly [z.ZodObject<{
            _type: z.ZodLiteral<"default-allow">;
            consumerGroupKey: z.ZodOptional<z.ZodString>;
            block: z.ZodArray<z.ZodString>;
        }, z.core.$strip>, z.ZodObject<{
            _type: z.ZodLiteral<"default-block">;
            consumerGroupKey: z.ZodOptional<z.ZodString>;
            allow: z.ZodArray<z.ZodString>;
        }, z.core.$strip>]>>>;
        clientNames: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodPipe<z.ZodTransform<unknown, unknown>, z.ZodUnion<readonly [z.ZodObject<{
            _type: z.ZodLiteral<"default-allow">;
            consumerGroupKey: z.ZodOptional<z.ZodString>;
            block: z.ZodArray<z.ZodString>;
        }, z.core.$strip>, z.ZodObject<{
            _type: z.ZodLiteral<"default-block">;
            consumerGroupKey: z.ZodOptional<z.ZodString>;
            allow: z.ZodArray<z.ZodString>;
        }, z.core.$strip>]>>>>>;
    }, z.core.$strip>;
    toolGroups: z.ZodDefault<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        services: z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodArray<z.ZodString>, z.ZodLiteral<"*">]>>;
        owner: z.ZodOptional<z.ZodEnum<{
            user: "user";
            "dynamic-capabilities": "dynamic-capabilities";
        }>>;
    }, z.core.$strip>>>;
    auth: z.ZodDefault<z.ZodObject<{
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
    toolExtensions: z.ZodDefault<z.ZodOptional<z.ZodObject<{
        services: z.ZodRecord<z.ZodString, z.ZodRecord<z.ZodString, z.ZodObject<{
            childTools: z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                description: z.ZodOptional<z.ZodObject<{
                    action: z.ZodEnum<{
                        append: "append";
                        rewrite: "rewrite";
                    }>;
                    text: z.ZodString;
                }, z.core.$strip>>;
                overrideParams: z.ZodType<ToolExtensionParamsRecord, unknown, z.core.$ZodTypeInternals<ToolExtensionParamsRecord, unknown>>;
            }, z.core.$strip>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>;
    targetServerAttributes: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
        inactive: z.ZodBoolean;
    }, z.core.$strip>>>>;
    staticOauth: z.ZodOptional<z.ZodObject<{
        mapping: z.ZodRecord<z.ZodString, z.ZodString>;
        providers: z.ZodRecord<z.ZodString, z.ZodDiscriminatedUnion<[z.ZodObject<{
            authMethod: z.ZodLiteral<"client_credentials">;
            credentials: z.ZodUnion<readonly [z.ZodObject<{
                clientId: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    type: z.ZodLiteral<"literal">;
                    value: z.ZodString;
                }, z.core.$strip>, z.ZodObject<{
                    type: z.ZodLiteral<"envRef">;
                    envName: z.ZodString;
                }, z.core.$strip>]>;
                clientSecret: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    type: z.ZodLiteral<"literal">;
                    value: z.ZodString;
                }, z.core.$strip>, z.ZodObject<{
                    type: z.ZodLiteral<"envRef">;
                    envName: z.ZodString;
                }, z.core.$strip>]>;
            }, z.core.$strip>, z.ZodPipe<z.ZodObject<{
                clientId: z.ZodString;
                clientSecret: z.ZodString;
            }, z.core.$strip>, z.ZodTransform<{
                clientId: {
                    type: "literal";
                    value: string;
                };
                clientSecret: {
                    type: "literal";
                    value: string;
                };
            }, {
                clientId: string;
                clientSecret: string;
            }>>, z.ZodPipe<z.ZodObject<{
                clientIdEnv: z.ZodString;
                clientSecretEnv: z.ZodString;
            }, z.core.$strip>, z.ZodTransform<{
                clientId: {
                    type: "envRef";
                    envName: string;
                };
                clientSecret: {
                    type: "envRef";
                    envName: string;
                };
            }, {
                clientIdEnv: string;
                clientSecretEnv: string;
            }>>]>;
            scopes: z.ZodArray<z.ZodString>;
            tokenAuthMethod: z.ZodEnum<{
                client_secret_basic: "client_secret_basic";
                client_secret_post: "client_secret_post";
                client_secret_jwt: "client_secret_jwt";
                private_key_jwt: "private_key_jwt";
                tls_client_auth: "tls_client_auth";
                self_signed_tls_client_auth: "self_signed_tls_client_auth";
            }>;
        }, z.core.$strip>, z.ZodObject<{
            authMethod: z.ZodLiteral<"device_flow">;
            credentials: z.ZodUnion<readonly [z.ZodObject<{
                clientId: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    type: z.ZodLiteral<"literal">;
                    value: z.ZodString;
                }, z.core.$strip>, z.ZodObject<{
                    type: z.ZodLiteral<"envRef">;
                    envName: z.ZodString;
                }, z.core.$strip>]>;
            }, z.core.$strip>, z.ZodPipe<z.ZodObject<{
                clientId: z.ZodString;
            }, z.core.$strip>, z.ZodTransform<{
                clientId: {
                    type: "literal";
                    value: string;
                };
            }, {
                clientId: string;
            }>>, z.ZodPipe<z.ZodObject<{
                clientIdEnv: z.ZodString;
            }, z.core.$strip>, z.ZodTransform<{
                clientId: {
                    type: "envRef";
                    envName: string;
                };
            }, {
                clientIdEnv: string;
            }>>]>;
            scopes: z.ZodArray<z.ZodString>;
            endpoints: z.ZodObject<{
                deviceAuthorizationUrl: z.ZodString;
                tokenUrl: z.ZodString;
                userVerificationUrl: z.ZodString;
            }, z.core.$strip>;
        }, z.core.$strip>]>>;
    }, z.core.$strip>>;
    skills: z.ZodDefault<z.ZodOptional<z.ZodObject<{
        enabled: z.ZodDefault<z.ZodArray<z.ZodObject<{
            subject: z.ZodDiscriminatedUnion<[z.ZodObject<{
                kind: z.ZodLiteral<"consumerTag">;
                value: z.ZodString;
            }, z.core.$strip>, z.ZodObject<{
                kind: z.ZodLiteral<"clientName">;
                value: z.ZodString;
            }, z.core.$strip>]>;
            skillIds: z.ZodArray<z.ZodUUID>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type AppConfig = z.infer<typeof appConfigSchema>;
export {};
