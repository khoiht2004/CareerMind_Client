import { Building2, MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import AppDatePicker from "./AppDatePicker";

function AcceptedFields({ fields, onFieldChange }) {
  const today = new Date();

  return (
    <div className="space-y-3 rounded-lg border border-green-200 bg-green-50/50 p-4 dark:border-green-900 dark:bg-green-950/30">
      <p className="flex items-center gap-1.5 text-xs font-semibold text-green-700 dark:text-green-400">
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
          <Label className="text-sm font-medium">Giờ bắt đầu làm việc</Label>
          <Input
            type="time"
            value={fields.startTime}
            onChange={(e) => onFieldChange("startTime", e.target.value)}
            className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      </div>

      {/* Địa chỉ */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium flex items-center gap-1.5">
          <MapPin className="size-3.5 text-green-600" />
          Địa chỉ văn phòng
        </Label>
        <Input
          placeholder="Số nhà, đường, quận, thành phố..."
          value={fields.officeAddress}
          onChange={(e) => onFieldChange("officeAddress", e.target.value)}
        />
      </div>
    </div>
  );
}

export default AcceptedFields;
