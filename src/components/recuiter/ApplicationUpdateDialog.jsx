/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useCallback, useState } from "react";
import { Loader2, Eye, Phone, Mail, MapPin, FileText } from "lucide-react";
import CvPreviewDialog from "@/components/shared/CvPreviewDialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  APPLICATION_STATUS_LABELS,
  STATUS_CONFIG,
} from "@/config/constants/candidate.constant";
import { VALID_APP_STATUSES } from "@/config/constants/recruiter.constant";
import useApplicationProfile from "@/hooks/useApplicationProfile";
import InterviewFields from "./InterviewFields";
import AcceptedFields from "./components/AcceptedFields";
import { Separator } from "../ui/separator";
import { buildCvPreview } from "@/utils/recruiter.helper";
import ImagePreviewModal from "../shared/ImagePreviewModal";
import {
  DEFAULT_TYPE_CONFIG,
  FILE_TYPE_CONFIG,
} from "@/config/constants/attachment.constants";

function SectionLabel({ children }) {
  return (
    <p className="text-muted-foreground mb-2 text-xs font-semibold tracking-widest uppercase">
      {children}
    </p>
  );
}

function InfoRow({ icon: Icon, value }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon className="text-muted-foreground size-3.5 shrink-0" />
      <span className="text-foreground/80 truncate text-xs">{value}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={`rounded-md border px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap ${cfg?.className ?? ""}`}
    >
      {APPLICATION_STATUS_LABELS[status] ?? status}
    </span>
  );
}

