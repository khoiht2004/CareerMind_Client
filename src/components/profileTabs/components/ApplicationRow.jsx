import { memo, useCallback } from "react";
import { useNavigate } from "react-router";
import { MoreVertical, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  APPLICATION_STATUS_LABELS,
  STATUS_CONFIG,
} from "@/config/constants/candidate.constant";
import { formatRelativeTime } from "@/utils/helper";

const STATUS_BORDER = {
  DRAFT: "var(--border)",
  PENDING: "var(--status-pending-border)",
  REVIEWING: "var(--status-reviewing-border)",
  INTERVIEW: "var(--status-interview-border)",
  ACCEPTED: "var(--status-accepted-border)",
  REJECTED: "var(--status-rejected-border)",
};

const RIGHT_CONTENT = {
  DRAFT: {
    label: "HỒ SƠ NHÁP",
    detail: "Chưa hoàn thành hồ sơ",
    btnText: "Chỉnh sửa",
    btnVariant: "default",
  },
  PENDING: {
    label: "CẬP NHẬT CUỐI",
    detail: "Hồ sơ đã gửi",
    btnText: "Xem chi tiết",
    btnVariant: "outline",
  },
  REVIEWING: {
    label: "CẬP NHẬT CUỐI",
    detail: "Hồ sơ đã xem",
    btnText: "Xem chi tiết",
    btnVariant: "outline",
  },
  INTERVIEW: {
    label: "VÒNG TIẾP THEO",
    detail: "Phỏng vấn kỹ thuật",
    btnText: "Xem chi tiết",
    btnVariant: "default",
  },
  ACCEPTED: {
    label: "KẾT QUẢ",
    detail: "Đã được nhận",
    btnText: "Xem chi tiết",
    btnVariant: "default",
  },
  REJECTED: {
    label: "KẾT QUẢ",
    detail: "Không phù hợp",
    btnText: "Xem phản hồi",
    btnVariant: "outline",
  },
};

function ApplicationCard({ app, onDeleteClick }) {
  const navigate = useNavigate();
  const cfg = STATUS_CONFIG[app.status];
  const Icon = cfg?.icon;
  const label = APPLICATION_STATUS_LABELS[app.status] ?? app.status;
  const right = RIGHT_CONTENT[app.status] ?? RIGHT_CONTENT.DRAFT;
  const borderColor = STATUS_BORDER[app.status] ?? "var(--border)";
  const initials = (app.job?.company?.name ?? "C").charAt(0).toUpperCase();

  const handleNavigate = useCallback(() => {
    if (app.status === "DRAFT") {
      navigate(`/jobs/${app.job?.id}/apply`, { state: { draft: app } });
    } else {
      navigate(`/applications/${app.id}`);
    }
  }, [navigate, app]);

  const handleDelete = useCallback(() => {
    onDeleteClick(app);
  }, [onDeleteClick, app]);

  return (
    <div
      className="bg-card border-border flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-l-4 p-4 transition-all hover:shadow-sm"
      style={{ borderLeftColor: borderColor }}
    >
      <div className="flex items-start gap-4 w-full sm:w-auto flex-1 min-w-0">
        {/* Company avatar */}
        <div className="size-12 shrink-0 rounded-lg overflow-hidden bg-muted flex items-center justify-center font-bold text-lg text-muted-foreground">
          {app.job?.company?.logoUrl ? (
            <img
              src={app.job?.company?.logoUrl}
              alt={app.job?.company?.name}
              className="w-full h-full object-cover rounded-lg border-0"
            />
          ) : (
            initials
          )}
        </div>

        {/* Main info */}
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <Badge className={`gap-1 border text-[10px] sm:text-xs ${cfg?.className}`}>
              {Icon && <Icon className="size-3" />}
              {label ?? "Bản nháp"}
            </Badge>
            <span className="text-muted-foreground text-[10px] sm:text-xs">
              Đã ứng tuyển {formatRelativeTime(app.createdAt)}
            </span>
          </div>
          <h4 className="text-foreground truncate font-semibold text-sm sm:text-base">
            {app.job?.title}
          </h4>
          <p className="text-muted-foreground truncate text-xs sm:text-sm">
            {app.job?.company?.name}
            {app.job?.location && (
              <>
                {" "}
                • <span className="text-secondary">{app.job?.location}</span>
              </>
            )}
          </p>
        </div>

        {/* Dropdown actions on mobile (visible next to main info) */}
        <div className="sm:hidden shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-8 cursor-pointer"
              >
                <MoreVertical className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={handleNavigate}
                className="cursor-pointer text-xs font-semibold"
              >
                {right.btnText}
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={handleDelete}
                className="text-destructive focus:text-destructive cursor-pointer text-xs font-semibold"
              >
                <Trash2 className="mr-2 size-4" />
                Xóa đơn
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Right section for Desktop */}
      <div className="hidden sm:block shrink-0 text-right">
        <p className="text-muted-foreground mb-0.5 text-xs font-bold tracking-wider uppercase">
          {right.label}
        </p>
        <p className="text-foreground mb-2 text-xs font-medium">
          {right.detail}
        </p>
        <Button
          size="sm"
          variant={right.btnVariant}
          className="cursor-pointer font-semibold text-xs h-8"
          onClick={handleNavigate}
        >
          {right.btnText}
        </Button>
      </div>

      {/* Bottom section for Mobile */}
      <div className="flex sm:hidden items-center justify-between w-full pt-3 mt-1 border-t border-border/50">
        <div className="text-left">
          <p className="text-[9px] text-muted-foreground font-bold tracking-wider uppercase">
            {right.label}
          </p>
          <p className="text-xs font-semibold text-foreground mt-0.5">
            {right.detail}
          </p>
        </div>
        <Button
          size="sm"
          variant={right.btnVariant}
          className="cursor-pointer text-xs font-bold px-3 py-1.5 h-8"
          onClick={handleNavigate}
        >
          {right.btnText}
        </Button>
      </div>

      {/* Dropdown actions for Desktop */}
      <div className="hidden sm:block shrink-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-8 shrink-0 cursor-pointer"
            >
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-destructive focus:text-destructive cursor-pointer text-xs font-semibold"
            >
              <Trash2 className="mr-2 size-4" />
              Xóa đơn
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default memo(ApplicationCard);
