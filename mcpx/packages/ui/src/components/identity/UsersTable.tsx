// LOCAL FORK PATCH (IdP management UI)
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "@/components/ui/use-toast";
import { useUpdateIdpUser } from "@/data/idp";
import { ApiError } from "@/lib/api";
import type { IdpUser } from "@mcpx/shared-model";
import { MoreHorizontal } from "lucide-react";

export function UsersTable({
  users,
  mappedGroupNames,
  onChangeRole,
  onResetPassword,
  onDelete,
}: {
  users: IdpUser[];
  mappedGroupNames: Set<string>;
  onChangeRole: (user: IdpUser) => void;
  onResetPassword: (user: IdpUser) => void;
  onDelete: (user: IdpUser) => void;
}) {
  const updateUser = useUpdateIdpUser();

  const toggleEnabled = async (user: IdpUser) => {
    try {
      await updateUser.mutateAsync({ id: user.id, enabled: !user.enabled });
    } catch (e) {
      toast({
        title: "Failed to update user",
        description: e instanceof ApiError ? e.message : String(e),
        variant: "destructive",
      });
    }
  };

  if (users.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No users yet. Create one to get started.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Username</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Enabled</TableHead>
          <TableHead className="w-10" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.username}</TableCell>
            <TableCell className="text-muted-foreground">
              {user.email ?? "—"}
            </TableCell>
            <TableCell>
              {user.groups.length === 0 ? (
                <span className="text-muted-foreground">none</span>
              ) : (
                <div className="flex flex-wrap gap-1">
                  {user.groups.map((g) => (
                    <Badge
                      key={g}
                      variant={mappedGroupNames.has(g) ? "info" : "warning"}
                    >
                      {g}
                    </Badge>
                  ))}
                </div>
              )}
            </TableCell>
            <TableCell>
              <Switch
                checked={user.enabled}
                onCheckedChange={() => toggleEnabled(user)}
                aria-label={`Toggle ${user.username} enabled`}
              />
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger
                  type="button"
                  aria-label="User actions"
                  className={buttonVariants({
                    variant: "ghost",
                    size: "icon",
                  })}
                >
                  <MoreHorizontal className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onChangeRole(user)}>
                    Change role
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onResetPassword(user)}>
                    Reset password
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => onDelete(user)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
