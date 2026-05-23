import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { ChevronDown } from "lucide-react";
import { HEADER_NAV_ITEMS } from "@/config/constants/navigation.constant";
import { cn } from "@/lib/utils";
import { path } from "@/config/path";
import MegaMenu from "./MegaMenu";

function isNavItemActive(pathname, itemTo) {
  return (
    pathname === itemTo || (itemTo !== path.home && pathname.startsWith(itemTo))
  );
}

function HeaderNav({ pathname }) {
  return (
    <nav className="hidden h-full items-center gap-2 lg:flex">
      {HEADER_NAV_ITEMS.map((item) => (
        <div
          key={item.label}
          className="group relative flex h-full items-center"
        >
          <Link
            to={item.to}
            className={cn(
              "hover:text-primary flex h-full items-center gap-1.5 px-3 text-sm font-bold text-slate-700 transition-colors",
              isNavItemActive(pathname, item.to) && "text-primary",
            )}
          >
            {item.label}
            <ChevronDown className="size-4 transition-transform group-hover:rotate-180" />
          </Link>
          {/* <div className="invisible absolute right-1/2 bottom-[7px] translate-x-1/2 border-x-8 border-t-0 border-b-8 border-x-transparent border-b-white opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100" /> */}
          <MegaMenu menu={item.menu} />
        </div>
      ))}

      <Link
        to={path.aiPricing}
        className="hover:text-primary flex h-full items-center gap-1.5 px-3 text-sm font-bold text-slate-700"
      >
        TopCV
        <Badge className="rounded-full bg-amber-200 px-2 text-[10px] text-amber-900">
          Pro
        </Badge>
      </Link>
    </nav>
  );
}

export default HeaderNav;
