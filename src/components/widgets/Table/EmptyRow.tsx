import { TableCell, TableRow } from "@/components/ui/table";
import { FileX2 } from "lucide-react";

interface EmptyRowProps {
  colSpan: number;
}

export function EmptyRow({ colSpan }: EmptyRowProps) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="h-24">
        <div className="flex flex-col items-center justify-center text-muted-foreground">
          <FileX2 className="h-8 w-8 mb-2" />
          <span>No results found</span>
        </div>
      </TableCell>
    </TableRow>
  );
}
