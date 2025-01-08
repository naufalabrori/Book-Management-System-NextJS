"use client";
import * as React from "react";
import {
  ChevronRight,
  LayoutDashboardIcon,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook, faFolderOpen, faClipboard } from '@fortawesome/free-solid-svg-icons'

const menus = [
  {
    title: "Dashboard",
    url: "/",
    icon: <LayoutDashboardIcon />,
  },
  {
    title: "Master Data",
    url: "masterdata",
    icon: <FontAwesomeIcon icon={faFolderOpen} size="xl" />,
    items: [
      {
        title: "User",
        url: "/masterdata/user",
      },
      {
        title: "Category",
        url: "/masterdata/Category",
      },
      {
        title: "Book",
        url: "/masterdata/book",
      },
    ],
  },
  {
    title: "Management",
    url: "management",
    icon: <FontAwesomeIcon icon={faBook} size="xl" />,
    items: [
      {
        title: "Transaction",
        url: "/management/transaction",
      },
      {
        title: "Fines",
        url: "/management/fines",
      },
    ],
  },
  {
    title: "Report",
    url: "report",
    icon: <FontAwesomeIcon icon={faClipboard} size="xl" />
  }
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader></SidebarHeader>
      <SidebarMenu>
        {menus.map((item) => {
          if (item.items && item.items.length > 0) {
            return (
              <Collapsible
                asChild
                key={item.title}
                title={item.title}
                defaultOpen={pathname.includes(item.url)}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.title}>
                      <div className="flex w-7">{item.icon}</div>
                      {item.title}
                      <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuButton
                            asChild
                            isActive={pathname.includes(subItem.url)}
                            className="pl-2"
                          >
                            <Link href={`/administrator${subItem.url}`}>
                              {subItem.title}
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            );
          }

          return (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                tooltip={item.title}
                isActive={pathname.includes(item.url) && item.url != "/"}
              >
                <div className="flex w-7">{item.icon}</div>
                <Link href={`/administrator/${item.url}`}>{item.title}</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        })}
      </SidebarMenu>

      <SidebarRail />
    </Sidebar>
  );
}
