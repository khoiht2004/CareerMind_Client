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
import CandidateJobAiAssistant from "@/components/candidate/CandidateJobAiAssistant";
import { useGetJobsQuery } from "@/services/job.service";

function JobDetail() {
  const hookResult = useJobDetail();
  const { job, user, isLoading, isError, benefits, requirements, tags } =
    hookResult;
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
    <div className="min-h-screen bg-background pb-10">
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

            {user?.role === "CANDIDATE" && (
              <CandidateJobAiAssistant jobId={job.id} />
            )}

            <Card className="border-border rounded-xl shadow-sm">
              <CardContent className="p-6">
                <h2 className="border-primary text-foreground mb-6 border-l-4 pl-3 text-xl font-bold">
                  Chi tiết tin tuyển dụng
                </h2>

                {tags?.length > 0 && (
                  <div className="mb-6 flex gap-4">
                    <h3 className="text-foreground font-bold">Tags</h3>
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
                      <h3 className="text-foreground mb-2 font-bold">
                        Mô tả công việc
                      </h3>
                      <div
                        className={`text-muted-foreground relative text-sm leading-relaxed whitespace-pre-line ${!showFullDesc && "max-h-[300px] overflow-hidden"}`}
                      >
                        {job.description}
                        {!showFullDesc && (
                          <div className="from-card absolute right-0 bottom-0 left-0 h-24 bg-linear-to-t to-transparent" />
                        )}
                      </div>
                    </div>

                    {showFullDesc && (
                      <>
                        {requirements?.length > 0 && (
                          <div>
                            <h3 className="text-foreground mb-2 font-bold">
                              Yêu cầu ứng viên
                            </h3>
                            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
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
                            <h3 className="text-foreground mb-2 font-bold">
                              Quyền lợi
                            </h3>
                            <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
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
                <h3 className="text-foreground mb-6 text-center font-bold">
                  Bạn thấy độ tin cậy & Rõ ràng của tin tuyển dụng này thế nào?
                </h3>
                <div className="mx-auto grid max-w-lg grid-cols-2 gap-4 sm:flex sm:justify-between">
                  <div className="flex cursor-pointer flex-col items-center gap-2 opacity-50 transition-opacity hover:opacity-100">
                    <div className="bg-muted rounded-xl p-3">
                      <Frown className="text-muted-foreground size-8" />
                    </div>
                    <span className="text-muted-foreground max-w-[60px] text-center text-[10px]">
                      Không đáng tin cậy & rõ ràng
                    </span>
                  </div>
                  <div className="flex cursor-pointer flex-col items-center gap-2 opacity-50 transition-opacity hover:opacity-100">
                    <div className="bg-muted rounded-xl p-3">
                      <Meh className="text-muted-foreground size-8" />
                    </div>
                    <span className="text-muted-foreground max-w-[60px] text-center text-[10px]">
                      Ít đáng tin cậy & rõ ràng
                    </span>
                  </div>
                  <div className="flex cursor-pointer flex-col items-center gap-2 opacity-100">
                    <div className="border-primary/20 bg-muted rounded-xl border p-3">
                      <Smile className="text-primary size-8" />
                    </div>
                    <span className="text-primary max-w-[60px] text-center text-[10px] font-medium">
                      Bình thường
                    </span>
                  </div>
                  <div className="flex cursor-pointer flex-col items-center gap-2 opacity-50 transition-opacity hover:opacity-100">
                    <div className="bg-muted rounded-xl p-3">
                      <Laugh className="text-muted-foreground size-8" />
                    </div>
                    <span className="text-muted-foreground max-w-[60px] text-center text-[10px]">
                      Đáng tin cậy & rõ ràng
                    </span>
                  </div>
                  <div className="flex cursor-pointer flex-col items-center gap-2 opacity-50 transition-opacity hover:opacity-100">
                    <div className="bg-muted rounded-xl p-3">
                      <Heart className="text-muted-foreground size-8" />
                    </div>
                    <span className="text-muted-foreground max-w-[60px] text-center text-[10px]">
                      Rất đáng tin cậy & rõ ràng
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Việc làm liên quan */}
            {relatedJobs.length > 0 && (
              <div>
                <h2 className="border-primary text-foreground mb-4 border-l-4 pl-3 text-xl font-bold">
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
