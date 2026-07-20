import { setupChangePayloadSchema } from "./setup-change.js";
import { usageStatsPayloadSchema } from "./usage-stats.js";
import { oauthAuthorizationRequiredPayloadSchema } from "./oauth-authorization-required.js";
import { saveSetupPayloadSchema } from "./save-setup.js";
import { deleteSavedSetupPayloadSchema } from "./delete-saved-setup.js";
import { updateSavedSetupPayloadSchema } from "./update-saved-setup.js";
import { dynamicCapabilitiesMatchingPayloadSchema } from "./llm-completion.js";
import { toolCallBatchPayloadSchema } from "./tool-call-batch.js";
import { saveOAuthTokenPayloadSchema, loadOAuthTokenPayloadSchema, deleteOAuthTokensPayloadSchema, } from "./oauth-token.js";
import { storeDownstreamSessionPayloadSchema, loadDownstreamSessionPayloadSchema, deleteDownstreamSessionPayloadSchema, } from "./downstream-session.js";
import { saveSkillPayloadSchema, updateSkillPayloadSchema, deleteSkillPayloadSchema, } from "./author-skill.js";
// Raw payload schemas
export const WebappBoundPayloads = {
    setupChange: setupChangePayloadSchema,
    usageStats: usageStatsPayloadSchema,
    oauthAuthorizationRequired: oauthAuthorizationRequiredPayloadSchema,
    saveSetup: saveSetupPayloadSchema,
    deleteSavedSetup: deleteSavedSetupPayloadSchema,
    updateSavedSetup: updateSavedSetupPayloadSchema,
    dynamicCapabilitiesMatching: dynamicCapabilitiesMatchingPayloadSchema,
    toolCallBatch: toolCallBatchPayloadSchema,
    saveOAuthToken: saveOAuthTokenPayloadSchema,
    loadOAuthToken: loadOAuthTokenPayloadSchema,
    deleteOAuthTokens: deleteOAuthTokensPayloadSchema,
    storeDownstreamSession: storeDownstreamSessionPayloadSchema,
    loadDownstreamSession: loadDownstreamSessionPayloadSchema,
    deleteDownstreamSession: deleteDownstreamSessionPayloadSchema,
    saveSkill: saveSkillPayloadSchema,
    updateSkill: updateSkillPayloadSchema,
    deleteSkill: deleteSkillPayloadSchema,
};
export const WEBAPP_BOUND_EVENTS = {
    SETUP_CHANGE: "setup-change",
    USAGE_STATS: "usage-stats",
    OAUTH_AUTHORIZATION_REQUIRED: "oauth-authorization-required",
    SAVE_SETUP: "save-setup",
    LIST_SAVED_SETUPS: "list-saved-setups",
    DELETE_SAVED_SETUP: "delete-saved-setup",
    UPDATE_SAVED_SETUP: "update-saved-setup",
    DYNAMIC_CAPABILITIES_MATCHING: "dynamic-capabilities-matching",
    TOOL_CALL_BATCH: "tool-call-batch",
    SAVE_OAUTH_TOKEN: "save-oauth-token",
    LOAD_OAUTH_TOKEN: "load-oauth-token",
    DELETE_OAUTH_TOKENS: "delete-oauth-tokens",
    STORE_DOWNSTREAM_SESSION: "store-downstream-session",
    LOAD_DOWNSTREAM_SESSION: "load-downstream-session",
    DELETE_DOWNSTREAM_SESSION: "delete-downstream-session",
    SAVE_SKILL: "save-skill",
    UPDATE_SKILL: "update-skill",
    DELETE_SKILL: "delete-skill",
};
