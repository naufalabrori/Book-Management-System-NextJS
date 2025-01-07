import { useState } from "react";

interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortDirection?: "asc" | "desc";
};

interface UsePaginationReturn {
  pagination: PaginationParams;
  totalPages: number;
  currentPage: number;
  handlePageChange: (direction: "prev" | "next" | number) => void;
}

export function useTablePagination(
  total: number,
  initialLimit: number = 10
): UsePaginationReturn {
  const [pagination, setPagination] = useState<PaginationParams>({
    limit: initialLimit,
    page: 0,
  });

  const totalPages = Math.ceil(total / pagination.limit);
  const currentPage = Math.floor(pagination.page / pagination.limit) + 1;

  const handlePageChange = (direction: "prev" | "next" | number) => {
    setPagination((prev) => {
      if (typeof direction === "number") {
        return {
          ...prev,
          page: Math.max(0, direction),
        };
      }
  
      return {
        ...prev,
        page:
          direction === "prev"
            ? Math.max(0, prev.page - prev.limit)
            : prev.page + prev.limit,
      };
    });
  };
  

  return {
    pagination,
    totalPages,
    currentPage,
    handlePageChange,
  };
}