import { X } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  JOB_TYPE_OPTIONS,
  EXP_LEVEL_OPTIONS,
} from "@/config/constants/candidate.constant";

// Loại bỏ option "Tất cả" ra khỏi danh sách checkbox
const TYPE_CHECKBOX_OPTIONS = JOB_TYPE_OPTIONS.filter((o) => o.value !== "ALL");

function FilterSection({ title, options, activeValue, onToggle }) {
  return (
    <div className="space-y-2.5">
      <p className="text-muted-foreground text-[11px] font-semibold tracking-widest uppercase">
        {title}
      </p>
      <div className="space-y-2">
        {options.map((opt) => {
          const isChecked = activeValue === opt.value;
          return (
            <label
              htmlFor={opt.value}
              key={opt.value}
              className="flex cursor-pointer items-center gap-2.5"
              onClick={() => onToggle(opt.value)}
            >
              <Checkbox checked={isChecked} readOnly />
              <span id={opt.value} className="text-foreground/80 text-sm">
                {opt.label}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}

function FilterPanel({
  typeFilter,
  onTypeChange,
  levelFilter,
  onLevelChange,
  hasFilters,
  onClearFilters,
}) {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Bộ lọc</p>
        {hasFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearFilters}
            className="text-muted-foreground hover:text-foreground h-7 cursor-pointer gap-1 px-2 text-xs"
          >
            <X className="size-3" />
            Xóa tất cả
          </Button>
        )}
      </div>

      <FilterSection
        title="Loại công việc"
        options={TYPE_CHECKBOX_OPTIONS}
        activeValue={typeFilter}
        onToggle={onTypeChange}
      />

      <FilterSection
        title="Mức kinh nghiệm"
        options={EXP_LEVEL_OPTIONS}
        activeValue={levelFilter}
        onToggle={onLevelChange}
      />
    </div>
  );
}

export default FilterPanel;
