export { targetServerSchema, targetServersRecordSchema, targetServerEntrySchema, targetServerStdioSchema, targetServerSseSchema, targetServerStreamableHttpSchema, normalizedToolGroupSchema, setupConfigSchema, envValueSchema, } from "./setup.js";
export { ackSchema } from "./ack.js";
// Re-export schemas from shared-model for convenience
export { consumerConfigSchema, singleServerAttributesSchema, staticOAuthProviderSchema, staticOAuthSchema, toolExtensionSchema, toolExtensionsSchema, catalogMCPServerSchema, catalogMCPServerListSchema, catalogConfigSchema, catalogStdioConfigSchema, envRequirementSchema, envRequirementsSchema, isEmptyPrefilled, } from "@mcpx/shared-model";
