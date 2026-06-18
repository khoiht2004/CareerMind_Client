import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function MegaMenuLink({ item }) {
  const Icon = item.icon;

  const handleClick = () => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  return (
    <Link
      to={item.to}
      onClick={handleClick}
      className="group/item hover:text-primary text-foreground flex min-h-9 items-start gap-3 rounded-lg px-1 py-1.5 text-sm font-semibold transition-colors"
    >
      {Icon ? (
        <Icon className="group-hover/item:text-primary text-muted-foreground mt-0.5 size-4 shrink-0" />
      ) : null}
      <span className="min-w-0">
        <span className="line-clamp-1">{item.label}</span>
        {item.description ? (
          <span className="text-muted-foreground mt-1 line-clamp-2 block text-xs font-normal">
            {item.description}
          </span>
        ) : null}
      </span>
      {item.pro ? (
        <Badge className="h-5 rounded-full px-2 text-[10px]">Pro</Badge>
      ) : null}
    </Link>
  );
}

function MegaMenuColumn({ column }) {
  return (
    <div className="min-w-0 space-y-4">
      <p className="text-muted-foreground text-xs font-bold tracking-wide uppercase">
        {column.title}
      </p>
      <div className="space-y-1.5">
        {column.items.map((item) => (
          <MegaMenuLink key={item.label} item={item} />
        ))}
      </div>
    </div>
  );
}

function MegaMenu({ menu }) {
  return (
    <div className="invisible absolute top-10 left-0 z-50 pt-4 opacity-0 transition-all duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
      <div className="bg-popover text-popover-foreground w-max rounded-2xl border p-6 shadow-lg drop-shadow-xl">
        <div
          className={cn(
            "grid gap-8",
            menu.columns.length === 1 && "grid-cols-1",
            menu.columns.length === 2 && "grid-cols-2",
            menu.columns.length >= 3 && "grid-cols-3",
          )}
        >
          {menu.columns.map((column) => (
            <MegaMenuColumn key={column.title} column={column} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MegaMenu;
