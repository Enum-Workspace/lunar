// LOCAL FORK PATCH (IdP management UI): per-tenant Keycloak user & group
// management. Self-gates on GET /idp/status so the page is safe to show even
// when the instance isn't running oidc mode / has no admin client configured.
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChangeRoleDialog } from "@/components/identity/ChangeRoleDialog";
import { CreateGroupDialog } from "@/components/identity/CreateGroupDialog";
import { CreateUserDialog } from "@/components/identity/CreateUserDialog";
import { DeleteUserDialog } from "@/components/identity/DeleteUserDialog";
import { EditRoleDialog } from "@/components/identity/EditRoleDialog";
import { mappedConsumerGroupNames } from "@/components/identity/consumer-join";
import { ResetPasswordDialog } from "@/components/identity/ResetPasswordDialog";
import { RolesTable } from "@/components/identity/RolesTable";
import { UsersTable } from "@/components/identity/UsersTable";
import { useIdpGroups, useIdpStatus, useIdpUsers } from "@/data/idp";
import { useSocketStore } from "@/store/socket";
import type { IdpGroup, IdpUser } from "@mcpx/shared-model";
import { Plus, ShieldCheck, ShieldOff } from "lucide-react";
import { useMemo, useState } from "react";

export default function Identity() {
  const statusQuery = useIdpStatus();
  const enabled = statusQuery.data?.enabled ?? false;
  const usersQuery = useIdpUsers(enabled);
  const groupsQuery = useIdpGroups(enabled);
  const appConfig = useSocketStore((s) => s.appConfig);
  const mappedGroupNames = useMemo(
    () => mappedConsumerGroupNames(appConfig),
    [appConfig],
  );
  const toolGroups = appConfig?.toolGroups ?? [];

  const [createUserOpen, setCreateUserOpen] = useState(false);
  const [createGroupOpen, setCreateGroupOpen] = useState(false);
  const [editRole, setEditRole] = useState<IdpGroup | null>(null);
  const [changeRoleUser, setChangeRoleUser] = useState<IdpUser | null>(null);
  const [resetPasswordUser, setResetPasswordUser] = useState<IdpUser | null>(
    null,
  );
  const [deleteUser, setDeleteUser] = useState<IdpUser | null>(null);

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-auto p-1">
      <h1 className="mb-5 shrink-0 text-[20px] font-semibold text-[#20222A]">
        Identity
      </h1>

      {statusQuery.isLoading ? (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Spinner /> Checking identity provider…
        </div>
      ) : !enabled ? (
        <SetupCard mode={statusQuery.data?.mode} />
      ) : (
        <>
          <StatusCard
            reachable={statusQuery.data?.reachable ?? false}
            realm={statusQuery.data?.realm}
            issuer={statusQuery.data?.issuer}
          />

          <Tabs defaultValue="users" className="mt-6">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="roles">Roles</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="users" className="mt-4">
              <div className="mb-3 flex justify-end">
                <Button onClick={() => setCreateUserOpen(true)}>
                  <Plus className="mr-1.5 h-4 w-4" /> Create user
                </Button>
              </div>
              {usersQuery.isLoading ? (
                <Spinner />
              ) : usersQuery.isError ? (
                <ErrorText />
              ) : (
                <UsersTable
                  users={usersQuery.data ?? []}
                  mappedGroupNames={mappedGroupNames}
                  onChangeRole={setChangeRoleUser}
                  onResetPassword={setResetPasswordUser}
                  onDelete={setDeleteUser}
                />
              )}
            </TabsContent>

            <TabsContent value="roles" className="mt-4">
              <div className="mb-3 flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setCreateGroupOpen(true)}
                >
                  <Plus className="mr-1.5 h-4 w-4" /> Create role
                </Button>
              </div>
              {groupsQuery.isLoading ? (
                <Spinner />
              ) : groupsQuery.isError ? (
                <ErrorText />
              ) : (
                <RolesTable
                  groups={groupsQuery.data ?? []}
                  appConfig={appConfig}
                  onEdit={setEditRole}
                />
              )}
            </TabsContent>
          </Tabs>

          <CreateUserDialog
            open={createUserOpen}
            onOpenChange={setCreateUserOpen}
            groups={groupsQuery.data ?? []}
            mappedGroupNames={mappedGroupNames}
          />
          <CreateGroupDialog
            open={createGroupOpen}
            onOpenChange={setCreateGroupOpen}
            toolGroups={toolGroups}
          />
          <EditRoleDialog
            group={editRole}
            appConfig={appConfig}
            toolGroups={toolGroups}
            onClose={() => setEditRole(null)}
          />
          <ChangeRoleDialog
            user={changeRoleUser}
            groups={groupsQuery.data ?? []}
            onClose={() => setChangeRoleUser(null)}
          />
          <ResetPasswordDialog
            user={resetPasswordUser}
            onClose={() => setResetPasswordUser(null)}
          />
          <DeleteUserDialog
            user={deleteUser}
            onClose={() => setDeleteUser(null)}
          />
        </>
      )}
    </div>
  );
}

function StatusCard({
  reachable,
  realm,
  issuer,
}: {
  reachable: boolean;
  realm?: string;
  issuer?: string;
}) {
  return (
    <Card size="sm" className="px-5">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
        <div className="flex items-center gap-2">
          {reachable ? (
            <ShieldCheck className="h-5 w-5 text-emerald-600" />
          ) : (
            <ShieldOff className="h-5 w-5 text-destructive" />
          )}
          <Badge variant={reachable ? "success" : "danger"}>
            {reachable ? "Reachable" : "Unreachable"}
          </Badge>
        </div>
        <Field label="Auth mode" value="oidc" />
        <Field label="Realm" value={realm ?? "—"} />
        <Field label="Issuer" value={issuer ?? "—"} />
      </div>
      {!reachable && (
        <p className="mt-2 text-xs text-destructive">
          The identity provider could not be reached. Check that Keycloak is
          running and the admin client secret is correct.
        </p>
      )}
    </Card>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium break-all">{value}</span>
    </div>
  );
}

function SetupCard({ mode }: { mode?: string }) {
  return (
    <Card className="max-w-2xl px-6">
      <h2 className="text-base font-semibold">
        Identity management is not enabled
      </h2>
      <p className="text-sm text-muted-foreground">
        This page manages users and roles in the tenant's identity provider
        (Keycloak). It requires:
      </p>
      <ul className="list-disc pl-5 text-sm text-muted-foreground">
        <li>
          <code>auth.mode: oidc</code> in the gateway config
          {mode ? ` (currently "${mode}")` : ""}
        </li>
        <li>
          a <code>KEYCLOAK_ADMIN_CLIENT_SECRET</code> for the{" "}
          <code>mcpx-admin</code> service-account client
        </li>
      </ul>
      <p className="text-sm text-muted-foreground">
        See the tenant's HOW-TO-USE guide for setup steps.
      </p>
    </Card>
  );
}

function ErrorText() {
  return (
    <p className="py-8 text-center text-sm text-destructive">
      Failed to load from the identity provider.
    </p>
  );
}
