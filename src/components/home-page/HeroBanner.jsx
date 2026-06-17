import { memo } from "react";
import {
  BriefcaseBusiness,
  ChevronDown,
  List,
  Loader2,
  MapPin,
  Search,
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
import { LOCATION_OPTIONS } from "@/config/constants/candidate.constant";

function HeroBanner({
  inputValue,
  onInputChange,
  locationValue,
  onLocationChange,
  onSearch,
  isFetching,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSearch();
  };

  return (
    <section className="bg-primary-container text-on-primary-container relative overflow-hidden px-4 pt-6 pb-8">
      <div className="pointer-events-none absolute inset-0 opacity-35">
        <div className="border-primary-fixed-dim/25 absolute top-8 -left-16 h-72 w-72 rotate-45 border-28" />
        <div className="border-primary/20 absolute top-12 -right-20 h-80 w-80 rotate-45 border-32" />
      </div>

      <div className="relative mx-auto max-w-6xl space-y-6">
        <div className="text-center">
          <h1 className="text-primary-fixed-dim text-2xl font-bold sm:text-4xl">
            Tìm việc làm nhanh 24h, việc làm mới nhất trên toàn quốc
          </h1>
          <p className="mt-2 text-sm font-semibold sm:text-base">
            Tiếp cận 60.000+ tin tuyển dụng mỗi ngày từ hàng nghìn doanh nghiệp
            uy tín tại Việt Nam
          </p>
        </div>

        <div className="bg-card text-foreground mx-auto flex max-w-5xl flex-col gap-2 rounded-xl p-2 shadow-xl md:flex-row md:items-center md:rounded-3xl">
          <Button
            type="button"
            variant="outline"
            className="border-border bg-card h-12 shrink-0 gap-2 rounded-2xl px-4 font-semibold"
          >
            <List className="size-4" />
            Danh mục nghề nghiệp
            <ChevronDown className="size-4" />
          </Button>

          <div className="relative min-w-0 flex-1 rounded-2xl border md:border-0">
            <BriefcaseBusiness className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              placeholder="Vị trí tuyển dụng, tên công ty"
              className="h-12 border-0 pl-9 text-base shadow-none focus-visible:ring-0"
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="border-border flex min-w-0 items-center gap-1 rounded-2xl border px-2 md:w-64 md:rounded-none md:border-y-0 md:border-r-0 md:border-l">
            <MapPin className="text-muted-foreground size-4 shrink-0" />
            <Select value={locationValue} onValueChange={onLocationChange}>
              <SelectTrigger className="bg-card h-12 flex-1 cursor-pointer border-0 focus:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {LOCATION_OPTIONS.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="cursor-pointer"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={onSearch}
            disabled={isFetching}
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 rounded-2xl px-8 font-bold"
          >
            {isFetching ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Search className="size-5" />
            )}
            Tìm kiếm
          </Button>
        </div>

        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-2 text-sm">
          <span className="font-semibold">Gợi ý:</span>
          {["Công nghệ thông tin", "Marketing", "Kinh doanh", "Nhân sự"].map(
            (keyword) => (
              <button
                key={keyword}
                type="button"
                onClick={() => onInputChange(keyword)}
                className="bg-card text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-full px-3 py-1"
              >
                {keyword}
              </button>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

export default memo(HeroBanner);
