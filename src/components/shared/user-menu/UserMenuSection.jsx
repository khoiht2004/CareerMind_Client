import { ChevronDown, ChevronUp } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

function UserMenuSection({ section, onNavigate }) {
  const Icon = section.icon;

  return (
    <div className="px-4 py-1.5">
      <button
        type="button"
        className="flex w-full items-center gap-3 rounded-lg py-1.5 text-left text-sm font-bold text-slate-700"
        onClick={() => {
          const firstItem = section.items[0];
          if (firstItem) onNavigate(firstItem.to);
        }}
      >
        <Icon className="size-5 text-slate-500" />
        <span className="min-w-0 flex-1 truncate">{section.title}</span>
        {section.expanded ? (
          <ChevronUp className="size-4 text-slate-500" />
        ) : (
          <ChevronDown className="size-4 text-slate-500" />
        )}
      </button>

      {section.expanded ? (
        <div className="mt-1 ml-8 space-y-0.5">
          {section.items.map((item) => (
            <DropdownMenuItem
              key={item.label}
              className="cursor-pointer rounded-md px-0 py-1.5 text-sm text-slate-500 focus:bg-transparent focus:text-primary"
              onSelect={() => onNavigate(item.to)}
            >
              {item.label}
            </DropdownMenuItem>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export default UserMenuSection;
