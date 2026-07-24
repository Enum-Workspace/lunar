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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "@/components/ui/use-toast";
import { useCreateIdpUser } from "@/data/idp";
import { ApiError } from "@/lib/api";
import type { IdpGroup } from "@mcpx/shared-model";
import { useForm } from "react-hook-form";

interface FormValues {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  group: string;
}

export function CreateUserDialog({
  open,
  onOpenChange,
  groups,
  mappedGroupNames,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups: IdpGroup[];
  // Group names that resolve to a permissions.consumers entry — others get no tools.
  mappedGroupNames: Set<string>;
}) {
  const createUser = useCreateIdpUser();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      username: "",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      group: "",
    },
  });

  const selectedGroup = watch("group");

  const close = () => {
    reset();
    onOpenChange(false);
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      await createUser.mutateAsync({
        username: values.username.trim(),
        email: values.email.trim() || undefined,
        firstName: values.firstName.trim() || undefined,
        lastName: values.lastName.trim() || undefined,
        password: values.password,
        group: values.group,
      });
      toast({ title: `User "${values.username}" created` });
      close();
    } catch (e) {
      toast({
        title: "Failed to create user",
        description: e instanceof ApiError ? e.message : String(e),
        variant: "destructive",
      });
    }
  });

  return (
    <Dialog open={open} onOpenChange={(o) => (o ? onOpenChange(true) : close())}>
      <DialogContent>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Create user</DialogTitle>
            <DialogDescription>
              Adds a user to the identity provider. They sign in with these
              credentials when connecting a client to the gateway.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-4">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && (
                <span className="text-xs text-destructive">
                  {errors.username.message}
                </span>
              )}
            </div>

            <div className="flex gap-3">
              <div className="flex flex-1 flex-col gap-1.5">
                <Label htmlFor="firstName">First name</Label>
                <Input id="firstName" {...register("firstName")} />
              </div>
              <div className="flex flex-1 flex-col gap-1.5">
                <Label htmlFor="lastName">Last name</Label>
                <Input id="lastName" {...register("lastName")} />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register("email")} />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "At least 8 characters",
                  },
                })}
              />
              {errors.password && (
                <span className="text-xs text-destructive">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Role</Label>
              <Select
                value={selectedGroup}
                onValueChange={(v) =>
                  setValue("group", v, { shouldValidate: true })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {groups.map((g) => (
                    <SelectItem key={g.id} value={g.name}>
                      {g.name}
                      {!mappedGroupNames.has(g.name) ? " (no tools mapped)" : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <input
                type="hidden"
                {...register("group", { required: "Role is required" })}
              />
              {errors.group && (
                <span className="text-xs text-destructive">
                  {errors.group.message}
                </span>
              )}
              {selectedGroup && !mappedGroupNames.has(selectedGroup) && (
                <span className="text-xs text-amber-600">
                  This group has no matching consumer, so the user will get no
                  tools until you wire it up on the Tools page.
                </span>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={close}>
              Cancel
            </Button>
            <Button type="submit" disabled={createUser.isPending}>
              {createUser.isPending && <Spinner className="mr-2 h-4 w-4" />}
              Create user
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
