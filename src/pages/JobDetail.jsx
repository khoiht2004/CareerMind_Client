import { memo, useState } from "react";
import { Link } from "react-router";
import {
  Loader2,
  ChevronRight,
  ChevronDown,
  Frown,
  Meh,
  Smile,
  Laugh,
  Heart,
  Badge,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { NotFound } from "@/components/shared/NotFound";
import PageContainer from "@/components/shared/PageContainer";
import { useJobDetail } from "@/hooks/useJobDetail";
import JobDetailHeader from "@/components/shared/JobDetailHeader";
import JobDetailSidebar from "@/components/shared/JobDetailSidebar";
import JobCard from "@/components/shared/JobCard";
import { useGetJobsQuery } from "@/services/job.service";

function JobDetail() {
  const hookResult = useJobDetail();
  const { job, isLoading, isError, benefits, requirements, tags } = hookResult;
  const [showFullDesc, setShowFullDesc] = useState(false);

  // Fetch some mock related jobs
  const { data: relatedJobsData } = useGetJobsQuery({ limit: 3 });
  const relatedJobs = relatedJobsData?.data?.items || [];

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="text-primary size-8 animate-spin" />
      </div>
    );
  }

  if (isError || !job) {
    return <NotFound message="Không tìm thấy công việc này" />;
  }

  const hasDescription = Boolean(job.description);

  return (
    <div className="min-h-screen bg-[#f4f5f5] pb-10">
      <PageContainer className="max-w-6xl py-6">
        {/* Breadcrumbs */}
        <nav className="text-muted-foreground mb-4 flex items-center gap-1 text-xs">
          <Link to="/" className="hover:text-primary transition-colors">
            Trang chủ
          </Link>
          <ChevronRight className="size-3" />
          <span className="text-foreground line-clamp-1 font-medium">
            {job.title}
          </span>
        </nav>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left - main content */}
          <div className="space-y-6 lg:col-span-2">
            <JobDetailHeader {...hookResult} />

            <Card className="border-border rounded-xl shadow-sm">
              <CardContent className="p-6">
                <h2 className="border-primary mb-6 border-l-4 pl-3 text-xl font-bold text-slate-800">
                  Chi tiết tin tuyển dụng
                </h2>

                {tags?.length > 0 && (
                  <div className="mb-6 flex gap-4">
                    <h3 className="font-bold text-slate-800">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag, index) => (
                        <section
                          key={index}
                          className="bg-primary/10 text-primary rounded-xl px-4 py-2 text-xs font-semibold"
                        >
                          {tag}
                        </section>
                      ))}
                    </div>
                  </div>
                )}

                {hasDescription && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="mb-2 font-bold text-slate-800">
                        Mô tả công việc
                      </h3>
                      <div
                        className={`relative text-sm leading-relaxed whitespace-pre-line text-slate-700 ${!showFullDesc && "max-h-[300px] overflow-hidden"}`}
                      >
                        {job.description}
                        {!showFullDesc && (
                          <div className="absolute right-0 bottom-0 left-0 h-24 bg-linear-to-t from-white to-transparent" />
                        )}
                      </div>
                    </div>

                    {showFullDesc && (
                      <>
                        {requirements?.length > 0 && (
                          <div>
                            <h3 className="mb-2 font-bold text-slate-800">
                              Yêu cầu ứng viên
                            </h3>
                            <div className="grid grid-cols-2 gap-2.5">
                              {requirements.map((requirement, index) => (
                                <article
                                  key={index}
                                  className="bg-primary/10 flex items-start gap-2.5 rounded-lg px-4 py-2 text-sm"
                                >
                                  <div>
                                    <p className="text-primary text-md font-bold tracking-wider whitespace-pre-line">
                                      {requirement.label.toUpperCase()}
                                    </p>
                                    <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                                      {requirement.content}
                                    </p>
                                  </div>
                                </article>
                              ))}
                            </div>
                          </div>
                        )}

                        {benefits?.length > 0 && (
                          <div>
                            <h3 className="mb-2 font-bold text-slate-800">
                              Quyền lợi
                            </h3>
                            <div className="grid grid-cols-2 gap-2.5">
                              {benefits.map((benefit, index) => {
                                const Icon = benefit.icon;
                                return (
                                  <article
                                    key={index}
                                    className="bg-primary/10 flex items-start gap-2.5 rounded-lg p-2 text-sm"
                                  >
                                    {/* <Icon className="text-secondary-container mt-0.5 size-4 shrink-0" /> */}
                                    <div>
                                      <p className="text-primary text-md font-bold tracking-wider whitespace-pre-line">
                                        {benefit.label.toUpperCase()}
                                      </p>
                                      <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                                        {benefit.content}
                                      </p>
                                    </div>
                                  </article>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    <div className="mt-4 flex justify-center">
                      <button
                        onClick={() => setShowFullDesc(!showFullDesc)}
                        className="text-primary border-primary hover:bg-primary/5 flex items-center gap-1 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors"
                      >
                        {showFullDesc
                          ? "Thu gọn mô tả công việc"
                          : "Xem đầy đủ mô tả công việc"}{" "}
                        <ChevronDown
                          className={`size-4 transition-transform ${showFullDesc ? "rotate-180" : ""}`}
                        />
                      </button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Rating */}
            <Card className="border-border rounded-xl shadow-sm">
              <CardContent className="p-6">
                <h3 className="mb-6 text-center font-bold text-slate-800">
                  Bạn thấy độ tin cậy & Rõ ràng của tin tuyển dụng này thế nào?
                </h3>
                <div className="mx-auto flex max-w-lg justify-between">
                  <div className="flex cursor-pointer flex-col items-center gap-2 opacity-50 transition-opacity hover:opacity-100">
                    <div className="rounded-xl bg-slate-100 p-3">
                      <Frown className="size-8 text-slate-400" />
                    </div>
                    <span className="max-w-[60px] text-center text-[10px] text-slate-500">
                      Không đáng tin cậy & rõ ràng
                    </span>
                  </div>
                  <div className="flex cursor-pointer flex-col items-center gap-2 opacity-50 transition-opacity hover:opacity-100">
                    <div className="rounded-xl bg-slate-100 p-3">
                      <Meh className="size-8 text-slate-400" />
                    </div>
                    <span className="max-w-[60px] text-center text-[10px] text-slate-500">
                      Ít đáng tin cậy & rõ ràng
                    </span>
                  </div>
                  <div className="flex cursor-pointer flex-col items-center gap-2 opacity-100">
                    <div className="border-primary/20 rounded-xl border bg-slate-100 p-3">
                      <Smile className="text-primary size-8" />
                    </div>
                    <span className="text-primary max-w-[60px] text-center text-[10px] font-medium">
                      Bình thường
                    </span>
                  </div>
                  <div className="flex cursor-pointer flex-col items-center gap-2 opacity-50 transition-opacity hover:opacity-100">
                    <div className="rounded-xl bg-slate-100 p-3">
                      <Laugh className="size-8 text-slate-400" />
                    </div>
                    <span className="max-w-[60px] text-center text-[10px] text-slate-500">
                      Đáng tin cậy & rõ ràng
                    </span>
                  </div>
                  <div className="flex cursor-pointer flex-col items-center gap-2 opacity-50 transition-opacity hover:opacity-100">
                    <div className="rounded-xl bg-slate-100 p-3">
                      <Heart className="size-8 text-slate-400" />
                    </div>
                    <span className="max-w-[60px] text-center text-[10px] text-slate-500">
                      Rất đáng tin cậy & rõ ràng
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Việc làm liên quan */}
            {relatedJobs.length > 0 && (
              <div>
                <h2 className="border-primary mb-4 border-l-4 pl-3 text-xl font-bold text-slate-800">
                  Việc làm liên quan
                </h2>
                <div className="space-y-4">
                  {relatedJobs.map((job) => (
                    <JobCard key={job.id} job={job} variant="horizontal" />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right - sidebar */}
          <JobDetailSidebar {...hookResult} />
        </div>
      </PageContainer>
    </div>
  );
}

export default memo(JobDetail);
