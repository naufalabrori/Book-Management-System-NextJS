/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
  ColumnDef,
  useReactTable,
} from "@tanstack/react-table";

import { Table } from "@/components/ui/table";
import { DataTablePagination } from "@/components/widgets/Table/Pagination";
import { DataTableHeader } from "@/components/widgets/Table/TableHeader"; 
import { DataTableBody } from "@/components/widgets/Table/TableBody";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { NumberOfShowTable } from "@/lib/constant";
import { FinesColumns } from "./Columns";
import { PaginationParams } from "@/lib/types";
import { useTablePagination } from "@/hooks/useTablePagination"; 
import { useDebounce } from "use-debounce";
import { useListFines } from "@/hooks/services/Fines/useGetListFines";
import { Fines } from "@/hooks/services/Fines/type";

interface UseTableDataReturn<TData> {
  data: TData[];
  total: number;
  loading: boolean;
  error: Error | null;
}

function useTableData<TData>(
  sorting: SortingState,
  pagination: PaginationParams,
  search: string
): UseTableDataReturn<TData> {
  const [data, setData] = useState<TData[]>([]);
  const [total, setTotal] = useState(0);

  const sortField = sorting[0];
  const params: any = {
    ...pagination,
    sort_by: sortField?.id,
    sort_order: sortField?.desc ? "desc" : !sortField?.desc ? "asc" : "",
    search: search,
  };

  const {
    data: queryData,
    error,
    isLoading,
  } = useListFines(params);

  useEffect(() => {
    if (queryData) {
      setData(queryData.data as TData[]);
      setTotal(queryData.totalData);
    }
  }, [queryData]);

  return { data, total, loading: isLoading, error };
}

export function FinesDataTable() {
  const [totalData, setTotalData] = useState(0);
  const [limit, setLimit] = useState<string>("5");
  const [sorting, setSorting] = useState<SortingState>([{ id: "created_date", desc: true}]);
  const [filter, setFilter] = useState<string>("");
  const [debounceFilter] = useDebounce(filter, 1000);

  const { pagination, totalPages, currentPage, handlePageChange } =
    useTablePagination(totalData, Number(limit));

  const { data, total, loading, error } = useTableData<Fines>(
    sorting,
    pagination,
    debounceFilter
  );

  const columns: ColumnDef<any, Fines>[] =
    FinesColumns({
      currentPage,
      perPage: Number(limit),
    });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  useEffect(() => {
    setTotalData(total);
  }, [total]);

  const handleLimitChange = (value: string) => {
    setLimit(value);
    pagination.limit = Number(value);
    handlePageChange(0);
  };

  const handleFilterValueChange = (value: string) => {
    setFilter(value);
    handlePageChange(0);
  };

  return (
    <div className="space-y-2 w-full">
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
        <div className="flex gap-2">
          <Input
            placeholder="Search"
            value={filter}
            onChange={(event) => handleFilterValueChange(event.target.value)}
            className="max-w-xs"
          />
        </div>
        <div className="flex">
          <div className="mr-2 mt-2 text-sm">Show</div>
          <Select
            value={limit}
            onValueChange={(value) => handleLimitChange(value)}
          >
            <SelectTrigger className="w-16">
              <SelectValue placeholder="Select one" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {NumberOfShowTable.map((item) => (
                  <SelectItem key={item.label} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="mt-2 ml-2 text-sm">entries</div>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <DataTableHeader headerGroups={table.getHeaderGroups()} />
          <DataTableBody
            loading={loading}
            error={error}
            rows={table.getRowModel().rows}
            columnLength={columns.length}
          />
        </Table>
      </div>
      <DataTablePagination
        currentPage={currentPage}
        totalPages={totalPages}
        total={total}
        page={pagination.page}
        limit={pagination.limit}
        onPageChange={handlePageChange}
      />
    </div>
  );
}