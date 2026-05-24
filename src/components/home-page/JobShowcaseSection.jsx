import HomeSectionHeader from "./HomeSectionHeader";
import JobCard from "@/components/shared/JobCard";
import Pagination from "@/components/shared/Pagination";
import FilterChipBar from "./FilterChipBar";
import { HOME_FILTER_GROUPS } from "@/config/constants/home.constant";

function TopJobsSection({
  jobs,
  page,
  totalPages,
  onPageChange,
  isLoading,
  filters,
  onFilterChange,
}) {
  return (
    <section className="bg-slate-100 py-6">
      <div className="mx-auto max-w-6xl px-4">
        <HomeSectionHeader title="Việc làm tốt nhất" />
        <FilterChipBar
          filterGroups={HOME_FILTER_GROUPS}
          activeValues={filters}
          onChipChange={onFilterChange}
        />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} variant="horizontal" />
          ))}
        </div>
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}

function AttractiveJobsSection({
  jobs,
  page,
  totalPages,
  onPageChange,
  isLoading,
  filters,
  onFilterChange,
}) {
  return (
    <section className="bg-slate-100 py-6">
      <div className="mx-auto flex max-w-6xl gap-4 px-4">
        <div className="min-w-0 flex-1">
          <HomeSectionHeader title="Việc làm hấp dẫn" />
          <FilterChipBar
            filterGroups={HOME_FILTER_GROUPS}
            activeValues={filters}
            onChipChange={onFilterChange}
          />
          {/* <div className="mb-3 rounded-md border border-blue-300 bg-blue-50 px-3 py-2 text-sm text-blue-700">
            Gợi ý: Di chuột vào tiêu đề việc làm để xem thêm thông tin chi tiết
          </div> */}
          <div className="grid gap-4 md:grid-cols-2">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} variant="horizontal" compact />
            ))}
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
            isLoading={isLoading}
          />
        </div>
        <div className="hidden w-96 shrink-0 rounded-lg bg-linear-to-b from-emerald-950 to-emerald-600 p-6 text-white shadow-sm lg:block">
          <p className="text-sm font-semibold">Slide quảng cáo</p>
          <h3 className="mt-4 text-3xl font-black">500+ việc làm phổ thông</h3>
          <p className="mt-2 text-sm">
            Thu nhập hấp dẫn, nhiều ca làm linh hoạt
          </p>
          <div className="mt-8 space-y-3">
            {[
              "Nhân viên phục vụ",
              "Nhân viên tài xế",
              "Nhân viên giao hàng",
              "Nhân viên kho",
            ].map((item) => (
              <div
                key={item}
                className="rounded-full bg-emerald-400/25 px-4 py-2 font-semibold"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { AttractiveJobsSection, TopJobsSection };
