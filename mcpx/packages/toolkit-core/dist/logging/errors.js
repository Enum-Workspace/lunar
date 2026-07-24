import { makeError } from "../data/errors.js";
export function loggableError(e) {
    const error = makeError(e);
    return {
        errorName: error.name,
        errorMessage: error.message,
        errorStack: error.stack,
    };
}
const MAX_BODY_PREVIEW_LENGTH = 512;
/**
 * Shapes an HTTP response for logging without leaking the raw body: always
 * emits a bounded `bodyPreview`, never `body`. Spread into log metadata:
 *   logger.error("...", { ...loggableHttpError({ status, body, setupOwnerId }) })
 */
export function loggableHttpError({ status, body, ...context }) {
    return {
        ...context,
        status,
        bodyPreview: previewBody(body),
    };
}
function previewBody(body) {
    if (body === undefined || body === null) {
        return "";
    }
    const serialized = typeof body === "string" ? body : safeJsonStringify(body);
    if (serialized.length <= MAX_BODY_PREVIEW_LENGTH) {
        return serialized;
    }
    const omitted = serialized.length - MAX_BODY_PREVIEW_LENGTH;
    return `${serialized.slice(0, MAX_BODY_PREVIEW_LENGTH)}… [truncated ${omitted} chars]`;
}
function safeJsonStringify(value) {
    try {
        return JSON.stringify(value) ?? String(value);
    }
    catch {
        return "[unserializable]";
    }
}
//# sourceMappingURL=errors.js.map