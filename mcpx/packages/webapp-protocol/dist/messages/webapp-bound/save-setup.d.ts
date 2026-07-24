import { z } from "zod/v4";
export declare const saveSetupPayloadSchema: z.ZodObject<{
    targetServers: z.ZodRecord<z.ZodString, z.ZodObject<{
        initiation: z.ZodUnion<readonly [z.ZodObject<{
            type: z.ZodLiteral<"stdio">;
            command: z.ZodEnum<{
                npx: "npx";
                uvx: "uvx";
                docker: "docker";
                node: "node";
            }>;
            args: z.ZodDefault<z.ZodOptional<z.ZodArray<z.ZodString>>>;
            env: z.ZodDefault<z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
                fromEnv: z.ZodString;
            }, z.core.$strip>, z.ZodObject<{
                fromSecret: z.ZodString;
            }, z.core.$strip>, z.ZodNull]>>>>;
            icon: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>, z.ZodObject<{
            url: z.ZodString;
            headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
                fromEnv: z.ZodString;
            }, z.core.$strip>, z.ZodObject<{
                fromSecret: z.ZodString;
            }, z.core.$strip>, z.ZodNull]>>>;
            icon: z.ZodOptional<z.ZodString>;
            type: z.ZodLiteral<"sse">;
        }, z.core.$strip>, z.ZodObject<{
            url: z.ZodString;
            headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
                fromEnv: z.ZodString;
            }, z.core.$strip>, z.ZodObject<{
                fromSecret: z.ZodString;
            }, z.core.$strip>, z.ZodNull]>>>;
            icon: z.ZodOptional<z.ZodString>;
            type: z.ZodLiteral<"streamable-http">;
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
                    overrideParams: z.ZodType<import("@mcpx/shared-model").ToolExtensionParamsRecord, unknown, z.core.$ZodTypeInternals<import("@mcpx/shared-model").ToolExtensionParamsRecord, unknown>>;
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
        skills: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodObject<{
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
        }, z.core.$strip>>>>;
    }, z.core.$strip>;
    description: z.ZodString;
}, z.core.$strip>;
