"use client";

import { ColumnDef } from "@tanstack/react-table";

import { TableHeader } from "./table-header";
import { LoanApplication, TableActions } from "./table-actions";
import { formatToLocalDate, getTimeFromTimestamp } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const statuses = [
  {
    value: "PENDING",
    label: "Pending",
  },
  {
    value: "VERIFIED",
    label: "Verified",
  },
  {
    value: "REJECTED",
    label: "Rejected",
  },
  {
    value: "APPROVED",
    label: "Approved",
  },
];

export const columns: ColumnDef<LoanApplication>[] = [
  {
    accessorKey: "fullName",
    header: ({ column }) => <TableHeader column={column} title="Name" />,
    cell: ({ row }) => {
      return (
        <div className="flex items-center  space-x-2 min-w-[150px]">
          <Avatar>
            <AvatarFallback>
              {row.getValue("fullName") === ""
                ? "U"
                : (row.getValue("fullName") as string)
                    .split(" ")
                    .map((item) => item[0])}
            </AvatarFallback>
          </Avatar>
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("fullName")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "reason",
    header: ({ column }) => <TableHeader column={column} title="Reason" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("reason")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <TableHeader column={column} title="Date" />,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col items-start gap-1">
          <span className="min-w-[100px] truncate font-medium">
            {formatToLocalDate(row.getValue("createdAt"))}
          </span>
          <span className="text-muted-foreground/50">
            {getTimeFromTimestamp(row.getValue("createdAt"))}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <TableHeader column={column} title="Action" />,
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div
          className={`flex w-[100px] items-center justify-center py-2 rounded-full text-lg ${
            status.value === "PENDING"
              ? "bg-[#FEC400] text-white"
              : status.value === "VERIFIED"
              ? "bg-[#29CC97] text-white"
              : status.value === "APPROVED"
              ? "bg-[#1829C7] text-white"
              : "bg-[#CC2929] text-white"
          }`}
        >
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <TableActions role="admin" row={row} />,
  },
];
