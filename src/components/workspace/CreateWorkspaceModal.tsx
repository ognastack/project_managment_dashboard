
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Workspace } from "@/types/workspaces";

const workspaceSchema = z.object({
  name: z.string().min(1, "Workspace name is required").max(50, "Name must be less than 50 characters"),
});

type WorkspaceFormData = z.infer<typeof workspaceSchema>;

interface CreateWorkspaceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreateWorkspace: (workspace: Workspace) => void;
}

const toSlug = (value: string, maxLength = 9) =>
  value
    .toLowerCase()
    .normalize("NFD")                 // remove accents
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")      // replace invalid chars with hyphen
    .replace(/^-+|-+$/g, "")          // trim hyphens
    .slice(0, maxLength);

export function CreateWorkspaceModal({
  open,
  onOpenChange,
  onCreateWorkspace,
}: CreateWorkspaceModalProps) {

  const {client} = useAuth();

  const form = useForm<WorkspaceFormData>({
    resolver: zodResolver(workspaceSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: WorkspaceFormData) =>  {

    const response = await client.post('/v1/workspaces',{
      name:data.name,
      slug:toSlug(data.name)
    })

    if(response.error){
      toast.error(response.error.msg || 'Somethign went wrong');
    }else{
      const newWorkspace:Workspace = response.data as Workspace
      toast.success("WorkSpace created succesfully");
      onCreateWorkspace(newWorkspace);
      form.reset();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
          <DialogDescription>
            Create a new workspace to organize your projects and team.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Workspace Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Workspace" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Create Workspace</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
