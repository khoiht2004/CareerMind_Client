import { Loader2, Bookmark, SlidersHorizontal, ArrowRight, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import JobCard from "@/components/shared/JobCard";
import PageContainer from "@/components/shared/PageContainer";
import { useGetSavedJobsQuery } from "@/services/job.service";
import { formatDate, convertArray } from "@/utils/helper";
import { JOB_TYPE_LABELS } from "@/config/constants/candidate.constant";

function SavedJobs() {
  const navigate = useNavigate();
  const { data: response, isLoading } = useGetSavedJobsQuery();
  const jobs = response?.data ?? [];

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="text-muted-foreground size-8 animate-spin" />
      </div>
    );
  }

  return (
    <PageContainer>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Công việc bạn quan tâm</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {jobs.length > 0 ? (
              <>
                Bạn đang có{" "}
                <span className="text-secondary font-semibold">
                  {jobs.length} việc làm đã lưu
                </span>{" "}
                sẵn sàng để ứng tuyển.
              </>
            ) : (
              "Chưa có việc làm nào được lưu"
            )}
          </p>
        </div>

        {jobs.length > 0 && (
          <div className="flex shrink-0 items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer gap-1.5"
            >
              <SlidersHorizontal className="size-4" />
              Lọc kết quả
            </Button>
            <Button size="sm" className="cursor-pointer gap-1.5">
              Ứng tuyển tất cả
              <ArrowRight className="size-4" />
            </Button>
          </div>
        )}
      </div>

      {jobs.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-center justify-center py-20">
          <Bookmark className="mb-3 size-12 opacity-20" />
          <p className="text-lg font-medium">Chưa có việc làm nào được lưu</p>
          <p className="mt-1 text-center text-sm">
            Ấn vào biểu tượng bookmark trong trang chi tiết việc làm để lưu lại
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-secondary mt-4 cursor-pointer text-sm hover:underline"
          >
            Khám phá việc làm ngay
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                isSaved={true}
                job={{
                  ...job,
                  tags: convertArray(job.tags),
                  type: JOB_TYPE_LABELS[job.type] ?? job.type,
                  postedAt: formatDate(job.createdAt),
                }}
              />
            ))}
          </div>

          <div className="flex justify-center pt-2">
            <Button
              variant="outline"
              size="sm"
              className="cursor-pointer gap-2"
              onClick={() => navigate("/")}
            >
              Xem thêm công việc
              <ChevronDown className="size-4" />
            </Button>
          </div>
        </>
      )}
    </PageContainer>
  );
}

export default SavedJobs;
