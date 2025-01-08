"use client";
import { AppSidebar } from "@/components/widgets/Sidebar/AppSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Cookies from "universal-cookie";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AUTH_COOKIES_KEY } from "@/lib/constant";
import Link from "next/link";
import useMenuStore from "@/hooks/useMenuStore";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { logout } from "@/lib/auth";
import { LogOut } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const cookies = new Cookies();
  const router = useRouter();
  const pathname = usePathname();
  const isDashboardChild = pathname.includes("/administrator/");

  const [isAuth, setIsAuth] = useState<boolean>(false);
  const { menu } = useMenuStore();

  useEffect(() => {
    const token = cookies.get(AUTH_COOKIES_KEY);
    if (token) {
      setIsAuth(true);
    } else {
      logout();
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    isAuth && (
      <SidebarProvider>
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content */}
        <main className="flex flex-col flex-1 min-w-0">
          <SidebarInset>
            {/* Header */}
            <header className="flex sticky top-0 bg-white z-10 h-16 items-center gap-2 border-b px-4 justify-between">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      {isDashboardChild ? (
                        <Link href="/dashboard">
                          <BreadcrumbLink className="font-bold">
                            Dashboard
                          </BreadcrumbLink>
                        </Link>
                      ) : (
                        <BreadcrumbPage className="font-bold">
                          Dashboard
                        </BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {isDashboardChild ? (
                      <>
                        <BreadcrumbSeparator className="hidden md:block" />
                        <BreadcrumbItem>
                          <BreadcrumbPage className="font-bold">
                            {menu}
                          </BreadcrumbPage>
                        </BreadcrumbItem>
                      </>
                    ) : null}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              {/* Foto Bulat */}
              <div className="flex items-center">
                <Popover>
                  <PopoverTrigger>
                    <Image
                      src="/boy.png"
                      width={50}
                      height={50}
                      alt="User Avatar"
                      className="w-11 h-11 rounded-full border-2 border-gray-300 shadow-sm cursor-pointer"
                    />
                  </PopoverTrigger>
                  <PopoverContent>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-red-500 hover:text-red-600 text-sm"
                    >
                      <LogOut size={20} />
                      <span>Logout</span>
                    </button>
                  </PopoverContent>
                </Popover>
              </div>
            </header>

            {/* Content */}
            <div className="flex flex-1 flex-col gap-4 p-3 bg-gray-100">
              {children}
            </div>
          </SidebarInset>
        </main>
      </SidebarProvider>
    )
  );
}
