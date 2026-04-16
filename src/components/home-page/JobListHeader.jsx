import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JOB_SORT_OPTIONS } from "@/config/constants/candidate.constant";

function JobListHeader({ total, sort, onSortChange }) {
  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-muted-foreground">
        Đang hiển thị{" "}
        <span className="font-semibold text-foreground">
          {total.toLocaleString()}
        </span>{" "}
        vị trí đang tuyển
      </p>

      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sắp xếp theo:</span>
        <Select value={sort} onValueChange={onSortChange}>
          <SelectTrigger className="h-8 w-36 cursor-pointer border-border">
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

export default JobListHeader;
