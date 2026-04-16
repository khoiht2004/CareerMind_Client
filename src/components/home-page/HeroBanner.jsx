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
    <div className="from-chart-1 to-chart-2 rounded-3xl bg-linear-to-r px-8 py-12">
      <div className="max-w-[82%] space-y-5">
        <div className="space-y-2">
          <h1 className="text-primary-foreground text-3xl leading-snug font-bold">
            Tìm kiếm cơ hội nghề nghiệp
            <br />
            tiếp theo của bạn
          </h1>
          <p className="text-primary-foreground/70 text-sm">
            Kết nối với các công ty đang phát triển hàng đầu. Sự nghiệp của bạn
            bắt đầu từ đây.
          </p>
        </div>

        <div className="bg-input flex gap-2 rounded-xl p-2 backdrop-blur-sm">
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
              <SelectTrigger className="bg-input h-10 w-44 cursor-pointer border-0 focus:ring-0">
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

          <Button
            onClick={onSearch}
            disabled={isFetching}
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-10 cursor-pointer gap-2 px-3"
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

export default HeroBanner;
