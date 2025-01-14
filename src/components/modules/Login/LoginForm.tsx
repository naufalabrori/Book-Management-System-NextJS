/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useLoginUser } from "@/hooks/services/User/userLoginUser";
import { z } from "zod";
import { setLoginData } from "@/lib/auth";

const userLoginScheme = z.object({
  email: z.string({ required_error: "Email is required" }),
  password: z.string({ required_error: "Password is required" }),
});

type UserLoginFormValues = z.infer<typeof userLoginScheme>;

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [form, setForm] = useState<Partial<UserLoginFormValues>>({});
  const [errors, setErrors] = useState<
    Partial<Record<keyof UserLoginFormValues, string>>
  >({});

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const router = useRouter();

  const { mutate: loginUser, isPending } = useLoginUser();

  const handleLogin = () => {
    const result = userLoginScheme.safeParse(form);

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
      loginUser(result.data, {
        onSuccess: (res) => {
          toast.success("Login successful");
          setLoginData(res.user, res.token);
          router.push("/administrator");
        },
        onError: (error: any) => {
          toast.error(
            error?.response?.data?.message ||
              "Terjadi kesalahan, silakan coba beberapa saat lagi."
          );
        },
      });
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-blue-500 text-center">
            Login
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label>Email</Label>
                <Input type="text" name="email" required onChange={onChange} />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="relative flex items-center">
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    onChange={onChange}
                  />
                  <button
                    type="button"
                    className="absolute right-2 text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                </div>

                <div>
                  {errors.password && (
                    <p className="text-red-500 text-sm">{errors.password}</p>
                  )}
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600"
                onClick={handleLogin}
                disabled={isPending}
              >
                {isPending ? <Loader2 className="animate-spin" /> : "Login"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <a href="#" className="underline underline-offset-4">
                Sign up
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
