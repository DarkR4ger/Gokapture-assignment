import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import moment from "moment";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { ResponseJsonData } from "@/global/authtype";
import { Loader2, Pencil } from "lucide-react";
import { TaskFullData } from "@/global/dbtypes";

export default function EditTaskDialog({ task }: { task: TaskFullData }) {
  const [minDate, setMinDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Updating task...");
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch(`/api/task/${task.id.toString()}`, {
        method: "PUT",
        body: formData,
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
    } catch (err) {
      console.log((err as Error).message);
      toast.error("please try again" as string, {
        id: toastId,
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Pencil className="size-4" /> <p>Edit</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-full md:max-w-[700px]">
        <form onSubmit={handleFormSubmit} className="grid items-center gap-y-4">
          <DialogHeader>
            <DialogTitle>Update Task</DialogTitle>
            <DialogDescription>update the task to manage</DialogDescription>
          </DialogHeader>
          <div className="grid gap-y-2 items-center">
            <Label htmlFor="task-title">Task Title</Label>
            <Input
              id="task-title"
              type="text"
              name="taskTitle"
              placeholder="Enter the task title..."
              defaultValue={task.title}
              required
            />
          </div>
          <div className="grid gap-y-2 items-center">
            <Label htmlFor="task-description">Task Description</Label>
            <Textarea
              placeholder="Enter task description"
              id="task-description"
              name="taskDescription"
              maxLength={300}
              defaultValue={task.description}
              required
            />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="grid gap-y-2 items-center">
              <Label htmlFor="task-status">Select Status</Label>
              <Select name="taskStatus" defaultValue={task.status} required>
                <SelectTrigger className="" id="movie-language">
                  <SelectValue placeholder="Select a status.." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="todo">Todo</SelectItem>
                    <SelectItem value="in-progress">In-progress</SelectItem>
                    <SelectItem value="done">Done</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-y-2 items-center">
              <Label htmlFor="due-date">Due Date</Label>
              <Input
                type="date"
                placeholder="Select due date..."
                id="due-date"
                name="dueDate"
                min={minDate}
                defaultValue={moment(task.dueDate).format("YYYY-MM-DD")}
                required
              />
            </div>
            <div className="grid gap-y-2 items-center">
              <Label htmlFor="priority">Priority</Label>
              <Input
                defaultChecked={task.priority}
                type="checkbox"
                id="priority"
                name="priority"
                className="size-5"
              />
            </div>
            <input type="hidden" value={task.userId} name="userId" />
          </div>
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
