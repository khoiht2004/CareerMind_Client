export function AssessmentBar({ label, score, max = 10 }) {
  const pct = Math.min(100, (score / max) * 100);
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold">{label}</span>
        <span className="text-muted-foreground text-xs font-semibold">
          {score}/{max}
        </span>
      </div>
      <div className="bg-muted h-1.5 overflow-hidden rounded-full">
        <div
          className="bg-primary/80 h-full rounded-full"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export function UserInfo({ icon, label }) {
  const Icon = icon;
  return (
    <div className="flex items-center gap-2">
      <div className="text-secondary bg-primary/10 flex size-8 items-center justify-center rounded-lg">
        <Icon className="size-4" />
      </div>
      <p className="text-primary font-medium">{label}</p>
    </div>
  );
}
