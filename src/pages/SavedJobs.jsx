import { Loader2, Bookmark } from "lucide-react";
import { useNavigate } from "react-router";
import JobCard from "@/components/shared/JobCard";
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
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Việc làm đã lưu</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          {jobs.length > 0
            ? `${jobs.length} việc làm đã lưu`
            : "Chưa có việc làm nào được lưu"}
        </p>
      </div>

      {jobs.length === 0 ? (
        <div className="text-muted-foreground flex flex-col items-center justify-center py-20">
          <Bookmark className="mb-3 size-12 opacity-20" />
          <p className="text-lg font-medium">Chưa có việc làm nào được lưu</p>
          <p className="mt-1 text-sm">
            Ấn vào biểu tượng bookmark trong trang chi tiết việc làm để lưu lại
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-primary mt-4 text-sm hover:underline"
          >
            Khám phá việc làm ngay
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
      )}
    </div>
  );
}

export default SavedJobs;
