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
    page: 1,
  });

  const totalPages = Math.ceil(total / pagination.limit);
  const currentPage = Math.floor(pagination.page / pagination.limit) + 1;

  const handlePageChange = (direction: "prev" | "next" | number) => {
    setPagination((prev) => {
      let newPage = prev.page;

      if (typeof direction === "number") {
        // Pergi ke halaman tertentu
        newPage = Math.max(1, Math.min(totalPages, direction));
      } else if (direction === "prev") {
        // Pergi ke halaman sebelumnya
        newPage = Math.max(1, prev.page - 1);
      } else if (direction === "next") {
        // Pergi ke halaman berikutnya
        newPage = Math.min(totalPages, prev.page + 1);
      }

      return {
        ...prev,
        page: newPage,
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