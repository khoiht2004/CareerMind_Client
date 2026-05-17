import { memo } from "react";
import { Building2, Heart, MapPin, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function CompanyLogo({ company }) {
  const companyName = company?.name ?? company ?? "Công ty";
  const logoUrl = company?.logoUrl;

  return (
    <div className="text-primary flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-md border bg-white text-center text-xs font-semibold">
      {logoUrl ? (
        <img
          src={logoUrl}
          alt={companyName}
          className="h-full w-full object-cover"
        />
      ) : (
        <span>CÔNG TY</span>
      )}
    </div>
  );
}

function HorizontalVariant({
  job,
  isSaved = false,
  compact = false,
  highlighted = false,
  actions = "heart",
}) {
  const companyName = job.company?.name ?? job.company ?? "Công ty đang tuyển";

  return (
    <div
      className={cn(
        "group hover:border-primary/50 min-w-0 cursor-pointer rounded-lg border bg-white p-3 shadow-sm transition hover:shadow-md",
        highlighted && "border-primary/30 bg-emerald-50/50",
        compact ? "items-center" : "items-start",
      )}
      onClick={() =>
        window.open(`/jobs/${job.id}`, "_blank", "noopener,noreferrer")
      }
    >
      {/* Section 1 */}
      <section className="flex gap-3">
        <CompanyLogo company={job.company} />
        <div className="min-w-0 flex-1">
          <div className="flex gap-2">
            <h3
              className={cn(
                "group-hover:text-primary line-clamp-2 flex-1 font-bold text-slate-800",
                compact ? "text-sm" : "text-[15px]",
              )}
            >
              {job.title}
            </h3>
          </div>
          <p className="mt-1 line-clamp-1 text-xs text-slate-500 uppercase">
            {companyName}
          </p>
        </div>
      </section>

      {/* Section 2 */}
      <section className="flex justify-between">
        <div className="mt-2 flex shrink-0 items-center gap-2 self-stretch">
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
            {job.salary || "Thoả thuận"}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
            {job.location || "Hà Nội"}
          </span>
        </div>
        <div className="flex shrink-0 items-end self-stretch">
          {actions === "both" ? (
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="size-8 rounded-md text-slate-400"
              >
                <Trash2 className="size-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="text-primary size-8 rounded-md"
              >
                <Heart className="size-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="icon"
              className="text-primary size-8 rounded-full"
            >
              <Heart className={cn("size-4", isSaved && "fill-primary")} />
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}

export default memo(HorizontalVariant);
