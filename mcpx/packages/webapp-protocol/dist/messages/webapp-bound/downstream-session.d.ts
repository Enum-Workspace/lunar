import { z } from "zod/v4";
export declare const persistedDownstreamSessionDataSchema: z.ZodObject<{
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
export type PersistedDownstreamSessionDataWire = z.infer<typeof persistedDownstreamSessionDataSchema>;
export declare const storeDownstreamSessionPayloadSchema: z.ZodObject<{
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
export declare const storeDownstreamSessionAckSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    success: z.ZodLiteral<true>;
}, z.core.$strip>, z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodString;
}, z.core.$strip>]>;
export type StoreDownstreamSessionAck = z.infer<typeof storeDownstreamSessionAckSchema>;
export declare const loadDownstreamSessionPayloadSchema: z.ZodObject<{
    sessionId: z.ZodString;
}, z.core.$strip>;
export declare const loadDownstreamSessionAckSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    success: z.ZodLiteral<true>;
    data: z.ZodOptional<z.ZodObject<{
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
    }, z.core.$strip>>;
}, z.core.$strip>, z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodString;
}, z.core.$strip>]>;
export type LoadDownstreamSessionAck = z.infer<typeof loadDownstreamSessionAckSchema>;
export declare const deleteDownstreamSessionPayloadSchema: z.ZodObject<{
    sessionId: z.ZodString;
}, z.core.$strip>;
export declare const deleteDownstreamSessionAckSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    success: z.ZodLiteral<true>;
}, z.core.$strip>, z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodString;
}, z.core.$strip>]>;
export type DeleteDownstreamSessionAck = z.infer<typeof deleteDownstreamSessionAckSchema>;
