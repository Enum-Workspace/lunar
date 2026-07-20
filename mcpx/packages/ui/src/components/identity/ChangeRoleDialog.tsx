// LOCAL FORK PATCH (IdP management UI)
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/use-toast";
import { useSetIdpUserGroup } from "@/data/idp";
import { ApiError } from "@/lib/api";
import type { IdpGroup, IdpUser } from "@mcpx/shared-model";
import { useEffect, useState } from "react";

export function ChangeRoleDialog({
  user,
  groups,
  onClose,
}: {
  user: IdpUser | null;
  groups: IdpGroup[];
  onClose: () => void;
}) {
  const setGroup = useSetIdpUserGroup();
  const [group, setGroup_] = useState<string>("");

  useEffect(() => {
    setGroup_(user?.groups[0] ?? "");
  }, [user]);

  if (!user) {
    return null;
  }

  const onSubmit = async () => {
    if (!group) return;
    try {
      await setGroup.mutateAsync({ id: user.id, group });
      toast({ title: `Role for "${user.username}" set to ${group}` });
      onClose();
    } catch (e) {
      toast({
        title: "Failed to change role",
        description: e instanceof ApiError ? e.message : String(e),
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={!!user} onOpenChange={(o) => (o ? undefined : onClose())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change role</DialogTitle>
          <DialogDescription>
            Replaces {user.username}'s current role group. A user holds exactly
            one role group; the previous one is removed.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-1.5 py-4">
          <Label>Role</Label>
          <Select value={group} onValueChange={setGroup_}>
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {groups.map((g) => (
                <SelectItem key={g.id} value={g.name}>
                  {g.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={setGroup.isPending || !group || group === user.groups[0]}
          >
            {setGroup.isPending && <Spinner className="mr-2 h-4 w-4" />}
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
