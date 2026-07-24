import z from "zod/v4";
import { EnvelopedMessage } from "../metadata.js";
import { setupChangePayloadSchema } from "./setup-change.js";
import { usageStatsPayloadSchema } from "./usage-stats.js";
import { oauthAuthorizationRequiredPayloadSchema } from "./oauth-authorization-required.js";
import { saveSetupPayloadSchema } from "./save-setup.js";
import { deleteSavedSetupPayloadSchema } from "./delete-saved-setup.js";
import { updateSavedSetupPayloadSchema } from "./update-saved-setup.js";
import { dynamicCapabilitiesMatchingPayloadSchema } from "./llm-completion.js";
import { toolCallBatchPayloadSchema } from "./tool-call-batch.js";
import { saveOAuthTokenPayloadSchema, loadOAuthTokenPayloadSchema, deleteOAuthTokensPayloadSchema } from "./oauth-token.js";
import { storeDownstreamSessionPayloadSchema, loadDownstreamSessionPayloadSchema, deleteDownstreamSessionPayloadSchema } from "./downstream-session.js";
import { saveSkillPayloadSchema, updateSkillPayloadSchema, deleteSkillPayloadSchema } from "./author-skill.js";
export declare const WebappBoundPayloads: {
    readonly setupChange: z.ZodObject<{
        source: z.ZodEnum<{
            user: "user";
            hub: "hub";
        }>;
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
    }, z.core.$strip>;
    readonly usageStats: z.ZodObject<{
        agents: z.ZodArray<z.ZodObject<{
            clientInfo: z.ZodObject<{
                protocolVersion: z.ZodOptional<z.ZodString>;
                name: z.ZodOptional<z.ZodString>;
                version: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>;
            consumerTag: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
        targetServers: z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
            name: z.ZodString;
            status: z.ZodEnum<{
                connected: "connected";
                "pending-auth": "pending-auth";
                "pending-input": "pending-input";
                "connection-failed": "connection-failed";
            }>;
            tools: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                description: z.ZodOptional<z.ZodString>;
                parameters: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    description: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>>;
                isCustom: z.ZodBoolean;
                estimatedTokens: z.ZodOptional<z.ZodNumber>;
                usage: z.ZodObject<{
                    callCount: z.ZodNumber;
                    lastCalledAt: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodCoercedDate<string>>>;
                }, z.core.$strip>;
            }, z.core.$strip>>>;
            prompts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                description: z.ZodOptional<z.ZodString>;
                arguments: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    description: z.ZodOptional<z.ZodString>;
                    required: z.ZodOptional<z.ZodBoolean>;
                }, z.core.$strip>>>;
                messages: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    role: z.ZodString;
                    content: z.ZodObject<{
                        type: z.ZodString;
                        text: z.ZodOptional<z.ZodString>;
                        mimeType: z.ZodOptional<z.ZodString>;
                    }, z.core.$strip>;
                }, z.core.$strip>>>;
                usage: z.ZodObject<{
                    callCount: z.ZodNumber;
                    lastCalledAt: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodCoercedDate<string>>>;
                }, z.core.$strip>;
            }, z.core.$strip>>>;
            type: z.ZodLiteral<"stdio">;
            missingEnvVars: z.ZodOptional<z.ZodArray<z.ZodDiscriminatedUnion<[z.ZodObject<{
                key: z.ZodString;
                type: z.ZodLiteral<"literal">;
            }, z.core.$strip>, z.ZodObject<{
                key: z.ZodString;
                type: z.ZodLiteral<"fromEnv">;
                fromEnvName: z.ZodString;
            }, z.core.$strip>]>>>;
        }, z.core.$strip>, z.ZodObject<{
            name: z.ZodString;
            status: z.ZodEnum<{
                connected: "connected";
                "pending-auth": "pending-auth";
                "pending-input": "pending-input";
                "connection-failed": "connection-failed";
            }>;
            tools: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                description: z.ZodOptional<z.ZodString>;
                parameters: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    description: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>>;
                isCustom: z.ZodBoolean;
                estimatedTokens: z.ZodOptional<z.ZodNumber>;
                usage: z.ZodObject<{
                    callCount: z.ZodNumber;
                    lastCalledAt: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodCoercedDate<string>>>;
                }, z.core.$strip>;
            }, z.core.$strip>>>;
            prompts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                description: z.ZodOptional<z.ZodString>;
                arguments: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    description: z.ZodOptional<z.ZodString>;
                    required: z.ZodOptional<z.ZodBoolean>;
                }, z.core.$strip>>>;
                messages: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    role: z.ZodString;
                    content: z.ZodObject<{
                        type: z.ZodString;
                        text: z.ZodOptional<z.ZodString>;
                        mimeType: z.ZodOptional<z.ZodString>;
                    }, z.core.$strip>;
                }, z.core.$strip>>>;
                usage: z.ZodObject<{
                    callCount: z.ZodNumber;
                    lastCalledAt: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodCoercedDate<string>>>;
                }, z.core.$strip>;
            }, z.core.$strip>>>;
            type: z.ZodLiteral<"sse">;
        }, z.core.$strip>, z.ZodObject<{
            name: z.ZodString;
            status: z.ZodEnum<{
                connected: "connected";
                "pending-auth": "pending-auth";
                "pending-input": "pending-input";
                "connection-failed": "connection-failed";
            }>;
            tools: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                description: z.ZodOptional<z.ZodString>;
                parameters: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    description: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>>;
                isCustom: z.ZodBoolean;
                estimatedTokens: z.ZodOptional<z.ZodNumber>;
                usage: z.ZodObject<{
                    callCount: z.ZodNumber;
                    lastCalledAt: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodCoercedDate<string>>>;
                }, z.core.$strip>;
            }, z.core.$strip>>>;
            prompts: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodObject<{
                description: z.ZodOptional<z.ZodString>;
                arguments: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    name: z.ZodString;
                    description: z.ZodOptional<z.ZodString>;
                    required: z.ZodOptional<z.ZodBoolean>;
                }, z.core.$strip>>>;
                messages: z.ZodOptional<z.ZodArray<z.ZodObject<{
                    role: z.ZodString;
                    content: z.ZodObject<{
                        type: z.ZodString;
                        text: z.ZodOptional<z.ZodString>;
                        mimeType: z.ZodOptional<z.ZodString>;
                    }, z.core.$strip>;
                }, z.core.$strip>>>;
                usage: z.ZodObject<{
                    callCount: z.ZodNumber;
                    lastCalledAt: z.ZodOptional<z.ZodPipe<z.ZodString, z.ZodCoercedDate<string>>>;
                }, z.core.$strip>;
            }, z.core.$strip>>>;
            type: z.ZodLiteral<"streamable-http">;
        }, z.core.$strip>]>>;
    }, z.core.$strip>;
    readonly oauthAuthorizationRequired: z.ZodObject<{
        serverName: z.ZodString;
        authorizationUrl: z.ZodString;
        state: z.ZodString;
        userCode: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
    readonly saveSetup: z.ZodObject<{
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
    readonly deleteSavedSetup: z.ZodObject<{
        savedSetupId: z.ZodString;
    }, z.core.$strip>;
    readonly updateSavedSetup: z.ZodObject<{
        savedSetupId: z.ZodString;
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
    }, z.core.$strip>;
    readonly dynamicCapabilitiesMatching: z.ZodObject<{
        systemPrompt: z.ZodString;
        userMessage: z.ZodString;
    }, z.core.$strip>;
    readonly toolCallBatch: z.ZodObject<{
        events: z.ZodArray<z.ZodObject<{
            timestamp: z.ZodCoercedDate<unknown>;
            serverName: z.ZodString;
            toolName: z.ZodString;
            clientName: z.ZodOptional<z.ZodString>;
            consumerTag: z.ZodOptional<z.ZodString>;
            durationMs: z.ZodNumber;
            errorType: z.ZodNullable<z.ZodEnum<{
                tool_error: "tool_error";
                call_failed: "call_failed";
            }>>;
            catalogItemId: z.ZodOptional<z.ZodUUID>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    readonly saveOAuthToken: z.ZodDiscriminatedUnion<[z.ZodObject<{
        serverName: z.ZodString;
        tokenType: z.ZodLiteral<"tokens">;
        data: z.ZodObject<{
            access_token: z.ZodString;
            id_token: z.ZodOptional<z.ZodString>;
            token_type: z.ZodString;
            expires_in: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
            scope: z.ZodOptional<z.ZodString>;
            refresh_token: z.ZodOptional<z.ZodString>;
            expires_at: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>;
        expiresAt: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>, z.ZodObject<{
        serverName: z.ZodString;
        tokenType: z.ZodLiteral<"verifier">;
        data: z.ZodString;
        expiresAt: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>, z.ZodObject<{
        serverName: z.ZodString;
        tokenType: z.ZodLiteral<"client">;
        data: z.ZodObject<{
            redirect_uris: z.ZodArray<z.ZodURL>;
            token_endpoint_auth_method: z.ZodOptional<z.ZodString>;
            grant_types: z.ZodOptional<z.ZodArray<z.ZodString>>;
            response_types: z.ZodOptional<z.ZodArray<z.ZodString>>;
            client_name: z.ZodOptional<z.ZodString>;
            client_uri: z.ZodOptional<z.ZodURL>;
            logo_uri: z.ZodUnion<[z.ZodOptional<z.ZodURL>, z.ZodPipe<z.ZodLiteral<"">, z.ZodTransform<undefined, "">>]>;
            scope: z.ZodOptional<z.ZodString>;
            contacts: z.ZodOptional<z.ZodArray<z.ZodString>>;
            tos_uri: z.ZodUnion<[z.ZodOptional<z.ZodURL>, z.ZodPipe<z.ZodLiteral<"">, z.ZodTransform<undefined, "">>]>;
            policy_uri: z.ZodOptional<z.ZodString>;
            jwks_uri: z.ZodOptional<z.ZodURL>;
            jwks: z.ZodOptional<z.ZodAny>;
            software_id: z.ZodOptional<z.ZodString>;
            software_version: z.ZodOptional<z.ZodString>;
            software_statement: z.ZodOptional<z.ZodString>;
            client_id: z.ZodString;
            client_secret: z.ZodOptional<z.ZodString>;
            client_id_issued_at: z.ZodOptional<z.ZodNumber>;
            client_secret_expires_at: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>;
        expiresAt: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>;
    readonly loadOAuthToken: z.ZodObject<{
        serverName: z.ZodString;
        tokenType: z.ZodEnum<{
            tokens: "tokens";
            verifier: "verifier";
            client: "client";
        }>;
    }, z.core.$strip>;
    readonly deleteOAuthTokens: z.ZodObject<{
        serverName: z.ZodString;
    }, z.core.$strip>;
    readonly storeDownstreamSession: z.ZodObject<{
        sessionId: z.ZodString;
        data: z.ZodObject<{
            metadata: z.ZodObject<{
                consumerTag: z.ZodOptional<z.ZodString>;
                clientId: z.ZodString;
                llm: z.ZodOptional<z.ZodObject<{
                    provider: z.ZodOptional<z.ZodString>;
                    modelId: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>>;
                clientInfo: z.ZodObject<{
                    protocolVersion: z.ZodOptional<z.ZodString>;
                    name: z.ZodOptional<z.ZodString>;
                    version: z.ZodOptional<z.ZodString>;
                    title: z.ZodOptional<z.ZodString>;
                    websiteUrl: z.ZodOptional<z.ZodString>;
                    icons: z.ZodOptional<z.ZodArray<z.ZodObject<{
                        src: z.ZodString;
                        mimeType: z.ZodOptional<z.ZodString>;
                        sizes: z.ZodOptional<z.ZodArray<z.ZodString>>;
                    }, z.core.$strip>>>;
                    adapter: z.ZodOptional<z.ZodObject<{
                        name: z.ZodLiteral<"mcp-remote">;
                        version: z.ZodOptional<z.ZodString>;
                        support: z.ZodOptional<z.ZodObject<{
                            ping: z.ZodBoolean;
                        }, z.core.$strip>>;
                    }, z.core.$strip>>;
                }, z.core.$strip>;
                isProbe: z.ZodBoolean;
                authorization: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>;
        }, z.core.$strip>;
    }, z.core.$strip>;
    readonly loadDownstreamSession: z.ZodObject<{
        sessionId: z.ZodString;
    }, z.core.$strip>;
    readonly deleteDownstreamSession: z.ZodObject<{
        sessionId: z.ZodString;
    }, z.core.$strip>;
    readonly saveSkill: z.ZodObject<{
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
    readonly updateSkill: z.ZodObject<{
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
    readonly deleteSkill: z.ZodObject<{
        id: z.ZodUUID;
    }, z.core.$strip>;
};
export type WebappBoundPayload = (typeof WebappBoundPayloads)[keyof typeof WebappBoundPayloads];
export declare const WEBAPP_BOUND_EVENTS: {
    readonly SETUP_CHANGE: "setup-change";
    readonly USAGE_STATS: "usage-stats";
    readonly OAUTH_AUTHORIZATION_REQUIRED: "oauth-authorization-required";
    readonly SAVE_SETUP: "save-setup";
    readonly LIST_SAVED_SETUPS: "list-saved-setups";
    readonly DELETE_SAVED_SETUP: "delete-saved-setup";
    readonly UPDATE_SAVED_SETUP: "update-saved-setup";
    readonly DYNAMIC_CAPABILITIES_MATCHING: "dynamic-capabilities-matching";
    readonly TOOL_CALL_BATCH: "tool-call-batch";
    readonly SAVE_OAUTH_TOKEN: "save-oauth-token";
    readonly LOAD_OAUTH_TOKEN: "load-oauth-token";
    readonly DELETE_OAUTH_TOKENS: "delete-oauth-tokens";
    readonly STORE_DOWNSTREAM_SESSION: "store-downstream-session";
    readonly LOAD_DOWNSTREAM_SESSION: "load-downstream-session";
    readonly DELETE_DOWNSTREAM_SESSION: "delete-downstream-session";
    readonly SAVE_SKILL: "save-skill";
    readonly UPDATE_SKILL: "update-skill";
    readonly DELETE_SKILL: "delete-skill";
};
export type WebappBoundEventName = (typeof WEBAPP_BOUND_EVENTS)[keyof typeof WEBAPP_BOUND_EVENTS];
export type WebappBoundPayloadOf<E extends WebappBoundEventName> = E extends typeof WEBAPP_BOUND_EVENTS.SETUP_CHANGE ? z.input<typeof setupChangePayloadSchema> : E extends typeof WEBAPP_BOUND_EVENTS.USAGE_STATS ? z.input<typeof usageStatsPayloadSchema> : E extends typeof WEBAPP_BOUND_EVENTS.OAUTH_AUTHORIZATION_REQUIRED ? z.input<typeof oauthAuthorizationRequiredPayloadSchema> : E extends typeof WEBAPP_BOUND_EVENTS.SAVE_SETUP ? z.input<typeof saveSetupPayloadSchema> : E extends typeof WEBAPP_BOUND_EVENTS.LIST_SAVED_SETUPS ? Record<string, never> : E extends typeof WEBAPP_BOUND_EVENTS.DELETE_SAVED_SETUP ? z.input<typeof deleteSavedSetupPayloadSchema> : E extends typeof WEBAPP_BOUND_EVENTS.UPDATE_SAVED_SETUP ? z.input<typeof updateSavedSetupPayloadSchema> : E extends typeof WEBAPP_BOUND_EVENTS.DYNAMIC_CAPABILITIES_MATCHING ? z.input<typeof dynamicCapabilitiesMatchingPayloadSchema> : E extends typeof WEBAPP_BOUND_EVENTS.TOOL_CALL_BATCH ? z.input<typeof toolCallBatchPayloadSchema> : E extends typeof WEBAPP_BOUND_EVENTS.SAVE_OAUTH_TOKEN ? z.input<typeof saveOAuthTokenPayloadSchema> : E extends typeof WEBAPP_BOUND_EVENTS.LOAD_OAUTH_TOKEN ? z.input<typeof loadOAuthTokenPayloadSchema> : E extends typeof WEBAPP_BOUND_EVENTS.DELETE_OAUTH_TOKENS ? z.input<typeof deleteOAuthTokensPayloadSchema> : E extends typeof WEBAPP_BOUND_EVENTS.STORE_DOWNSTREAM_SESSION ? z.input<typeof storeDownstreamSessionPayloadSchema> : E extends typeof WEBAPP_BOUND_EVENTS.LOAD_DOWNSTREAM_SESSION ? z.input<typeof loadDownstreamSessionPayloadSchema> : E extends typeof WEBAPP_BOUND_EVENTS.DELETE_DOWNSTREAM_SESSION ? z.input<typeof deleteDownstreamSessionPayloadSchema> : E extends typeof WEBAPP_BOUND_EVENTS.SAVE_SKILL ? z.input<typeof saveSkillPayloadSchema> : E extends typeof WEBAPP_BOUND_EVENTS.UPDATE_SKILL ? z.input<typeof updateSkillPayloadSchema> : E extends typeof WEBAPP_BOUND_EVENTS.DELETE_SKILL ? z.input<typeof deleteSkillPayloadSchema> : never;
export type WebappBoundEnvelopedOf<E extends WebappBoundEventName> = EnvelopedMessage<WebappBoundPayloadOf<E>>;
