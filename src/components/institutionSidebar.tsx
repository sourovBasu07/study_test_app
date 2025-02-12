"use client";

import {
  BookOpen,
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
import { Group, ScrollArea } from "@mantine/core";
import classes from "./InstitutionSidebar.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";

// This is sample data.
const data = [
  {
    label: "Dashboard",
    link: "/institution/dashboard",
    icon: Home,
  },
  {
    label: "Teachers",
    link: "/institution/teachers",
    icon: BookUser,
  },
  {
    label: "Students",
    link: "/institution/students",
    icon: GraduationCap,
  },
  {
    label: "Class Routines",
    link: "/institution/class-routines",
    icon: AlarmClockCheck,
  },
  {
    label: "Exams",
    link: "/institution/exams",
    icon: NotebookPen,
  },
  {
    label: "Attendance",
    link: "/institution/attendance",
    icon: CalendarCheck,
  },
  {
    label: "Subjects",
    link: "/institution/subjects",
    icon: BookMarked,
  },
  {
    label: "Library",
    link: "/institution/library",
    icon: Library,
  },
  {
    label: "Class Books",
    link: "/institution/class-books",
    icon: BookOpen,
  },
  {
    label: "Notices",
    link: "#",
    icon: Megaphone,
  },
  {
    label: "Performances",
    link: "/institution/performances",
    icon: Crosshair,
  },
  {
    label: "Messages",
    link: "/institution/messages",
    icon: Mail,
  },
  {
    label: "Notifications",
    link: "/institution/notifications",
    icon: Bell,
  },
  {
    label: "Settings",
    link: "/institution/settings",
    icon: Settings,
  },
];

const InstitutionSidebar = () => {
  const pathname = usePathname();

  const links = data.map((item) => (
    <Link
      className={classes.link}
      data-active={pathname.startsWith(item.link) || undefined}
      href={item.link}
      key={item.label}
    >
      <item.icon size={16} className={classes.linkIcon} strokeWidth={1.5} />
      <span>{item.label}</span>
    </Link>
  ));

  return (
    <ScrollArea className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between">
          EDUCATIVE
        </Group>
        {links}
      </div>
    </ScrollArea>
  );
};

export default InstitutionSidebar;
