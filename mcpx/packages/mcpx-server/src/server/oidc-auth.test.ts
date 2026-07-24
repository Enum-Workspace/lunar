import { noOpLogger } from "@mcpx/toolkit-core/logging";
import type { Request } from "express";
import {
  createLocalJWKSet,
  exportJWK,
  generateKeyPair,
  SignJWT,
} from "jose";
import type { JWTVerifyGetKey } from "jose";
import { ConfigService } from "../config.js";
import { Config } from "../model/config/config.js";
import {
  buildOidcGuard,
  defaultJwksUri,
  protectedResourceMetadataUrl,
  UNMAPPED_CONSUMER_TAG,
} from "./oidc-auth.js";

const ISSUER = "http://idp.test/realms/tenant-a";
const AUDIENCE = "http://gateway.test:9000/mcp";
const RESOURCE = "http://gateway.test:9000/mcp";

function makeConfig(): Config {
  return {
    permissions: {
      default: { _type: "default-block", allow: [] },
      consumers: {
        accountant: { _type: "default-block", allow: ["finance-reads"] },
        marketing: { _type: "default-block", allow: ["marketing-reads"] },
      },
      clientNames: {},
    },
    toolGroups: [],
    auth: {
      enabled: true,
      mode: "oidc",
      oidc: {
        issuer: ISSUER,
        audience: AUDIENCE,
        rolesClaim: "groups",
        resource: RESOURCE,
      },
    },
    toolExtensions: { services: {} },
    targetServerAttributes: {},
    skills: { enabled: [] },
  };
}

function stubConfigService(config: Config): ConfigService {
  return { getConfig: () => config } as ConfigService;
}

interface GuardOutcome {
  nextCalled: boolean;
  status?: number;
  body?: string;
  wwwAuthenticate?: string;
}

function runGuard(
  guard: ReturnType<typeof buildOidcGuard>,
  req: Request,
): Promise<GuardOutcome> {
  return new Promise((resolve) => {
    const headers: Record<string, string> = {};
    let status: number | undefined;
    const res = {
      setHeader(name: string, value: string) {
        headers[name.toLowerCase()] = value;
        return res;
      },
      status(code: number) {
        status = code;
        return res;
      },
      send(body: string) {
        resolve({
          nextCalled: false,
          status,
          body,
          wwwAuthenticate: headers["www-authenticate"],
        });
        return res;
      },
    };
    guard(req, res as never, () => resolve({ nextCalled: true }));
  });
}

function makeRequest(headers: Record<string, string>): Request {
  return { headers } as unknown as Request;
}

