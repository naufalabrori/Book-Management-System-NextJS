/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarIcon, DollarSignIcon, Loader2, PlusIcon } from "lucide-react";

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
import { toast } from "react-toastify";
import Autocomplete from "@/components/widgets/AutoComplete/AutoComplete";
import DatePicker from "@/components/widgets/DatePicker/DatePicker";
import { useListTransaction } from "@/hooks/services/Transaction/useGetListTransaction";
import { formatDate } from "@/lib/functions";
import { useCreateUpdateFines } from "@/hooks/services/Fines/useCreateUpdateFines";

const FinesSchema = z.object({
  transaction_id: z.string({ required_error: "Transaction is required" }),
  amount: z.number({ required_error: "Amount is required" }),
  paid_date: z.date().optional(),
});

type FinesFormValues = z.infer<typeof FinesSchema>;

export function CreateFinesForm({
  isFinesPage = false,
  transaction_id = null,
}: {
  isFinesPage?: boolean;
  transaction_id?: any;
}) {
  const [form, setForm] = useState<Partial<FinesFormValues>>({});
  const [errors, setErrors] = useState<
    Partial<Record<keyof FinesFormValues, string>>
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

  const { mutate, isPending } = useCreateUpdateFines();

  const handleSubmit = () => {
    const validateObj = {
      transaction_id: isFinesPage ? Number(form.transaction_id) : transaction_id.toString(),
      amount: Number(form.amount),
      paid_date: new Date(form.paid_date?.toString() || ""),
    };
    const result = FinesSchema.safeParse(validateObj);
    console.log(result);
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
        transaction_id: isFinesPage ? Number(form.transaction_id) : transaction_id,
        amount: Number(form.amount),
        paid_date: form.paid_date,
      }

      mutate(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["get-list-fines"],
          });
          queryClient.invalidateQueries({
            queryKey: ["get-list-transaction"],
          });
          toast("Fines Created Successfully", { type: "success" });
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

      setForm({});
      setErrors({});
      setIsDialogOpen(false);
    }
  };

  const paramsTransaction: any = {
    limit: 1000,
    sort_by: "user_name",
    sort_order: "asc",
    search: "overdue",
  };
  const { data: listTransaction } = useListTransaction(paramsTransaction);

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {isFinesPage ? (
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
        ) : (
          <Button
            className="mb-2 bg-orange-500 hover:bg-orange-600"
            onClick={() => {
              setIsDialogOpen(true);
              setForm({});
              setErrors({});
            }}
          >
            <DollarSignIcon/>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="mb-2">
          <DialogTitle>Create Fines</DialogTitle>
        </DialogHeader>
        {isFinesPage && (
          <div className="grid grid-cols-5 gap-2">
            <div className="col-span-2">Transaction</div>
            <div className="col-span-3">
              <Autocomplete
                label="Transaction"
                placeholder="Select Transaction..."
                data={
                  listTransaction?.data.map((item) => ({
                    value: [item.id?.toString(), item.user_name],
                    label:
                      item.user_name +
                      " - " +
                      item.book_title +
                      " - " +
                      formatDate(item.borrowed_date),
                  })) || []
                }
                selectedValue={form?.transaction_id}
                onSelect={(currentValue) => {
                  setForm((prev) => ({
                    ...prev,
                    transaction_id: currentValue,
                  }));
                  setErrors((prevErrors) => ({
                    ...prevErrors,
                    transaction_id: undefined,
                  }));
                }}
              />
              {errors.transaction_id && (
                <p className="text-red-500 text-sm">{errors.transaction_id}</p>
              )}
            </div>
          </div>
        )}
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Amount</div>
          <div className="col-span-3">
            <Input
              placeholder="Insert Amount"
              type="text"
              name="amount"
              value={form.amount || ""}
              onChange={onChange}
              className="max-w-xs"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Paid Date</div>
          <div className="col-span-3">
            <DatePicker
              value={form.paid_date}
              placeholder="Select Paid Date"
              onChange={(date) => {
                setForm((prev) => ({ ...prev, paid_date: date }));
                setErrors((prev) => ({ ...prev, paid_date: undefined }));
              }}
            />
            {errors.paid_date && (
              <p className="text-red-500 text-sm">{errors.paid_date}</p>
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
