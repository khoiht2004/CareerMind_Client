/* eslint-disable no-unused-vars */
import { memo } from "react";
import { NavLink } from "react-router";
import { cn } from "@/lib/utils";

const navLinkClass = (isActive, isCollapsed) =>
  cn(
    "flex items-center rounded-lg text-sm font-medium transition-all duration-500 cursor-pointer",
    isCollapsed ? "justify-center px-0 py-2.5 w-full" : "gap-3 px-3 py-2.5",
    isActive
      ? "bg-sidebar-primary text-sidebar-primary-foreground"
      : "text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
  );

function NavItem({ to, end, icon: Icon, label, isCollapsed }) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) => navLinkClass(isActive, isCollapsed)}
      title={label}
    >
      <Icon className="size-4 shrink-0" />
      {!isCollapsed && label}
    </NavLink>
  );
}

export default memo(NavItem);
