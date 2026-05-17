import { ChevronDown, ChevronUp } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";

function UserMenuSection({ section, isOpen, onToggle, onNavigate }) {
  const Icon = section.icon;

  return (
    <div className="px-4 py-1.5">
      <button
        type="button"
        className="flex w-full cursor-pointer items-center gap-3 rounded-lg py-1.5 text-left text-sm font-bold text-slate-700"
        onClick={onToggle}
      >
        <Icon
          className={`size-5 ${isOpen ? "text-primary" : "text-slate-500"}`}
        />
        <span
          className={`min-w-0 flex-1 truncate ${isOpen ? "text-primary" : ""}`}
        >
          {section.title}
        </span>
        {isOpen ? (
          <ChevronUp className="size-4 text-slate-500" />
        ) : (
          <ChevronDown className="size-4 text-slate-500" />
        )}
      </button>

      <div
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="ml-8 space-y-0.5">
            {section.items.map((item) => (
              <DropdownMenuItem
                key={item.label}
                className={`cursor-pointer rounded-md px-0 text-sm focus:bg-transparent ${
                  item.highlight
                    ? "text-primary focus:text-primary"
                    : "focus:text-primary text-slate-500"
                }`}
                onSelect={() => onNavigate(item.to)}
              >
                {item.label}
              </DropdownMenuItem>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserMenuSection;
