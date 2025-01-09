/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TransactionExt } from "@/hooks/services/Transaction/type"; 
import { useMemo } from "react";
import { formatDate, formatDateTime } from "@/lib/functions";
import { Button } from "@/components/ui/button";
import { PenIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";

interface ColumnTransaction {
  currentPage: number;
  perPage: number;
}

export const TransactionColumns = ({ currentPage, perPage }: ColumnTransaction) => {
  const pathname = usePathname();
  const columns = useMemo<ColumnDef<any, TransactionExt>[]>(
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
        accessorKey: "status",
        header: () => "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          return (
            <Badge
              className={
                status === "Borrowed"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : status === "Returned"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-red-500 hover:bg-red-600"
              }
            >
              {status}
            </Badge>
          );
        }
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
            // code,
            // name,
            // isActive,
            // createdBy,
            // createdByName,
            // createdDate
          } = info.row.original;

          //   const masterData = {
          //     id,
          //     code,
          //     name,
          //     isActive,
          //     createdBy,
          //     createdByName,
          //     createdDate
          //   };
          return (
            <>
              <Link href={`${pathname}/${id}`}>
                <Button className="mr-1 bg-blue-500 hover:bg-blue-600 p-3">
                  <PenIcon />
                </Button>
              </Link>
            </>
          );
        },
      },
    ],
    [currentPage, perPage, pathname]
  );

  return columns;
};
