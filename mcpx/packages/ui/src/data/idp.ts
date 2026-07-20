// LOCAL FORK PATCH (IdP management UI): React Query hooks for the /idp
// control-plane endpoints (Identity page).
import { apiClient } from "@/lib/api";
import type {
  ConsumerConfig,
  CreateIdpGroupRequest,
  CreateIdpUserRequest,
  IdpStatus,
  ResetIdpPasswordRequest,
  SetIdpUserGroupRequest,
  UpdateIdpUserRequest,
} from "@mcpx/shared-model";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const STATUS_KEY = ["idp", "status"] as const;
const USERS_KEY = ["idp", "users"] as const;
const GROUPS_KEY = ["idp", "groups"] as const;

export const useIdpStatus = () =>
  useQuery<IdpStatus>({
    queryKey: STATUS_KEY,
    queryFn: () => apiClient.getIdpStatus(),
    retry: false,
    staleTime: 30_000,
  });

export const useIdpUsers = (enabled: boolean) =>
  useQuery({
    queryKey: USERS_KEY,
    queryFn: () => apiClient.getIdpUsers(),
    enabled,
  });

export const useIdpGroups = (enabled: boolean) =>
  useQuery({
    queryKey: GROUPS_KEY,
    queryFn: () => apiClient.getIdpGroups(),
    enabled,
  });

const useInvalidateUsers = (): (() => void) => {
  const queryClient = useQueryClient();
  return () => {
    void queryClient.invalidateQueries({ queryKey: USERS_KEY });
  };
};

export const useCreateIdpUser = () => {
  const invalidate = useInvalidateUsers();
  return useMutation({
    mutationFn: (body: CreateIdpUserRequest) => apiClient.createIdpUser(body),
    onSuccess: invalidate,
  });
};

export const useUpdateIdpUser = () => {
  const invalidate = useInvalidateUsers();
  return useMutation({
    mutationFn: ({ id, ...body }: UpdateIdpUserRequest & { id: string }) =>
      apiClient.updateIdpUser(id, body),
    onSuccess: invalidate,
  });
};

export const useSetIdpUserGroup = () => {
  const invalidate = useInvalidateUsers();
  return useMutation({
    mutationFn: ({ id, ...body }: SetIdpUserGroupRequest & { id: string }) =>
      apiClient.setIdpUserGroup(id, body),
    onSuccess: invalidate,
  });
};

export const useResetIdpPassword = () =>
  useMutation({
    mutationFn: ({ id, ...body }: ResetIdpPasswordRequest & { id: string }) =>
      apiClient.resetIdpUserPassword(id, body),
  });

export const useDeleteIdpUser = () => {
  const invalidate = useInvalidateUsers();
  return useMutation({
    mutationFn: (id: string) => apiClient.deleteIdpUser(id),
    onSuccess: invalidate,
  });
};

export const useCreateIdpGroup = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateIdpGroupRequest) => apiClient.createIdpGroup(body),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: GROUPS_KEY });
    },
  });
};

// The gateway consumer (app.yaml permissions.consumers.<name>) that a Keycloak
// group maps to. Writing it persists to the config file; the updated appConfig
// then arrives over the socket, so no query invalidation is needed here.
export const useCreatePermissionConsumer = () =>
  useMutation({
    mutationFn: ({ name, config }: { name: string; config: ConsumerConfig }) =>
      apiClient.createPermissionConsumer({ name, config }),
  });

export const useUpdatePermissionConsumer = () =>
  useMutation({
    mutationFn: ({ name, config }: { name: string; config: ConsumerConfig }) =>
      apiClient.updatePermissionConsumer(name, config),
  });
