import React from "react";
import { Separator } from "./ui/separator";
import { CalendarArrowUp, Clock8 } from "lucide-react";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const TaskList = () => {
  return (
    <div className="my-7 mx-4">
      <div className="flex flex-col space-y-4">
        <div className="text-3xl font-bold text-gray-700 capitalize text-center">
          Task manager
        </div>
        <div className="text-center text-gray-500 text-xs">
          A power task manager app to manage and track your tasks so that you
          can start working efficeintly
        </div>
      </div>
      <Separator className="my-8 border-2 border-gray-700" />
      <div className="my-7 ">
        <div className="flex items-center w-full justify-around">
          <DropdownMenu>
            <DropdownMenuTrigger>
              {" "}
              <div className="flex items-center gap-x-4 px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-all">
                Sort by Priority
                <Clock8 />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>High</DropdownMenuItem>
              <DropdownMenuItem>Medium</DropdownMenuItem>
              <DropdownMenuItem>Low</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <div className="w-3/5">
            <Input type="text" placeholder="Search by title here" />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              {" "}
              <div className="flex items-center gap-x-4 px-4 py-2 cursor-pointer hover:bg-gray-100 rounded-lg transition-all">
                Sort by Status
                <CalendarArrowUp />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Pending</DropdownMenuItem>
              <DropdownMenuItem>Done</DropdownMenuItem>
              <DropdownMenuItem>Expired</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
