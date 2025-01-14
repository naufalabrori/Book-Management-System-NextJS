/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Fines } from "@/hooks/services/Fines/type";
import { useMemo } from "react";
import { formatDate, formatDateTime } from "@/lib/functions";
import { Badge } from "@/components/ui/badge";
import { DeleteFinesAlert } from "./DeleteAlert";
import { UpdateFinesForm } from "./UpdateForm";

interface ColumnFines {
  currentPage: number;
  perPage: number;
}

export const FinesColumns = ({ currentPage, perPage }: ColumnFines) => {
  const columns = useMemo<ColumnDef<any, Fines>[]>(
    () => [
      {
        id: "numbers",
        header: "No",
        cell: (info) => {
          return (
            <div className="text-center">
              {perPage * (currentPage - 1) + (info?.row.index + 1)}
            </div>
          );
        },
      },
      {
        accessorKey: "user_name",
        header: () => "Borrowed By",
      },
      {
        accessorKey: "user_email",
        header: () => "Borrower Email",
      },
      {
        accessorKey: "book_title",
        header: () => "Book Title",
      },
      {
        accessorKey: "borrowed_date",
        header: () => "Borrowed Date",
        cell: ({ row }) => formatDate(row.getValue("borrowed_date")),
      }, 
      {
        accessorKey: "due_date",
        header: () => "Due Date",
        cell: ({ row }) => formatDate(row.getValue("due_date")),
      },
      {
        accessorKey: "returned_date",
        header: () => "Returned Date",
        cell: ({ row }) => formatDate(row.getValue("returned_date")),
      },
      {
        accessorKey: "amount",
        header: () => "Fines Amount",
      },
      {
        accessorKey: "paid_date",
        header: () => "Paid Date",
        cell: ({ row }) =>
          row.getValue("paid_date") == "0001-01-01T07:00:00+07:00"
            ? "-"
            : formatDate(row.getValue("paid_date")),
      },
      {
        accessorKey: "Status",
        header: () => "Status",
        cell: ({ row }) => {
          const status =
            row.getValue("paid_date") == "0001-01-01T07:00:00+07:00"
              ? "Waiting"
              : "Paid";
          return (
            <Badge
              className={
                status === "Waiting"
                  ? "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-green-500 hover:bg-green-600"
              }
            >
              {status}
            </Badge>
          );
        },
      },
      {
        accessorKey: "created_date",
        header: () => "Created Date",
        cell: ({ row }) => formatDateTime(row.getValue("created_date")),
      },
      {
        accessorKey: "modified_date",
        header: () => "Modified Date",
        cell: ({ row }) => formatDateTime(row.getValue("modified_date")),
      },
      {
        id: "actions",
        header: "Action",
        cell: (info) => {
          const {
            id,
            transaction_id,
            amount,
            paid_date,
            created_date,
            modified_date,
          } = info.row.original;

          const masterData = {
            id,
            transaction_id,
            amount,
            paid_date,
            created_date,
            modified_date,
          };
          return (
            <>
              <UpdateFinesForm data={masterData} />
              <DeleteFinesAlert id={id} />
            </>
          );
        },
      },
    ],
    [currentPage, perPage]
  );

  return columns;
};
