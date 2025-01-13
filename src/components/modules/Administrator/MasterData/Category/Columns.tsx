/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Category } from "@/hooks/services/Category/type"; 
import { useMemo } from "react";
import { formatDateTime } from "@/lib/functions";
import { UpdateCategoryForm } from "./UpdateForm";
import { DeleteCategoryAlert } from "./DeleteAlert";

interface ColumnCategory {
  currentPage: number;
  perPage: number;
}

export const CategoryColumns = ({ currentPage, perPage }: ColumnCategory) => {
  const columns = useMemo<ColumnDef<any, Category>[]>(
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
        accessorKey: "category_name",
        header: () => "Category Name",
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
            category_name,
          } = info.row.original;

            const masterData = {
              id,
              category_name
            };
          return (
            <>
              <UpdateCategoryForm data={masterData} />
              <DeleteCategoryAlert id={id} />
            </>
          );
        },
      },
    ],
    [currentPage, perPage]
  );

  return columns;
};
