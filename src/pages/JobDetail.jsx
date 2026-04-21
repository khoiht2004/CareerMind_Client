/* eslint-disable no-unused-vars */
import { Link } from "react-router";
import {
  Loader2,
  ChevronRight,
  FileText,
  ClipboardCheck,
  Puzzle,
  Handshake,
  PartyPopper,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { NotFound } from "@/components/shared/NotFound";
import { useJobDetail } from "@/hooks/useJobDetail";
import JobDetailHeader from "@/components/shared/JobDetailHeader";
import JobDetailSidebar from "@/components/shared/JobDetailSidebar";

function SectionHeading({ icon: SectionIcon, label }) {
  return (
    <section className="mb-3 flex items-center gap-2.5 text-base">
      <div className="bg-border/30 rounded-md p-2.5">
        <SectionIcon className="size-5 shrink-0" />
      </div>
      <div className="text-xl font-semibold">{label}</div>
    </section>
  );
}

function JobDetail() {
  const hookResult = useJobDetail();
  const { job, isLoading, isError, benefits, requirements } = hookResult;

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="text-muted-foreground size-8 animate-spin" />
      </div>
    );
  }

  if (isError || !job) {
    return <NotFound message="Không tìm thấy công việc này" />;
  }

  const hasDescription = Boolean(job.description);
  const hasBenefits = benefits?.length > 0;
  const hasRequirements = requirements?.length > 0;

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      {/* Breadcrumbs */}
      <nav className="text-muted-foreground flex items-center gap-1 text-xs">
        <Link to="/" className="hover:text-foreground transition-colors">
          Việc làm
        </Link>
        <ChevronRight className="size-3" />
        <span className="text-foreground line-clamp-1 font-medium">
          {job.title}
        </span>
      </nav>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left - main content */}
        <div className="space-y-5 lg:col-span-2">
          <JobDetailHeader {...hookResult} />

          {(hasDescription || hasRequirements || hasBenefits) && (
            <Card>
              <CardContent className="space-y-6 p-6">
                {/* Mô tả công việc */}
                {hasDescription && (
                  <div>
                    <SectionHeading icon={FileText} label="Mô tả công việc" />
                    <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                      {job.description}
                    </div>
                  </div>
                )}

                {/* Yêu cầu */}
                {hasRequirements && (
                  <div>
                    <SectionHeading icon={ClipboardCheck} label="Yêu cầu" />
                    <div className="grid grid-cols-2 gap-2.5">
                      {requirements.map((requirement, index) => (
                        <article
                          key={index}
                          className="bg-primary/10 flex items-start gap-2.5 rounded-lg p-2 text-sm"
                        >
                          <Puzzle className="text-secondary mt-0.5 size-4 shrink-0" />
                          {requirement}
                        </article>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quyền lợi */}
                {hasBenefits && (
                  <div>
                    <SectionHeading icon={PartyPopper} label="Quyền lợi" />
                    <div className="grid grid-cols-2 gap-2.5">
                      {benefits.map((benefit, index) => (
                        <article
                          key={index}
                          className="bg-primary/10 flex items-start gap-2.5 rounded-lg p-2 text-sm"
                        >
                          <Handshake className="text-secondary mt-0.5 size-4 shrink-0" />
                          {benefit}
                        </article>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right - sidebar */}
        <JobDetailSidebar {...hookResult} />
      </div>
    </div>
  );
}

export default JobDetail;
