"use client";

import { useEffect, useState } from "react";
import { Search, Plus, SortAsc, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";

import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "../ui/label";
export type Task = {
  id: string;
  dateOfExpiration: string;
  status: string;
  priority: string;
  title: string;
  content: string;
};

export default function TaskManager() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    // Fetch tasks when the component mounts
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/get-task");
        setTasks(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortByStatus = () => {
    const order: Record<'done' | 'pending' | 'expired', number> = {
      done: 0,
      pending: 1,
      expired: 2,
    };
  
    const sortedTasks = [...tasks].sort((a, b) => {
      return order[a.status as keyof typeof order] - order[b.status as keyof typeof order];
    });
  
    setTasks(sortedTasks);
  };
  
  const sortByPriority = () => {
    const order: Record<'low' | 'medium' | 'high', number> = {
      low: 0,
      medium: 1,
      high: 2,
    };
  
    const sortedTasks = [...tasks].sort((a, b) => {
      return order[b.priority as keyof typeof order] - order[a.priority as keyof typeof order];
    });
  
    setTasks(sortedTasks);
  };
  
  const handleSaveTask = async (taskId: string,originalTask: Task) => {

    
    const updates: Partial<Task> = {};

   
    if (title && title !== originalTask.title) updates.title = title;
    if (content && content !== originalTask.content) updates.content = content;
    if (date && date !== originalTask.dateOfExpiration) updates.dateOfExpiration = date;
    if (priority && priority !== originalTask.priority) updates.priority = priority;
    if (status && status !== originalTask.status) updates.status = status;
  

    if (Object.keys(updates).length === 0) {
      console.log("No fields were updated.");
      return;
    }
    console.log(taskId)
  
    try {
      
      const response = await axios.patch('/api/update-task', {
        id:taskId,
        ...updates,
      });
      console.log("Task updated successfully:", response.data);
    } catch (error) {
      console.error("Failed to update task:", error);
    }
  
  };

  const handleDeleteTask = async (taskId: string) => {
    const response = await axios.delete('/api/delete-task',{
      data: {
        id:taskId
      }
    })
  };

  const handleAddTask = async () => {
    console.log(date)
    const response = await axios.post('/api/add-task', {
      title,
      content,
      dateOfExpiration:date,
      priority,
      status,
    });
    

    if(response.status === 200) {
      console.log('Task added successfully');
      setTasks([...tasks, response.data]);
      setTitle('');
      setContent('');
      setDate('');
      setPriority('');
      setStatus('');
    } else{
      console.error('Failed to add task');
    }

  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading tasks...</div>;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Welcome to Task Manager
      </h1>

      <div className="flex flex-wrap gap-4 items-center justify-between">
        <div className="relative flex-grow max-w-sm">
          <Input
            type="text"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10"
          />
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button >
                <Plus className="mr-2 h-4 w-4" /> Add Task
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add a new task</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="title" className="text-right">
                    Title
                  </label>
                  <Input
                    id="title"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="dateOfExpiration" className="text-right">
                    Expiry Date
                  </label>
                  <Input
                    id="dateOfExpiration"
                    name="dateOfExpiration"
                    type="date"
                    onChange={(e) => setDate(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="status" className="text-right">
                    Status
                  </label>
                  <Select onValueChange={(e) => setStatus(e)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                      <SelectItem value="expired">Expired</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="priority" className="text-right">
                    Priority
                  </Label>
                  <Select onValueChange={(e) => setPriority(e)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="content" className="text-right">
                    Content
                  </label>
                  <Textarea
                    id="content"
                    name="content"
                    onChange={(e) => setContent(e.target.value)}
                    className="col-span-3"
                    rows={4}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddTask}>Add task</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" onClick={sortByStatus}>
            <SortAsc className="mr-2 h-4 w-4" /> Sort by Status
          </Button>
          <Button variant="outline" onClick={sortByPriority}>
            <SortAsc className="mr-2 h-4 w-4" /> Sort by Priority
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="font-semibold">Expiry Date</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Priority</TableHead>
              <TableHead className="font-semibold">Title</TableHead>
              <TableHead className="font-semibold">Content</TableHead>
              <TableHead className="font-semibold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTasks.map((task) => (
              <TableRow key={task.id} className="hover:bg-gray-50">
                <TableCell>{task.dateOfExpiration}</TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${
                      task.status === "expired"
                        ? "bg-red-100 text-red-800"
                        : task.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {task.status}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${
                      task.priority === "high"
                        ? "bg-red-100 text-red-800"
                        : task.priority === "medium"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {task.priority}
                  </span>
                </TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>
                  <div
                    className="max-w-xs overflow-hidden text-ellipsis whitespace-nowrap"
                    title={task.content}
                  >
                    {task.content}
                  </div>
                </TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost">
                        <Eye className="mr-2 h-4 w-4" /> View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>{task.title}</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="title" className="text-right">
                            Title
                          </label>
                          <Input
                            id="title"
                            name="title"
                            defaultValue={task.title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="dateOfExpiration" className="text-right">
                            Expiry Date
                          </label>
                          <Input
                            id="dateOfExpiration"
                            name="dateOfExpiration"
                            type="date"
                            defaultValue={task.dateOfExpiration}
                            onChange={(e) => setDate(e.target.value)}
                            className="col-span-3"
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="status" className="text-right">
                            Status
                          </label>
                          <Select onValueChange={(e) => setStatus(e)}>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="done">Done</SelectItem>
                              <SelectItem value="expired">Expired</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="priority" className="text-right">
                            Priority
                          </label>
                          <Select onValueChange={(e) => setPriority(e)}>
                            <SelectTrigger className="col-span-3">
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="high">High</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <label htmlFor="content" className="text-right">
                            Content
                          </label>
                          <Textarea
                            id="content"
                            name="content"
                            defaultValue={task.content}
                            onChange={(e) => setContent(e.target.value)}
                            className="col-span-3"
                            rows={4}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="destructive"
                          onClick={() => handleDeleteTask(task.id)}
                        >
                          Delete
                        </Button>
                        <Button onClick={() => handleSaveTask(task.id,task)}>
                          Save changes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
