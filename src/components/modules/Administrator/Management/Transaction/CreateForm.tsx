/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarIcon, Loader2, PlusIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateUpdateBook } from "@/hooks/services/Book/useCreateUpdateBook";
import { toast } from "react-toastify";
import { useListUser } from "@/hooks/services/User/useGetListUser";
import { useListBook } from "@/hooks/services/Book/useGetListBook";
import Autocomplete from "@/components/widgets/AutoComplete/AutoComplete";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { useCreateUpdateTransaction } from "@/hooks/services/Transaction/useCreateUpdateTransaction";
import DatePicker from "@/components/widgets/DatePicker/DatePicker";

const BookSchema = z.object({
  user_id: z.string({ required_error: "User is required" }),
  book_id: z.string({ required_error: "Book is required" }),
  borrowed_date: z.date({ required_error: "Borrowed Date is required" }),
  due_date: z.date({ required_error: "Due Date is required" }),
});

type BookFormValues = z.infer<typeof BookSchema>;

export function CreateTransactionForm() {
  const [form, setForm] = useState<Partial<BookFormValues>>({});
  const [errors, setErrors] = useState<
    Partial<Record<keyof BookFormValues, string>>
  >({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const { mutate, isPending } = useCreateUpdateTransaction();

  const handleSubmit = () => {
    const result = BookSchema.safeParse(form);

    if (!result.success) {
      const validationErrors = result.error.errors.reduce(
        (acc, error) => ({
          ...acc,
          [error.path[0]]: error.message,
        }),
        {}
      );
      setErrors(validationErrors);
    } else {
      const payload = {
        user_id: Number(form.user_id),
        book_id: Number(form.book_id),
        borrowed_date: form.borrowed_date,
        due_date: form.due_date,
        returned_date: null,
        status: "Borrowed",
      };

      mutate(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["get-list-transaction"],
          });
          toast("Transaction Created Successfully", { type: "success" });
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
      // Clear form and errors
      setForm({});
      setErrors({});
      setIsDialogOpen(false); // Close dialog after success
    }
  };

  const paramsUser: any = {
    limit: 1000,
    sort_by: "name",
    sort_order: "asc",
  };
  const { data: listUser } = useListUser(paramsUser);

  const paramsBook: any = {
    limit: 10000,
    sort_by: "title",
    sort_order: "asc",
  };
  const { data: listBook } = useListBook(paramsBook);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="mb-2 bg-violet-500 hover:bg-violet-600"
          onClick={() => {
            setIsDialogOpen(true);
            setForm({});
            setErrors({});
          }}
        >
          <PlusIcon />
          Create
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="mb-2">
          <DialogTitle>Create Transaction</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">User</div>
          <div className="col-span-3">
            <Autocomplete
              label="User"
              placeholder="Select User..."
              data={
                listUser?.data.map((item) => ({
                  value: [item.id?.toString(), item.name],
                  label: item.name,
                })) || []
              }
              selectedValue={form?.user_id}
              onSelect={(currentValue) => {
                setForm((prev) => ({
                  ...prev,
                  user_id: currentValue,
                }));
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  user_id: undefined,
                }));
              }}
            />
            {errors.user_id && (
              <p className="text-red-500 text-sm">{errors.user_id}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Book</div>
          <div className="col-span-3">
            <Autocomplete
              label="Book"
              placeholder="Select Book..."
              data={
                listBook?.data.map((item) => ({
                  value: [
                    item.id?.toString(),
                    item.title + " - " + item.author,
                  ],
                  label: item.title + " - " + item.author,
                })) || []
              }
              selectedValue={form?.book_id}
              onSelect={(currentValue) => {
                setForm((prev) => ({
                  ...prev,
                  book_id: currentValue,
                }));
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  book_id: undefined,
                }));
              }}
            />
            {errors.book_id && (
              <p className="text-red-500 text-sm">{errors.book_id}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Borrowed Date</div>
          <div className="col-span-3">
            <DatePicker
              value={form.borrowed_date}
              placeholder="Select Borrowed Date"
              onChange={(date) => {
                setForm((prev) => ({ ...prev, borrowed_date: date }));
                setErrors((prev) => ({ ...prev, borrowed_date: undefined }));
              }}
            />
            {errors.borrowed_date && (
              <p className="text-red-500 text-sm">{errors.borrowed_date}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Due Date</div>
          <div className="col-span-3">
            <DatePicker
              value={form.due_date}
              placeholder="Select Due Date"
              onChange={(date) => {
                setForm((prev) => ({ ...prev, due_date: date }));
                setErrors((prev) => ({ ...prev, due_date: undefined }));
              }}
            />
            {errors.due_date && (
              <p className="text-red-500 text-sm">{errors.due_date}</p>
            )}
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="destructive" disabled={isPending}>
              Close
            </Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="mb-2 sm:mb-0"
            disabled={isPending}
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Submit"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
