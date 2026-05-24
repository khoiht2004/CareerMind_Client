import { useCallback } from "react";
import { Loader2, Search } from "lucide-react";
import HeroBanner from "@/components/home-page/HeroBanner";
import { useHome } from "@/hooks/useHome";
import {
  AttractiveJobsSection,
  TopJobsSection,
} from "@/components/home-page/JobShowcaseSection";
import SlideBannerSection from "@/components/home-page/SlideBannerSection";
import RecommendedJobsSection from "@/components/home-page/RecommendedJobsSection";
import LightningSection from "@/components/home-page/LightningSection";
import FeaturedIndustrySection from "@/components/home-page/FeaturedIndustrySection";
import HotlineSection from "@/components/home-page/HotlineSection";
import SeoContentSection from "@/components/home-page/SeoContentSection";

function HomeLoading() {
  return (
    <div className="flex justify-center py-24">
      <Loader2 className="text-muted-foreground size-10 animate-spin" />
    </div>
  );
}

function HomeEmpty() {
  return (
    <div className="text-muted-foreground bg-white py-24 text-center">
      <Search className="mx-auto mb-3 size-12 opacity-30" />
      <p className="text-lg font-medium">Không tìm thấy kết quả phù hợp</p>
      <p className="mt-1 text-sm">Thử thay đổi từ khóa hoặc bộ lọc</p>
    </div>
  );
}

function Home() {
  const {
    inputValue,
    setInputValue,
    filters,
    topJobs,
    attractiveJobs,
    recommendedJobs,
    lightningJobs,
    topPage,
    setTopPage,
    topTotalPages,
    attractivePage,
    setAttractivePage,
    attractiveTotalPages,
    isLoading,
    isFetching,
    handleSearch,
    handleLocationChange,
    handleSalaryChange,
    handleLevelChange,
    handleIndustryChange,
  } = useHome();

  const handleFilterChange = useCallback(
    (paramKey, value) => {
      const handlers = {
        location: handleLocationChange,
        salary: handleSalaryChange,
        level: handleLevelChange,
        industry: handleIndustryChange,
      };
      handlers[paramKey]?.(value);
    },
    [
      handleLocationChange,
      handleSalaryChange,
      handleLevelChange,
      handleIndustryChange,
    ],
  );

  const hasAnyJobs =
    topJobs.length > 0 ||
    attractiveJobs.length > 0 ||
    recommendedJobs.length > 0 ||
    lightningJobs.length > 0;

  return (
    <div className="min-h-screen bg-white">
      <HeroBanner
        inputValue={inputValue}
        onInputChange={setInputValue}
        locationValue={filters.location}
        onLocationChange={handleLocationChange}
        onSearch={handleSearch}
        isFetching={isFetching}
      />

      {isLoading ? (
        <HomeLoading />
      ) : !hasAnyJobs ? (
        <HomeEmpty />
      ) : (
        <>
          <TopJobsSection
            jobs={topJobs}
            page={topPage}
            totalPages={topTotalPages}
            onPageChange={setTopPage}
            isLoading={isFetching}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
          <SlideBannerSection />
          <AttractiveJobsSection
            jobs={attractiveJobs}
            page={attractivePage}
            totalPages={attractiveTotalPages}
            onPageChange={setAttractivePage}
            isLoading={isFetching}
            filters={filters}
            onFilterChange={handleFilterChange}
          />
          <RecommendedJobsSection jobs={recommendedJobs} />
          <LightningSection jobs={lightningJobs} />
          <FeaturedIndustrySection />
          <HotlineSection />
          <SeoContentSection />
        </>
      )}
    </div>
  );
}

export default Home;
