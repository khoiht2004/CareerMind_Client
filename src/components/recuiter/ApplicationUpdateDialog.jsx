/* eslint-disable no-unused-vars */
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  APPLICATION_STATUS_LABELS,
  STATUS_CONFIG,
} from "@/config/constants/candidate.constant";
import { VALID_APP_STATUSES } from "@/config/constants/recruiter.constant";

function InfoRow({ icon: Icon, label, value }) {
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
  onSubmit,
  isLoading,
}) {
  if (!app) return null;

  const profile = app.user?.profile;
  const name = profile?.fullName ?? app.user?.email ?? "Ứng viên";
  const phone = app.phone ?? profile?.phone;
  const initials = name
    .split(" ")
    .slice(-2)
    .map((w) => w[0]?.toUpperCase())
    .join("");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Chi tiết đơn ứng tuyển
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-1">
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
              <div className="bg-muted/40 max-h-40 overflow-y-auto rounded-lg border p-3.5 text-sm leading-relaxed whitespace-pre-wrap">
                {app.coverLetter}
              </div>
            </div>
          )}

          {/* ── Divider ── */}
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
              Cập nhật trạng thái
            </span>
            <div className="bg-border h-px flex-1" />
          </div>

          {/* ── Trạng thái ── */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">Trạng thái</Label>
            <Select value={status} onValueChange={onStatusChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {VALID_APP_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    <div className="flex items-center gap-2">
                      <span>{APPLICATION_STATUS_LABELS[s]}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* ── Phản hồi ── */}
          <div className="space-y-1.5">
            <Label className="text-sm font-medium">
              Phản hồi cho ứng viên
              <span className="text-muted-foreground ml-1 font-normal">
                (tùy chọn)
              </span>
            </Label>
            <Textarea
              rows={4}
              placeholder="Nhập phản hồi, ghi chú nội bộ hoặc lý do quyết định..."
              value={note}
              onChange={(e) => onNoteChange(e.target.value)}
              className="resize-none"
            />
            {app.note && app.note !== note && (
              <p className="text-muted-foreground text-xs">
                Phản hồi hiện tại: <span className="italic">{app.note}</span>
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="gap-2 border-t pt-4">
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
