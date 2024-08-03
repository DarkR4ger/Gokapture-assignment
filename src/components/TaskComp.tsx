"use client";
import { TaskFullData } from "@/global/dbtypes";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { cn } from "@/lib/utils";
import EditTaskDialog from "./EditTask";
import ViewTaskDialog from "./ViewTaskDialog";
import DeleteTaskDialog from "./DeleteTask";

export default function TaskComp({ task }: { task: TaskFullData }) {
  return (
    <div className="w-full">
      <TaskCard task={task} />
    </div>
  );
}

export function TaskCard({ task }: { task: TaskFullData }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription className="capitalize">{task.user.username}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2 items-center">
        <div
          className={`${cn("border-2 p-1 rounded-xl px-2 capitalize", task.status === "todo" ? "text-purple-500 bg-purple-500/20" : task.status === "done" ? "text-green-500 bg-green-500/20" : "text-orange-500 bg-orange-500/20")}`}
        >
          {task.status}
        </div>
        <EditTaskDialog task={task} />
        <ViewTaskDialog task={task} />
        <DeleteTaskDialog task={task} />
      </CardContent>
      <CardFooter>
        </CardFooter>
    </Card>
  );
}
