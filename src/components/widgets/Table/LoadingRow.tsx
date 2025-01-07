import { TableCell, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

interface LoadingRowProps {
  colSpan: number
}

export function LoadingRow({ colSpan }: LoadingRowProps) {
  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        className="h-24"
      >
        <div className="flex items-center justify-center">
          <Skeleton className="h-4 w-[250px]" />
        </div>
      </TableCell>
    </TableRow>
  )
}