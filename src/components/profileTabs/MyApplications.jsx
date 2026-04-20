import { useState, useCallback } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import {
  useGetMyApplicationsQuery,
  useDeleteApplicationMutation,
} from "@/services/application.service";
import ApplicationRow from "./components/ApplicationRow";

function MyApplications() {
  const { data, isLoading } = useGetMyApplicationsQuery({});
  const [deleteApplication, { isLoading: isDeleting }] =
    useDeleteApplicationMutation();
  const [deleteTarget, setDeleteTarget] = useState(null);

  const applications = data?.data?.applications ?? [];
  const total = data?.data?.total ?? 0;

  const handleDeleteClick = useCallback((app) => {
    setDeleteTarget(app);
  }, []);

  const handleDeleteConfirm = useCallback(async () => {
    try {
      await deleteApplication(deleteTarget.id).unwrap();
      toast.success("Đã xóa đơn ứng tuyển");
      setDeleteTarget(null);
    } catch (error) {
      toast.error(
        error?.data?.message || "Có lỗi xảy ra khi xóa đơn ứng tuyển",
      );
    }
  }, [deleteApplication, deleteTarget]);

  const handleDialogChange = useCallback((open) => {
    if (!open) setDeleteTarget(null);
  }, []);

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
                {applications.map((app) => (
                  <ApplicationRow
                    key={app.id}
                    app={app}
                    onDeleteClick={handleDeleteClick}
                  />
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={handleDialogChange}
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
