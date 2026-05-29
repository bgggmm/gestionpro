import {
  LayoutDashboard,
  ClipboardList,
  User,
} from "lucide-react";

export const sidebarLinks = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tareas",
    href: "/dashboard/tasks",
    icon: ClipboardList,
  },
  {
    title: "Perfil",
    href: "/dashboard/profile",
    icon: User,
  },
];