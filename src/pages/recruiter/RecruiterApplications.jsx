import { useState } from "react";
import { Loader2, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetAllApplicationsQuery,
  useUpdateApplicationStatusMutation,
} from "@/services/application.service";
import { useGetMyJobsQuery } from "@/services/job.service";
import {
  APPLICATION_STATUS_LABELS,
  STATUS_CONFIG,
} from "@/config/constants/candidate.constant";
import { APP_STATUS_FILTER_OPTIONS } from "@/config/constants/recruiter.constant";
import ApplicationUpdateDialog from "@/components/recuiter/ApplicationUpdateDialog";

function StatusBadge({ status }) {
  const statusConfig = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${statusConfig?.className ?? ""}`}
    >
      {APPLICATION_STATUS_LABELS[status] ?? status}
    </span>
  );
}

function RecruiterApplications() {
  const [filters, setFilters] = useState({
    status: "ALL",
    jobId: "ALL",
    page: 1,
  });
  const [selectedApp, setSelectedApp] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [note, setNote] = useState("");

  const { data: appsData, isLoading } = useGetAllApplicationsQuery({
    status: filters.status !== "ALL" ? filters.status : undefined,
    jobId: filters.jobId !== "ALL" ? filters.jobId : undefined,
    page: filters.page,
    limit: 10,
  });

  const { data: jobsData } = useGetMyJobsQuery({ limit: 100 });
  const [updateStatus, { isLoading: updating }] =
    useUpdateApplicationStatusMutation();

  const applications = appsData?.data?.applications ?? [];
  const totalPages = appsData?.data?.totalPages ?? 1;
  const myJobs = jobsData?.data?.jobs ?? [];

  const openUpdate = (app) => {
    setSelectedApp(app);
    setNewStatus(app.status);
    setNote(app.note ?? "");
  };

  const handleUpdate = async () => {
    try {
      await updateStatus({
        id: selectedApp.id,
        status: newStatus,
        note: note || undefined,
      }).unwrap();
      toast.success("Cập nhật trạng thái thành công");
      setSelectedApp(null);
    } catch {
      toast.error("Không thể cập nhật trạng thái");
    }
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Đơn ứng tuyển</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {appsData?.data?.total ?? 0} đơn ứng tuyển
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select
          value={filters.jobId}
          onValueChange={(v) =>
            setFilters((f) => ({ ...f, jobId: v, page: 1 }))
          }
        >
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Lọc theo việc làm" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">Tất cả việc làm</SelectItem>
            {myJobs.map((j) => (
              <SelectItem key={j.id} value={j.id}>
                {j.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={filters.status}
          onValueChange={(v) =>
            setFilters((f) => ({ ...f, status: v, page: 1 }))
          }
        >
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {APP_STATUS_FILTER_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="text-muted-foreground size-6 animate-spin" />
        </div>
      ) : applications.length === 0 ? (
        <p className="text-muted-foreground py-16 text-center text-sm">
          Chưa có đơn ứng tuyển nào
        </p>
      ) : (
        <>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ứng viên</TableHead>
                  <TableHead>Liên hệ</TableHead>
                  <TableHead>Vị trí ứng tuyển</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Ngày nộp</TableHead>
                  <TableHead>CV</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => {
                  const profile = app.user?.profile;
                  const name = profile?.fullName ?? app.user?.email ?? "—";
                  const phone = app.phone ?? profile?.phone ?? "—";
                  return (
                    <TableRow key={app.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{name}</p>
                          <p className="text-muted-foreground text-xs">
                            {app.user?.email}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">{phone}</TableCell>
                      <TableCell className="text-sm">
                        {app.job?.title}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={app.status} />
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(app.createdAt).toLocaleDateString("vi-VN")}
                      </TableCell>
                      <TableCell>
                        {app.cvUrl ? (
                          <a
                            href={app.cvUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary inline-flex items-center gap-1 text-xs hover:underline"
                          >
                            Xem CV <ExternalLink className="size-3" />
                          </a>
                        ) : (
                          <span className="text-muted-foreground text-xs">
                            Không có
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openUpdate(app)}
                          >
                            Chi tiết
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={filters.page <= 1}
                onClick={() => setFilters((f) => ({ ...f, page: f.page - 1 }))}
              >
                Trước
              </Button>
              <span className="flex items-center px-3 text-sm">
                {filters.page} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={filters.page >= totalPages}
                onClick={() => setFilters((f) => ({ ...f, page: f.page + 1 }))}
              >
                Sau
              </Button>
            </div>
          )}
        </>
      )}

      <ApplicationUpdateDialog
        open={!!selectedApp}
        onOpenChange={() => setSelectedApp(null)}
        app={selectedApp}
        status={newStatus}
        onStatusChange={setNewStatus}
        note={note}
        onNoteChange={setNote}
        onSubmit={handleUpdate}
        isLoading={updating}
      />
    </div>
  );
}

export default RecruiterApplications;
