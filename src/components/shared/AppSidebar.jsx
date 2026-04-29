import { useSelector } from "react-redux";
import { useSidebar } from "@/contexts/SidebarContext";
import NavItem from "./NavItem";
import ThemeToggle from "./ThemeToggle";
import { CANDIDATE_NAV_ITEMS } from "@/config/constants/candidate.constant";
import { RECRUITER_NAV_ITEMS } from "@/config/constants/recruiter.constant";
import Logo from "./Logo";
import { path } from "@/config/path";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { Bot } from "lucide-react";

function AppSidebar() {
  const { user } = useSelector((state) => state.auth);
  const { isCollapsed } = useSidebar();

  const isRecruiter = user?.role === "RECRUITER";
  const navItems = isRecruiter ? RECRUITER_NAV_ITEMS : CANDIDATE_NAV_ITEMS;

  return (
    <div className="bg-sidebar-primary-foreground flex h-full flex-col pt-4 pb-2">
      {/* Logo */}
      <Logo isCollapsed={isCollapsed} />

      {/* Nav */}
      <nav className={`flex-1 pt-2 ${isCollapsed ? "px-1" : "px-2"}`}>
        <div className="space-y-0.5">
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} isCollapsed={isCollapsed} />
          ))}
        </div>
      </nav>

      <div className="mb-2 px-4">
        <Button
          size="icon"
          className="bg-secondary hover:bg-secondary/80 h-10 w-full rounded-xl text-white"
          asChild
        >
          <Link to={path.aiPricing}>
            <Bot className="h-5 w-5" />
            {!isCollapsed && <span className="ml-2">Upgrade to Pro</span>}
          </Link>
        </Button>
      </div>

      {/* Theme toggle */}
      <ThemeToggle isCollapsed={isCollapsed} />
    </div>
  );
}

export default AppSidebar;
