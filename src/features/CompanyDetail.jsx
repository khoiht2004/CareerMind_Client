import { Button } from "@/components/ui/button";
import { JOB_TYPE_LABELS } from "@/config/constants/candidate.constant";
import { ArrowRight, Badge, DollarSign, MapPin } from "lucide-react";
import { Link } from "react-router";

export function ContactRow({ icon, label, value }) {
  const Icon = icon;
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-9 shrink-0 items-center justify-center rounded-lg">
        <Icon className="text-primary-container size-4.5" />
      </div>
      <div className="min-w-0">
        <p className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
          {label}
        </p>
        <p className="mt-0.5 text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}

export function CompanyJobCard({ job }) {
  return (
    <Link to={`/jobs/${job.id}`} className="block">
      <div className="bg-card border-primary/40 hover:border-primary flex items-start gap-4 rounded-xl border-l-4 p-4 transition-colors">
        <div className="min-w-0 flex-1 space-y-1.5">
          <p className="font-semibold">{job.title}</p>
          <div className="text-muted-foreground flex flex-wrap gap-3 text-xs">
            {job.location && (
              <span className="flex items-center gap-1">
                <MapPin className="size-3 shrink-0" />
                {job.location}
              </span>
            )}
            {job.salary && (
              <span className="flex items-center gap-1">
                <DollarSign className="size-3 shrink-0" />
                {job.salary}
              </span>
            )}
          </div>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-2">
          <Button
            size="sm"
            className="gap-1 text-xs"
            onClick={(e) => e.preventDefault()}
            asChild
          >
            <Link to={`/jobs/${job.id}`}>
              Ứng tuyển ngay
              <ArrowRight className="size-3" />
            </Link>
          </Button>
        </div>
      </div>
    </Link>
  );
}
