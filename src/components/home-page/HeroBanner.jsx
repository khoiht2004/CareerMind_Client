import { memo } from "react";
import { Search, Loader2, MapPin } from "lucide-react";
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
    <div className="from-chart-1 to-chart-2 rounded-2xl bg-linear-to-r px-5 py-8 sm:px-8 sm:py-12">
      <div className="max-w-full space-y-4 sm:max-w-[82%] sm:space-y-5">
        {/* Heading */}
        <div className="space-y-1.5">
          <h1 className="text-primary-foreground text-2xl font-bold leading-snug sm:text-3xl">
            Tìm kiếm cơ hội nghề nghiệp
            <br className="hidden sm:block" /> tiếp theo của bạn
          </h1>
          <p className="text-primary-foreground/70 text-xs sm:text-sm">
            Kết nối với các công ty đang phát triển hàng đầu. Sự nghiệp của bạn
            bắt đầu từ đây.
          </p>
        </div>

        {/* Search bar — column on mobile, row on sm+ */}
        <div className="bg-input flex flex-col gap-2 rounded-xl p-2 sm:flex-row">
          {/* Keyword input */}
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              placeholder="Chức danh hoặc kỹ năng..."
              className="bg-input border-border h-10 pl-9"
              value={inputValue}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Location select */}
          <div className="bg-input border-border flex items-center gap-1 rounded-lg border px-2">
            <MapPin className="text-muted-foreground size-4 shrink-0" />
            <Select value={locationValue} onValueChange={onLocationChange}>
              <SelectTrigger className="bg-input h-10 w-full cursor-pointer border-0 focus:ring-0 sm:w-44">
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

          {/* Search button — full width on mobile */}
          <Button
            onClick={onSearch}
            disabled={isFetching}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10 w-full cursor-pointer gap-2 px-3 sm:w-auto"
          >
            {isFetching ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Search className="size-4" />
            )}
            Tìm việc làm
          </Button>
        </div>
      </div>
    </div>
  );
}

export default memo(HeroBanner);
