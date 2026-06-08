import { Building2, Clock8, MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import AppDatePicker from "../../shared/AppDatePicker";

function AcceptedFields({ fields, onFieldChange }) {
  const today = new Date();

  return (
    <div className="space-y-3 rounded-lg border border-[var(--status-accepted-border)] bg-[var(--status-accepted-bg)]/50 p-4">
      <p className="flex items-center gap-1.5 text-xs font-semibold text-[var(--status-accepted-text)]">
        <Building2 className="size-3.5" />
        Thông tin nhận việc
      </p>

      {/* Ngày + Giờ */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Ngày bắt đầu</Label>
          <AppDatePicker
            value={fields.startDate}
            onChange={(v) => onFieldChange("startDate", v)}
            placeholder="Chọn ngày"
            minDate={today}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Giờ bắt đầu</Label>
          <div className="relative">
            <Input
              type="time"
              value={fields.startTime}
              onChange={(e) => onFieldChange("startTime", e.target.value)}
              className="bg-primary/10 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
            <Clock8 className="text-muted-foreground absolute top-2.5 right-2 size-4" />
          </div>
        </div>
      </div>

      {/* Địa chỉ */}
      <div className="space-y-1.5">
        <Label className="flex items-center gap-1.5 text-sm font-medium">
          <MapPin className="size-3.5 text-[var(--status-accepted-text)]" />
          Địa chỉ văn phòng
        </Label>
        <Input
          placeholder="Số nhà, đường, quận, thành phố..."
          value={fields.officeAddress}
          className="bg-primary/10"
          onChange={(e) => onFieldChange("officeAddress", e.target.value)}
        />
      </div>
    </div>
  );
}

export default AcceptedFields;
