"use client";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { flexRender, Row } from "@tanstack/react-table";
import { LoadingRow } from "./LoadingRow";
import { EmptyRow } from "./EmptyRow";
import { ErrorRow } from "./ErrorRow";

interface DataTableBodyProps<TData> {
  loading: boolean;
  error: Error | null;
  rows: Row<TData>[];
  columnLength: number;
}

export function DataTableBody<TData>({
  loading,
  error,
  rows,
  columnLength,
}: DataTableBodyProps<TData>) {
  return (
    <TableBody>
      {loading ? (
        <LoadingRow colSpan={columnLength} />
      ) : error ? (
        <ErrorRow colSpan={columnLength} error={error} />
      ) : !rows.length ? (
        <EmptyRow colSpan={columnLength} />
      ) : (
        rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      )}
    </TableBody>
  );
}
