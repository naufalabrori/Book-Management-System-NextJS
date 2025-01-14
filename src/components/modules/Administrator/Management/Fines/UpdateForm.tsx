/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader2, PenIcon } from "lucide-react";

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
import { ChangeEvent, useEffect, useState } from "react";
import { z } from "zod";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import Autocomplete from "@/components/widgets/AutoComplete/AutoComplete";
import DatePicker from "@/components/widgets/DatePicker/DatePicker";
import { useListTransaction } from "@/hooks/services/Transaction/useGetListTransaction";
import { formatDate } from "@/lib/functions";
import { useCreateUpdateFines } from "@/hooks/services/Fines/useCreateUpdateFines";
import { Fines } from "@/hooks/services/Fines/type";

const FinesSchema = z.object({
  transaction_id: z.string({ required_error: "Transaction is required" }),
  amount: z.number({ required_error: "Amount is required" }),
  paid_date: z.date().optional(),
});

type FinesFormValues = z.infer<typeof FinesSchema>;

export function UpdateFinesForm({ data }: { data: Fines }) {
  const [form, setForm] = useState<Partial<FinesFormValues>>({});
  const [errors, setErrors] = useState<
    Partial<Record<keyof FinesFormValues, string>>
  >({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    setForm(data);
  }, [data]);

  const queryClient = useQueryClient();

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const { mutate, isPending } = useCreateUpdateFines(data.id);

  const handleSubmit = () => {
    const validateObj = {
      transaction_id: String(form.transaction_id),
      amount: Number(form.amount),
      paid_date: new Date(form.paid_date?.toString() || ""),
    };
    const result = FinesSchema.safeParse(validateObj);

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
        transaction_id: Number(form.transaction_id),
        amount: Number(form.amount),
        paid_date: form.paid_date,
      };

      mutate(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["get-list-fines"],
          });
          toast("Fines Updated Successfully", { type: "success" });
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
        <Button
          className="mb-2 bg-yellow-500 hover:bg-yellow-600 mr-1"
          onClick={() => {
            setIsDialogOpen(true);
          }}
        >
          <PenIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="mb-2">
          <DialogTitle>Update Fines</DialogTitle>
        </DialogHeader>
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
              selectedValue={form?.transaction_id?.toString()}
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
              value={
                form.paid_date?.toString() == "0001-01-01T07:00:00+07:00"
                  ? undefined
                  : form.paid_date
              }
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
