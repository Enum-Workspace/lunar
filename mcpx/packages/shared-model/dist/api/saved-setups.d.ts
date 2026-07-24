import z from "zod/v4";
export declare const normalizedToolGroupSchema: z.ZodArray<z.ZodObject<{
    name: z.ZodString;
    description: z.ZodOptional<z.ZodString>;
    services: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>;
}, z.core.$strip>>;
export declare const savedSetupConfigSchema: z.ZodObject<{
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
    toolGroups: z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        description: z.ZodOptional<z.ZodString>;
        services: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>;
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
                overrideParams: z.ZodType<import("../config/config.js").ToolExtensionParamsRecord, unknown, z.core.$ZodTypeInternals<import("../config/config.js").ToolExtensionParamsRecord, unknown>>;
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
}, z.core.$strip>;
export declare const savedSetupItemSchema: z.ZodObject<{
    id: z.ZodString;
    description: z.ZodString;
    savedAt: z.ZodString;
    targetServers: z.ZodRecord<z.ZodString, z.ZodObject<{
        initiation: z.ZodUnion<readonly [z.ZodObject<{
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
        catalogItemId: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    config: z.ZodObject<{
        permissions: z.ZodOptional<z.ZodObject<{
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
        }, z.core.$strip>>;
        toolGroups: z.ZodOptional<z.ZodArray<z.ZodObject<{
            name: z.ZodString;
            description: z.ZodOptional<z.ZodString>;
            services: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>;
        }, z.core.$strip>>>;
        auth: z.ZodOptional<z.ZodDefault<z.ZodObject<{
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
        }, z.core.$strip>>>;
        toolExtensions: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodObject<{
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
                    overrideParams: z.ZodType<import("../config/config.js").ToolExtensionParamsRecord, unknown, z.core.$ZodTypeInternals<import("../config/config.js").ToolExtensionParamsRecord, unknown>>;
                }, z.core.$strip>>;
            }, z.core.$strip>>>;
        }, z.core.$strip>>>>;
        targetServerAttributes: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
            inactive: z.ZodBoolean;
        }, z.core.$strip>>>>>;
        staticOauth: z.ZodOptional<z.ZodOptional<z.ZodObject<{
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
        }, z.core.$strip>>>;
    }, z.core.$strip>;
}, z.core.$strip>;
export type SavedSetupItem = z.infer<typeof savedSetupItemSchema>;
export declare const listSavedSetupsResponseSchema: z.ZodObject<{
    setups: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        description: z.ZodString;
        savedAt: z.ZodString;
        targetServers: z.ZodRecord<z.ZodString, z.ZodObject<{
            initiation: z.ZodUnion<readonly [z.ZodObject<{
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
            catalogItemId: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        config: z.ZodObject<{
            permissions: z.ZodOptional<z.ZodObject<{
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
            }, z.core.$strip>>;
            toolGroups: z.ZodOptional<z.ZodArray<z.ZodObject<{
                name: z.ZodString;
                description: z.ZodOptional<z.ZodString>;
                services: z.ZodRecord<z.ZodString, z.ZodArray<z.ZodString>>;
            }, z.core.$strip>>>;
            auth: z.ZodOptional<z.ZodDefault<z.ZodObject<{
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
            }, z.core.$strip>>>;
            toolExtensions: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodObject<{
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
                        overrideParams: z.ZodType<import("../config/config.js").ToolExtensionParamsRecord, unknown, z.core.$ZodTypeInternals<import("../config/config.js").ToolExtensionParamsRecord, unknown>>;
                    }, z.core.$strip>>;
                }, z.core.$strip>>>;
            }, z.core.$strip>>>>;
            targetServerAttributes: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                inactive: z.ZodBoolean;
            }, z.core.$strip>>>>>;
            staticOauth: z.ZodOptional<z.ZodOptional<z.ZodObject<{
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
            }, z.core.$strip>>>;
        }, z.core.$strip>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type ListSavedSetupsResponse = z.infer<typeof listSavedSetupsResponseSchema>;
export declare const saveSetupSuccessResponseSchema: z.ZodObject<{
    success: z.ZodLiteral<true>;
    savedSetupId: z.ZodString;
    description: z.ZodString;
    savedAt: z.ZodString;
}, z.core.$strip>;
export declare const saveSetupErrorResponseSchema: z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodString;
}, z.core.$strip>;
export declare const saveSetupResponseSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    success: z.ZodLiteral<true>;
    savedSetupId: z.ZodString;
    description: z.ZodString;
    savedAt: z.ZodString;
}, z.core.$strip>, z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodString;
}, z.core.$strip>]>;
export type SaveSetupResponse = z.infer<typeof saveSetupResponseSchema>;
export declare const messageResponseSchema: z.ZodObject<{
    message: z.ZodString;
}, z.core.$strip>;
export type MessageResponse = z.infer<typeof messageResponseSchema>;
