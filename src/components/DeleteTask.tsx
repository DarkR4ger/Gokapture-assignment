import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TaskFullData } from "@/global/dbtypes";
import { Loader2, Trash2 } from "lucide-react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { ResponseJsonData } from "@/global/authtype";
import { useRouter } from "next/navigation";

export default function DeleteTaskDialog({ task }: { task: TaskFullData }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter()
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Deleting task...");
    setIsLoading(true);
    try {
      const res = await fetch(`/api/task/${task.id.toString()}`, {
        method: "DELETE",
      });
      const data: ResponseJsonData = await res.json();
      if (data.success) {
        toast.success(data.message, {
          id: toastId,
        });
      } else {
        toast.error(data.message, {
          id: toastId,
        });
      }
      setIsLoading(false);
      router.refresh()
    } catch (err) {
      console.log((err as Error).message);
      toast.error("please try again" as string, {
        id: toastId,
      });
      setIsLoading(false);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="ml-1">
          <Trash2 className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-full md:max-w-[700px]">
        <form onSubmit={handleFormSubmit} className="grid items-center gap-y-4">
          <DialogHeader>
            <DialogTitle>Delete</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Are you sure want to delete this task?
          </DialogDescription>
          <DialogFooter>
            <Button
              className="flex items-center gap-x-4"
              disabled={isLoading}
              type="submit"
            >
              Save changes
              {isLoading && (
                <span className="animate-spin inline-flex">
                  <Loader2 />
                </span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
