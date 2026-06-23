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
    <section className="bg-background relative overflow-hidden px-4 py-16">
      {/* Apple-style Ambient Mesh Gradient Decor */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-70 transition-opacity duration-1000 dark:opacity-40">
        <div className="bg-mesh-cyan/30 absolute -top-[20%] -left-[10%] h-[80%] w-[60vw] rounded-full mix-blend-multiply blur-[120px] dark:mix-blend-screen" />
        <div className="bg-mesh-blue/20 absolute top-[10%] -right-[10%] h-[70%] w-[50vw] rounded-full mix-blend-multiply blur-[120px] dark:mix-blend-screen" />
        <div className="bg-mesh-purple/20 absolute -bottom-[20%] left-[15%] h-[60%] w-[60vw] rounded-full mix-blend-multiply blur-[120px] dark:mix-blend-screen" />
      </div>

      <div className="relative mx-auto max-w-6xl space-y-10">
        <div className="text-center">
          <h1 className="text-foreground text-4xl font-semibold tracking-tight md:text-6xl">
            Tìm việc làm nhanh 24h, việc làm mới nhất trên toàn quốc
          </h1>
          <p className="text-muted-foreground mt-4 text-[18px] leading-[1.47]">
            Tiếp cận 60.000+ tin tuyển dụng mỗi ngày từ hàng nghìn doanh nghiệp
            uy tín tại Việt Nam
          </p>
        </div>

        <div className="bg-card text-foreground border-border mx-auto flex max-w-5xl flex-col gap-2 rounded-[18px] border p-3 shadow-sm md:flex-row md:items-center">
          <Button
            type="button"
            variant="outline"
            className="border-border bg-card h-11 shrink-0 gap-2 rounded-full px-5 text-[14px] font-normal"
          >
            <List className="size-4" />
            Danh mục nghề nghiệp
            <ChevronDown className="size-4" />
          </Button>

          <div className="relative min-w-0 flex-1 md:border-0">
            <BriefcaseBusiness className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              placeholder="Vị trí tuyển dụng, tên công ty"
              className="border-border h-11 rounded-full border pl-10 text-[17px] shadow-none focus-visible:ring-0 md:rounded-none md:border-0"
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="border-border flex min-w-0 items-center gap-1 rounded-full border px-3 md:w-64 md:rounded-none md:border-y-0 md:border-r-0 md:border-l">
            <MapPin className="text-muted-foreground size-4 shrink-0" />
            <Select value={locationValue} onValueChange={onLocationChange}>
              <SelectTrigger className="bg-card h-11 flex-1 cursor-pointer border-0 focus:ring-0">
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
            className="bg-primary text-primary-foreground hover:bg-primary/90 h-11 rounded-full px-8 text-[17px] font-normal transition-transform active:scale-95"
          >
            {isFetching ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Search className="size-5" />
            )}
            Tìm kiếm
          </Button>
        </div>

        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-2 text-[14px]">
          <span className="text-muted-foreground font-semibold">Gợi ý:</span>
          {["Công nghệ thông tin", "Marketing", "Kinh doanh", "Nhân sự"].map(
            (keyword) => (
              <button
                key={keyword}
                type="button"
                onClick={() => onInputChange(keyword)}
                className="bg-muted text-foreground border-border hover:bg-accent cursor-pointer rounded-full border px-4 py-1.5 transition-transform active:scale-95"
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