function ApplicationUpdateDialog({
  open,
  onOpenChange,
  app,
  status,
  onStatusChange,
  note,
  onNoteChange,
  sendEmail,
  onSendEmailChange,
  interviewFields,
  onInterviewFieldChange,
  acceptedFields,
  onAcceptedFieldChange,
  onSubmit,
  isLoading,
}) {
  const [previewCv, setPreviewCv] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const handleOpen = useCallback(() => setPreviewOpen(true), []);
  const handleClose = useCallback(() => setPreviewOpen(false), []);

  if (!app) return null;

  const { profile, name, phone, bio, skills, initials } =
    useApplicationProfile(app);

  const typeConfig =
    FILE_TYPE_CONFIG[app?.cv?.fileType?.toLowerCase()] ?? DEFAULT_TYPE_CONFIG;

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="flex max-h-[92vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-4xl"
          showCloseButton={false}
        >
          <DialogTitle className="sr-only">Cập nhật đơn ứng tuyển</DialogTitle>
          <DialogDescription className="sr-only">
            Xem thông tin chi tiết hồ sơ ứng viên và cập nhật trạng thái tuyển
            dụng.
          </DialogDescription>
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden md:flex-row">
            {/* ── Left sidebar ── */}
            <aside className="bg-muted border-border flex max-h-72 w-full shrink-0 flex-col gap-0 overflow-y-auto border-b p-4 [scrollbar-width:thin] md:max-h-none md:w-64 md:gap-4 md:border-r md:border-b-0 md:p-5">
              {/* Avatar + name */}
              <div className="flex items-center gap-10 text-center md:flex-col md:gap-1">
                <div className="relative">
                  <div className="bg-muted border-border text-muted-foreground flex size-20 -rotate-3 items-center justify-center overflow-hidden rounded-md border-2 text-base font-bold">
                    {profile?.avatarUrl ? (
                      <>
                        <img
                          src={profile.avatarUrl}
                          alt={name}
                          loading="lazy"
                          onClick={handleOpen}
                          className="h-full w-full cursor-pointer object-cover object-top"
                        />
                        <ImagePreviewModal
                          src={profile.avatarUrl}
                          alt={name}
                          open={previewOpen}
                          onClose={handleClose}
                        />
                      </>
                    ) : (
                      initials
                    )}
                  </div>
                  <div className="absolute -bottom-1 left-[20%]">
                    <StatusBadge status={app.status} />
                  </div>
                </div>
                {/* Name and job */}
                <div className="mt-3 hidden md:block">
                  <h3 className="text-lg leading-tight font-bold">{name}</h3>
                  {app.job?.title && (
                    <p className="text-secondary mt-0.5 text-xs font-semibold">
                      {app.job.title}
                    </p>
                  )}
                </div>

                {/* Contact info - mobile */}
                <div className="mt-3 block md:hidden">
                  <SectionLabel>Thông tin liên hệ</SectionLabel>
                  <div className="space-y-1.5">
                    <InfoRow icon={Mail} value={app.user?.email} />
                    <InfoRow icon={Phone} value={phone} />
                    <InfoRow icon={MapPin} value={profile?.address} />
                  </div>
                </div>
              </div>

              {/* Contact info - desktop */}
              <div className="mt-3 hidden md:block">
                <SectionLabel>Thông tin liên hệ</SectionLabel>
                <div className="space-y-1.5">
                  <InfoRow icon={Mail} value={app.user?.email} />
                  <InfoRow icon={Phone} value={phone} />
                  <InfoRow icon={MapPin} value={profile?.address} />
                </div>
              </div>

              {/* Skills */}
              {skills.length > 0 && (
                <div className="mt-3">
                  <SectionLabel>Kỹ năng</SectionLabel>
                  <div className="flex flex-wrap gap-1">
                    {skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-card rounded-md border px-2 py-0.5 text-xs font-medium"
                      >
                        {typeof skill === "string"
                          ? skill
                          : (skill?.name ?? skill)}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <Separator className={"hidden md:block"} />

              {/* CV */}
              {(app.cv?.fileUrl ?? app.cvUrl) && (
                <div className="hidden md:block">
                  <SectionLabel>CV đính kèm</SectionLabel>
                  <button
                    type="button"
                    onClick={() => setPreviewCv(buildCvPreview(app))}
                    className="bg-card hover:bg-accent flex w-full cursor-pointer items-center gap-2.5 rounded-lg border px-3 py-2 transition-colors"
                  >
                    <div
                      className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${typeConfig.bgClass}`}
                    >
                      <FileText className={`size-5 ${typeConfig.iconClass}`} />
                    </div>
                    <span className="text-muted-foreground min-w-0 flex-1 truncate text-left text-xs">
                      {app.cv?.name ?? "CV đã tải lên"}
                    </span>
                    <Eye className="text-muted-foreground size-3.5 shrink-0" />
                  </button>
                </div>
              )}
            </aside>

            {/* ── Right panel ── */}
            <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5 [scrollbar-width:thin] sm:px-6">
              {/* Giới thiệu */}
              {bio && (
                <div>
                  <SectionLabel>Giới thiệu</SectionLabel>
                  <p className="text-muted-foreground text-sm leading-relaxed italic">
                    "{bio}"
                  </p>
                </div>
              )}

              {/* Thư giới thiệu */}
              {app.coverLetter && (
                <div>
                  <SectionLabel>Thư giới thiệu</SectionLabel>
                  <div className="bg-muted border-secondary max-h-60 overflow-y-auto rounded-lg border-l-3 p-3.5 text-sm leading-relaxed whitespace-pre-wrap [scrollbar-width:thin]">
                    {app.coverLetter}
                  </div>
                </div>
              )}

              {/* Cập nhật trạng thái */}
              <div className="space-y-4">
                <div>
                  <SectionLabel>Cập nhật trạng thái</SectionLabel>
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
                    {VALID_APP_STATUSES.map((s) => {
                      const cfg = STATUS_CONFIG[s];
                      const Icon = cfg?.icon;
                      const selected = status === s;
                      return (
                        <button
                          key={s}
                          type="button"
                          onClick={() => onStatusChange(s)}
                          className={`flex min-w-0 cursor-pointer flex-col items-center gap-1 rounded-lg border px-1 py-2.5 text-xs font-medium transition-all ${
                            selected
                              ? `${cfg?.className} shadow-sm`
                              : "border-input bg-background text-muted-foreground hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          {Icon && <Icon className="size-4" />}
                          <span className="text-center leading-tight">
                            {APPLICATION_STATUS_LABELS[s]}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Interview / Accepted extra fields */}
                {status === "INTERVIEW" && (
                  <InterviewFields
                    fields={interviewFields}
                    onFieldChange={onInterviewFieldChange}
                  />
                )}
                {status === "ACCEPTED" && (
                  <AcceptedFields
                    fields={acceptedFields}
                    onFieldChange={onAcceptedFieldChange}
                  />
                )}

                {/* Note */}
                <div className="space-y-1.5">
                  <Label className="text-sm font-medium">
                    Phản hồi nội bộ
                    <span className="text-muted-foreground font-normal">
                      (tùy chọn)
                    </span>
                  </Label>
                  <Textarea
                    rows={3}
                    placeholder="Nhập nhận xét về ứng viên..."
                    value={note}
                    onChange={(e) => onNoteChange(e.target.value)}
                    className="bg-primary/10 resize-none"
                  />
                  {app.note && app.note !== note && (
                    <p className="text-muted-foreground text-xs">
                      Hiện tại: <span className="italic">{app.note}</span>
                    </p>
                  )}
                </div>

                {/* Send email checkbox */}
                <div className="flex items-center gap-2.5 rounded-lg py-3">
                  <Checkbox
                    id="send-email"
                    checked={sendEmail}
                    onCheckedChange={onSendEmailChange}
                  />
                  <label
                    htmlFor="send-email"
                    className="cursor-pointer text-sm select-none"
                  >
                    Gửi email thông báo cho ứng viên
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2.5">
                <Button
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isLoading}
                  className="cursor-pointer"
                >
                  Hủy
                </Button>
                <Button
                  onClick={onSubmit}
                  disabled={isLoading}
                  className="min-w-[120px] cursor-pointer"
                >
                  {isLoading && (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  )}
                  Lưu thay đổi
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <CvPreviewDialog
        open={!!previewCv}
        onClose={() => setPreviewCv(null)}
        cv={previewCv}
      />
    </>
  );
}

export default ApplicationUpdateDialog;
