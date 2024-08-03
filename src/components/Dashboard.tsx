"use client";
import { TaskFullData, UserData } from "@/global/dbtypes";
import SearchComp from "./SearchComp";
import { useEffect, useState } from "react";
import TaskComp from "./TaskComp";
import LoaderSpinner from "./LoadingSpinner";

export default function Dashboard({ data }: { data: UserData }) {
  const { id } = data;
  const [task, setTask] = useState<null | TaskFullData[]>(null);
  const [isLoading, setIsLoading] = useState(false);
  const getUserData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/task/${id.toString()}`, {
        method: "GET",
      });
      const json = await res.json();
      const data: TaskFullData[] = json.body;
      setTask(data);
      setIsLoading(false);
    } catch (err) {
      console.log((err as Error).message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <div>
      <SearchComp id={id} />
      <div className="grid items-center mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {task?.length === 0 && <div>Add task to show here</div>}
        {!isLoading && task ? (
          task.map((t, index) => {
            return <TaskComp key={index} task={t} />;
          })
        ) : (
          <LoaderSpinner />
        )}
      </div>
    </div>
  );
}
