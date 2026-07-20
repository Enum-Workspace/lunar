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
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/use-toast";
import { useDeleteIdpUser } from "@/data/idp";
import { ApiError } from "@/lib/api";
import type { IdpUser } from "@mcpx/shared-model";

export function DeleteUserDialog({
  user,
  onClose,
}: {
  user: IdpUser | null;
  onClose: () => void;
}) {
  const deleteUser = useDeleteIdpUser();

  if (!user) {
    return null;
  }

  const onConfirm = async () => {
    try {
      await deleteUser.mutateAsync(user.id);
      toast({ title: `User "${user.username}" deleted` });
      onClose();
    } catch (e) {
      toast({
        title: "Failed to delete user",
        description: e instanceof ApiError ? e.message : String(e),
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={!!user} onOpenChange={(o) => (o ? undefined : onClose())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete user</DialogTitle>
          <DialogDescription>
            This permanently removes <strong>{user.username}</strong> from the
            identity provider. This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={deleteUser.isPending}
          >
            {deleteUser.isPending && <Spinner className="mr-2 h-4 w-4" />}
            Delete user
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
