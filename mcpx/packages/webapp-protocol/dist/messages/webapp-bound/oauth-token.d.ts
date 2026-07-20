import { z } from "zod/v4";
export declare const storedTokensSchema: z.ZodObject<{
    access_token: z.ZodString;
    id_token: z.ZodOptional<z.ZodString>;
    token_type: z.ZodString;
    expires_in: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    scope: z.ZodOptional<z.ZodString>;
    refresh_token: z.ZodOptional<z.ZodString>;
    expires_at: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const tokenDataSchema: z.ZodUnion<readonly [z.ZodObject<{
    access_token: z.ZodString;
    id_token: z.ZodOptional<z.ZodString>;
    token_type: z.ZodString;
    expires_in: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    scope: z.ZodOptional<z.ZodString>;
    refresh_token: z.ZodOptional<z.ZodString>;
    expires_at: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>, z.ZodString, z.ZodObject<{
    redirect_uris: z.ZodArray<z.ZodURL>;
    token_endpoint_auth_method: z.ZodOptional<z.ZodString>;
    grant_types: z.ZodOptional<z.ZodArray<z.ZodString>>;
    response_types: z.ZodOptional<z.ZodArray<z.ZodString>>;
    client_name: z.ZodOptional<z.ZodString>;
    client_uri: z.ZodOptional<z.ZodURL>;
    logo_uri: z.ZodUnion<[z.ZodOptional<z.ZodURL>, z.ZodPipe<z.ZodLiteral<"">, z.ZodTransform<undefined, "">>]>;
    scope: z.ZodOptional<z.ZodString>;
    contacts: z.ZodOptional<z.ZodArray<z.ZodString>>;
    tos_uri: z.ZodUnion<[z.ZodOptional<z.ZodURL>, z.ZodPipe<z.ZodLiteral<"">, z.ZodTransform<undefined, "">>]>;
    policy_uri: z.ZodOptional<z.ZodString>;
    jwks_uri: z.ZodOptional<z.ZodURL>;
    jwks: z.ZodOptional<z.ZodAny>;
    software_id: z.ZodOptional<z.ZodString>;
    software_version: z.ZodOptional<z.ZodString>;
    software_statement: z.ZodOptional<z.ZodString>;
    client_id: z.ZodString;
    client_secret: z.ZodOptional<z.ZodString>;
    client_id_issued_at: z.ZodOptional<z.ZodNumber>;
    client_secret_expires_at: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>]>;
export declare const saveOAuthTokenPayloadSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    serverName: z.ZodString;
    tokenType: z.ZodLiteral<"tokens">;
    data: z.ZodObject<{
        access_token: z.ZodString;
        id_token: z.ZodOptional<z.ZodString>;
        token_type: z.ZodString;
        expires_in: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        scope: z.ZodOptional<z.ZodString>;
        refresh_token: z.ZodOptional<z.ZodString>;
        expires_at: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    expiresAt: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>, z.ZodObject<{
    serverName: z.ZodString;
    tokenType: z.ZodLiteral<"verifier">;
    data: z.ZodString;
    expiresAt: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>, z.ZodObject<{
    serverName: z.ZodString;
    tokenType: z.ZodLiteral<"client">;
    data: z.ZodObject<{
        redirect_uris: z.ZodArray<z.ZodURL>;
        token_endpoint_auth_method: z.ZodOptional<z.ZodString>;
        grant_types: z.ZodOptional<z.ZodArray<z.ZodString>>;
        response_types: z.ZodOptional<z.ZodArray<z.ZodString>>;
        client_name: z.ZodOptional<z.ZodString>;
        client_uri: z.ZodOptional<z.ZodURL>;
        logo_uri: z.ZodUnion<[z.ZodOptional<z.ZodURL>, z.ZodPipe<z.ZodLiteral<"">, z.ZodTransform<undefined, "">>]>;
        scope: z.ZodOptional<z.ZodString>;
        contacts: z.ZodOptional<z.ZodArray<z.ZodString>>;
        tos_uri: z.ZodUnion<[z.ZodOptional<z.ZodURL>, z.ZodPipe<z.ZodLiteral<"">, z.ZodTransform<undefined, "">>]>;
        policy_uri: z.ZodOptional<z.ZodString>;
        jwks_uri: z.ZodOptional<z.ZodURL>;
        jwks: z.ZodOptional<z.ZodAny>;
        software_id: z.ZodOptional<z.ZodString>;
        software_version: z.ZodOptional<z.ZodString>;
        software_statement: z.ZodOptional<z.ZodString>;
        client_id: z.ZodString;
        client_secret: z.ZodOptional<z.ZodString>;
        client_id_issued_at: z.ZodOptional<z.ZodNumber>;
        client_secret_expires_at: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>;
    expiresAt: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>]>;
export declare const saveOAuthTokenAckSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    success: z.ZodLiteral<true>;
}, z.core.$strip>, z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodString;
}, z.core.$strip>]>;
export type SaveOAuthTokenAck = z.infer<typeof saveOAuthTokenAckSchema>;
export type SaveOAuthTokenPayload = z.infer<typeof saveOAuthTokenPayloadSchema>;
export declare const loadOAuthTokenPayloadSchema: z.ZodObject<{
    serverName: z.ZodString;
    tokenType: z.ZodEnum<{
        tokens: "tokens";
        verifier: "verifier";
        client: "client";
    }>;
}, z.core.$strip>;
export declare const loadOAuthTokenAckSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    success: z.ZodLiteral<true>;
    data: z.ZodOptional<z.ZodUnion<readonly [z.ZodObject<{
        access_token: z.ZodString;
        id_token: z.ZodOptional<z.ZodString>;
        token_type: z.ZodString;
        expires_in: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
        scope: z.ZodOptional<z.ZodString>;
        refresh_token: z.ZodOptional<z.ZodString>;
        expires_at: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>, z.ZodString, z.ZodObject<{
        redirect_uris: z.ZodArray<z.ZodURL>;
        token_endpoint_auth_method: z.ZodOptional<z.ZodString>;
        grant_types: z.ZodOptional<z.ZodArray<z.ZodString>>;
        response_types: z.ZodOptional<z.ZodArray<z.ZodString>>;
        client_name: z.ZodOptional<z.ZodString>;
        client_uri: z.ZodOptional<z.ZodURL>;
        logo_uri: z.ZodUnion<[z.ZodOptional<z.ZodURL>, z.ZodPipe<z.ZodLiteral<"">, z.ZodTransform<undefined, "">>]>;
        scope: z.ZodOptional<z.ZodString>;
        contacts: z.ZodOptional<z.ZodArray<z.ZodString>>;
        tos_uri: z.ZodUnion<[z.ZodOptional<z.ZodURL>, z.ZodPipe<z.ZodLiteral<"">, z.ZodTransform<undefined, "">>]>;
        policy_uri: z.ZodOptional<z.ZodString>;
        jwks_uri: z.ZodOptional<z.ZodURL>;
        jwks: z.ZodOptional<z.ZodAny>;
        software_id: z.ZodOptional<z.ZodString>;
        software_version: z.ZodOptional<z.ZodString>;
        software_statement: z.ZodOptional<z.ZodString>;
        client_id: z.ZodString;
        client_secret: z.ZodOptional<z.ZodString>;
        client_id_issued_at: z.ZodOptional<z.ZodNumber>;
        client_secret_expires_at: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>]>>;
}, z.core.$strip>, z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodString;
}, z.core.$strip>]>;
export type LoadOAuthTokenAck = z.infer<typeof loadOAuthTokenAckSchema>;
export declare const deleteOAuthTokensPayloadSchema: z.ZodObject<{
    serverName: z.ZodString;
}, z.core.$strip>;
export declare const deleteOAuthTokensAckSchema: z.ZodDiscriminatedUnion<[z.ZodObject<{
    success: z.ZodLiteral<true>;
}, z.core.$strip>, z.ZodObject<{
    success: z.ZodLiteral<false>;
    error: z.ZodString;
}, z.core.$strip>]>;
export type DeleteOAuthTokensAck = z.infer<typeof deleteOAuthTokensAckSchema>;
