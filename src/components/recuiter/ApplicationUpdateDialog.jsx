import {
  Loader2,
  ExternalLink,
  Phone,
  Mail,
  Calendar,
  Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  APPLICATION_STATUS_LABELS,
  STATUS_CONFIG,
} from "@/config/constants/candidate.constant";
import { VALID_APP_STATUSES } from "@/config/constants/recruiter.constant";
import InterviewFields from "./InterviewFields";
import AcceptedFields from "./AcceptedFields";

function InfoRow({ icon, label, value }) {
  const Icon = icon;
  if (!value) return null;
  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon className="text-muted-foreground size-3.5 shrink-0" />
      <span className="text-muted-foreground text-xs">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${cfg?.className ?? ""}`}
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
  if (!app) return null;

  const profile = app.user?.profile;
  const name = profile?.fullName ?? app.user?.email ?? "Ứng viên";
  const phone = app.phone ?? profile?.phone;
  const bio = profile?.bio;
  const skills = profile?.skills ?? [];
  const initials = name
    .split(" ")
    .slice(-2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[92vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-2xl">
        {/* ── Fixed Header ── */}
        <DialogHeader className="shrink-0 border-b px-6 pt-5 pb-4">
          <DialogTitle className="text-lg font-semibold">
            Chi tiết đơn ứng tuyển
          </DialogTitle>
        </DialogHeader>

        {/* ── Scrollable Body ── */}
        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* ── Thông tin ứng viên ── */}
          <div className="bg-muted/40 rounded-xl border p-4">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-zinc-200 text-sm font-bold text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
                {profile?.avatarUrl ? (
                  <img
                    src={profile.avatarUrl}
                    alt={name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  initials
                )}
              </div>

              {/* Info */}
              <div className="min-w-0 flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-base font-semibold">{name}</h3>
                  <StatusBadge status={app.status} />
                </div>
                <InfoRow icon={Mail} label="Email" value={app.user?.email} />
                <InfoRow icon={Phone} label="Điện thoại" value={phone} />
                <InfoRow
                  icon={Briefcase}
                  label="Vị trí"
                  value={app.job?.title}
                />
                <InfoRow
                  icon={Calendar}
                  label="Ngày nộp"
                  value={new Date(app.createdAt).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                />
                {bio && (
                  <>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-semibold tracking-wider uppercase">
                        Giới thiệu
                      </p>
                    </div>
                    <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                      {bio}
                    </p>
                  </>
                )}
                {skills.length > 0 && (
                  <>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs font-semibold tracking-wider uppercase">
                        Kỹ năng
                      </p>
                    </div>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {skills.map((skill, i) => (
                        <span
                          key={i}
                          className="bg-muted rounded-full border border-gray-300 px-2 py-0.5 text-xs font-medium"
                        >
                          {typeof skill === "string"
                            ? skill
                            : (skill?.name ?? skill)}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ── CV ── */}
          {app.cvUrl && (
            <div className="flex items-center justify-between rounded-lg border px-4 py-3">
              <div>
                <p className="text-sm font-medium">CV đính kèm</p>
                <p className="text-muted-foreground text-xs">
                  Ứng viên đã tải lên CV
                </p>
              </div>
              <a
                href={app.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:bg-accent inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs font-medium transition-colors"
              >
                Xem CV <ExternalLink className="size-3" />
              </a>
            </div>
          )}

          {/* ── Thư giới thiệu ── */}
          {app.coverLetter && (
            <div className="space-y-2">
              <Label className="text-sm font-medium">Thư giới thiệu</Label>
              <div className="bg-muted/40 max-h-60 overflow-y-auto rounded-lg border p-3.5 text-sm leading-relaxed whitespace-pre-wrap">
                {app.coverLetter}
              </div>
            </div>
          )}

          {/* ── Cập nhật trạng thái ── */}
          <div className="bg-muted/40 space-y-4 rounded-xl border p-4">
            <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
              Cập nhật trạng thái
            </p>

            {/* Status */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">Trạng thái</Label>
              <div className="flex gap-2">
                {VALID_APP_STATUSES.map((s) => {
                  const cfg = STATUS_CONFIG[s];
                  const Icon = cfg?.icon;
                  const selected = status === s;
                  return (
                    <button
                      key={s}
                      type="button"
                      onClick={() => onStatusChange(s)}
                      className={`flex flex-1 cursor-pointer flex-col items-center gap-1 rounded-lg border px-1 py-2.5 text-xs font-medium transition-all ${
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

            {/* Phản hồi ứng viên */}
            <div className="space-y-1.5">
              <Label className="text-sm font-medium">
                Phản hồi cho ứng viên
                <span className="text-muted-foreground ml-1 font-normal">
                  (tùy chọn)
                </span>
              </Label>
              <Textarea
                rows={3}
                placeholder="Ghi chú nội bộ hoặc lý do quyết định..."
                value={note}
                onChange={(e) => onNoteChange(e.target.value)}
                className="resize-none"
              />
              {app.note && app.note !== note && (
                <p className="text-muted-foreground text-xs">
                  Hiện tại: <span className="italic">{app.note}</span>
                </p>
              )}
            </div>

            {/* Interview fields */}
            {status === "INTERVIEW" && (
              <InterviewFields
                fields={interviewFields}
                onFieldChange={onInterviewFieldChange}
              />
            )}

            {/* Accepted fields */}
            {status === "ACCEPTED" && (
              <AcceptedFields
                fields={acceptedFields}
                onFieldChange={onAcceptedFieldChange}
              />
            )}

            {/* Checkbox gửi email */}
            <div className="flex items-center gap-2.5 rounded-lg border px-4 py-3">
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
        </div>

        {/* ── Fixed Footer ── */}
        <DialogFooter className="mx-0 mb-0 shrink-0 gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Hủy
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isLoading}
            className="min-w-[100px]"
          >
            {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
            Lưu thay đổi
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ApplicationUpdateDialog;
