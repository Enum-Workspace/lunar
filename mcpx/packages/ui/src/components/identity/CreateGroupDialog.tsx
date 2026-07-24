// LOCAL FORK PATCH (IdP management UI)
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/use-toast";
import { useCreateIdpGroup, useCreatePermissionConsumer } from "@/data/idp";
import { ApiError } from "@/lib/api";
import type { ToolGroup } from "@mcpx/shared-model";
import { useState } from "react";

const NAME_PATTERN = /^[a-zA-Z0-9_-]{1,64}$/;

export function CreateGroupDialog({
  open,
  onOpenChange,
  toolGroups,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  toolGroups: ToolGroup[];
}) {
  const createGroup = useCreateIdpGroup();
  const createConsumer = useCreatePermissionConsumer();
  const [name, setName] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const busy = createGroup.isPending || createConsumer.isPending;
  const valid = NAME_PATTERN.test(name);

  const close = () => {
    setName("");
    setSelected(new Set());
    onOpenChange(false);
  };

  const toggle = (tg: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(tg) ? next.delete(tg) : next.add(tg);
      return next;
    });
  };

  const onSubmit = async () => {
    if (!valid) return;
    try {
      // 1) Keycloak group (so users can be assigned the role).
      await createGroup.mutateAsync({ name });
      // 2) Matching gateway consumer written to app.yaml — default-block +
      //    the selected tool groups, so the role's tools take effect at once.
      await createConsumer.mutateAsync({
        name,
        config: { _type: "default-block", allow: Array.from(selected) },
      });
      toast({ title: `Role "${name}" created` });
      close();
    } catch (e) {
      toast({
        title: "Failed to create role",
        description: e instanceof ApiError ? e.message : String(e),
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => (o ? onOpenChange(true) : close())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create role</DialogTitle>
          <DialogDescription>
            Creates a Keycloak group AND its matching gateway consumer (written
            to the config file), granting the tool groups you select below.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="group-name">Role name</Label>
            <Input
              id="group-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. sales"
            />
            {name.length > 0 && !valid && (
              <span className="text-xs text-destructive">
                1-64 characters: letters, digits, '_' or '-' (no spaces — it
                must match the consumer key exactly)
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Tool groups to grant</Label>
            {toolGroups.length === 0 ? (
              <span className="text-xs text-muted-foreground">
                No tool groups defined yet — create some on the Tools page, or
                leave empty (the role starts with no tools).
              </span>
            ) : (
              <div className="flex max-h-48 flex-col gap-2 overflow-auto rounded-md border p-3">
                {toolGroups.map((tg) => (
                  <label
                    key={tg.name}
                    className="flex items-center gap-2 text-sm"
                  >
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
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={busy || !valid}>
            {busy && <Spinner className="mr-2 h-4 w-4" />}
            Create role
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
