import z from "zod/v4";

export const toolGroupOwnerSchema = z.enum(["user", "dynamic-capabilities"]);

export type ToolGroupOwner = z.infer<typeof toolGroupOwnerSchema>;

export const singleToolGroupSchema = z.object({
  name: z
    .string()
    .regex(
      /^[a-zA-Z0-9_\s-]{1,64}$/,
      "Tool group name must match pattern: ^[a-zA-Z0-9_\\s-]{1,64}$",
    ),
  description: z.string().optional(),
  services: z.record(
    z.string(),
    z.union([z.array(z.string()), z.literal("*")]),
  ),
  owner: toolGroupOwnerSchema.optional(),
});

export type ToolGroup = z.infer<typeof singleToolGroupSchema>;

export const toolGroupSchema = z.array(singleToolGroupSchema).default([]);

// LOCAL FORK PATCH: OIDC (IdP-verified) inbound auth mode alongside the
// original static API-key mode. `mode: "oidc"` makes MCPX an OAuth resource
// server: Bearer JWTs are verified against the IdP's JWKS and the RBAC role
// (consumerTag) is derived from a token claim instead of the spoofable
// x-lunar-consumer-tag header.
export const oidcAuthSchema = z.object({
  // Expected `iss` claim; also the base for JWKS/discovery URLs.
  issuer: z.string().min(1),
  // Value that must appear in the token's `aud` claim.
  audience: z.string().min(1),
  // Token claim (string or string[]) holding the role names to match
  // against permissions.consumers keys.
  rolesClaim: z.string().default("groups"),
  // Canonical URL of this MCPX resource as clients reach it.
  resource: z.string().min(1),
  // Override for non-Keycloak IdPs or split-horizon networking; defaults to
  // `${issuer}/protocol/openid-connect/certs`.
  jwksUri: z.string().optional(),
});

export type OidcAuthConfig = z.infer<typeof oidcAuthSchema>;

export const authSchema = z
  .object({
    enabled: z.boolean().or(z.stringbool()).default(false),
    // Absent mode means "apikey" (the original behavior).
    mode: z.enum(["apikey", "oidc"]).optional(),
    header: z.string().optional(),
    oidc: oidcAuthSchema.optional(),
  })
  .check((ctx) => {
    if (ctx.value.mode === "oidc" && !ctx.value.oidc) {
      ctx.issues.push({
        code: "custom",
        message: 'auth.mode is "oidc" but no auth.oidc block is configured',
        input: ctx.value,
        path: ["oidc"],
      });
    }
  })
  .default({ enabled: false });

export type ParamExtensionOverrideValue =
  | null
  | string
  | number
  | boolean
  | { [key: string]: ParamExtensionOverrideValue }
  | Array<ParamExtensionOverrideValue>;
export type ExtensionDescription = {
  action: "append" | "rewrite";
  text: string;
};
export type ToolExtensionParamsRecord = {
  [paramName: string]: {
    value?: ParamExtensionOverrideValue;
    description?: ExtensionDescription;
  };
};
