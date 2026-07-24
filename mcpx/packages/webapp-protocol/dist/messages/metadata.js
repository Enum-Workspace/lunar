import { randomUUID } from "crypto";
import z from "zod/v4";
const metadataSchema = z.object({
    id: z.string(),
    correlationId: z.string().optional(),
});
// Wraps a generic payload schema with an envelope containing metadata
export function Envelope(payload) {
    return z.object({
        metadata: metadataSchema,
        payload,
    });
}
// Utility function to wrap a payload with metadata
export function wrapInEnvelope(props) {
    const { payload, id, correlationId } = props;
    return {
        metadata: {
            id: id ?? randomUUID(),
            correlationId,
        },
        payload,
    };
}
export function safeParseEnvelopedMessage(payloadSchema) {
    const envelopedSchema = Envelope(payloadSchema);
    return (enveloped) => {
        return envelopedSchema.safeParse(enveloped);
    };
}
