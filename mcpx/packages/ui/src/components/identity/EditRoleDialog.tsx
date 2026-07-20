// LOCAL FORK PATCH (IdP management UI): attach/detach tool groups on an
// existing role's gateway consumer (writes to the config file).
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/use-toast";
import {
  useCreatePermissionConsumer,
  useUpdatePermissionConsumer,
} from "@/data/idp";
import { ApiError } from "@/lib/api";
import type { AppConfig, IdpGroup, ToolGroup } from "@mcpx/shared-model";
import { useEffect, useState } from "react";
import { joinGroupToConsumer } from "./consumer-join";

export function EditRoleDialog({
  group,
  appConfig,
  toolGroups,
  onClose,
}: {
  group: IdpGroup | null;
  appConfig: AppConfig | null;
  toolGroups: ToolGroup[];
  onClose: () => void;
}) {
  const createConsumer = useCreatePermissionConsumer();
  const updateConsumer = useUpdatePermissionConsumer();
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const join = group
    ? joinGroupToConsumer(group.name, appConfig)
    : { consumer: undefined, toolGroups: [], isAllowAll: false };

  useEffect(() => {
    // Pre-check the tool groups the role currently allows.
    setSelected(new Set(join.isAllowAll ? [] : join.toolGroups));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [group]);

  if (!group) {
    return null;
  }

  const busy = createConsumer.isPending || updateConsumer.isPending;

  const toggle = (tg: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(tg) ? next.delete(tg) : next.add(tg);
      return next;
    });
  };

  const onSubmit = async () => {
    const config = {
      _type: "default-block" as const,
      allow: Array.from(selected),
    };
    try {
      if (join.consumer) {
        await updateConsumer.mutateAsync({ name: group.name, config });
      } else {
        await createConsumer.mutateAsync({ name: group.name, config });
      }
      toast({ title: `Tool groups updated for "${group.name}"` });
      onClose();
    } catch (e) {
      toast({
        title: "Failed to update role",
        description: e instanceof ApiError ? e.message : String(e),
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={!!group} onOpenChange={(o) => (o ? undefined : onClose())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit tool groups — {group.name}</DialogTitle>
          <DialogDescription>
            {join.consumer
              ? "Choose the tool groups this role grants. Saved to the config file."
              : "This role has no gateway consumer yet. Selecting tool groups creates one (written to the config file)."}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {join.isAllowAll ? (
            <p className="text-sm text-amber-600">
              This role is configured as “allow-all except…”. Editing here would
              convert it to an explicit allow-list. Manage allow-all roles on the
              Tools page instead.
            </p>
          ) : toolGroups.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No tool groups defined yet — create some on the Tools page first.
            </p>
          ) : (
            <div className="flex max-h-56 flex-col gap-2 overflow-auto rounded-md border p-3">
              {toolGroups.map((tg) => (
                <label key={tg.name} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={selected.has(tg.name)}
                    onCheckedChange={() => toggle(tg.name)}
                  />
                  <span className="font-medium">{tg.name}</span>
                  {tg.description && (
                    <span className="text-muted-foreground">
                      — {tg.description}
                    </span>
                  )}
                </label>
              ))}
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={busy || join.isAllowAll}>
            {busy && <Spinner className="mr-2 h-4 w-4" />}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
