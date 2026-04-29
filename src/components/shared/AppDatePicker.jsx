import { useState } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// value: string "YYYY-MM-DD" | ""
// onChange: (string) => void
// minDate: Date | undefined — disables dates before this date, shows error if value is before it
function AppDatePicker({
  value,
  onChange,
  placeholder = "Chọn ngày",
  minDate,
}) {
  const [open, setOpen] = useState(false);

  const date = value ? new Date(value + "T00:00:00") : undefined;

  const isInvalid =
    minDate && date
      ? new Date(date).setHours(0, 0, 0, 0) <
        new Date(minDate).setHours(0, 0, 0, 0)
      : false;

  const handleSelect = (selected) => {
    if (selected) {
      const y = selected.getFullYear();
      const m = String(selected.getMonth() + 1).padStart(2, "0");
      const d = String(selected.getDate()).padStart(2, "0");
      onChange(`${y}-${m}-${d}`);
    } else {
      onChange("");
    }
    setOpen(false);
  };

  return (
    <div className="space-y-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={`bg-primary/10 w-full justify-between font-normal ${isInvalid ? "border-destructive focus-visible:ring-destructive" : ""}`}
          >
            {date ? (
              format(new Date(value + "T00:00:00"), "dd/MM/yyyy", {
                locale: vi,
              })
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            <ChevronDownIcon className="text-muted-foreground size-4 shrink-0" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            defaultMonth={date}
            disabled={minDate ? { before: minDate } : undefined}
            onSelect={handleSelect}
          />
        </PopoverContent>
      </Popover>
      {isInvalid && (
        <p className="text-destructive text-xs">
          Ngày không được trước ngày hiện tại
        </p>
      )}
    </div>
  );
}

export default AppDatePicker;
