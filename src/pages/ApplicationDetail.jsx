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
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetApplicationByIdQuery } from "@/services/application.service";
import { formatDate } from "@/utils/helper";
import {
  APPLICATION_STATUS_LABELS,
  JOB_TYPE_LABELS,
  STATUS_CONFIG,
} from "@/config/constants";

function ApplicationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: response, isLoading, isError } = useGetApplicationByIdQuery(id);
  const application = response?.data;

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

  const { job, status, createdAt, coverLetter, note, cvUrl, user } =
    application;
  const cfg = STATUS_CONFIG[status];
  const StatusIcon = cfg?.icon;
  const statusLabel = APPLICATION_STATUS_LABELS[status] ?? status;
  const typeLabel = JOB_TYPE_LABELS[job?.type] ?? job?.type;

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
          {cvUrl && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <FileText className="size-4" />
                  CV đính kèm
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="text-primary w-full sm:w-auto"
                  asChild
                >
                  <a href={cvUrl} target="_blank" rel="noopener noreferrer">
                    Xem CV đã nộp
                  </a>
                </Button>
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
    </div>
  );
}

export default ApplicationDetail;
