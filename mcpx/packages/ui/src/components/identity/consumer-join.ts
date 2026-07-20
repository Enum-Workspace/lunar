// LOCAL FORK PATCH (IdP management UI): join a Keycloak group name to the
// permissions.consumers entry that the OIDC guard would resolve for it. The
// match is EXACT and case-sensitive — mirror oidc-auth.ts, do not fuzzy-match.
import type { AppConfig, ConsumerConfig } from "@mcpx/shared-model";

export interface GroupConsumerJoin {
  consumer: ConsumerConfig | undefined;
  // Human-readable description of the tool groups this consumer grants.
  toolGroups: string[];
  // True when the consumer is an "allow-except" (default-allow) shape.
  isAllowAll: boolean;
}

export function joinGroupToConsumer(
  groupName: string,
  appConfig: AppConfig | null,
): GroupConsumerJoin {
  const consumer = appConfig?.permissions.consumers[groupName];
  if (!consumer) {
    return { consumer: undefined, toolGroups: [], isAllowAll: false };
  }
  if (consumer._type === "default-allow") {
    return { consumer, toolGroups: consumer.block, isAllowAll: true };
  }
  return { consumer, toolGroups: consumer.allow, isAllowAll: false };
}

export function mappedConsumerGroupNames(appConfig: AppConfig | null): Set<string> {
  return new Set(Object.keys(appConfig?.permissions.consumers ?? {}));
}
