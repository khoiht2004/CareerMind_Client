import { memo, useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatRelativeTime, formatDate } from "@/utils/helper";
import {
  useSaveJobMutation,
  useUnsaveJobMutation,
} from "@/services/job.service";
import { useCheckAppliedQuery } from "@/services/application.service";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useNavigate } from "react-router";

function CardVariant({ job, isSaved: initialIsSaved }) {
  const navigate = useNavigate();
  const { id, title, company, location, experience, createdAt } = job;
  const companyName = company?.name ?? company ?? "Công ty đang tuyển";
  const logoUrl = company?.logoUrl;
  const { user } = useSelector((state) => state.auth);

  const { data: appliedData } = useCheckAppliedQuery(id, { skip: !user });
  const hasApplied = appliedData?.data?.applied ?? false;

  const [isSaved, setIsSaved] = useState(initialIsSaved);

  const [saveJob] = useSaveJobMutation();
  const [unsaveJob] = useUnsaveJobMutation();

  useEffect(() => {
    setIsSaved(initialIsSaved);
  }, [initialIsSaved]);

  const handleApply = (e) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(`/jobs/${id}/apply`, "_blank", "noopener,noreferrer");
  };

  const handleToggleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      toast.error("Vui lòng đăng nhập để lưu việc làm");
      return;
    }

    try {
      if (isSaved) {
        setIsSaved(false);
        await unsaveJob(id).unwrap();
        toast.success("Đã bỏ lưu việc làm");
      } else {
        setIsSaved(true);
        await saveJob(id).unwrap();
        toast.success("Đã lưu việc làm");
      }
    } catch (error) {
      setIsSaved(!isSaved); // Revert on failure
      console.log(error);
      toast.error("Có lỗi xảy ra");
    }
  };

  return (
    <>
      <div
        onClick={() => navigate(`/jobs/${id}`)}
        className="border-border bg-card group hover:border-primary/50 relative cursor-pointer rounded-xl border p-4 transition-all hover:shadow-md sm:flex-row"
      >
        {/* Section 1 */}
        <section className="flex gap-4">
          {/* Logo */}
          <div className="bg-muted border-border flex h-[88px] w-[88px] shrink-0 items-center justify-center overflow-hidden rounded-lg border text-xl font-bold">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={companyName}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-foreground text-2xl">
                {companyName?.[0]?.toUpperCase()}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex min-w-0 flex-1 flex-col justify-between">
            <div>
              <h3 className="text-foreground group-hover:text-primary line-clamp-1 text-base font-bold transition-colors">
                {title}
              </h3>
              <p className="text-muted-foreground mt-1 line-clamp-1 text-sm uppercase">
                {companyName}
              </p>
            </div>

            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
              <span className="bg-muted text-muted-foreground rounded-xl px-2.5 py-0.5">
                {location || "Hà Nội"}
              </span>
              <span className="bg-muted text-muted-foreground rounded-xl px-2.5 py-0.5">
                {experience || "Không yêu cầu"}
              </span>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="flex items-center justify-between">
          {/* Time Posted */}
          <div className="text-muted-foreground mt-1 text-[13px]">
            {isSaved
              ? `Đã lưu: ${formatDate(new Date())}`
              : createdAt
                ? `Cập nhật: ${formatRelativeTime(createdAt)}`
                : "Mới cập nhật"}
          </div>
          {/* Actione */}
          <div className="mt-3 flex items-center gap-2">
            <Button
              size="sm"
              onClick={handleApply}
              disabled={hasApplied}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground h-9 rounded-md bg-transparent px-4 font-semibold"
            >
              {hasApplied ? "Đã ứng tuyển" : "Ứng tuyển"}
            </Button>
            <Button
              size="icon"
              variant="outline"
              onClick={handleToggleSave}
              className={`h-9 w-9 rounded-md transition-colors ${isSaved ? "border-primary text-primary bg-primary/5" : "border-border text-muted-foreground"}`}
            >
              <Heart className={`size-4 ${isSaved ? "fill-primary" : ""}`} />
            </Button>
          </div>
        </section>
      </div>
    </>
  );
}

export default memo(CardVariant);
