/* eslint-disable no-unused-vars */
import { Calendar, Video, Users, MapPin } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import AppDatePicker from "./AppDatePicker";

const FORMAT_OPTIONS = [
  { value: "DIRECT", label: "Trực tiếp", icon: Users },
  { value: "ONLINE", label: "Online", icon: Video },
];

function InterviewFields({ fields, onFieldChange }) {
  const isOnline = fields.interviewFormat === "ONLINE";
  const today = new Date();

  return (
    <div className="space-y-3 rounded-lg border border-blue-200 bg-blue-50/50 p-4 dark:border-blue-900 dark:bg-blue-950/30">
      <p className="flex items-center gap-1.5 text-xs font-semibold text-blue-700 dark:text-blue-400">
        <Calendar className="size-3.5" />
        Thông tin phỏng vấn
      </p>

      {/* Ngày + Giờ */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Ngày phỏng vấn</Label>
          <AppDatePicker
            value={fields.interviewDate}
            onChange={(v) => onFieldChange("interviewDate", v)}
            placeholder="Chọn ngày"
            minDate={today}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm font-medium">Giờ phỏng vấn</Label>
          <Input
            type="time"
            value={fields.interviewTime}
            onChange={(e) => onFieldChange("interviewTime", e.target.value)}
            className="appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      </div>

      {/* Hình thức */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium">Hình thức phỏng vấn</Label>
        <div className="grid grid-cols-2 gap-2">
          {FORMAT_OPTIONS.map(({ value, label, icon: Icon }) => {
            const selected = fields.interviewFormat === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => onFieldChange("interviewFormat", value)}
                className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-2 py-1.5 text-sm font-medium transition-all ${
                  selected
                    ? "border-blue-500 bg-blue-500 text-white shadow-sm"
                    : "border-input bg-background text-foreground hover:bg-muted"
                }`}
              >
                <Icon className="size-4" />
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Địa chỉ / Link */}
      <div className="space-y-1.5">
        <Label className="flex items-center gap-1.5 text-sm font-medium">
          {isOnline ? (
            <Video className="size-3.5 text-blue-500" />
          ) : (
            <MapPin className="size-3.5 text-blue-500" />
          )}
          {isOnline ? "Link phỏng vấn" : "Địa điểm phỏng vấn"}
        </Label>
        <Input
          placeholder={
            isOnline
              ? "https://meet.google.com/..."
              : "Số nhà, đường, quận, thành phố..."
          }
          value={fields.interviewLocation}
          onChange={(e) => onFieldChange("interviewLocation", e.target.value)}
        />
      </div>

      {/* Hạn phản hồi */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium">Hạn phản hồi của ứng viên</Label>
        <AppDatePicker
          value={fields.confirmDeadline}
          onChange={(v) => onFieldChange("confirmDeadline", v)}
          placeholder="Chọn ngày"
          minDate={today}
        />
      </div>
    </div>
  );
}

export default InterviewFields;
