/* eslint-disable no-unused-vars */
export function DetailRow({ icon: Icon, label, value }) {
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
