import { memo } from "react";
import { Flame, MapPin, BanknoteArrowUp, Clock } from "lucide-react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatRelativeTime } from "@/utils/helper";

function JobDetailHeader({ job, typeLabel }) {
  const { company, title, isHot, location, salary, updatedAt } = job;

  return (
    <Card>
      <CardContent className="space-y-5 p-6">
        {/* Logo + main info */}
        <div className="flex items-start gap-5">
          {/* Company logo */}
          <div className="bg-muted border-border flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border text-xl font-bold">
            {company?.logoUrl ? (
              <img
                src={company.logoUrl}
                alt={company.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-foreground">
                {company?.name?.[0]?.toUpperCase()}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1 space-y-2">
            {/* Prominent badges */}
            <div className="flex flex-wrap items-center gap-2">
              {typeLabel && (
                <Badge className="bg-secondary-container rounded-md text-xs uppercase">
                  {typeLabel}
                </Badge>
              )}
              {isHot && (
                <Badge
                  className="gap-1 text-xs"
                  style={{
                    backgroundColor: "var(--hot)",
                    color: "var(--hot-foreground)",
                    borderColor: "var(--hot-border)",
                  }}
                >
                  <Flame className="size-3" />
                  Hot Job
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="m-0 text-2xl leading-tight font-bold">{title}</h1>

            {/* Company link */}
            <Link
              to={`/companies/${company?.id}`}
              className="text-secondary hover:text-secondary/80 text-lg font-semibold transition-colors hover:underline"
            >
              {company?.name}
            </Link>
          </div>
        </div>

        {/* Quick info row — icons use primary color */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          {location && (
            <span className="flex items-center gap-1">
              <MapPin
                className="text-secondary size-4 shrink-0"
                strokeWidth={2.5}
              />
              <span>{location}</span>
            </span>
          )}
          {salary && (
            <span className="flex items-center gap-1">
              <BanknoteArrowUp
                className="text-secondary size-4 shrink-0"
                strokeWidth={2.5}
              />
              <span>{salary}</span>
            </span>
          )}
          {updatedAt && (
            <span className="text-muted-foreground flex items-center gap-1">
              <Clock
                className="text-secondary size-4 shrink-0"
                strokeWidth={2.5}
              />
              <span>Cập nhật {formatRelativeTime(updatedAt)}</span>
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(JobDetailHeader);
