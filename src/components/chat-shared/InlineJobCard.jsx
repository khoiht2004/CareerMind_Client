import { memo } from "react";
import {
  Loader2,
  MapPin,
  DollarSign,
  Bookmark,
  Building2,
  Flame,
  SendHorizontal,
} from "lucide-react";
import {
  useGetJobByIdQuery,
  useCheckJobSavedQuery,
} from "@/services/job.service";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

function InlineJobCard({ id }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { data: response, isLoading, isError } = useGetJobByIdQuery(id);
  const job = response?.data;

  const { data: savedData } = useCheckJobSavedQuery(id, { skip: !user });
  const isSaved = savedData?.data?.isSaved ?? false;

  if (isLoading) {
    return (
      <div className="flex w-72 shrink-0 items-center justify-center p-4">
        <Loader2 className="text-muted-foreground size-5 animate-spin" />
      </div>
    );
  }

  if (isError || !job) return null;

  const { title, company, location, salary, isHot } = job;
  const companyName = company?.name ?? company ?? "";

  const handleApply = (e) => {
    e.stopPropagation();
    navigate(`/jobs/${id}/apply`);
  };

  return (
    <div className="shrink-0">
      <div
        onClick={() => navigate(`/jobs/${id}`)}
        className="bg-card border-border group relative flex h-full cursor-pointer flex-col justify-between gap-2 overflow-hidden rounded-xl border px-5 py-3.5 transition-shadow hover:shadow-md"
      >
        {isHot && (
          <span className="bg-hot text-hot-foreground absolute top-3 right-3 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium">
            <Flame className="size-3" />
          </span>
        )}
        {isSaved && (
          <Bookmark className="fill-secondary stroke-secondary absolute -top-1 size-5" />
        )}
        <section className="flex flex-col gap-3">
          {/* Title + company */}
          <div className="space-y-0.5">
            <h3 className="group-hover:text-secondary line-clamp-2 max-w-[90%] text-sm leading-snug font-bold transition-colors">
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
        </section>

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
    </div>
  );
}

export default memo(InlineJobCard);
