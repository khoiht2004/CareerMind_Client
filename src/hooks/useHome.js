import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useGetJobsQuery, useGetSavedJobsQuery } from "@/services/job.service";
import { formatDate, convertArray } from "@/utils/helper";
import { JOB_TYPE_LABELS } from "@/config/constants/candidate.constant";
import { useDebounce } from "@/hooks/useDebounce";

const LIMIT = 12;
const ATTRACTIVE_LIMIT = 8;

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
  const [topPage, setTopPage] = useState(1);
  const [attractivePage, setAttractivePage] = useState(1);

  const debouncedInput = useDebounce(inputValue, 500);

  useEffect(() => {
    setTopPage(1);
    setAttractivePage(1);
    setFilters((f) => {
      if (f.search === debouncedInput) return f;
      return { ...f, search: debouncedInput };
    });
  }, [debouncedInput]);

  const queryFilters = useMemo(
    () => ({
      ...filters,
      type: filters.type === "ALL" ? undefined : filters.type,
      location: filters.location === "ALL" ? undefined : filters.location,
      level: filters.level === "ALL" ? undefined : filters.level,
      industry: filters.industry === "ALL" ? undefined : filters.industry,
      salary: filters.salary === "ALL" ? undefined : filters.salary,
    }),
    [filters],
  );

  const topQuery = useGetJobsQuery({
    ...queryFilters,
    page: topPage,
    limit: LIMIT,
  });

  const attractiveQuery = useGetJobsQuery({
    ...queryFilters,
    page: attractivePage,
    limit: ATTRACTIVE_LIMIT,
    isHot: true,
  });

  const recommendedQuery = useGetJobsQuery({
    ...queryFilters,
    page: 1,
    limit: 4,
  });

  const lightningQuery = useGetJobsQuery({
    ...queryFilters,
    page: 1,
    limit: 4,
    sort: "views_desc",
  });

  const normalizeJobs = useCallback(
    (source) =>
      (source?.data?.jobs ?? []).map((job) => ({
        ...job,
        tags: convertArray(job.tags),
        type: JOB_TYPE_LABELS[job.type] ?? job.type,
        postedAt: formatDate(job.createdAt),
        salary: job.salary,
      })),
    [],
  );

  const topJobs = useMemo(() => normalizeJobs(topQuery.data), [normalizeJobs, topQuery.data]);
  const attractiveJobs = useMemo(
    () => normalizeJobs(attractiveQuery.data),
    [attractiveQuery.data, normalizeJobs],
  );
  const recommendedJobs = useMemo(
    () => normalizeJobs(recommendedQuery.data),
    [normalizeJobs, recommendedQuery.data],
  );
  const lightningJobs = useMemo(
    () => normalizeJobs(lightningQuery.data),
    [lightningQuery.data, normalizeJobs],
  );

  const isLoading =
    topQuery.isLoading ||
    attractiveQuery.isLoading ||
    recommendedQuery.isLoading ||
    lightningQuery.isLoading;
  const isFetching =
    topQuery.isFetching ||
    attractiveQuery.isFetching ||
    recommendedQuery.isFetching ||
    lightningQuery.isFetching;

  const topTotal = topQuery.data?.data?.total ?? 0;
  const topTotalPages = Math.max(
    1,
    topQuery.data?.data?.totalPages ?? Math.ceil(topTotal / LIMIT),
  );
  const attractiveTotal = attractiveQuery.data?.data?.total ?? 0;
  const attractiveTotalPages = Math.max(
    1,
    attractiveQuery.data?.data?.totalPages ?? Math.ceil(attractiveTotal / ATTRACTIVE_LIMIT),
  );

  const { data: savedData } = useGetSavedJobsQuery(undefined, { skip: !user });

  const savedIds = useMemo(
    () => new Set((savedData?.data ?? []).map((j) => j.id)),
    [savedData],
  );

  const handleSearch = useCallback(() => {
    setTopPage(1);
    setAttractivePage(1);
    setFilters((f) => ({ ...f, search: inputValue }));
  }, [inputValue]);

  const handleTypeChange = useCallback((v) => {
    setTopPage(1);
    setAttractivePage(1);
    setFilters((f) => ({ ...f, type: f.type === v ? "ALL" : v }));
  }, []);

  const handleLevelChange = useCallback((v) => {
    setTopPage(1);
    setAttractivePage(1);
    setFilters((f) => ({ ...f, level: f.level === v ? "ALL" : v }));
  }, []);

  const handleLocationChange = useCallback((v) => {
    setTopPage(1);
    setAttractivePage(1);
    setFilters((f) => ({ ...f, location: v }));
  }, []);

  const handleIndustryChange = useCallback((v) => {
    setTopPage(1);
    setAttractivePage(1);
    setFilters((f) => ({ ...f, industry: f.industry === v ? "ALL" : v }));
  }, []);

  const handleSalaryChange = useCallback((v) => {
    setTopPage(1);
    setAttractivePage(1);
    setFilters((f) => ({ ...f, salary: f.salary === v ? "ALL" : v }));
  }, []);

  const handleSortChange = useCallback((v) => {
    setTopPage(1);
    setAttractivePage(1);
    setFilters((f) => ({ ...f, sort: v }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setTopPage(1);
    setAttractivePage(1);
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
    topPage,
    setTopPage,
    attractivePage,
    setAttractivePage,
    filterSheetOpen,
    setFilterSheetOpen,
    filters,
    topJobs,
    attractiveJobs,
    recommendedJobs,
    lightningJobs,
    topTotal,
    topTotalPages,
    attractiveTotal,
    attractiveTotalPages,
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
