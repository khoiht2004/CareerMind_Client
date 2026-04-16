import CardVariant from "./CardVariant";
import HorizontalVariant from "./HorizontalVariant";

function JobCard({ job, isSaved = false, variant = "card" }) {
  if (variant === "horizontal") {
    // ── Variant: horizontal (dùng ở trang Home) ──────────────────────
    return <HorizontalVariant job={job} isSaved={isSaved} />;
  }
  // ── Variant: card (mặc định) ─────────────────────────────────────
  return <CardVariant job={job} isSaved={isSaved} />;
}

export default JobCard;
