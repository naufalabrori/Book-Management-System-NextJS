/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader2, PlusIcon } from "lucide-react";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useListCategory } from "@/hooks/services/Category/useGetListCategory";
import YearPicker from "@/components/widgets/YearPicker/YearPicker";

const BookSchema = z.object({
  title: z.string({ required_error: "Title is required" }),
  author: z.string({ required_error: "Author is required" }),
  publisher: z.string({ required_error: "Publisher is required" }),
  published_year: z.string({ required_error: "Published Year is required" }),
  isbn: z.string({ required_error: "ISBN is required" }).max(13, {
    message: "ISBN max characters is 13 characters",
  }),
  category_id: z.number({ required_error: "Category Type is required" }),
  quantity: z.number({ required_error: "Quantity is required" }),
});

type BookFormValues = z.infer<typeof BookSchema>;

export function CreateBookForm() {
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

  const { mutate, isPending } = useCreateUpdateBook();

  const handleSubmit = () => {
    form.quantity = Number(form.quantity);
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
      mutate(form, {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["get-list-book"],
          });
          toast("Book Created Successfully", { type: "success" });
        },
        onError: (error: any) => {
          toast(
            error?.response?.data?.detail ||
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

  const params: any = {
    limit: 1000,
    sort_by: "category_name",
    sort_order: "asc",
  };

  const { data: listCategory } = useListCategory(params);

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
          <DialogTitle>Create Book</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Category</div>
          <div className="col-span-3">
            <Select
              onValueChange={(value) => {
                setForm((prev) => ({ ...prev, category_id: Number(value) }));
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  category_id: undefined,
                }));
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {listCategory &&
                    listCategory.data.map((item: any) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.category_name}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            {errors.category_id && (
              <p className="text-red-500 text-sm">{errors.category_id}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Title</div>
          <div className="col-span-3">
            <Input
              placeholder="Insert Title"
              type="text"
              name="title"
              value={form.title || ""}
              onChange={onChange}
              className="max-w-xs"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Author</div>
          <div className="col-span-3">
            <Input
              placeholder="Insert Author"
              type="text"
              name="author"
              value={form.author || ""}
              onChange={onChange}
              className="max-w-xs"
            />
            {errors.author && (
              <p className="text-red-500 text-sm">{errors.author}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Publisher</div>
          <div className="col-span-3">
            <Input
              placeholder="Insert Publisher"
              type="text"
              name="publisher"
              value={form.publisher || ""}
              onChange={onChange}
              className="max-w-xs"
            />
            {errors.publisher && (
              <p className="text-red-500 text-sm">{errors.publisher}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Published Year</div>
          <div className="col-span-3">
            <YearPicker
              isModal={true}
              value={Number(form.published_year)}
              startYear={1900}
              endYear={new Date().getFullYear()}
              onChange={(year) => {
                setForm((prev) => ({ ...prev, published_year: String(year) }));
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  published_year: undefined,
                }));
              }}
            />
            {errors.published_year && (
              <p className="text-red-500 text-sm">{errors.published_year}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">ISBN</div>
          <div className="col-span-3">
            <Input
              placeholder="Insert ISBN"
              type="text"
              name="isbn"
              value={form.isbn || ""}
              onChange={onChange}
              className="max-w-xs"
            />
            {errors.isbn && (
              <p className="text-red-500 text-sm">{errors.isbn}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
          <div className="col-span-2">Quantity</div>
          <div className="col-span-3">
            <Input
              placeholder="Insert Quantity"
              type="text"
              name="quantity"
              value={form.quantity || ""}
              onChange={onChange}
              className="max-w-xs"
            />
            {errors.quantity && (
              <p className="text-red-500 text-sm">{errors.quantity}</p>
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
