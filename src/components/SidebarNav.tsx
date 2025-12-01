"use client";

import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutDashboard, FileText, BarChart2, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export const SidebarNav: React.FC = () => {
  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: <LayoutDashboard className="h-4 w-4" />,
    },
    {
      title: "Rapports",
      href: "/reports",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      title: "Statistiques",
      href: "/statistics",
      icon: <BarChart2 className="h-4 w-4" />,
    },
    {
      title: "Sessions Actives",
      href: "/active-sessions",
      icon: <Clock className="h-4 w-4" />,
    },
    {
      title: "Admin Panel",
      href: "/admin",
      icon: <Users className="h-4 w-4" />,
    },
  ];

  return (
    <nav className="grid items-start gap-2 mt-8">
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:text-sidebar-primary",
              isActive && "bg-sidebar-accent text-sidebar-accent-foreground hover:text-sidebar-accent-foreground",
            )
          }
        >
          {item.icon}
          {item.title}
        </NavLink>
      ))}
    </nav>
  );
};