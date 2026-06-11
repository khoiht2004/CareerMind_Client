import { Calendar, Video, Users, MapPin, Clock8 } from "lucide-react";
import { createElement } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import AppDatePicker from "../shared/AppDatePicker";

const FORMAT_OPTIONS = [
  { value: "DIRECT", label: "Trực tiếp", icon: Users },
  { value: "ONLINE", label: "Online", icon: Video },
];

function InterviewFields({ fields, onFieldChange }) {
  const isOnline = fields.interviewFormat === "ONLINE";
  const today = new Date();

  return (
    <div className="border-status-reviewing-border space-y-3 rounded-lg border bg-(--status-reviewing-bg)/50 p-4">
      <p className="text-status-reviewing-text flex items-center gap-1.5 text-xs font-semibold">
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
          <div className="relative">
            <Input
              type="time"
              value={fields.interviewTime}
              onChange={(e) => onFieldChange("interviewTime", e.target.value)}
              className="bg-primary/10 appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
            />
            <Clock8 className="text-muted-foreground absolute top-2.5 right-2 size-4" />
          </div>
        </div>
      </div>

      {/* Hình thức */}
      <div className="space-y-1.5">
        <Label className="text-sm font-medium">Hình thức phỏng vấn</Label>
        <div className="grid grid-cols-2 gap-2">
          {FORMAT_OPTIONS.map(({ value, label, icon }) => {
            const selected = fields.interviewFormat === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => onFieldChange("interviewFormat", value)}
                className={`bg-primary/10 flex cursor-pointer items-center justify-center gap-2 rounded-lg border px-2 py-1.5 text-sm font-medium transition-all ${
                  selected
                    ? "border-primary bg-primary shadow-sm"
                    : "border-input bg-background hover:bg-muted"
                }`}
              >
                {createElement(icon, { className: "size-4" })}
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
            <Video className="text-status-reviewing-text size-3.5" />
          ) : (
            <MapPin className="text-status-reviewing-text size-3.5" />
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
          className="bg-primary/10"
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
