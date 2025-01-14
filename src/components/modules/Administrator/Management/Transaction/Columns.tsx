/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { TransactionExt } from "@/hooks/services/Transaction/type";
import { useMemo } from "react";
import { formatDate, formatDateTime } from "@/lib/functions";
import { Badge } from "@/components/ui/badge";
import { DeleteTransactionAlert } from "./DeleteAlert";
import { UpdateTransactionForm } from "./UpdateForm";
import { CreateFinesForm } from "../Fines/CreateForm";
import { ReturnTransactionForm } from "./ReturnForm";

interface ColumnTransaction {
  currentPage: number;
  perPage: number;
}

export const TransactionColumns = ({
  currentPage,
  perPage,
}: ColumnTransaction) => {
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
        cell: ({ row }) =>
          row.getValue("returned_date") != "0001-01-01T07:00:00+07:00"
            ? formatDate(row.getValue("returned_date"))
            : "-",
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
            user_id,
            book_id,
            borrowed_date,
            due_date,
            returned_date,
            status,
            fines_paid_date,
          } = info.row.original;

          const masterData = {
            id,
            user_id,
            book_id,
            borrowed_date,
            due_date,
            returned_date,
            status,
            fines_paid_date,
          };
          return (
            <>
              <UpdateTransactionForm data={masterData} />
              <DeleteTransactionAlert id={id} />
              {status === "Borrowed" ? <ReturnTransactionForm id={id} /> : null}
              {status === "Overdue" && fines_paid_date == "" ? (
                <CreateFinesForm isFinesPage={false} transaction_id={id} />
              ) : null}
            </>
          );
        },
      },
    ],
    [currentPage, perPage]
  );

  return columns;
};
