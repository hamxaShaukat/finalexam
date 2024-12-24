import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const TableComponent = () => {
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      content:
        "Hello this is a content just a faulty text to make sure everything is working fine or not etc etc etc etc ",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      content:
        "Hello this is a content just a faulty text to make sure everything is working fine or not etc etc etc etc ",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      content:
        "Hello this is a content just a faulty text to make sure everything is working fine or not etc etc etc etc ",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      content:
        "Hello this is a content just a faulty text to make sure everything is working fine or not etc etc etc etc ",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      content:
        "Hello this is a content just a faulty text to make sure everything is working fine or not etc etc etc etc ",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      content:
        "Hello this is a content just a faulty text to make sure everything is working fine or not etc etc etc etc Hello this is a content just a faulty text to make sure everything is working fine or not etc etc etc etc Hello this is a content just a faulty text to make sure everything is working fine or not etc etc etc etc ",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      content:
        "Hello this is a content just a faulty text to make sure everything is working fine or not etc etc etc etc ",
      paymentMethod: "Credit Card",
    },
  ];
  return (
    <div className="px-10">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] truncate">Date of expire</TableHead>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead className="w-[100px]">priority</TableHead>
            <TableHead className="">Content</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice} className="border">
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.paymentStatus}</TableCell>
              <TableCell>{invoice.paymentMethod}</TableCell>
              <TableCell>{invoice.content}</TableCell>
              <Dialog>
                <TableCell className="flex items-center justify-center border-l cursor-pointer">
                  <DialogTrigger>
                    {" "}
                    <div className="text-center">
                      <Pencil />
                    </div>
                  </DialogTrigger>
                </TableCell>
                <DialogContent className="sm:max-w-[50%] max-h-full overflow-auto">
                  <form>
                    <DialogHeader>
                      <DialogTitle>Edit or delete here</DialogTitle>
                      <DialogDescription>
                       Edit or delete your task here
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="title" className="text-right">
                          Title
                        </Label>
                        <Input
                          id="title"
                          className="col-span-3 w-full"
                          placeholder="Title...."
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="bio" className="text-right">
                          Content
                        </Label>
                        <Input
                          id="bio"
                          className="col-span-3"
                          placeholder="Content....."
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="desc" className="text-right">
                          Description
                        </Label>
                        <input
                          id="desc"
                          className="col-span-3 border p-2 rounded-sm"
                          type="date"
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="priority" className="text-right">
                          Select priority
                        </Label>
                        <Select>
                          <SelectTrigger className="w-full col-span-3">
                            <SelectValue placeholder="Select Priority" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Priorities</SelectLabel>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="category" className="text-right">
                          Select Status
                        </Label>
                        <Select>
                          <SelectTrigger className="w-full col-span-3">
                            <SelectValue placeholder="Select Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Status</SelectLabel>
                              <SelectItem value="high">Pending</SelectItem>
                              <SelectItem value="low">Expired</SelectItem>
                              <SelectItem value="medium">Done</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </form>

                  <DialogFooter className="flex items-center justify-evenly">
                    <Button className="bg-red-500 hover:bg-red-700 text-white font-semibold">
                      Delete
                    </Button>
                    <Button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold">
                      Save
                    </Button>
                    <Button className=" bg-white border hover:bg-gray-100 text-gray-800 font-semibold">
                      Cancel
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableComponent;
