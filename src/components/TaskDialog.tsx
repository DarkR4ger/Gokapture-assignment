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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { ResponseJsonData } from "@/global/authtype";
import { Loader2 } from "lucide-react";
import { UserData } from "@/global/dbtypes";

export default function TaskDialog({ id }: { id: number }) {
  const [minDate, setMinDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState<UserData[] | null>(null);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const toastId = toast.loading("Adding task...");
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    console.log(formData);
    try {
      const res = await fetch("/api/task", {
        method: "POST",
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

  const getUserData = async () => {
    try {
      const res = await fetch("/api/user");
      const json = await res.json();
      const data: UserData[] = json.body;
      setUsers(data);
    } catch (err) {
      console.log((err as Error).message);
    }
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMinDate(today);
    getUserData();
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="self-start">
          Add Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:w-full md:max-w-[700px]">
        <form onSubmit={handleFormSubmit} className="grid items-center gap-y-4">
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
            <DialogDescription>Add a task to manage</DialogDescription>
          </DialogHeader>
          <div className="grid gap-y-2 items-center">
            <Label htmlFor="task-title">Task Title</Label>
            <Input
              id="task-title"
              type="text"
              name="taskTitle"
              placeholder="Enter the task title..."
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
              required
            />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="grid gap-y-2 items-center">
              <Label htmlFor="task-status">Select Status</Label>
              <Select name="taskStatus" defaultValue="todo" required>
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
                required
              />
            </div>
            <div className="grid gap-y-2 items-center">
              <Label htmlFor="priority">Priority</Label>
              <Input
                type="checkbox"
                id="priority"
                name="priority"
                className="size-5"
              />
            </div>
            <div className="grid gap-y-2 items-center">
              <Label htmlFor="task-user">Select Status</Label>
              <Select name="userId" required>
                <SelectTrigger className="" id="task-user">
                  <SelectValue placeholder="Select a user.." />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Users</SelectLabel>
                    {users &&
                      users.map((user, index) => {
                        return (
                          <div
                              key={index}
                            >
                            <SelectItem
                              value={user.id.toString()}
                                className="capitalize"
                            >{user.username}</SelectItem>
                          </div>
                        );
                      })}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
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
