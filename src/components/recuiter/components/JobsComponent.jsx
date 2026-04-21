import { formatVN } from "@/utils/helper";

export function JobInitials({ title }) {
  const initials = title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
  return (
    <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-md text-xs font-bold">
      {initials}
    </div>
  );
}

export function DeadlineCell({ deadline }) {
  if (!deadline)
    return <span className="text-muted-foreground text-sm">Chưa đặt</span>;
  const days = Math.ceil(
    (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24),
  );
  const formatted = formatVN(deadline);
  return (
    <div>
      <p className="text-sm font-semibold">{formatted}</p>
      {days > 7 ? (
        <p className="text-muted-foreground text-xs">Còn {days} ngày</p>
      ) : days > 0 ? (
        <p className="text-destructive text-xs font-medium">Sắp hết hạn</p>
      ) : (
        <p className="text-destructive text-xs font-medium">Đã hết hạn</p>
      )}
    </div>
  );
}
