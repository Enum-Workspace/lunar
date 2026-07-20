import z from "zod/v4";
export declare const privateHeadersSchema: z.ZodObject<{
    key: z.ZodString;
    value: z.ZodString;
}, z.core.$strip>;
export type PrivateHeaders = z.infer<typeof privateHeadersSchema>;
export declare const catalogItemAdminConfigSchema: z.ZodObject<{
    approvedTools: z.ZodOptional<z.ZodArray<z.ZodString>>;
    approvedPrompts: z.ZodOptional<z.ZodArray<z.ZodString>>;
    privateHeaders: z.ZodOptional<z.ZodObject<{
        key: z.ZodString;
        value: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const catalogItemWireSchema: z.ZodObject<{
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
}, z.core.$strip>;
export declare const setCatalogPayloadSchema: z.ZodObject<{
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
export type CatalogItemAdminConfig = z.infer<typeof catalogItemAdminConfigSchema>;
export type CatalogItemWire = z.infer<typeof catalogItemWireSchema>;
