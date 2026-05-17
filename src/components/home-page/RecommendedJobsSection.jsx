import HomeSectionHeader from "./HomeSectionHeader";
import JobCard from "@/components/shared/JobCard";

function RecommendedJobsSection({ jobs }) {
  return (
    <section className="relative overflow-hidden bg-white py-8">
      <div className="pointer-events-none absolute top-10 -left-16 h-72 w-36 border-l-22 border-dotted border-primary/30" />
      <div className="mx-auto max-w-6xl px-4">
        <HomeSectionHeader title="Gợi ý việc làm phù hợp" />
        <div className="grid gap-4 md:grid-cols-2">
          {jobs.map((job, index) => (
            <JobCard
              key={job.id}
              job={job}
              variant="horizontal"
              highlighted={index === 0}
              actions="both"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default RecommendedJobsSection;
