import { memo } from "react";
import { Flame, Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function CompanyLogo({ company }) {
  const companyName = company?.name ?? company ?? "Công ty";
  const logoUrl = company?.logoUrl;

  return (
    <div className="text-primary bg-card flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-md border text-center text-xs font-semibold">
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
}) {
  const companyName = job.company?.name ?? job.company ?? "Công ty đang tuyển";

  return (
    <div
      className={cn(
        "group hover:border-primary/50 bg-card min-w-0 cursor-pointer rounded-lg border p-3 shadow-sm transition hover:shadow-md",
        highlighted && "border-primary/30 bg-primary/5",
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
                "text-foreground group-hover:text-primary line-clamp-2 flex-1 font-bold",
                compact ? "text-sm" : "text-[15px]",
              )}
            >
              {job.title}
            </h3>
          </div>
          <p className="text-muted-foreground mt-1 line-clamp-1 text-xs uppercase">
            {companyName}
          </p>
        </div>
      </section>

      {/* Section 2 */}
      <section className="flex justify-between">
        <div className="mt-2 flex shrink-0 items-center gap-2 self-stretch">
          <span className="bg-muted text-muted-foreground rounded-full px-2.5 py-1 text-xs font-medium">
            {job.salary || "Thoả thuận"}
          </span>
          <span className="bg-muted text-muted-foreground rounded-full px-2.5 py-1 text-xs font-medium">
            {job.location || "Hà Nội"}
          </span>
        </div>
        <div className="flex shrink-0 items-end self-stretch">
          <div className="flex items-center gap-2">
            {job.isHot ? (
              <Flame className="bg-hot text-hot-foreground fill-hot-foreground size-5 rounded-full p-1" />
            ) : null}
            <Button
              variant="outline"
              size="icon"
              className="hover:text-primary size-8 rounded-full bg-none"
            >
              <Heart className={cn("size-4", isSaved && "fill-primary")} />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default memo(HorizontalVariant);
