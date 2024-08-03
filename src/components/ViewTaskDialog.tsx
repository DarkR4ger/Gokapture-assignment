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
import { Eye } from "lucide-react";

export default function ViewTaskDialog({ task }: { task: TaskFullData }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Eye /> <p>View</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-full md:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{task.title}</DialogTitle>
            <DialogDescription>update the task to manage</DialogDescription>
          </DialogHeader>
          <div>{task.description}</div>
          <DialogFooter>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