describe("oidc auth guard", () => {
  let jwks: JWTVerifyGetKey;
  let privateKey: CryptoKey;
  let otherPrivateKey: CryptoKey;

  beforeAll(async () => {
    const pair = await generateKeyPair("RS256");
    privateKey = pair.privateKey as CryptoKey;
    jwks = createLocalJWKSet({
      keys: [{ ...(await exportJWK(pair.publicKey)), alg: "RS256" }],
    });
    const otherPair = await generateKeyPair("RS256");
    otherPrivateKey = otherPair.privateKey as CryptoKey;
  });

  function signToken(
    claims: Record<string, unknown>,
    overrides?: {
      issuer?: string;
      audience?: string;
      expiresAt?: number;
      key?: CryptoKey;
    },
  ): Promise<string> {
    const jwt = new SignJWT(claims)
      .setProtectedHeader({ alg: "RS256" })
      .setSubject("user-1")
      .setIssuer(overrides?.issuer ?? ISSUER)
      .setAudience(overrides?.audience ?? AUDIENCE)
      .setIssuedAt();
    if (overrides?.expiresAt !== undefined) {
      jwt.setExpirationTime(overrides.expiresAt);
    } else {
      jwt.setExpirationTime("5m");
    }
    return jwt.sign(overrides?.key ?? privateKey);
  }

  function makeGuard(config = makeConfig()): ReturnType<typeof buildOidcGuard> {
    return buildOidcGuard(stubConfigService(config), noOpLogger, jwks);
  }

  it("throws at build time without an oidc config block", () => {
    const config = makeConfig();
    config.auth.oidc = undefined;
    expect(() => makeGuard(config)).toThrow("auth.oidc");
  });

  it("rejects a missing token with 401 and a resource_metadata challenge", async () => {
    const outcome = await runGuard(makeGuard(), makeRequest({}));

    expect(outcome.nextCalled).toBe(false);
    expect(outcome.status).toBe(401);
    expect(outcome.wwwAuthenticate).toBe(
      'Bearer resource_metadata="http://gateway.test:9000/.well-known/oauth-protected-resource/mcp"',
    );
  });

  it("rejects a non-bearer authorization header with 401", async () => {
    const outcome = await runGuard(
      makeGuard(),
      makeRequest({ authorization: "Basic dXNlcjpwYXNz" }),
    );

    expect(outcome.nextCalled).toBe(false);
    expect(outcome.status).toBe(401);
  });

  it("accepts a valid token and rewrites the consumer tag from the groups claim", async () => {
    const token = await signToken({ groups: ["accountant"] });
    const req = makeRequest({ authorization: `Bearer ${token}` });

    const outcome = await runGuard(makeGuard(), req);

    expect(outcome.nextCalled).toBe(true);
    expect(req.headers["x-lunar-consumer-tag"]).toBe("accountant");
  });

  it("overwrites a spoofed consumer tag header with the verified role", async () => {
    const token = await signToken({ groups: ["marketing"] });
    const req = makeRequest({
      authorization: `Bearer ${token}`,
      "x-lunar-consumer-tag": "ADMIN",
    });

    const outcome = await runGuard(makeGuard(), req);

    expect(outcome.nextCalled).toBe(true);
    expect(req.headers["x-lunar-consumer-tag"]).toBe("marketing");
  });

  it("strips Keycloak-style leading slashes from group names", async () => {
    const token = await signToken({ groups: ["/accountant"] });
    const req = makeRequest({ authorization: `Bearer ${token}` });

    const outcome = await runGuard(makeGuard(), req);

    expect(outcome.nextCalled).toBe(true);
    expect(req.headers["x-lunar-consumer-tag"]).toBe("accountant");
  });

  it("supports a string (non-array) roles claim", async () => {
    const token = await signToken({ groups: "accountant" });
    const req = makeRequest({ authorization: `Bearer ${token}` });

    const outcome = await runGuard(makeGuard(), req);

    expect(outcome.nextCalled).toBe(true);
    expect(req.headers["x-lunar-consumer-tag"]).toBe("accountant");
  });

  it("uses the first claim value matching a configured consumer", async () => {
    const token = await signToken({
      groups: ["unknown-group", "marketing", "accountant"],
    });
    const req = makeRequest({ authorization: `Bearer ${token}` });

    const outcome = await runGuard(makeGuard(), req);

    expect(outcome.nextCalled).toBe(true);
    expect(req.headers["x-lunar-consumer-tag"]).toBe("marketing");
  });

  it("maps tokens without a matching role to the unmapped sentinel", async () => {
    const token = await signToken({ groups: ["director"] });
    const req = makeRequest({ authorization: `Bearer ${token}` });

    const outcome = await runGuard(makeGuard(), req);

    expect(outcome.nextCalled).toBe(true);
    expect(req.headers["x-lunar-consumer-tag"]).toBe(UNMAPPED_CONSUMER_TAG);
  });

  it("rejects an expired token with invalid_token", async () => {
    const token = await signToken(
      { groups: ["accountant"] },
      { expiresAt: Math.floor(Date.now() / 1000) - 3600 },
    );

    const outcome = await runGuard(
      makeGuard(),
      makeRequest({ authorization: `Bearer ${token}` }),
    );

    expect(outcome.nextCalled).toBe(false);
    expect(outcome.status).toBe(401);
    expect(outcome.wwwAuthenticate).toContain('error="invalid_token"');
  });

  it("rejects a token with the wrong audience", async () => {
    const token = await signToken(
      { groups: ["accountant"] },
      { audience: "http://some-other-resource.test" },
    );

    const outcome = await runGuard(
      makeGuard(),
      makeRequest({ authorization: `Bearer ${token}` }),
    );

    expect(outcome.nextCalled).toBe(false);
    expect(outcome.status).toBe(401);
    expect(outcome.wwwAuthenticate).toContain('error="invalid_token"');
  });

  it("rejects a token from the wrong issuer", async () => {
    const token = await signToken(
      { groups: ["accountant"] },
      { issuer: "http://evil-idp.test/realms/tenant-a" },
    );

    const outcome = await runGuard(
      makeGuard(),
      makeRequest({ authorization: `Bearer ${token}` }),
    );

    expect(outcome.nextCalled).toBe(false);
    expect(outcome.status).toBe(401);
  });

  it("rejects a token signed by an unknown key", async () => {
    const token = await signToken(
      { groups: ["accountant"] },
      { key: otherPrivateKey },
    );

    const outcome = await runGuard(
      makeGuard(),
      makeRequest({ authorization: `Bearer ${token}` }),
    );

    expect(outcome.nextCalled).toBe(false);
    expect(outcome.status).toBe(401);
  });
});

describe("oidc url helpers", () => {
  it("derives the Keycloak JWKS URI from the issuer", () => {
    expect(
      defaultJwksUri({
        issuer: `${ISSUER}/`,
        audience: AUDIENCE,
        rolesClaim: "groups",
        resource: RESOURCE,
      }),
    ).toBe(`${ISSUER}/protocol/openid-connect/certs`);
  });

  it("prefers an explicit jwksUri override", () => {
    expect(
      defaultJwksUri({
        issuer: ISSUER,
        audience: AUDIENCE,
        rolesClaim: "groups",
        resource: RESOURCE,
        jwksUri: "http://internal:8080/certs",
      }),
    ).toBe("http://internal:8080/certs");
  });

  it("inserts the well-known segment between origin and path", () => {
    expect(protectedResourceMetadataUrl("http://gw:9000/mcp")).toBe(
      "http://gw:9000/.well-known/oauth-protected-resource/mcp",
    );
    expect(protectedResourceMetadataUrl("http://gw:9000")).toBe(
      "http://gw:9000/.well-known/oauth-protected-resource",
    );
  });
});
