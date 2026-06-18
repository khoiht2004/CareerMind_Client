import { memo } from "react";
import { Link } from "react-router";
import {
  Eye,
  Bookmark,
  SendHorizontal,
  MapPin,
  BanknoteArrowUp,
  Briefcase,
} from "lucide-react";
// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/utils/helper";
import { JOB_TYPE_LABELS } from "@/config/constants/recruiter.constant";

function JobDetailHeader({
  job,
  id,
  // user,
  hasApplied = false,
  isSaved,
  isSaving,
  isUnsaving,
  handleBookmark,
}) {
  const { title, location, salary, deadline, type, status } = job;
  // const isCandidate = !user || user?.role === "CANDIDATE";
  const isExpired = deadline && new Date(deadline) < new Date();

  return (
    <Card className="border-border overflow-hidden rounded-xl shadow-sm">
      <CardContent className="space-y-5 p-5 md:p-6">
        <h1 className="text-foreground text-2xl leading-tight font-bold">
          {title}
        </h1>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-full">
              <BanknoteArrowUp className="size-5" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Mức lương</p>
              <p className="text-foreground text-sm font-semibold">
                {salary || "Thoả thuận"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-full">
              <MapPin className="size-5" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">Địa điểm</p>
              <p className="text-foreground line-clamp-1 text-sm font-semibold">
                {location || "Hà Nội"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-full">
              <Briefcase className="size-5" />
            </div>
            <div>
              <p className="text-muted-foreground text-sm">
                Hình thức làm việc
              </p>
              <p className="text-foreground text-sm font-semibold">
                {JOB_TYPE_LABELS[type] || "Không yêu cầu"}
              </p>
            </div>
          </div>
        </div>
        {deadline && (
          <span className="text-muted-foreground flex items-center gap-1">
            Hạn nộp hồ sơ:{" "}
            <span className="text-foreground font-semibold">
              {formatDate(deadline)}
            </span>
          </span>
        )}
        {/* User Actions */}
        {status === "PUBLISHED" && (
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button
              size="lg"
              asChild={!hasApplied && !isExpired}
              disabled={hasApplied || isExpired}
              className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1 cursor-pointer rounded-lg font-bold"
            >
              {hasApplied ? (
                <span className="py-2">Bạn đã ứng tuyển</span>
              ) : isExpired ? (
                <span className="py-2">Đã quá hạn nộp đơn</span>
              ) : (
                <Link to={`/jobs/${id}/apply`} className="py-2">
                  <SendHorizontal className="mr-2 size-5" /> Ứng tuyển ngay
                </Link>
              )}
            </Button>
            {job.postedBy?.id && (
              <Button
                size="lg"
                asChild
                className="border-primary bg-primary/20 hover:text-accent text-primary cursor-pointer gap-2 rounded-lg border px-6 font-bold"
              >
                <Link to="/conversations" state={{ posterId: job.postedBy.id }}>
                  Trò chuyện với Nhà tuyển dụng
                </Link>
              </Button>
            )}
            <Button
              variant="outline"
              size="lg"
              className={`cursor-pointer gap-2 rounded-lg border px-6 font-bold ${isSaved ? "text-primary border-primary bg-primary/5" : "border-border text-muted-foreground"}`}
              onClick={handleBookmark}
              disabled={isSaving || isUnsaving}
            >
              <Bookmark
                className="size-5"
                fill={isSaved ? "currentColor" : "none"}
              />
              {isSaved ? "Đã lưu" : "Lưu tin"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default memo(JobDetailHeader);
