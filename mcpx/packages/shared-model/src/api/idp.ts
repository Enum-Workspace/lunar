// LOCAL FORK PATCH (IdP management UI): request/response schemas for the
// control-plane /idp endpoints — per-tenant Keycloak user & group management
// backing the "Identity" page. Shared by mcpx-server (request validation) and
// the UI (response validation).
import z from "zod/v4";

export const idpStatusSchema = z.object({
  enabled: z.boolean(),
  // "off" when auth.enabled is false entirely.
  mode: z.enum(["apikey", "oidc", "off"]),
  reachable: z.boolean().optional(),
  realm: z.string().optional(),
  issuer: z.string().optional(),
});

export type IdpStatus = z.infer<typeof idpStatusSchema>;

export const idpUserSchema = z.object({
  id: z.string(),
  username: z.string(),
  email: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  enabled: z.boolean(),
  // Top-level Keycloak group names only — nested groups can never match a
  // permissions.consumers key (the OIDC guard strips just a leading "/").
  groups: z.array(z.string()),
});

export type IdpUser = z.infer<typeof idpUserSchema>;

export const getIdpUsersResponseSchema = z.array(idpUserSchema);

export const createIdpUserRequestSchema = z.object({
  username: z.string().min(1).max(128),
  email: z.email().optional(),
  firstName: z.string().max(128).optional(),
  lastName: z.string().max(128).optional(),
  password: z.string().min(8),
  group: z.string().min(1),
});

export type CreateIdpUserRequest = z.infer<typeof createIdpUserRequestSchema>;

export const updateIdpUserRequestSchema = z.object({
  enabled: z.boolean(),
});

export type UpdateIdpUserRequest = z.infer<typeof updateIdpUserRequestSchema>;

// Move semantics: the user ends up in exactly ONE managed (top-level) group.
// The gateway takes the first roles-claim entry matching a consumer key, so
// multiple managed groups would make the effective role order-dependent.
export const setIdpUserGroupRequestSchema = z.object({
  group: z.string().min(1),
});

export type SetIdpUserGroupRequest = z.infer<typeof setIdpUserGroupRequestSchema>;

export const resetIdpPasswordRequestSchema = z.object({
  password: z.string().min(8),
  // When true, Keycloak forces a password change at next login.
  temporary: z.boolean().default(false),
});

export type ResetIdpPasswordRequest = z.infer<
  typeof resetIdpPasswordRequestSchema
>;

export const idpGroupSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export type IdpGroup = z.infer<typeof idpGroupSchema>;

export const getIdpGroupsResponseSchema = z.array(idpGroupSchema);

// The group name must be usable verbatim as a permissions.consumers YAML key
// AND as an OIDC claim value (exact, case-sensitive match) — so no spaces,
// unlike tool-group names.
export const createIdpGroupRequestSchema = z.object({
  name: z.string().regex(/^[a-zA-Z0-9_-]{1,64}$/, {
    message:
      "Group name must be 1-64 characters: letters, digits, '_' or '-' (it must match a consumer key exactly)",
  }),
});

export type CreateIdpGroupRequest = z.infer<typeof createIdpGroupRequestSchema>;
