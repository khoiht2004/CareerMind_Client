import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import {
  ArrowLeft,
  Loader2,
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  FileText,
  Building2,
  User,
  Mail,
  Phone,
  Calendar,
  Video,
  MonitorSmartphone,
  Eye,
  Download,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetApplicationByIdQuery } from "@/services/application.service";
import { formatDate, formatFileSize, formatVN } from "@/utils/helper";
import {
  APPLICATION_STATUS_LABELS,
  JOB_TYPE_LABELS,
  STATUS_CONFIG,
} from "@/config/constants/candidate.constant";
import CvPreviewDialog from "@/components/shared/CvPreviewDialog";

function DetailRow({ icon, label, value }) {
  const Icon = icon;
  if (!value) return null;
  return (
    <div className="flex items-start gap-2 text-sm">
      <Icon className="text-muted-foreground mt-0.5 size-4 shrink-0" />
      <div>
        <span className="text-muted-foreground text-xs">{label}: </span>
        <span className="font-medium">{value}</span>
      </div>
    </div>
  );
}

function ApplicationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: response, isLoading, isError } = useGetApplicationByIdQuery(id);
  const application = response?.data;
  const [cvPreviewOpen, setCvPreviewOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="text-muted-foreground size-8 animate-spin" />
      </div>
    );
  }

  if (isError || !application) {
    return (
      <div className="text-muted-foreground p-6 text-center">
        <p className="font-medium">Không tìm thấy đơn ứng tuyển này</p>
        <Button variant="link" onClick={() => navigate(-1)}>
          Quay lại
        </Button>
      </div>
    );
  }

  const {
    job,
    status,
    createdAt,
    coverLetter,
    note,
    cvUrl,
    cv, // linked Cv record (has name, fileUrl, fileType, fileSize)
    user,
    interviewDate,
    interviewTime,
    interviewFormat,
    interviewLocation,
    confirmDeadline,
    startDate,
    startTime,
    officeAddress,
  } = application;

  // Use the linked Cv object if available, otherwise fall back to a plain cvUrl
  const cvFile =
    cv ??
    (cvUrl
      ? {
          name: "CV đính kèm",
          fileUrl: cvUrl,
          fileType: cvUrl.endsWith(".pdf") ? "pdf" : null,
        }
      : null);

  const cfg = STATUS_CONFIG[status];
  const StatusIcon = cfg?.icon;
  const statusLabel = APPLICATION_STATUS_LABELS[status] ?? status;
  const typeLabel = JOB_TYPE_LABELS[job?.type] ?? job?.type;

  const interviewFormatLabel =
    interviewFormat === "ONLINE"
      ? "Online"
      : interviewFormat === "DIRECT"
        ? "Trực tiếp"
        : null;

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors"
      >
        <ArrowLeft className="size-4" />
        Quay lại
      </button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left - applicant content */}
        <div className="space-y-5 lg:col-span-2">
          {/* Applicant info */}
          {user &&
            (user.profile?.fullName || user.email || user.profile?.phone) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <User className="size-4" />
                    Thông tin ứng viên
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {user.profile?.fullName && (
                    <div className="flex items-center gap-2 text-sm">
                      <User className="text-muted-foreground size-4 shrink-0" />
                      <span>{user.profile.fullName}</span>
                    </div>
                  )}
                  {user.email && (
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="text-muted-foreground size-4 shrink-0" />
                      <span>{user.email}</span>
                    </div>
                  )}
                  {user.profile?.phone && (
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="text-muted-foreground size-4 shrink-0" />
                      <span>{user.profile.phone}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

          {/* Interview info - shown when status is INTERVIEW */}
          {status === "INTERVIEW" &&
            (interviewDate ||
              interviewTime ||
              interviewFormat ||
              interviewLocation ||
              confirmDeadline) && (
              <Card className="border-blue-200 dark:border-blue-900">
                <CardHeader className="pb-3">
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
                    icon={
                      interviewFormat === "ONLINE" ? Video : MonitorSmartphone
                    }
                    label="Hình thức"
                    value={interviewFormatLabel}
                  />
                  <DetailRow
                    icon={MapPin}
                    label={
                      interviewFormat === "ONLINE"
                        ? "Link phỏng vấn"
                        : "Địa điểm"
                    }
                    value={interviewLocation}
                  />
                  <DetailRow
                    icon={Clock}
                    label="Hạn phản hồi"
                    value={formatVN(confirmDeadline)}
                  />
                </CardContent>
              </Card>
            )}

          {/* Accepted info - shown when status is ACCEPTED */}
          {status === "ACCEPTED" &&
            (startDate || startTime || officeAddress) && (
              <Card className="border-green-200 dark:border-green-900">
                <CardHeader className="pb-3">
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
            )}

          {/* Cover letter */}
          {coverLetter && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="size-4" />
                  Thư xin việc
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                  {coverLetter}
                </p>
              </CardContent>
            </Card>
          )}

          {/* CV */}
          {cvFile && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="size-4" />
                  CV đính kèm
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {/* Metadata row */}
                <div className="bg-muted flex items-center gap-3 rounded-lg px-4 py-3">
                  <FileText className="text-primary size-5 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">
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
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCvPreviewOpen(true)}
                  >
                    <Eye className="mr-1.5 size-3.5" />
                    Xem CV
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href={cvFile.fileUrl} download={cvFile.name}>
                      <Download className="mr-1.5 size-3.5" />
                      Tải xuống
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right - job info + status */}
        <div className="space-y-4">
          {/* Job info */}
          <Card>
            <CardContent className="space-y-4 p-5 pt-0">
              <div className="flex items-center gap-3">
                <Building2 className="text-muted-foreground size-5" />
                <h3 className="text-sm font-semibold">Thông tin công việc</h3>
              </div>
              <Separator />

              <div className="space-y-3">
                <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-xl text-base font-bold">
                  {job?.company?.[0]}
                </div>
                <div>
                  <p className="text-sm font-semibold">{job?.title}</p>
                  <p className="text-muted-foreground text-xs">
                    {job?.company}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                {job?.location && (
                  <div className="text-muted-foreground flex items-center gap-2 text-xs">
                    <MapPin className="size-3.5 shrink-0" />
                    {job.location}
                  </div>
                )}
                {job?.salary && (
                  <div className="text-muted-foreground flex items-center gap-2 text-xs">
                    <DollarSign className="size-3.5 shrink-0" />
                    {job.salary}
                  </div>
                )}
                {typeLabel && (
                  <div className="text-muted-foreground flex items-center gap-2 text-xs">
                    <Briefcase className="size-3.5 shrink-0" />
                    {typeLabel}
                  </div>
                )}
                {job?.deadline && (
                  <div className="text-muted-foreground flex items-center gap-2 text-xs">
                    <Clock className="size-3.5 shrink-0" />
                    Hạn nộp: {formatDate(job.deadline)}
                  </div>
                )}
              </div>

              {job?.id && (
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to={`/jobs/${job.id}`}>Xem chi tiết công việc</Link>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Application status */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Trạng thái ứng tuyển</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Badge
                className={`gap-1.5 border px-3 py-1 text-sm ${cfg?.className}`}
              >
                {StatusIcon && <StatusIcon className="size-4" />}
                {statusLabel}
              </Badge>

              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Clock className="size-4 shrink-0" />
                Ngày nộp: {new Date(createdAt).toLocaleDateString("vi-VN")}
              </div>

              {note && (
                <div className="bg-muted rounded-lg p-3">
                  <p className="mb-1 text-xs font-medium">
                    Ghi chú từ nhà tuyển dụng
                  </p>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {note}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* CV Preview modal */}
      {cvFile && (
        <CvPreviewDialog
          open={cvPreviewOpen}
          onClose={() => setCvPreviewOpen(false)}
          cv={cvFile}
        />
      )}
    </div>
  );
}

export default ApplicationDetail;
