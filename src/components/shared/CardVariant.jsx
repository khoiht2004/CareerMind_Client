import { memo } from "react";
import { MapPin, DollarSign, Bookmark, Building2, Flame, SendHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

function CardVariant({ job, isSaved }) {
  const navigate = useNavigate();
  const { id, title, company, location, salary, isHot } = job;
  const companyName = company?.name ?? company ?? "";
  const logoUrl = company?.logoUrl;

  const handleApply = (e) => {
    e.stopPropagation();
    navigate(`/jobs/${id}/apply`);
  };

  return (
    <div
      onClick={() => navigate(`/jobs/${id}`)}
      className="bg-card border-border group relative flex cursor-pointer flex-col gap-3 rounded-xl border p-5 transition-shadow hover:shadow-md"
    >
      {/* Top row: logo + badges */}
      <div className="flex items-start justify-between">
        <div className="bg-muted flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl text-base font-bold">
          {logoUrl ? (
            <img
              src={logoUrl}
              alt={companyName}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-foreground text-sm">
              {companyName?.[0]?.toUpperCase()}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {isHot && (
            <span className="bg-hot text-hot-foreground flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium">
              <Flame className="size-3" />
              Hot
            </span>
          )}
          {isSaved && (
            <Bookmark className="fill-secondary stroke-secondary size-5" />
          )}
        </div>
      </div>

      {/* Title + company */}
      <div className="space-y-0.5">
        <h3 className="group-hover:text-secondary line-clamp-2 text-sm leading-snug font-bold transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground flex items-center gap-1 text-xs">
          <Building2 className="size-3 shrink-0" />
          <span className="line-clamp-1">{companyName}</span>
        </p>
      </div>

      {/* Location + Salary */}
      <div className="text-muted-foreground space-y-1 text-xs">
        {location && (
          <div className="flex items-center gap-1">
            <MapPin className="size-3 shrink-0" />
            <span className="line-clamp-1">{location}</span>
          </div>
        )}
        {salary && (
          <div className="flex items-center gap-1">
            <DollarSign className="size-3 shrink-0" />
            {salary}
          </div>
        )}
      </div>

      {/* Apply button */}
      <Button
        size="sm"
        variant="secondary"
        onClick={handleApply}
        className="w-full cursor-pointer"
      >
        Ứng tuyển nhanh <SendHorizontal />
      </Button>
    </div>
  );
}

export default memo(CardVariant);
