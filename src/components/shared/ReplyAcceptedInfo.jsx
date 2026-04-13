import { Building2, Calendar, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatVN } from "@/utils/helper";
import { DetailRow } from "./DetailRow";

export function ReplyAcceptedInfo({
  status,
  startDate,
  startTime,
  officeAddress,
}) {
  if (status !== "ACCEPTED") return null;

  return (
    <Card className="border-green-200 dark:border-green-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base text-green-700 dark:text-green-400">
          <Building2 className="size-4" />
          Thông tin nhận việc
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <DetailRow
          icon={Calendar}
          label="Ngày bắt đầu"
          value={formatVN(startDate)}
        />
        <DetailRow
          icon={Clock}
          label="Giờ bắt đầu làm việc"
          value={startTime}
        />
        <DetailRow
          icon={MapPin}
          label="Địa chỉ văn phòng"
          value={officeAddress}
        />
      </CardContent>
    </Card>
  );
}
