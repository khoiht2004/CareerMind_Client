import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useGetJobsQuery, useGetSavedJobsQuery } from "@/services/job.service";
import { formatDate, convertArray, formatCompactSalary } from "@/utils/helper";
import { JOB_TYPE_LABELS } from "@/config/constants/candidate.constant";
import { useDebounce } from "@/hooks/useDebounce";

const LIMIT = 10;

const DEFAULT_FILTERS = {
  search: "",
  type: "ALL",
  location: "ALL",
  level: "ALL",
  industry: "ALL",
  salary: "ALL",
  // sort: "newest",
};

export function useHome() {
  const { user } = useSelector((state) => state.auth);

  const [inputValue, setInputValue] = useState("");
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [page, setPage] = useState(1);

  const debouncedInput = useDebounce(inputValue, 500);

  useEffect(() => {
    setPage(1);
    setFilters((f) => {
      if (f.search === debouncedInput) return f;
      return { ...f, search: debouncedInput };
    });
  }, [debouncedInput]);

  const { data, isLoading, isFetching } = useGetJobsQuery({
    ...filters,
    type: filters.type === "ALL" ? undefined : filters.type,
    location: filters.location === "ALL" ? undefined : filters.location,
    level: filters.level === "ALL" ? undefined : filters.level,
    industry: filters.industry === "ALL" ? undefined : filters.industry,
    salary: filters.salary === "ALL" ? undefined : filters.salary,
    page,
    limit: LIMIT,
  });

  const { data: savedData } = useGetSavedJobsQuery(undefined, { skip: !user });

  const jobs = useMemo(
    () =>
      (data?.data?.jobs ?? []).map((job) => ({
        ...job,
        tags: convertArray(job.tags),
        type: JOB_TYPE_LABELS[job.type] ?? job.type,
        postedAt: formatDate(job.createdAt),
        salary: formatCompactSalary(job.salary),
      })),
    [data],
  );

  const total = data?.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  const savedIds = useMemo(
    () => new Set((savedData?.data ?? []).map((j) => j.id)),
    [savedData],
  );

  const handleSearch = useCallback(() => {
    setPage(1);
    setFilters((f) => ({ ...f, search: inputValue }));
  }, [inputValue]);

  const handleTypeChange = useCallback((v) => {
    setPage(1);
    setFilters((f) => ({ ...f, type: f.type === v ? "ALL" : v }));
  }, []);

  const handleLevelChange = useCallback((v) => {
    setPage(1);
    setFilters((f) => ({ ...f, level: f.level === v ? "ALL" : v }));
  }, []);

  const handleLocationChange = useCallback((v) => {
    setPage(1);
    setFilters((f) => ({ ...f, location: v }));
  }, []);

  const handleIndustryChange = useCallback((v) => {
    setPage(1);
    setFilters((f) => ({ ...f, industry: f.industry === v ? "ALL" : v }));
  }, []);

  const handleSalaryChange = useCallback((v) => {
    setPage(1);
    setFilters((f) => ({ ...f, salary: f.salary === v ? "ALL" : v }));
  }, []);

  const handleSortChange = useCallback((v) => {
    setPage(1);
    setFilters((f) => ({ ...f, sort: v }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setPage(1);
    setInputValue("");
    setFilters(DEFAULT_FILTERS);
  }, []);

  const hasFilters =
    filters.search ||
    filters.type !== "ALL" ||
    filters.location !== "ALL" ||
    filters.level !== "ALL" ||
    filters.industry !== "ALL" ||
    filters.salary !== "ALL";

  return {
    user,
    inputValue,
    setInputValue,
    page,
    setPage,
    filterSheetOpen,
    setFilterSheetOpen,
    filters,
    jobs,
    total,
    totalPages,
    savedIds,
    isLoading,
    isFetching,
    hasFilters,
    handleSearch,
    handleTypeChange,
    handleLevelChange,
    handleIndustryChange,
    handleSalaryChange,
    handleLocationChange,
    handleSortChange,
    handleClearFilters,
  };
}
