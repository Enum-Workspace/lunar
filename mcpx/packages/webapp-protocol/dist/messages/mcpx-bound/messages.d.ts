import z from "zod/v4";
import { EnvelopedMessage } from "../metadata.js";
import { applySetupPayloadSchema } from "./apply-setup.js";
import { setCatalogPayloadSchema } from "./set-catalog.js";
import { setProfileSecretsPayloadSchema } from "./set-profile-secrets.js";
import { setIdentityPayloadSchema } from "./set-identity.js";
import { initiateOAuthPayloadSchema } from "./initiate-oauth.js";
import { completeOAuthPayloadSchema } from "./complete-oauth.js";
import { setOauthCredentialsPayloadSchema } from "./set-oauth-credentials.js";
import { setPersonalSkillsPayloadSchema } from "./set-skills.js";
export declare const McpxBoundPayloads: {
    readonly applySetup: z.ZodObject<{
        source: z.ZodEnum<{
            user: "user";
            profile: "profile";
        }>;
        setupId: z.ZodString;
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
    readonly setCatalog: z.ZodObject<{
        items: z.ZodArray<z.ZodObject<{
            server: z.ZodObject<{
                id: z.ZodUUID;
                name: z.ZodString;
                config: z.ZodDiscriminatedUnion<[z.ZodObject<{
                    type: z.ZodLiteral<"stdio">;
                    command: z.ZodEnum<{
                        npx: "npx";
                        uvx: "uvx";
                        docker: "docker";
                        node: "node";
                    }>;
                    args: z.ZodDefault<z.ZodArray<z.ZodString>>;
                    env: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodPipe<z.ZodDiscriminatedUnion<[z.ZodObject<{
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
                    }>>>>;
                    icon: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>, z.ZodObject<{
                    type: z.ZodLiteral<"sse">;
                    url: z.ZodString;
                    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
                        fromEnv: z.ZodString;
                    }, z.core.$strip>, z.ZodObject<{
                        fromSecret: z.ZodString;
                    }, z.core.$strip>, z.ZodNull]>>>;
                    icon: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>, z.ZodObject<{
                    type: z.ZodLiteral<"streamable-http">;
                    url: z.ZodString;
                    headers: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodObject<{
                        fromEnv: z.ZodString;
                    }, z.core.$strip>, z.ZodObject<{
                        fromSecret: z.ZodString;
                    }, z.core.$strip>, z.ZodNull]>>>;
                    icon: z.ZodOptional<z.ZodString>;
                }, z.core.$strip>]>;
                displayName: z.ZodString;
                description: z.ZodOptional<z.ZodString>;
                link: z.ZodOptional<z.ZodString>;
                iconPath: z.ZodOptional<z.ZodString>;
                doc: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>;
            adminConfig: z.ZodOptional<z.ZodObject<{
                approvedTools: z.ZodOptional<z.ZodArray<z.ZodString>>;
                approvedPrompts: z.ZodOptional<z.ZodArray<z.ZodString>>;
                privateHeaders: z.ZodOptional<z.ZodObject<{
                    key: z.ZodString;
                    value: z.ZodString;
                }, z.core.$strip>>;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
    }, z.core.$strip>;
    readonly setProfileSecrets: z.ZodObject<{
        profileSecrets: z.ZodRecord<z.ZodString, z.ZodString>;
        timestamp: z.ZodNumber;
    }, z.core.$strip>;
    readonly setOauthCredentials: z.ZodObject<{
        oauthCredentials: z.ZodRecord<z.ZodString, z.ZodString>;
        timestamp: z.ZodNumber;
    }, z.core.$strip>;
    readonly setIdentity: z.ZodDiscriminatedUnion<[z.ZodObject<{
        entityType: z.ZodLiteral<"space">;
        spaceKind: z.ZodOptional<z.ZodEnum<{
            HOSTED_MCP_SERVER: "HOSTED_MCP_SERVER";
            AGENT_CONNECTOR: "AGENT_CONNECTOR";
            SANDBOX_ANALYSIS: "SANDBOX_ANALYSIS";
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
        displayName: z.ZodOptional<z.ZodString>;
        editingOnBehalfOf: z.ZodOptional<z.ZodObject<{
            spaceName: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>]>;
    readonly initiateOAuth: z.ZodObject<{
        serverName: z.ZodString;
        callbackUrl: z.ZodString;
    }, z.core.$strip>;
    readonly completeOAuth: z.ZodObject<{
        serverName: z.ZodString;
        authorizationCode: z.ZodString;
        state: z.ZodString;
    }, z.core.$strip>;
    readonly setPersonalSkills: z.ZodObject<{
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
};
export type McpxBoundPayload = (typeof McpxBoundPayloads)[keyof typeof McpxBoundPayloads];
export declare const MCPX_BOUND_EVENTS: {
    readonly APPLY_SETUP: "apply-setup";
    readonly SET_CATALOG: "set-catalog";
    readonly SET_PROFILE_SECRETS: "set-profile-secrets";
    readonly SET_OAUTH_CREDENTIALS: "set-oauth-credentials";
    readonly SET_IDENTITY: "set-identity";
    readonly INITIATE_OAUTH: "initiate-oauth";
    readonly COMPLETE_OAUTH: "complete-oauth";
    readonly SET_PERSONAL_SKILLS: "set-personal-skills";
};
export type McpxBoundEventName = (typeof MCPX_BOUND_EVENTS)[keyof typeof MCPX_BOUND_EVENTS];
export type McpxBoundPayloadOf<E extends McpxBoundEventName> = E extends typeof MCPX_BOUND_EVENTS.APPLY_SETUP ? z.input<typeof applySetupPayloadSchema> : E extends typeof MCPX_BOUND_EVENTS.SET_CATALOG ? z.input<typeof setCatalogPayloadSchema> : E extends typeof MCPX_BOUND_EVENTS.SET_PROFILE_SECRETS ? z.input<typeof setProfileSecretsPayloadSchema> : E extends typeof MCPX_BOUND_EVENTS.SET_OAUTH_CREDENTIALS ? z.input<typeof setOauthCredentialsPayloadSchema> : E extends typeof MCPX_BOUND_EVENTS.SET_IDENTITY ? z.input<typeof setIdentityPayloadSchema> : E extends typeof MCPX_BOUND_EVENTS.INITIATE_OAUTH ? z.input<typeof initiateOAuthPayloadSchema> : E extends typeof MCPX_BOUND_EVENTS.COMPLETE_OAUTH ? z.input<typeof completeOAuthPayloadSchema> : E extends typeof MCPX_BOUND_EVENTS.SET_PERSONAL_SKILLS ? z.input<typeof setPersonalSkillsPayloadSchema> : never;
export type McpxBoundEnvelopedOf<E extends McpxBoundEventName> = EnvelopedMessage<McpxBoundPayloadOf<E>>;
