/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useReturnTransaction } from "@/hooks/services/Transaction/useReturnTransaction";
import { useQueryClient } from "@tanstack/react-query";
import { BookCopyIcon, Trash2Icon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export function ReturnTransactionForm({ id }: { id: string }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Control dialog visibility
  const queryClient = useQueryClient();

  const { mutate, isPending} = useReturnTransaction();
  
    const handleSubmit = () => {
      mutate(id, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["get-list-transaction"],
          });
          toast("Transaction Returned", { type: "info" });
        },
        onError: (error: any) => {
          toast(
            error?.response?.data?.message ||
              "Terjadi kesalahan, silakan coba beberapa saat lagi.",
            {
              type: "error",
            }
          );

        },
      });
      setIsDialogOpen(false);
    };

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button className="mb-2 mr-1 bg-blue-500 hover:bg-blue-600">
          <BookCopyIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Return Book Transaction</AlertDialogTitle>
          <AlertDialogDescription>
            This book will be returned. Are you sure?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-blue-500 hover:bg-blue-600" onClick={handleSubmit}>Return</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}