import { Search, Loader2, SlidersHorizontal } from "lucide-react";

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
import { useHome } from "@/hooks/useHome";

function Home() {
  const {
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
  } = useHome();

  const filterPanelProps = {
    typeFilter: filters.type,
    onTypeChange: handleTypeChange,
    levelFilter: filters.level,
    onLevelChange: handleLevelChange,
    industryFilter: filters.industry,
    onIndustryChange: handleIndustryChange,
    salaryFilter: filters.salary,
    onSalaryChange: handleSalaryChange,
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
                    job={job}
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
