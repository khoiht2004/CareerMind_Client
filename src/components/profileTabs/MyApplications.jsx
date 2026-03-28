import { Loader2, AlertCircle, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetMyApplicationsQuery } from "@/services/application.service";

const APPLICATION_STATUS_LABELS = {
  PENDING: "Chờ xét duyệt",
  REVIEWING: "Đang xem xét",
  INTERVIEW: "Phỏng vấn",
  ACCEPTED: "Đã nhận",
  REJECTED: "Từ chối",
};

const STATUS_CONFIG = {
  PENDING: { icon: Clock, className: "bg-gray-100 text-gray-600 border-gray-200" },
  REVIEWING: { icon: Clock, className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  INTERVIEW: { icon: CheckCircle2, className: "bg-green-100 text-green-700 border-green-200" },
  ACCEPTED: { icon: CheckCircle2, className: "bg-blue-100 text-blue-700 border-blue-200" },
  REJECTED: { icon: XCircle, className: "bg-red-100 text-red-700 border-red-200" },
};

function MyApplications() {
  const { data, isLoading } = useGetMyApplicationsQuery({});
  const applications = data?.applications ?? [];
  const total = data?.total ?? 0;

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="text-muted-foreground size-6 animate-spin" />
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm">
          Đơn ứng tuyển của tôi ({total})
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {applications.length === 0 ? (
          <div className="text-muted-foreground py-10 text-center">
            <AlertCircle className="mx-auto mb-2 size-8 opacity-30" />
            <p className="text-sm">Chưa có đơn ứng tuyển nào</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vị trí</TableHead>
                <TableHead>Công ty</TableHead>
                <TableHead>Ngày nộp</TableHead>
                <TableHead>Trạng thái</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => {
                const cfg = STATUS_CONFIG[app.status];
                const Icon = cfg?.icon;
                const label =
                  APPLICATION_STATUS_LABELS[app.status] ?? app.status;
                return (
                  <TableRow key={app.id}>
                    <TableCell className="text-sm font-medium">
                      {app.job?.title}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {app.job?.company}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(app.createdAt).toLocaleDateString("vi-VN")}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`gap-1 border text-xs ${cfg?.className}`}
                      >
                        {Icon && <Icon className="size-3" />}
                        {label}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}

export default MyApplications;
