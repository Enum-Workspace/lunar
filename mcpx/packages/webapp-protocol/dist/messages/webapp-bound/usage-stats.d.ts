import z from "zod/v4";
export declare const targetServerStatus: z.ZodEnum<{
    connected: "connected";
    "pending-auth": "pending-auth";
    "pending-input": "pending-input";
    "connection-failed": "connection-failed";
}>;
export declare const missingEnvVarSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    key: z.ZodString;
    type: z.ZodLiteral<"literal">;
}, z.core.$strip>, z.ZodObject<{
    key: z.ZodString;
    type: z.ZodLiteral<"fromEnv">;
    fromEnvName: z.ZodString;
}, z.core.$strip>]>;
export declare const targetServerType: z.ZodEnum<{
    stdio: "stdio";
    sse: "sse";
    "streamable-http": "streamable-http";
}>;
export declare const toolSchema: z.ZodObject<{
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
}, z.core.$strip>;
export declare const promptMessageSchema: z.ZodObject<{
    role: z.ZodString;
    content: z.ZodObject<{
        type: z.ZodString;
        text: z.ZodOptional<z.ZodString>;
        mimeType: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>;
}, z.core.$strip>;
export declare const promptSchema: z.ZodObject<{
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
}, z.core.$strip>;
export declare const targetSever: z.ZodDiscriminatedUnion<[z.ZodObject<{
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
}, z.core.$strip>]>;
export declare const usageStatsPayloadSchema: z.ZodObject<{
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
export type UsageStatsTargetServer = z.infer<typeof targetSever>;
export type UsageStatsTargetServerInput = z.input<typeof targetSever>;
export type UsageStatsPromptMessage = z.input<typeof promptMessageSchema>;
