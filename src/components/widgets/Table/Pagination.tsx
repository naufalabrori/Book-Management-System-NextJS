import { Button } from "@/components/ui/button";
import { PaginationProps } from "./types";

export function DataTablePagination({
  currentPage,
  totalPages,
  total,
  page,
  limit,
  onPageChange,
}: PaginationProps) {
  // Helper function to generate page numbers with ellipsis
  const generatePageNumbers = () => {
    const maxPages = 5; // Limit number of pages to display

    if (totalPages <= maxPages) {
      // Show all pages if total pages <= maxPages
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      // Near the start: show first 4 pages and last page
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      // Near the end: show first page and last 4 pages
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    // In the middle: show first page, current page +/- 1, and last page
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  return (
    <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-2">
      <div className="text-xs text-muted-foreground font-semibold">
        Showing {page + 1} to {Math.min(page + limit, total)} of {total}{" "}
        entries
      </div>
      <div className="flex flex-wrap items-center gap-1">
        {/* Previous Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange("prev")}
          disabled={currentPage === 1}
        >
          Previous
        </Button>

        {/* Page Numbers */}
        {generatePageNumbers().map((page, index) =>
          typeof page === "number" ? (
            <Button
              key={page}
              className={
                page === currentPage
                  ? "bg-violet-500 font-medium hover:bg-violet-600"
                  : "bg-white hover:bg-slate-200 font-medium text-black"
              }
              size="sm"
              onClick={() => onPageChange((page - 1) * limit)}
            >
              {page}
            </Button>
          ) : (
            <Button
              key={`ellipsis-${index}`}
              variant="outline"
              size="sm"
              disabled
            >
              ...
            </Button>
          )
        )}

        {/* Next Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange("next")}
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}