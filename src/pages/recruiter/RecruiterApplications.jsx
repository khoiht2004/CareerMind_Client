import { useState } from "react";
import {
  Loader2,
  Eye,
  Users,
  Clock,
  Sparkles,
  BarChart2,
  ListFilter,
} from "lucide-react";
import Pagination from "@/components/shared/Pagination";
import CvPreviewDialog from "@/components/shared/CvPreviewDialog";
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
import { APP_STATUS_FILTER_OPTIONS } from "@/config/constants/recruiter.constant";
import ApplicationUpdateDialog from "@/components/recuiter/ApplicationUpdateDialog";
import { useRecruiterApplications } from "@/hooks/useRecruiterApplications";
import {
  StatusBadge,
  ApplicantAvatar,
} from "@/components/recuiter/components/ApplicationComponent";
import { buildCvPreview } from "@/utils/recruiter.helper";

function RecruiterApplications() {
  const [previewCv, setPreviewCv] = useState(null);

  const {
    staged,
    setStagedField,
    handleApply,
    handleClear,
    filters,
    setPage,
    applications,
    totalPages,
    total,
    myJobs,
    pendingCount,
    from,
    to,
    isLoading,
    selectedApp,
    setSelectedApp,
    newStatus,
    setNewStatus,
    note,
    setNote,
    sendEmail,
    setSendEmail,
    interviewFields,
    acceptedFields,
    openUpdate,
    handleInterviewFieldChange,
    handleAcceptedFieldChange,
    handleUpdate,
    updating,
  } = useRecruiterApplications();

  return (
    <div className="max-w-full space-y-6 px-10 pt-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-primary text-4xl font-black">Đơn ứng tuyển</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Quản lý và sàng lọc hồ sơ ứng viên một cách chuyên nghiệp.
          </p>
        </div>
        <div className="flex shrink-0 gap-3">
          {/* Tổng ứng viên */}
          <div className="bg-card border-secondary flex items-center gap-3 rounded-xl border-l-4 px-4 py-3">
            <div className="bg-secondary/10 flex size-9 items-center justify-center rounded-lg">
              <Users className="text-secondary size-5" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Tổng ứng viên</p>
              <p className="text-foreground text-xl font-bold">
                {total.toLocaleString("vi-VN")}
              </p>
            </div>
          </div>
          {/* Chờ xét duyệt */}
          <div className="bg-card border-status-pending-border flex items-center gap-3 rounded-xl border-l-4 px-4 py-3">
            <div className="bg-status-pending-bg flex size-9 items-center justify-center rounded-lg">
              <Clock className="text-status-pending-text size-5" />
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Chờ xét duyệt</p>
              <p className="text-foreground text-xl font-bold">
                {pendingCount.toLocaleString("vi-VN")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-card flex flex-wrap items-end gap-4 rounded-xl p-4">
        <div className="min-w-48 flex-1">
          <p className="text-muted-foreground mb-1.5 text-xs font-medium tracking-wider uppercase">
            Lọc theo công việc
          </p>
          <Select
            value={staged.jobId}
            onValueChange={(v) => setStagedField("jobId", v)}
          >
            <SelectTrigger className="bg-primary/10 w-full">
              <SelectValue placeholder="Tất cả công việc" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Tất cả công việc</SelectItem>
              {myJobs.map((j) => (
                <SelectItem key={j.id} value={j.id}>
                  {j.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="min-w-44 flex-1">
          <p className="text-muted-foreground mb-1.5 text-xs font-medium tracking-wider uppercase">
            Trạng thái
          </p>
          <Select
            value={staged.status}
            onValueChange={(v) => setStagedField("status", v)}
          >
            <SelectTrigger className="bg-primary/10 w-full">
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
        <div className="flex gap-2">
          <Button onClick={handleApply} className="cursor-pointer px-6 py-4">
            <ListFilter className="size-4" />
            Áp dụng
          </Button>
          <Button
            variant="outline"
            onClick={handleClear}
            className="text-muted-foreground cursor-pointer px-6 py-4"
          >
            Xóa bộ lọc
          </Button>
        </div>
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
                  <TableHead>Ngày cập nhật</TableHead>
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
                        <div className="flex items-center gap-3">
                          <ApplicantAvatar name={name} />
                          <div>
                            <p className="font-medium">{name}</p>
                            <p className="text-muted-foreground text-xs">
                              {app.user?.email}
                            </p>
                          </div>
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
                      <TableCell className="text-sm">
                        {new Date(app.updatedAt).toLocaleDateString("vi-VN")}
                      </TableCell>
                      <TableCell>
                        {(app.cv?.fileUrl ?? app.cvUrl) ? (
                          <Button
                            size="sm"
                            variant="outline"
                            className="cursor-pointer text-xs"
                            onClick={() => setPreviewCv(buildCvPreview(app))}
                          >
                            Xem CV
                            <Eye className="size-3" />
                          </Button>
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
                            className="cursor-pointer"
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

          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              Hiển thị {from} - {to} của {total} đơn ứng tuyển
            </p>
            <Pagination
              page={filters.page}
              totalPages={totalPages}
              onPageChange={setPage}
              showPageNumbers
            />
          </div>
        </>
      )}

      {/* Promo cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-primary text-primary-foreground rounded-xl p-6">
          <div className="bg-primary-foreground/10 mb-3 inline-flex size-10 items-center justify-center rounded-lg">
            <BarChart2 className="size-5" />
          </div>
          <h3 className="text-lg font-bold">Phân tích tuyển dụng</h3>
          <p className="mt-1 text-sm opacity-75">
            Tỷ lệ chuyển đổi ứng viên trong tháng này đã tăng 12%. Xem các vị
            trí thu hút nhiều sự quan tâm nhất.
          </p>
          <Button variant="secondary" size="sm" className="mt-4 cursor-pointer">
            Chi tiết báo cáo
          </Button>
        </div>
        <div className="bg-primary-container text-primary-foreground rounded-xl p-6">
          <div className="bg-primary-foreground/10 mb-3 inline-flex size-10 items-center justify-center rounded-lg">
            <Sparkles className="size-5" />
          </div>
          <h3 className="text-lg font-bold">Đề xuất AI</h3>
          <p className="mt-1 text-sm opacity-75">
            Dựa trên tiêu chí, 5 ứng viên mới có kỹ năng phù hợp hoàn hảo với vị
            trí đang tuyển của bạn.
          </p>
          <Button
            size="sm"
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 mt-4 cursor-pointer"
          >
            Xem đề xuất
          </Button>
        </div>
      </div>

      <ApplicationUpdateDialog
        open={!!selectedApp}
        onOpenChange={() => setSelectedApp(null)}
        app={selectedApp}
        status={newStatus}
        onStatusChange={setNewStatus}
        note={note}
        onNoteChange={setNote}
        sendEmail={sendEmail}
        onSendEmailChange={setSendEmail}
        interviewFields={interviewFields}
        onInterviewFieldChange={handleInterviewFieldChange}
        acceptedFields={acceptedFields}
        onAcceptedFieldChange={handleAcceptedFieldChange}
        onSubmit={handleUpdate}
        isLoading={updating}
      />

      <CvPreviewDialog
        open={!!previewCv}
        onClose={() => setPreviewCv(null)}
        cv={previewCv}
      />
    </div>
  );
}

export default RecruiterApplications;
