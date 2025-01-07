/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender, HeaderGroup } from "@tanstack/react-table";
import { ArrowBigUp, ArrowBigDown } from "lucide-react";

interface DataTableHeaderProps<TData> {
  headerGroups: HeaderGroup<TData>[];
}

export function DataTableHeader<TData>({
  headerGroups,
}: DataTableHeaderProps<TData>) {
  return (
    <TableHeader className="rounded-t-lg">
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header, index) => (
            <TableHead
              key={header.id}
              className={`bg-violet-500 text-white font-semibold ${
                index === 0 ? "rounded-tl-md" : ""
              } ${
                index === headerGroup.headers.length - 1 ? "rounded-tr-md" : ""
              } overflow-hidden text-ellipsis whitespace-nowrap`}
            >
              {header.isPlaceholder ? null : header.id ==
                "actions" || header.id == "select" ? null : header.id == "numbers" ? (
                <div className="text-center">
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </div>
              ) : (
                <div
                  className="flex font-semibold bg-violet-500 hover:bg-violet-600 hover:cursor-pointer w-full h-full items-center"
                  onClick={() =>
                    header.column.toggleSorting(
                      header.column.getIsSorted() === "asc"
                    )
                  }
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                  {header.column.getIsSorted() === "asc" ? (
                    <ArrowBigDown className="ml-2" />
                  ) : header.column.getIsSorted() === "desc" ? (
                    <ArrowBigUp className="ml-2" />
                  ) : (
                    ""
                  )}
                </div>
              )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}