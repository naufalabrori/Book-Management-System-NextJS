/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from "@/hooks/services/User/type";
import { useChangePassword } from "@/hooks/services/User/useChangePassword";
import { useCreateUpdateUser } from "@/hooks/services/User/useCreateUpdateUser";
import { useGetUserById } from "@/hooks/services/User/useGetUserById";
import { useImageUpload } from "@/hooks/services/User/useImageUpload";
import { logout } from "@/lib/auth";
import { USER_COOKIES_KEY } from "@/lib/constant";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export function UserProfile({ id }: { id: number }) {
  const [form, setForm] = useState<User | null>(null);
  const { data } = useGetUserById(id);

  useEffect(() => {
    if (data?.success) {
      setForm(data.data);
    }
  }, [data]);

  const onChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const router = useRouter();

  const { mutate: updateUser, isPending: loadingAccount } =
    useCreateUpdateUser(id);
  const { mutate: changePassword, isPending: loadingPassword } =
    useChangePassword(id);
  const { mutate: uploadImage, isPending: loadingImage } = useImageUpload(id);

  const handleAccountChange = () => {
    updateUser(form, {
      onSuccess: (updateData) => {
        cookies.set(USER_COOKIES_KEY, updateData, {
          sameSite: "none",
          secure: true,
          path: "/",
        });
        toast("Profile Updated", { type: "success" });
        router.push("/administrator");
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
  };

  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");

  const handlePasswordChange = () => {
    if (newPassword !== confirmNewPassword) {
      toast("Password not match", { type: "error" });
    } else {
      const payload = {
        old_password: oldPassword,
        new_password: newPassword,
      };
      changePassword(payload, {
        onSuccess: () => {
          toast("Password Updated", { type: "success" });
          logout();
          router.push("/login");
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
    }
  };

  const [file, setFile] = useState<File>();
  const handleImageChange = () => {
    const payload = {
      file: file,
    };

    uploadImage(payload, {
      onSuccess: (updateData) => {
        cookies.set(USER_COOKIES_KEY, updateData, {
          sameSite: "none",
          secure: true,
          path: "/",
        });
        toast("Image Change Successfully", { type: "success" });
        router.push("/administrator");
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
  };

  return (
    <Tabs defaultValue="account" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Change Password</TabsTrigger>
        <TabsTrigger value="image">Photo Profile</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>
              Make changes to your account here. Click save when you&apos;re
              done.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                type="text"
                value={form?.name}
                onChange={onChange}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="name">Email</Label>
              <Input
                name="email"
                type="email"
                value={form?.email}
                onChange={onChange}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Phone Number</Label>
              <Input
                name="phone_number"
                type="text"
                value={form?.phone_number}
                onChange={onChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="bg-violet-500 hover:bg-violet-600"
              onClick={handleAccountChange}
              disabled={loadingAccount}
            >
              {loadingAccount ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Save changes"
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you&apos;ll be logged
              out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input
                id="current"
                type="password"
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input
                id="new"
                type="password"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Confirm New password</Label>
              <Input
                id="confirm"
                type="password"
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="bg-violet-500 hover:bg-violet-600"
              onClick={handlePasswordChange}
              disabled={loadingPassword}
            >
              {loadingPassword ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Save Password"
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="image">
        <Card>
          <CardHeader>
            <CardTitle>Photo Profile</CardTitle>
            <CardDescription>
              Make changes to your photo profile. Click save when you&apos; are
              choose you image upload.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Image
              src={
                data?.data?.image != ""
                  ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/images/${data?.data?.image}`
                  : "/boy.png"
              }
              width={50}
              height={50}
              alt=""
              className="w-32 h-32 rounded-full border-2 border-gray-300 shadow-sm cursor-pointer"
            />
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="picture">Photo Profile</Label>
              <Input
                name="image"
                type="file"
                onChange={(e) => setFile(e.target.files?.[0])}
                className="hover:cursor-pointer"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="bg-violet-500 hover:bg-violet-600"
              onClick={handleImageChange}
            >
              {loadingImage ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Save Image"
              )}
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
