import { applySetupPayloadSchema } from "./apply-setup.js";
import { setCatalogPayloadSchema } from "./set-catalog.js";
import { setProfileSecretsPayloadSchema } from "./set-profile-secrets.js";
import { setIdentityPayloadSchema } from "./set-identity.js";
import { initiateOAuthPayloadSchema } from "./initiate-oauth.js";
import { completeOAuthPayloadSchema } from "./complete-oauth.js";
import { setOauthCredentialsPayloadSchema } from "./set-oauth-credentials.js";
import { setPersonalSkillsPayloadSchema } from "./set-skills.js";
// Raw payload schemas
export const McpxBoundPayloads = {
    applySetup: applySetupPayloadSchema,
    setCatalog: setCatalogPayloadSchema,
    setProfileSecrets: setProfileSecretsPayloadSchema,
    setOauthCredentials: setOauthCredentialsPayloadSchema,
    setIdentity: setIdentityPayloadSchema,
    initiateOAuth: initiateOAuthPayloadSchema,
    completeOAuth: completeOAuthPayloadSchema,
    setPersonalSkills: setPersonalSkillsPayloadSchema,
};
export const MCPX_BOUND_EVENTS = {
    APPLY_SETUP: "apply-setup",
    SET_CATALOG: "set-catalog",
    SET_PROFILE_SECRETS: "set-profile-secrets",
    SET_OAUTH_CREDENTIALS: "set-oauth-credentials",
    SET_IDENTITY: "set-identity",
    INITIATE_OAUTH: "initiate-oauth",
    COMPLETE_OAUTH: "complete-oauth",
    SET_PERSONAL_SKILLS: "set-personal-skills",
};
