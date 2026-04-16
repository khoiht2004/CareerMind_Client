import { useSelector } from "react-redux";
import { useSidebar } from "@/contexts/SidebarContext";
import NavItem from "./NavItem";
import ThemeToggle from "./ThemeToggle";
import { CANDIDATE_NAV_ITEMS } from "@/config/constants/candidate.constant";
import { RECRUITER_NAV_ITEMS } from "@/config/constants/recruiter.constant";
import Logo from "./Logo";

function AppSidebar() {
  const { user } = useSelector((state) => state.auth);
  const { isCollapsed } = useSidebar();

  const isRecruiter = user?.role === "RECRUITER";
  const navItems = isRecruiter ? RECRUITER_NAV_ITEMS : CANDIDATE_NAV_ITEMS;

  return (
    <div className="flex h-full flex-col pt-4 pb-2">
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

      {/* Theme toggle */}
      <ThemeToggle isCollapsed={isCollapsed} />
    </div>
  );
}

export default AppSidebar;
