import { useState } from "react";
import {
  Loader2,
  AlertCircle,
  CheckCircle2,
  Clock,
  XCircle,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useGetMyApplicationsQuery,
  useDeleteApplicationMutation,
} from "@/services/application.service";

const APPLICATION_STATUS_LABELS = {
  PENDING: "Chờ xét duyệt",
  REVIEWING: "Đang xem xét",
  INTERVIEW: "Phỏng vấn",
  ACCEPTED: "Đã nhận",
  REJECTED: "Từ chối",
};

const STATUS_CONFIG = {
  PENDING: {
    icon: Clock,
    className: "bg-gray-100 text-gray-600 border-gray-200",
  },
  REVIEWING: {
    icon: Clock,
    className: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  INTERVIEW: {
    icon: CheckCircle2,
    className: "bg-green-100 text-green-700 border-green-200",
  },
  ACCEPTED: {
    icon: CheckCircle2,
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  REJECTED: {
    icon: XCircle,
    className: "bg-red-100 text-red-700 border-red-200",
  },
};

function MyApplications() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetMyApplicationsQuery({});
  const [deleteApplication, { isLoading: isDeleting }] = useDeleteApplicationMutation();
  const [deleteTarget, setDeleteTarget] = useState(null);

  const applications = data?.data?.applications ?? [];
  const total = data?.data?.total ?? 0;

  const handleDeleteConfirm = async () => {
    try {
      await deleteApplication(deleteTarget.id).unwrap();
      toast.success("Đã xóa đơn ứng tuyển");
      setDeleteTarget(null);
    } catch {
      toast.error("Có lỗi xảy ra khi xóa đơn ứng tuyển");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="text-muted-foreground size-6 animate-spin" />
      </div>
    );
  }

  return (
    <>
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
                  <TableHead className="w-10"></TableHead>
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
                      <TableCell
                        className="cursor-pointer text-sm font-medium"
                        onClick={() => navigate(`/applications/${app.id}`)}
                      >
                        {app.job?.title}
                      </TableCell>
                      <TableCell
                        className="text-muted-foreground cursor-pointer text-sm"
                        onClick={() => navigate(`/applications/${app.id}`)}
                      >
                        {app.job?.company}
                      </TableCell>
                      <TableCell
                        className="text-muted-foreground cursor-pointer text-sm"
                        onClick={() => navigate(`/applications/${app.id}`)}
                      >
                        {new Date(app.createdAt).toLocaleDateString("vi-VN")}
                      </TableCell>
                      <TableCell
                        className="cursor-pointer"
                        onClick={() => navigate(`/applications/${app.id}`)}
                      >
                        <Badge
                          className={`gap-1 border text-xs ${cfg?.className}`}
                        >
                          {Icon && <Icon className="size-3" />}
                          {label}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            setDeleteTarget(app);
                          }}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Delete confirmation dialog */}
      <Dialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xóa đơn ứng tuyển</DialogTitle>
            <DialogDescription>
              Bạn có chắc muốn xóa đơn ứng tuyển vị trí{" "}
              <span className="font-medium text-foreground">
                {deleteTarget?.job?.title}
              </span>{" "}
              tại{" "}
              <span className="font-medium text-foreground">
                {deleteTarget?.job?.company}
              </span>
              ? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteTarget(null)}
              disabled={isDeleting}
            >
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : null}
              Xóa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default MyApplications;
