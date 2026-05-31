import { useState } from "react";
import { Link } from "react-router";
import { ChevronDown, Menu } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HEADER_NAV_ITEMS } from "@/config/constants/navigation.constant";
import { path } from "@/config/path";
import { cn } from "@/lib/utils";

function isItemActive(pathname, itemTo) {
  return (
    pathname === itemTo || (itemTo !== path.home && pathname.startsWith(itemTo))
  );
}

function HeaderMobileMenu({ pathname, user }) {
  const activeItem = HEADER_NAV_ITEMS.find((item) =>
    isItemActive(pathname, item.to),
  );
  const [openLabel, setOpenLabel] = useState(activeItem?.label ?? "");

  const toggleMenu = (label) => {
    setOpenLabel((current) => (current === label ? "" : label));
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="max-[1023px]:inline-flex lg:hidden"
          aria-label="Mở menu"
        >
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[min(86vw,340px)] overflow-y-auto p-0"
      >
        <SheetHeader className="border-border border-b p-4">
          <SheetTitle className="text-left">
            <span className="text-foreground font-black">Career</span>
            <span className="text-primary font-black">Mind</span>
          </SheetTitle>
        </SheetHeader>

        <nav className="space-y-4 p-4">
          <div className="space-y-2">
            {HEADER_NAV_ITEMS.map((item) => {
              const isActive = isItemActive(pathname, item.to);
              const isOpen = openLabel === item.label;

              return (
                <div key={item.label} className="rounded-lg border">
                  <button
                    type="button"
                    className={cn(
                      "hover:bg-muted flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-bold transition-colors",
                      isOpen && "rounded-b-none",
                      isActive ? "text-primary" : "text-foreground",
                    )}
                    onClick={() => toggleMenu(item.label)}
                  >
                    {item.label}
                    <ChevronDown
                      className={cn(
                        "size-4 transition-transform",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>

                  {isOpen ? (
                    <div className="border-border space-y-3 border-t px-3 py-3">
                      <SheetClose asChild>
                        <Link
                          to={item.to}
                          className="hover:bg-muted text-primary flex items-center rounded-md px-2 py-2 text-sm font-semibold transition-colors"
                        >
                          Xem tất cả
                        </Link>
                      </SheetClose>

                      {item.menu?.columns?.map((column) => (
                        <div key={column.title} className="space-y-1.5">
                          <p className="text-muted-foreground text-xs font-bold uppercase">
                            {column.title}
                          </p>
                          <div className="space-y-1">
                            {column.items.slice(0, 4).map((menuItem) => {
                              const Icon = menuItem.icon;

                              return (
                                <SheetClose key={menuItem.label} asChild>
                                  <Link
                                    to={menuItem.to}
                                    className="hover:bg-muted flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors"
                                  >
                                    {Icon ? (
                                      <Icon className="text-primary size-4 shrink-0" />
                                    ) : null}
                                    <span className="line-clamp-1">
                                      {menuItem.label}
                                    </span>
                                    {menuItem.pro ? (
                                      <Badge className="bg-hot text-hot-foreground ml-auto rounded-full px-2 text-[10px]">
                                        Pro
                                      </Badge>
                                    ) : null}
                                  </Link>
                                </SheetClose>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>

          <SheetClose asChild>
            <Link
              to={path.membership}
              className="hover:bg-muted flex items-center justify-between rounded-lg border px-3 py-3 text-sm font-bold"
            >
              CareerMind
              <Badge className="bg-hot text-hot-foreground rounded-full px-2 text-[10px]">
                Pro
              </Badge>
            </Link>
          </SheetClose>

          {!user ? (
            <div className="grid grid-cols-2 gap-2 pt-2">
              <SheetClose asChild>
                <Button variant="outline" asChild>
                  <Link to={`${path.auth}?tab=login`}>Đăng nhập</Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button asChild>
                  <Link to={`${path.auth}?tab=register`}>Đăng ký</Link>
                </Button>
              </SheetClose>
            </div>
          ) : null}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

export default HeaderMobileMenu;
