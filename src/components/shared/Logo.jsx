import { Link } from "react-router";
import { cn } from "@/lib/utils";
import { path } from "@/config/path";

function Logo({ isCollapsed }) {
  return (
    <div className="flex items-center gap-1 px-3 pb-2">
      <Link
        to={path.home}
        className={cn(
          "flex min-w-0 cursor-pointer items-center gap-3 rounded-lg p-1 transition-all duration-800 hover:scale-105",
          isCollapsed && "justify-center",
        )}
        title="Trang chủ"
      >
        <div className="bg-primary text-primary-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold">
          SRA
        </div>
      </Link>

      {!isCollapsed && (
        <div className="min-w-0 transition-all duration-500">
          <p className="text-sidebar-foreground truncate text-sm leading-tight font-bold">
            Smart Recruit
          </p>
          <p className="text-sidebar-foreground/50 text-[10px]">Assistant</p>
        </div>
      )}
    </div>
  );
}

export default Logo;
