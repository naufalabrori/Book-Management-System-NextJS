/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Book } from "@/hooks/services/Book/type"; 
import { useMemo } from "react";
import { formatDateTime } from "@/lib/functions";
import { Button } from "@/components/ui/button";
import { PenIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ColumnBook {
  currentPage: number;
  perPage: number;
}

export const BookColumns = ({ currentPage, perPage }: ColumnBook) => {
  const pathname = usePathname();
  const columns = useMemo<ColumnDef<any, Book>[]>(
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
        accessorKey: "title",
        header: () => "Title",
      },
      {
        accessorKey: "author",
        header: () => "Author",
      },
      {
        accessorKey: "publisher",
        header: () => "Publisher",
      },
      {
        accessorKey: "published_year",
        header: () => "Published Year",
      },
      {
        accessorKey: "isbn",
        header: () => "ISBN",
      },
      {
        accessorKey: "quantity",
        header: () => "Quantity",
      },
      {
        accessorKey: "available_quantity",
        header: () => "Available Quantity",
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
