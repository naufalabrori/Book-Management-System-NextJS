/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Fines } from "@/hooks/services/Fines/type";
import { useMemo } from "react";
import { formatDateTime } from "@/lib/functions";
import { Button } from "@/components/ui/button";
import { PenIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Badge } from "@/components/ui/badge";

interface ColumnFines {
  currentPage: number;
  perPage: number;
}

export const FinesColumns = ({ currentPage, perPage }: ColumnFines) => {
  const pathname = usePathname();
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
        accessorKey: "transaction_id",
        header: () => "Transaction ID",
      },
      {
        accessorKey: "amount",
        header: () => "Amount",
      },
      {
        accessorKey: "paid_date",
        header: () => "Paid Date",
        cell: ({ row }) =>
          row.getValue("paid_date") == "0001-01-01T07:00:00+07:00"
            ? "-"
            : formatDateTime(row.getValue("paid_date")),
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
