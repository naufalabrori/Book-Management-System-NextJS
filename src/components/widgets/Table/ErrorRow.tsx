import { TableCell, TableRow } from "@/components/ui/table"
import { AlertCircle } from "lucide-react"

interface ErrorRowProps {
  colSpan: number
  error: Error
}

export function ErrorRow({ colSpan, error }: ErrorRowProps) {
  return (
    <TableRow>
      <TableCell
        colSpan={colSpan}
        className="h-24"
      >
        <div className="flex flex-col items-center justify-center text-destructive">
          <AlertCircle className="h-8 w-8 mb-2" />
          <span>Error loading data: {error.message}</span>
        </div>
      </TableCell>
    </TableRow>
  )
}