import { memo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JOB_SORT_OPTIONS } from "@/config/constants/candidate.constant";

// compact=true: chỉ hiện sort select (dùng trên mobile)
function JobListHeader({ total, sort, onSortChange, compact = false }) {
  return (
    <div className="flex items-center justify-between">
      {!compact && (
        <p className="text-muted-foreground text-sm">
          Đang hiển thị{" "}
          <span className="text-foreground font-semibold">
            {total.toLocaleString()}
          </span>{" "}
          vị trí đang tuyển
        </p>
      )}

      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm">Sắp xếp theo:</span>
        <Select value={sort} onValueChange={onSortChange}>
          <SelectTrigger className="border-border h-8 w-36 cursor-pointer">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {JOB_SORT_OPTIONS.map((o) => (
              <SelectItem
                key={o.value}
                value={o.value}
                className="cursor-pointer"
              >
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default memo(JobListHeader);
