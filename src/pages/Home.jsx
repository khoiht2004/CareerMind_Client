import { useState, useEffect, useCallback } from "react";
import { Search, Loader2, SlidersHorizontal } from "lucide-react";
import { useSelector } from "react-redux";

import Pagination from "@/components/shared/Pagination";
import JobCard from "@/components/shared/JobCard";
import HeroBanner from "@/components/home-page/HeroBanner";
import FilterPanel from "@/components/home-page/FilterPanel";
import JobListHeader from "@/components/home-page/JobListHeader";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

import { useGetJobsQuery, useGetSavedJobsQuery } from "@/services/job.service";
import { formatDate, convertArray } from "@/utils/helper";
import { JOB_TYPE_LABELS } from "@/config/constants/candidate.constant";
import { useDebounce } from "@/hooks/useDebounce";

const LIMIT = 10;

function Home() {
  const { user } = useSelector((state) => state.auth);

  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    type: "ALL",
    location: "ALL",
    level: "ALL",
    sort: "newest",
  });

  // Debounce 500ms — tự động trigger search sau khi user ngừng gõ
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
    page,
    limit: LIMIT,
  });
  const { data: savedData } = useGetSavedJobsQuery(undefined, { skip: !user });

  const jobs = data?.data?.jobs ?? [];
  const total = data?.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));
  const savedIds = new Set((savedData?.data ?? []).map((j) => j.id));

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

  const handleSortChange = useCallback((v) => {
    setPage(1);
    setFilters((f) => ({ ...f, sort: v }));
  }, []);

  const handleClearFilters = useCallback(() => {
    setPage(1);
    setInputValue("");
    setFilters({
      search: "",
      type: "ALL",
      location: "ALL",
      level: "ALL",
      sort: "newest",
    });
  }, []);

  const hasFilters =
    filters.search ||
    filters.type !== "ALL" ||
    filters.location !== "ALL" ||
    filters.level !== "ALL";

  const filterPanelProps = {
    typeFilter: filters.type,
    onTypeChange: handleTypeChange,
    levelFilter: filters.level,
    onLevelChange: handleLevelChange,
    hasFilters,
    onClearFilters: handleClearFilters,
  };

  return (
    <div className="flex flex-col px-4 pt-4 sm:px-6 sm:pt-6 md:px-10">
      {/* Hero Banner */}
      <HeroBanner
        inputValue={inputValue}
        onInputChange={setInputValue}
        locationValue={filters.location}
        onLocationChange={handleLocationChange}
        onSearch={handleSearch}
        isFetching={isFetching}
      />

      {/* Main content: filter + job list */}
      <div className="flex min-h-0 flex-1 items-start">
        {/* Filter Panel — chỉ hiện trên md+ */}
        <aside className="sticky top-14 hidden w-[25%] self-start p-5 pt-6 md:block">
          <FilterPanel {...filterPanelProps} />
        </aside>

        {/* Job list */}
        <div className="min-w-0 flex-1 space-y-4 py-6 md:px-6">
          {/* Mobile: nút mở filter sheet */}
          <div className="flex items-center justify-between md:hidden">
            <p className="text-muted-foreground text-sm">
              <span className="text-foreground font-semibold">
                {total.toLocaleString()}
              </span>{" "}
              vị trí
            </p>
            <Button
              variant="outline"
              size="sm"
              className="h-8 cursor-pointer gap-1.5"
              onClick={() => setFilterSheetOpen(true)}
            >
              <SlidersHorizontal className="size-3.5" />
              Bộ lọc
              {hasFilters && (
                <span className="bg-secondary text-secondary-foreground ml-0.5 flex size-4 items-center justify-center rounded-full text-[10px] font-bold">
                  !
                </span>
              )}
            </Button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-24">
              <Loader2 className="text-muted-foreground size-10 animate-spin" />
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-muted-foreground py-24 text-center">
              <Search className="mx-auto mb-3 size-12 opacity-30" />
              <p className="text-lg font-medium">
                Không tìm thấy kết quả phù hợp
              </p>
              <p className="mt-1 text-sm">Thử thay đổi từ khóa hoặc bộ lọc</p>
            </div>
          ) : (
            <>
              {/* Desktop header — hidden on mobile (already shown above) */}
              <div className="hidden md:block">
                <JobListHeader
                  total={total}
                  sort={filters.sort}
                  onSortChange={handleSortChange}
                />
              </div>

              {/* Mobile sort (compact) */}
              <div className="flex items-center justify-end md:hidden">
                <JobListHeader
                  total={total}
                  sort={filters.sort}
                  onSortChange={handleSortChange}
                  compact
                />
              </div>

              <div className="space-y-3">
                {jobs.map((job) => (
                  <JobCard
                    key={job.id}
                    variant="horizontal"
                    isSaved={savedIds.has(job.id)}
                    job={{
                      ...job,
                      tags: convertArray(job.tags),
                      type: JOB_TYPE_LABELS[job.type] ?? job.type,
                      postedAt: formatDate(job.createdAt),
                    }}
                  />
                ))}
              </div>

              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={setPage}
                isLoading={isFetching}
                showPageNumbers
              />
            </>
          )}
        </div>
      </div>

      {/* Mobile Filter Sheet */}
      <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetHeader className="border-b px-5 py-4">
            <SheetTitle>Bộ lọc</SheetTitle>
          </SheetHeader>
          <div className="p-5">
            <FilterPanel
              {...filterPanelProps}
              onClearFilters={() => {
                handleClearFilters();
                setFilterSheetOpen(false);
              }}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default Home;
