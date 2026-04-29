import {
  APPLICATION_STATUS_LABELS,
  STATUS_CONFIG,
} from "@/config/constants/candidate.constant";

export function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${cfg?.className ?? ""}`}
    >
      {APPLICATION_STATUS_LABELS[status] ?? status}
    </span>
  );
}

export function ApplicantAvatar({ name }) {
  const letter = name ? name.charAt(0).toUpperCase() : "?";
  return (
    <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
      {letter}
    </div>
  );
}
