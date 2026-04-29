import { Link } from "react-router";
import { useSelector } from "react-redux";
import { PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UserMenu from "./UserMenu";
import { useSidebar } from "@/contexts/SidebarContext";
import { path } from "@/config/path";

function AuthButtons() {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className="h-9 cursor-pointer rounded-4xl"
        asChild
      >
        <Link to={`${path.auth}?tab=login`}>Đăng nhập</Link>
      </Button>
      <Button size="sm" className="h-9 cursor-pointer rounded-4xl" asChild>
        <Link to={`${path.auth}?tab=register`}>Đăng ký</Link>
      </Button>
    </div>
  );
}

function AppHeader() {
  const { isCollapsed, toggle } = useSidebar();
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="bg-sidebar-primary-foreground sticky top-2 z-10 mx-auto flex h-14 w-[98%] items-center justify-between rounded-4xl px-3 shadow-sm backdrop-blur">
      {/* Sidebar toggle */}
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggle}
            className="h-10 w-10 cursor-pointer"
          >
            <PanelLeft className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isCollapsed ? "Mở rộng sidebar" : "Thu gọn sidebar"}
        </TooltipContent>
      </Tooltip>

      {/* Right */}
      {user ? <UserMenu /> : <AuthButtons />}
    </header>
  );
}

export default AppHeader;
