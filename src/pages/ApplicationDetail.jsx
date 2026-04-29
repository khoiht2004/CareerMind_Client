import {
  Loader2,
  Clock,
  FileText,
  Eye,
  Download,
  Share2,
  CheckCircle2,
  CalendarDays,
  Paperclip,
  Star,
  CircleDollarSign,
  CalendarClock,
  ChartNoAxesCombined,
  CalendarClockIcon,
  NotebookPen,
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  APPLICATION_STATUS_LABELS,
  JOB_TYPE_LABELS,
  STATUS_CONFIG,
} from "@/config/constants/candidate.constant";
import CvPreviewDialog from "@/components/shared/CvPreviewDialog";
import { NotFound } from "@/components/shared/NotFound";
import { useApplicationDetail } from "@/hooks/useApplicationDetail";
import { formatDate, formatFileSize } from "@/utils/helper";
import { AssessmentBar, UserInfo } from "@/features/ApplicationDetail";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router";

function ApplicationDetail() {
  const {
    application,
    isLoading,
    isError,
    cvFile,
    cvPreviewOpen,
    openCvPreview,
    closeCvPreview,
    handleQuickApprove,
    isUpdating,
  } = useApplicationDetail();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="text-muted-foreground size-8 animate-spin" />
      </div>
    );
  }

  if (isError || !application) {
    return <NotFound message="Không tìm thấy đơn ứng tuyển này" />;
  }

  const {
    job,
    status,
    createdAt,
    coverLetter,
    note,
    user,
    interviewDate,
    interviewTime,
  } = application;

  const config = STATUS_CONFIG[status];
  const StatusIcon = config?.icon;
  const statusLabel = APPLICATION_STATUS_LABELS[status] ?? status;
  const typeLabel = JOB_TYPE_LABELS[job?.type] ?? job?.type;
  const fullName = user?.profile?.fullName ?? user?.email ?? "Ứng viên";
  const isRecruiter = user?.role === "RECRUITER";
  const initials = fullName.charAt(0).toUpperCase();

  return (
    <div className="mx-auto max-w-full space-y-6 p-6 lg:max-w-6xl">
      {/* Page header */}
      <div className="flex items-center gap-3">
        <div className="space-y-1">
          <h1 className="text-primary text-3xl font-black">
            Chi tiết đơn ứng tuyển
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Hãy theo dõi trạng thái và tiến trình của đơn ứng tuyển này.
          </p>
        </div>
        {isRecruiter && (
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Share2 className="size-4" />
              Chia sẻ
            </Button>
            <Button
              size="sm"
              className="gap-1.5"
              onClick={handleQuickApprove}
              disabled={isUpdating || status === "ACCEPTED"}
            >
              {isUpdating ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <CheckCircle2 className="size-4" />
              )}
              Phê duyệt nhanh
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ── Left col ── */}
        <div className="space-y-5 lg:col-span-2">
          {/* Applicant hero card */}
          <Card className="border-primary border-l-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-5">
                <div className="bg-primary/10 flex size-25 shrink-0 items-center justify-center overflow-hidden rounded-xl text-2xl font-bold">
                  {user?.profile?.avatarUrl ? (
                    <img
                      src={user?.profile?.avatarUrl}
                      alt={fullName}
                      className="size-full object-cover object-top"
                    />
                  ) : (
                    initials
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <h2 className="text-primary text-2xl font-bold tracking-tight">
                    {fullName}
                  </h2>
                  <div className="flex flex-wrap items-center gap-x-8 gap-y-2">
                    {user?.email && <UserInfo icon={Mail} label={user.email} />}

                    {user?.profile?.phone && (
                      <UserInfo icon={Phone} label={user?.profile?.phone} />
                    )}

                    {user?.profile?.address && (
                      <UserInfo icon={MapPin} label={user?.profile?.address} />
                    )}

                    {user?.profile?.socials && (
                      <UserInfo icon={Globe} label={user.profile.socials} />
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Cover letter */}
          {coverLetter && (
            <Card>
              <CardHeader>
                <CardTitle className="text-primary bg-secondary-container/20 flex items-center gap-2 rounded-lg px-2 py-1 text-lg font-bold">
                  <FileText className="size-5" />
                  Thư xin việc
                </CardTitle>
              </CardHeader>
              <CardContent>
                <blockquote className="border-primary/40 text-muted-foreground border-l-4 pl-4 text-sm leading-relaxed whitespace-pre-line italic">
                  {coverLetter}
                </blockquote>
              </CardContent>
            </Card>
          )}

          {/* CV / attachments */}
          {cvFile && (
            <Card>
              <CardHeader>
                <CardTitle className="text-primary bg-secondary-container/20 flex items-center gap-2 rounded-lg px-2 py-1 text-lg font-bold">
                  <Paperclip className="size-5" />
                  Tệp đính kèm
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-muted/50 flex items-center gap-3 rounded-xl border p-4">
                  <div className="bg-primary/10 flex size-10 items-center justify-center rounded-lg">
                    <FileText className="text-primary size-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">
                      {cvFile.name}
                    </p>
                    {(cvFile.fileType || cvFile.fileSize) && (
                      <p className="text-muted-foreground mt-0.5 text-xs">
                        {cvFile.fileType?.toUpperCase()}
                        {cvFile.fileSize
                          ? ` · ${formatFileSize(cvFile.fileSize)}`
                          : ""}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 gap-2">
                    <Button variant="outline" size="sm" onClick={openCvPreview}>
                      <Eye className="size-3.5" />
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={cvFile.fileUrl} download={cvFile.name}>
                        <Download className="size-3.5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* ── Right col ── */}
        <div className="space-y-4">
          {/* Job position card */}
          <Card className="bg-primary/95 overflow-hidden">
            <CardContent className="space-y-4 px-5">
              <p className="text-primary-foreground text-lg font-semibold tracking-wider">
                Vị trí ứng tuyển
              </p>
              {/* Company logo + name */}
              <div className="flex items-center gap-3">
                <div className="bg-background/10 flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-lg text-sm font-bold">
                  {job?.company?.logoUrl ? (
                    <img
                      src={job.company.logoUrl}
                      alt={job.company.name}
                      className="size-full object-cover"
                    />
                  ) : (
                    <span className="text-background">
                      {job?.company?.name?.[0]}
                    </span>
                  )}
                </div>
                <div>
                  <p
                    className="text-primary-foreground cursor-pointer text-sm font-bold hover:underline"
                    onClick={() => {
                      navigate(`/companies/${job?.company.id}`);
                    }}
                  >
                    {job?.title}
                  </p>
                </div>
              </div>
              {/* Job meta */}
              <div className="space-y-2">
                {job?.salary && (
                  <div className="text-background/70 flex items-center gap-1 text-xs">
                    <CircleDollarSign className="size-3.5 shrink-0" />
                    Mức lương: {job.salary}
                  </div>
                )}
                {typeLabel && (
                  <div className="text-background/70 flex items-center gap-1 text-xs">
                    <Clock className="size-3.5 shrink-0" />
                    Hình thức: {typeLabel}
                  </div>
                )}
              </div>
              <Separator className="bg-primary-foreground" />
              <div className="text-muted flex items-center gap-2 text-xs font-medium">
                <ChartNoAxesCombined className="size-3.5 shrink-0" />
                <p>Trạng thái hồ sơ </p>
                <Badge
                  className={`${config?.className} ml-auto shrink-0 gap-1.5 border px-3 py-1 text-xs`}
                >
                  {StatusIcon && <StatusIcon className="size-3.5" />}
                  {statusLabel}
                </Badge>
              </div>

              {interviewDate && (
                <div className="text-muted flex items-center gap-2 text-xs font-medium">
                  <CalendarDays className="size-3.5 shrink-0" />
                  <span>Lịch hẹn </span>
                  <div className="ml-auto">
                    {formatDate(interviewDate)}
                    {interviewTime ? ` · ${interviewTime}` : ""}
                  </div>
                </div>
              )}
              <div className="text-muted flex items-center gap-2 text-xs font-medium">
                <CalendarClock className="size-3.5 shrink-0" />
                <p>Ngày nộp</p>
                <p className="ml-auto">{formatDate(createdAt)}</p>
              </div>

              {isRecruiter && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full py-4 text-sm font-bold"
                >
                  <CalendarClockIcon className="size-5 shrink-0" />
                  Sửa lịch hẹn
                </Button>
              )}
            </CardContent>
          </Card>

          {/* HR Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary bg-secondary-container/20 flex items-center gap-2 rounded-lg px-2 py-1 text-lg font-bold">
                <NotebookPen className="size-5" />
                Ghi chú HR
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {note ? (
                <blockquote className="border-primary/40 text-muted-foreground border-l-4 pl-3 text-sm leading-relaxed italic">
                  {note}
                </blockquote>
              ) : (
                <p className="text-muted-foreground text-sm">
                  Chưa có ghi chú nào.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Quick assessment */}
          {status !== "PENDING" && status !== "REJECTED" && (
            <Card>
              <CardHeader>
                <CardTitle className="text-primary bg-secondary-container/20 flex items-center gap-2 rounded-lg px-2 py-1 text-lg font-bold">
                  <Star className="size-5" fill="currentColor" />
                  Đánh giá nhanh
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <AssessmentBar label="Kinh nghiệm" score={9} />
                <AssessmentBar label="Kỹ năng" score={8} />
                <AssessmentBar label="Thái độ" score={10} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* CV Preview modal */}
      {cvFile && (
        <CvPreviewDialog
          open={cvPreviewOpen}
          onClose={closeCvPreview}
          cv={cvFile}
        />
      )}
    </div>
  );
}

export default ApplicationDetail;
