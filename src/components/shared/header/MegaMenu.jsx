import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

function MegaMenuLink({ item }) {
  const Icon = item.icon;

  return (
    <Link
      to={item.to}
      className="group/item hover:text-primary flex min-h-9 items-start gap-3 rounded-lg px-1 py-1.5 text-sm font-semibold text-slate-700 transition-colors"
    >
      {Icon ? (
        <Icon className="group-hover/item:text-primary mt-0.5 size-4 shrink-0 text-slate-500" />
      ) : null}
      <span className="min-w-0">
        <span className="line-clamp-1">{item.label}</span>
        {item.description ? (
          <span className="mt-1 line-clamp-2 block text-xs font-normal text-slate-500">
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
      <p className="text-xs font-bold tracking-wide text-slate-400 uppercase">
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
    <div className="invisible fixed top-18 left-1/2 z-50 -translate-x-1/2 opacity-0 transition-all duration-150 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
      <div className="w-[min(72rem,calc(100vw-2rem))] rounded-2xl border bg-white p-7 text-slate-700 drop-shadow-lg">
        <div
          className={cn(
            "grid gap-8",
            menu.columns.length === 1 && "w-80 grid-cols-1",
            menu.columns.length === 2 && "w-152 grid-cols-2",
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
