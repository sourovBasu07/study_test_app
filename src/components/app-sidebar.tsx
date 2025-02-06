"use client";

import * as React from "react";
import {
  BookOpen,
  Settings2,
  Home,
  Settings,
  Library,
  Crosshair,
  Megaphone,
  GraduationCap,
  Bell,
  Mail,
  CalendarCheck,
  AlarmClockCheck,
  NotebookPen,
  BookMarked,
  BookUser,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: Home,
    },
    {
      title: "Teachers",
      url: "#",
      icon: BookUser,
    },
    {
      title: "Students",
      url: "#",
      icon: GraduationCap,
    },
    {
      title: "Class Routines",
      url: "#",
      icon: AlarmClockCheck,
    },
    {
      title: "Exams",
      url: "#",
      icon: NotebookPen,
    },
    {
      title: "Attendance",
      url: "#",
      icon: CalendarCheck,
    },
    {
      title: "Syllabuses",
      url: "#",
      icon: BookMarked,
    },
    {
      title: "Library",
      url: "#",
      icon: Library,
    },
    {
      title: "Class Books",
      url: "#",
      icon: BookOpen,
    },
    {
      title: "Notices",
      url: "#",
      icon: Megaphone,
    },
    {
      title: "Performances",
      url: "#",
      icon: Crosshair,
    },
    {
      title: "Messages",
      url: "#",
      icon: Mail,
    },
    {
      title: "Notifications",
      url: "#",
      icon: Bell,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <Settings className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-2xl">
                  Educative
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
