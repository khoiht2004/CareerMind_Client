import { memo } from "react";
import {
  MapPin,
  Clock,
  Flame,
  DollarSign,
  Users,
  Bookmark,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

// ── Variant: horizontal (dùng ở trang Home) ──────────────────────
function HorizontalVariant({ job, isSaved }) {
  const navigate = useNavigate();
  const {
    id,
    title,
    company,
    location,
    salary,
    type,
    level,
    slots,
    isHot,
    postedAt,
  } = job;
  const companyName = company?.name ?? "";
  const initial = (companyName?.[0] ?? "?").toUpperCase();

  return (
    <Card
      onClick={() => navigate(`/jobs/${id}`)}
      className="group relative cursor-pointer overflow-hidden transition-shadow hover:shadow-md"
    >
      {/* Marks */}
      {isSaved && (
        <Bookmark className="fill-secondary stroke-secondary absolute -top-2 left-[2%] size-8" />
      )}

      {/* Badges */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        {isHot && (
          <span className="bg-hot text-hot-foreground flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold">
            <Flame className="size-3" />
            Hot
          </span>
        )}
      </div>

      <CardContent className="flex items-center gap-4 px-5 py-4">
        {/* Company avatar */}
        <div
          className={`${company?.logoUrl ? "" : "text-primary border-border border"} flex size-14 shrink-0 items-start justify-center overflow-hidden rounded-lg text-base font-bold`}
        >
          {company?.logoUrl ? (
            <img
              src={company.logoUrl}
              alt={company.name}
              className="h-full w-full object-cover"
            />
          ) : (
            initial
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1 space-y-1 pr-28">
          <h3 className="group-hover:text-primary line-clamp-1 text-sm leading-snug font-semibold">
            {title}
          </h3>

          <p className="text-muted-foreground text-xs font-medium">
            {companyName}
          </p>

          <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
            <span className="flex items-center gap-1">
              <MapPin className="size-3 shrink-0" />
              {location}
            </span>
            {salary && (
              <span className="flex items-center gap-0.5">
                <DollarSign className="size-3 shrink-0" />
                {salary}
              </span>
            )}
          </div>

          <div className="text-muted-foreground flex flex-wrap items-center gap-3 text-xs">
            {slots > 1 && (
              <span className="flex items-center gap-1">
                <Users className="size-3 shrink-0" />
                {slots} vị trí
              </span>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
            <Badge variant="secondary" className="px-2 py-0.5 text-[11px]">
              {type}
            </Badge>
            {level && (
              <Badge variant="outline" className="px-2 py-0.5 text-[11px]">
                {level}
              </Badge>
            )}
            <span className="text-muted-foreground flex items-center gap-1 text-[11px]">
              <Clock className="size-3 shrink-0" />
              {postedAt}
            </span>

            {/* Apply button */}
            <Button
              size="sm"
              className="absolute right-4 shrink-0 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/jobs/${id}`);
              }}
            >
              Ứng tuyển nhanh
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(HorizontalVariant);
