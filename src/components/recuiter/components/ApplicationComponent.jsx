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

export function ApplicantAvatar({ user }) {
  const avatar = user?.profile.avatarUrl;
  const letter = user?.profile.fullName
    ? user.profile.fullName.charAt(0).toUpperCase()
    : "";
  return (
    <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold">
      {avatar ? (
        <img
          src={avatar}
          alt={letter}
          className="size-full rounded-full object-cover object-top"
        />
      ) : (
        letter
      )}
    </div>
  );
}
