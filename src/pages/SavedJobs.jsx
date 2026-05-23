import { Loader2, Bookmark, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import JobCard from "@/components/shared/JobCard";
import PageContainer from "@/components/shared/PageContainer";
import { useGetSavedJobsQuery, useGetJobsQuery } from "@/services/job.service";
import { convertArray } from "@/utils/helper";
import { JOB_TYPE_LABELS } from "@/config/constants/candidate.constant";

function SavedJobs() {
  const navigate = useNavigate();
  const { data: response, isLoading } = useGetSavedJobsQuery();
  const jobs = response?.data ?? [];

  // Mock similar jobs
  const { data: similarResponse } = useGetJobsQuery({ limit: 3 });
  const similarJobs = similarResponse?.data?.items ?? [];

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="text-primary size-8 animate-spin" />
      </div>
    );
  }

  return (
    <PageContainer className="max-w-6xl py-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main content - Left */}
        <div className="space-y-8 lg:col-span-2">
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h1 className="text-xl font-bold text-slate-800">
                Danh sách <span className="text-primary">{jobs.length}</span>{" "}
                việc làm đã lưu
              </h1>
            </div>

            {jobs.length === 0 ? (
              <div className="text-muted-foreground border-border flex flex-col items-center justify-center rounded-xl border bg-white py-16 shadow-sm">
                <Bookmark className="mb-3 size-12 opacity-20" />
                <p className="text-lg font-medium">
                  Chưa có việc làm nào được lưu
                </p>
                <p className="mt-1 text-center text-sm">
                  Ấn vào biểu tượng bookmark trong trang chi tiết việc làm để
                  lưu lại
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="text-primary mt-4 cursor-pointer text-sm font-medium hover:underline"
                >
                  Khám phá việc làm ngay
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <JobCard
                    key={job.id}
                    isSaved={true}
                    job={{
                      ...job,
                      tags: convertArray(job.tags),
                      type: JOB_TYPE_LABELS[job.type] ?? job.type,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Việc làm tương tự việc bạn đã lưu */}
          {similarJobs.length > 0 && (
            <div className="pt-2">
              <h2 className="mb-4 text-xl font-bold text-slate-800">
                Việc làm tương tự việc bạn đã lưu
              </h2>
              <div className="space-y-4">
                {similarJobs.map((job) => (
                  <JobCard
                    key={job.id}
                    isSaved={false}
                    job={{
                      ...job,
                      tags: convertArray(job.tags),
                      type: JOB_TYPE_LABELS[job.type] ?? job.type,
                    }}
                  />
                ))}
              </div>
              <div className="mt-6 flex justify-center">
                <Button
                  variant="outline"
                  className="border-primary text-primary hover:bg-primary/5 cursor-pointer gap-2 rounded-full px-6"
                  onClick={() => navigate("/")}
                >
                  Xem thêm việc làm tương tự
                  <ChevronDown className="size-4" />
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Right Banner Sidebar */}
        <div className="hidden lg:col-span-1 lg:block">
          <div className="sticky top-6">
            {/* Fake Banner */}
            <div className="from-primary/80 to-primary group relative flex h-[500px] w-full cursor-pointer flex-col justify-between overflow-hidden rounded-xl bg-linear-to-b shadow-sm">
              <div className="relative z-10 p-6 text-white">
                <h3 className="mb-2 text-2xl font-bold">
                  CV "Hịn" Trên Tay
                  <br />
                  Bắt Ngay Công Việc!
                </h3>
                <p className="mb-6 text-sm text-white/80">
                  Chuyên gia của TopCV sẵn sàng hỗ trợ bạn.
                </p>
                <Button className="text-primary w-max rounded-full border-none bg-white font-bold hover:bg-slate-100">
                  Tạo CV Ngay
                </Button>
              </div>
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay transition-opacity group-hover:opacity-30"></div>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

export default SavedJobs;
