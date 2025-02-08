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
      url: "/institution/dashboard",
      icon: Home,
    },
    {
      title: "Teachers",
      url: "/institution/teachers",
      icon: BookUser,
    },
    {
      title: "Students",
      url: "/institution/students",
      icon: GraduationCap,
    },
    {
      title: "Class Routines",
      url: "/institution/class-routines",
      icon: AlarmClockCheck,
    },
    {
      title: "Exams",
      url: "/institution/exams",
      icon: NotebookPen,
    },
    {
      title: "Attendance",
      url: "/institution/attendance",
      icon: CalendarCheck,
    },
    {
      title: "Syllabuses",
      url: "/institution/syllabuses",
      icon: BookMarked,
    },
    {
      title: "Library",
      url: "/institution/library",
      icon: Library,
    },
    {
      title: "Class Books",
      url: "/institution/class-books",
      icon: BookOpen,
    },
    {
      title: "Notices",
      url: "#",
      icon: Megaphone,
    },
    {
      title: "Performances",
      url: "/institution/performances",
      icon: Crosshair,
    },
    {
      title: "Messages",
      url: "/institution/messages",
      icon: Mail,
    },
    {
      title: "Notifications",
      url: "/institution/notifications",
      icon: Bell,
    },
    {
      title: "Settings",
      url: "/institution/settings",
      icon: Settings2,
    },
  ],
};

const InstitutionSidebar = ({
  ...props
}: React.ComponentProps<typeof Sidebar>) => {
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
};

export default InstitutionSidebar;
