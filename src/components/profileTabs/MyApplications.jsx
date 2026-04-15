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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import {
  useGetMyApplicationsQuery,
  useDeleteApplicationMutation,
} from "@/services/application.service";
import {
  APPLICATION_STATUS_LABELS,
  STATUS_CONFIG,
} from "@/config/constants/candidate.constant";

function MyApplications() {
  const navigate = useNavigate();
  const { data, isLoading } = useGetMyApplicationsQuery({});
  const [deleteApplication, { isLoading: isDeleting }] =
    useDeleteApplicationMutation();
  const [deleteTarget, setDeleteTarget] = useState(null);

  const applications = data?.data?.applications ?? [];
  const total = data?.data?.total ?? 0;

  const handleDeleteConfirm = async () => {
    try {
      await deleteApplication(deleteTarget.id).unwrap();
      toast.success("Đã xóa đơn ứng tuyển");
      setDeleteTarget(null);
    } catch (error) {
      toast.error(
        error?.data?.message || "Có lỗi xảy ra khi xóa đơn ứng tuyển",
      );
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
                        {app.job?.company?.name}
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

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
        title="Xóa đơn ứng tuyển"
        description={
          <>
            Bạn có chắc muốn xóa đơn ứng tuyển vị trí{" "}
            <span className="text-foreground font-medium">
              {deleteTarget?.job?.title}
            </span>{" "}
            tại{" "}
            <span className="text-foreground font-medium">
              {deleteTarget?.job?.company?.name}
            </span>
            ? Hành động này không thể hoàn tác.
          </>
        }
      />
    </>
  );
}

export default MyApplications;
