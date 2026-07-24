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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/components/ui/use-toast";
import { useResetIdpPassword } from "@/data/idp";
import { ApiError } from "@/lib/api";
import type { IdpUser } from "@mcpx/shared-model";
import { useEffect, useState } from "react";

export function ResetPasswordDialog({
  user,
  onClose,
}: {
  user: IdpUser | null;
  onClose: () => void;
}) {
  const resetPassword = useResetIdpPassword();
  const [password, setPassword] = useState("");
  const [temporary, setTemporary] = useState(false);

  useEffect(() => {
    setPassword("");
    setTemporary(false);
  }, [user]);

  if (!user) {
    return null;
  }

  const onSubmit = async () => {
    if (password.length < 8) return;
    try {
      await resetPassword.mutateAsync({ id: user.id, password, temporary });
      toast({ title: `Password reset for "${user.username}"` });
      onClose();
    } catch (e) {
      toast({
        title: "Failed to reset password",
        description: e instanceof ApiError ? e.message : String(e),
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={!!user} onOpenChange={(o) => (o ? undefined : onClose())}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reset password</DialogTitle>
          <DialogDescription>
            Sets a new password for {user.username}.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="new-password">New password</Label>
            <Input
              id="new-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {password.length > 0 && password.length < 8 && (
              <span className="text-xs text-destructive">
                At least 8 characters
              </span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="temporary">Require change at next login</Label>
            <Switch
              id="temporary"
              checked={temporary}
              onCheckedChange={setTemporary}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            disabled={resetPassword.isPending || password.length < 8}
          >
            {resetPassword.isPending && <Spinner className="mr-2 h-4 w-4" />}
            Reset password
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
