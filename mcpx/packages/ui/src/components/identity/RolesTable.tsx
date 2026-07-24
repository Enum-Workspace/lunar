// LOCAL FORK PATCH (IdP management UI)
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AppConfig, IdpGroup } from "@mcpx/shared-model";
import { joinGroupToConsumer } from "./consumer-join";

export function RolesTable({
  groups,
  appConfig,
  onEdit,
}: {
  groups: IdpGroup[];
  appConfig: AppConfig | null;
  onEdit: (group: IdpGroup) => void;
}) {
  if (groups.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-muted-foreground">
        No roles yet.
      </p>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Role (Keycloak group)</TableHead>
          <TableHead>Gateway consumer</TableHead>
          <TableHead>Tool groups</TableHead>
          <TableHead className="w-24" />
        </TableRow>
      </TableHeader>
      <TableBody>
        {groups.map((group) => {
          const join = joinGroupToConsumer(group.name, appConfig);
          return (
            <TableRow key={group.id}>
              <TableCell className="font-medium">{group.name}</TableCell>
              <TableCell>
                {join.consumer ? (
                  <Badge variant="success">mapped</Badge>
                ) : (
                  <Badge variant="warning">no consumer</Badge>
                )}
              </TableCell>
              <TableCell>
                {!join.consumer ? (
                  <span className="text-muted-foreground">
                    add a consumer on the Tools page
                  </span>
                ) : join.isAllowAll ? (
                  <span>
                    all tools
                    {join.toolGroups.length > 0
                      ? ` except: ${join.toolGroups.join(", ")}`
                      : ""}
                  </span>
                ) : join.toolGroups.length === 0 ? (
                  <span className="text-muted-foreground">none (deny-all)</span>
                ) : (
                  <div className="flex flex-wrap gap-1">
                    {join.toolGroups.map((tg) => (
                      <Badge key={tg} variant="outline">
                        {tg}
                      </Badge>
                    ))}
                  </div>
                )}
              </TableCell>
              <TableCell>
                {!join.isAllowAll && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(group)}
                  >
                    {join.consumer ? "Edit tools" : "Add tools"}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
