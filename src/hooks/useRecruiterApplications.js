import { useState } from "react";
import { useGetAllApplicationsQuery } from "@/services/application.service";
import { useGetMyJobsQuery, useGetMyStatsQuery } from "@/services/job.service";
import { useApplicationUpdate } from "@/hooks/useApplicationUpdate";

const PAGE_SIZE = 10;
const DEFAULT_FILTER = { status: "ALL", jobId: "ALL" };

export function useRecruiterApplications() {
  const [staged, setStaged] = useState(DEFAULT_FILTER);
  const [filters, setFilters] = useState({ ...DEFAULT_FILTER, page: 1 });

  const { data: appsData, isLoading } = useGetAllApplicationsQuery({
    status: filters.status !== "ALL" ? filters.status : undefined,
    jobId: filters.jobId !== "ALL" ? filters.jobId : undefined,
    page: filters.page,
    limit: PAGE_SIZE,
  });

  const { data: jobsData } = useGetMyJobsQuery({ limit: 100 });
  const { data: statsData } = useGetMyStatsQuery();
  const appUpdate = useApplicationUpdate();

  const applications = appsData?.data?.applications ?? [];
  const totalPages = appsData?.data?.totalPages ?? 1;
  const total = appsData?.data?.total ?? 0;
  const myJobs = jobsData?.data?.jobs ?? [];
  const pendingCount = statsData?.data?.appsByStatus?.PENDING ?? 0;
  const from = total === 0 ? 0 : (filters.page - 1) * PAGE_SIZE + 1;
  const to = Math.min(filters.page * PAGE_SIZE, total);

  const setStagedField = (field, value) =>
    setStaged((s) => ({ ...s, [field]: value }));

  const handleApply = () =>
    setFilters((f) => ({ ...f, ...staged, page: 1 }));

  const handleClear = () => {
    setStaged(DEFAULT_FILTER);
    setFilters({ ...DEFAULT_FILTER, page: 1 });
  };

  const setPage = (page) => setFilters((f) => ({ ...f, page }));

  return {
    // staged filter
    staged,
    setStagedField,
    handleApply,
    handleClear,
    // active filter
    filters,
    setPage,
    // data
    applications,
    totalPages,
    total,
    myJobs,
    pendingCount,
    from,
    to,
    isLoading,
    // app update
    ...appUpdate,
  };
}
