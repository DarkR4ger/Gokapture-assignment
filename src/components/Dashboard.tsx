"use client";
import { TaskFullData, UserData } from "@/global/dbtypes";
import SearchComp from "./SearchComp";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";
import TaskComp from "./TaskComp";
import LoaderSpinner from "./LoadingSpinner";
import { Button } from "./ui/button";

export interface IFilterText {
  status: string;
  priority: boolean;
  duedate: string;
}

const ITEMS_PER_PAGE = 5

export default function Dashboard({ data }: { data: UserData }) {
  const { id } = data;
  const [task, setTask] = useState<null | TaskFullData[]>(null);
  const [filteredtask, setFilteredTask] = useState<undefined | TaskFullData[]>(
    undefined,
  );
  const [searchText, setSearchText] = useState("");
  const [filters, setFilter] = useState<IFilterText>({
    status: '',
    priority: false,
    duedate: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    let status = formData.get("status") as string;
    let duedate = formData.get("duedate") as string;
    if (formData.has("priority")) {
      setFilter({
        status: status,
        duedate: duedate,
        priority: true,
      });
    } else {
      setFilter({
        status: status,
        duedate: duedate,
        priority: false,
      });
    }
  };

  const handleClearFilter = () => {
    console.log(filters)
    setFilter({
      status: "",
      priority: false,
      duedate: "",
    });
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    if (task) {
      let filteredData = task;

      if (searchText) {
        filteredData = filteredData.filter((task) =>
          task.title.toLowerCase().includes(searchText.toLowerCase()),
        );
      }

      if (filters) {
        if (filters.status.length != 0) {
          filteredData = filteredData.filter(
            (task) => task.status === filters.status,
          );
        }
        if (filters.priority) {
          filteredData = filteredData.filter((task) => task.priority);
        }
        if (filters.duedate.length != 0) {
          filteredData = filteredData.filter(
            (task) => task.dueDate === filters.duedate,
          );
        }
      }

      setFilteredTask(filteredData);
      setCurrentPage(1)
    }
  }, [task, searchText, filters]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTasks = filteredtask?.slice(startIndex, startIndex + ITEMS_PER_PAGE) || [];

  const totalPages = Math.ceil((filteredtask?.length || 0) / ITEMS_PER_PAGE);


  return (
    <div>
      <SearchComp
        id={id}
        filters={filters}
        searchText={searchText}
        handleSearch={handleSearch}
        handleFormSubmit={handleFormSubmit}
        handleClearFilter={handleClearFilter}
      />
      <div className="grid items-center mt-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {task?.length === 0 && <div>Add task to show here</div>}
        {!isLoading && paginatedTasks ? (
          paginatedTasks.map((t, index) => {
            return <TaskComp key={index} task={t} />;
          })
        ) : (
          <LoaderSpinner />
        )}
      </div>
       <div className="mt-5 flex gap-4 items-center justify-center">
        <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Previous
        </Button>
        <div className="px-2 py-1 rounded-md bg-black text-white">
          {currentPage} of {totalPages}
        </div>
        <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
}
