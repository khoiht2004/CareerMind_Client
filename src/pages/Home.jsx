import { useState } from "react";
import {
  Search,
  MapPin,
  Briefcase,
  Loader2,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import JobCard from "@/features/jobs/components/JobCard";
import { useGetJobsQuery } from "@/services/job.service";
import { buildPageList, formatRelativeTime, parseTags } from "@/utils/helper";

const LIMIT = 10;

const JOB_TYPE_OPTIONS = [
  { label: "Tất cả loại hình", value: "ALL" },
  { label: "Toàn thời gian", value: "FULL_TIME" },
  { label: "Bán thời gian", value: "PART_TIME" },
  { label: "Remote", value: "REMOTE" },
  { label: "Thực tập", value: "INTERNSHIP" },
  { label: "Hợp đồng", value: "CONTRACT" },
];

const LOCATION_OPTIONS = [
  { label: "Tất cả địa điểm", value: "ALL" },
  { label: "TP. Hồ Chí Minh", value: "Hồ Chí Minh" },
  { label: "Hà Nội", value: "Hà Nội" },
  { label: "Đà Nẵng", value: "Đà Nẵng" },
  { label: "Remote", value: "Remote" },
];

const JOB_TYPE_LABELS = {
  FULL_TIME: "Toàn thời gian",
  PART_TIME: "Bán thời gian",
  REMOTE: "Remote",
  INTERNSHIP: "Thực tập",
  CONTRACT: "Hợp đồng",
};

function Home() {
  const [inputValue, setInputValue] = useState("");
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({
    search: "",
    type: "ALL",
    location: "ALL",
  });

  const { data, isLoading, isFetching } = useGetJobsQuery({
    ...filters,
    page,
    limit: LIMIT,
  });

  const jobs = data?.data?.jobs ?? [];
  const total = data?.data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / LIMIT));

  const handleSearch = () => {
    setPage(1);
    setFilters((f) => ({ ...f, search: inputValue }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  const handleTypeChange = (v) => {
    setPage(1);
    setFilters((f) => ({ ...f, type: v }));
  };

  const handleLocationChange = (v) => {
    setPage(1);
    setFilters((f) => ({ ...f, location: v }));
  };

  const handleClearFilters = () => {
    setPage(1);
    setInputValue("");
    setFilters({ search: "", type: "ALL", location: "ALL" });
  };

  const hasFilters =
    filters.search || filters.type !== "ALL" || filters.location !== "ALL";

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Tìm kiếm việc làm</h1>
        <p className="text-muted-foreground mt-1">
          Hiện có <span className="text-foreground font-semibold">{total}</span>{" "}
          vị trí phù hợp với hồ sơ của bạn
        </p>
      </div>

      {/* Search bar */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="text-muted-foreground absolute top-1/2 left-4 size-5 -translate-y-1/2" />
          <Input
            placeholder="Tìm tên công việc, kỹ năng hoặc công ty..."
            className="h-10 pl-11 text-base"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        <Button
          size="lg"
          onClick={handleSearch}
          disabled={isFetching}
          className="h-10 cursor-pointer gap-2 px-6"
        >
          {isFetching ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Search className="size-4" />
          )}
          Tìm kiếm
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <Briefcase className="text-muted-foreground size-4" />
          <Select value={filters.type} onValueChange={handleTypeChange}>
            <SelectTrigger className="h-10 w-48 cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {JOB_TYPE_OPTIONS.map((o) => (
                <SelectItem
                  key={o.value}
                  value={o.value}
                  className="cursor-pointer"
                >
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="text-muted-foreground size-4" />
          <Select value={filters.location} onValueChange={handleLocationChange}>
            <SelectTrigger className="h-10 w-52 cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LOCATION_OPTIONS.map((o) => (
                <SelectItem
                  key={o.value}
                  value={o.value}
                  className="cursor-pointer"
                >
                  {o.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {hasFilters && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleClearFilters}
            className="h-8 cursor-pointer gap-1.5"
          >
            <X className="text-muted-foreground size-3.5" />
            Xóa bộ lọc
          </Button>
        )}
      </div>

      {/* Results */}
      {isLoading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="text-muted-foreground size-10 animate-spin" />
        </div>
      ) : jobs.length === 0 ? (
        <div className="text-muted-foreground py-20 text-center">
          <Search className="mx-auto mb-3 size-12 opacity-30" />
          <p className="text-lg font-medium">Không tìm thấy kết quả phù hợp</p>
          <p className="mt-1 text-sm">Thử thay đổi từ khóa hoặc bộ lọc</p>
        </div>
      ) : (
        <>
          <p className="text-muted-foreground text-sm">
            Hiển thị{" "}
            <span className="text-foreground font-medium">{jobs.length}</span> /{" "}
            {total} kết quả &nbsp;·&nbsp; Trang {page}/{totalPages}
          </p>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={{
                  ...job,
                  tags: parseTags(job.tags),
                  type: JOB_TYPE_LABELS[job.type] ?? job.type,
                  postedAt: formatRelativeTime(job.createdAt),
                }}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4 pb-2">
              <Button
                variant="outline"
                disabled={page === 1 || isFetching}
                onClick={() => setPage((p) => p - 1)}
                className="cursor-pointer gap-1"
              >
                <ChevronLeft className="size-4" />
                Trước
              </Button>

              <div className="flex items-center gap-1">
                {buildPageList(page, totalPages).map((item, idx) =>
                  item === "..." ? (
                    <span
                      key={`e${idx}`}
                      className="text-muted-foreground px-2 text-sm select-none"
                    >
                      ...
                    </span>
                  ) : (
                    <Button
                      key={item}
                      variant={item === page ? "default" : "outline"}
                      size="sm"
                      disabled={isFetching}
                      onClick={() => setPage(item)}
                      className="h-9 w-9 cursor-pointer"
                    >
                      {item}
                    </Button>
                  ),
                )}
              </div>

              <Button
                variant="outline"
                disabled={page >= totalPages || isFetching}
                onClick={() => setPage((p) => p + 1)}
                className="cursor-pointer gap-1"
              >
                Tiếp
                <ChevronRight className="size-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
