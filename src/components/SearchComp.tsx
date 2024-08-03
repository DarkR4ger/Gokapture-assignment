import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import TaskDialog from "./TaskDialog";
import { ChangeEvent, FormEvent, MouseEvent } from "react";
import { Button } from "./ui/button";
import { IFilterText } from "./Dashboard";

export default function SearchComp({
  id,
  searchText,
  handleSearch,
  handleFormSubmit,
  handleClearFilter,
}: {
  id: number;
  searchText: string;
  filters: IFilterText;
  handleSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFormSubmit: (e: FormEvent<HTMLFormElement>) => void;
  handleClearFilter: () => void;
}) {
  return (
    <div>
      <div className="grid gap-2">
        <Label className="text-md md:text-xl font-medium " htmlFor="movie">
          Search for Task
        </Label>
        <div className="flex md:flex-row w-full flex-col md:w-[50%] md:items-center gap-4">
          <div className="flex items-center justify-between w-full">
            <Input
              value={searchText}
              onChange={handleSearch}
              id="movie"
              type="search"
              placeholder="Search for movies..."
              className=""
            />
            <Search className="relative right-10 stroke-gray-400" />
          </div>
          <TaskDialog id={id} />
        </div>
      </div>
      <div className="grid gap-2 mt-5 w-full">
        <h2>Filters</h2>
        <form
          onSubmit={handleFormSubmit}
          className="flex md:flex-row flex-col md:items-center gap-4 w-full"
        >
          <div className="flex items-center gap-4">
            <Label htmlFor="status">Status</Label>
            <Select name="status">
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todo">Todo</SelectItem>
                <SelectItem value="in-progress">In-progress</SelectItem>
                <SelectItem value="done">Done</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-4">
            <Label htmlFor="priority">Priority</Label>
            <Input
              type="checkbox"
              id="priority"
              name="priority"
              className="size-5"
            />
          </div>
          <div className="flex items-center gap-4">
            <Label htmlFor="duedate">Duedate</Label>
            <Input type="date" id="duedate" name="duedate" />
          </div>
          <Button type="submit">Filter</Button>
          <Button type="button" onClick={handleClearFilter}>Clear Filter</Button>
        </form>
      </div>
    </div>
  );
}
