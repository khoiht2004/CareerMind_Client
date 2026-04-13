import { Calendar, Clock, Video, MonitorSmartphone, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatVN } from "@/utils/helper";
import { DetailRow } from "./DetailRow";

export function ReplyInterviewInfo({
  status,
  interviewDate,
  interviewTime,
  interviewFormat,
  interviewLocation,
  confirmDeadline,
}) {
  if (status !== "INTERVIEW") return null;

  const interviewFormatLabel =
    interviewFormat === "ONLINE"
      ? "Online"
      : interviewFormat === "DIRECT"
        ? "Trực tiếp"
        : null;

  return (
    <Card className="border-blue-200 dark:border-blue-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-blue-700 dark:text-blue-400">
          <Calendar className="size-4" />
          Thông tin phỏng vấn
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <DetailRow
          icon={Calendar}
          label="Ngày phỏng vấn"
          value={formatVN(interviewDate)}
        />
        <DetailRow
          icon={Clock}
          label="Giờ phỏng vấn"
          value={interviewTime}
        />
        <DetailRow
          icon={interviewFormat === "ONLINE" ? Video : MonitorSmartphone}
          label="Hình thức"
          value={interviewFormatLabel}
        />
        <DetailRow
          icon={MapPin}
          label={interviewFormat === "ONLINE" ? "Link phỏng vấn" : "Địa điểm"}
          value={interviewLocation}
        />
        <DetailRow
          icon={Clock}
          label="Hạn phản hồi"
          value={formatVN(confirmDeadline)}
        />
      </CardContent>
    </Card>
  );
}
