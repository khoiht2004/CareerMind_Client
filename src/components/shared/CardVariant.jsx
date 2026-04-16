import {
  MapPin,
  Clock,
  Flame,
  DollarSign,
  Users,
  Bookmark,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useNavigate } from "react-router";

// ── Variant: card (mặc định) ─────────────────────────────────────
function CardVariant({ job, isSaved }) {
  const navigate = useNavigate();
  const {
    id,
    title,
    company,
    location,
    salary,
    type,
    level,
    tags = [],
    slots,
    isHot,
    postedAt,
  } = job;
  const companyName = company?.name ?? company ?? "";

  return (
    <Card
      onClick={() => navigate(`/jobs/${id}`)}
      className="group relative flex cursor-pointer flex-col gap-0 overflow-hidden transition-shadow hover:shadow-md"
    >
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        {isHot && (
          <span className="flex items-center gap-1 rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-600">
            <Flame className="size-3" />
            Hot
          </span>
        )}
      </div>
      <div className="absolute top-10 right-3 flex items-center gap-1.5">
        {isSaved && (
          <Bookmark className="fill-secondary stroke-secondary size-4" />
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="space-y-0.5 pr-12">
          <h3 className="group-hover:text-primary line-clamp-2 text-base leading-snug font-semibold">
            {title}
          </h3>
          <p className="text-muted-foreground text-sm font-medium">
            {companyName}
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 px-5 pt-3 pb-5">
        <div className="text-muted-foreground flex flex-wrap items-center gap-4 text-xs font-medium">
          <span className="flex items-center gap-1">
            <MapPin className="size-3 shrink-0" />
            {location}
          </span>
          {salary && (
            <span className="flex items-center">
              <DollarSign className="size-3 shrink-0" />
              {salary}
            </span>
          )}
          {slots > 1 && (
            <span className="flex items-center gap-1">
              <Users className="size-3 shrink-0" />
              {slots} vị trí
            </span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          <Badge variant="secondary" className="px-2 py-0.5 text-[11px]">
            {type}
          </Badge>
          {level && (
            <Badge variant="outline" className="px-2 py-0.5 text-[11px]">
              {level}
            </Badge>
          )}
          {tags.slice(0, 4).map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-muted-foreground px-2 py-0.5 text-[11px]"
            >
              {tag}
            </Badge>
          ))}
          {tags.length > 4 && (
            <Badge
              variant="outline"
              className="text-muted-foreground px-2 py-0.5 text-[11px]"
            >
              +{tags.length - 4}
            </Badge>
          )}
        </div>

        <div className="border-border/50 text-muted-foreground flex items-center gap-1.5 border-t pt-3 text-[12px]">
          <Clock className="size-3 shrink-0" />
          {postedAt}
        </div>
      </CardContent>
    </Card>
  );
}

export default CardVariant;
