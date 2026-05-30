import { Star, MapPin, Loader2, Check, BadgeDollarSign } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { AI_INTEREST_OPTIONS } from "@/config/constants/candidate.constant";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

function ChatbotConfigForm({
  interests,
  toggleInterest,
  salaryRange,
  setSalaryRange,
  locations,
  isSaving,
  handleSave,
  handleCancel,
}) {
  return (
    <div className="bg-card border-border flex-1 rounded-2xl border p-6 shadow-sm">
      <div className="space-y-8">
        {/* Lĩnh vực quan tâm */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Star className="text-secondary size-5" fill="currentColor" />
            <h3 className="text-base font-semibold">Lĩnh vực quan tâm</h3>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {AI_INTEREST_OPTIONS.map((opt) => {
              const isSelected = interests.includes(opt);
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => toggleInterest(opt)}
                  className={cn(
                    "flex cursor-pointer items-center justify-between rounded-lg border p-3 text-sm transition-colors",
                    isSelected
                      ? "border-secondary bg-secondary/5 text-foreground"
                      : "border-border bg-background text-muted-foreground hover:bg-muted",
                  )}
                >
                  {opt}
                  <div
                    className={cn(
                      "flex size-5 items-center justify-center rounded-full border",
                      isSelected
                        ? "border-secondary bg-secondary text-primary-foreground"
                        : "border-border bg-muted",
                    )}
                  >
                    {isSelected && <Check className="size-3 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Mức lương mong muốn */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <BadgeDollarSign className="text-secondary size-5" />
            <h3 className="text-base font-semibold">Mức lương mong muốn</h3>
          </div>

          <div className="bg-muted/30 rounded-xl p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-muted-foreground text-sm">
                Khoảng lương (VNĐ)
              </span>
              <span className="text-foreground font-semibold">
                {salaryRange[0].toLocaleString()}.000.000 -{" "}
                {salaryRange[1].toLocaleString()}.000.000
              </span>
            </div>

            <Slider
              defaultValue={[15, 35]}
              value={salaryRange}
              min={5}
              max={100}
              step={1}
              onValueChange={setSalaryRange}
              className="py-4"
            />

            <div className="text-muted-foreground mt-2 flex items-center justify-between text-[10px] font-medium uppercase">
              <span>5 TR</span>
              <span>100 TR+</span>
            </div>
          </div>
        </div>

        {/* Địa điểm làm việc */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="text-secondary size-5" fill="currentColor" />
            <h3 className="text-base font-semibold">Địa điểm làm việc</h3>
          </div>

          <div className="bg-muted/30 relative flex flex-wrap items-center gap-2 rounded-xl p-2 pl-4">
            <Input
              className="text-muted-foreground min-w-[200px] flex-1 text-sm"
              placeholder="Nhập thành phố hoặc khu vực..."
            />
            <div className="flex gap-2">
              {locations.map((location) => (
                <span
                  key={location}
                  className="bg-secondary text-secondary-foreground flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-bold tracking-wider uppercase"
                >
                  {location}
                </span>
              ))}
            </div>
          </div>

          {/* Map placeholder */}
          <div className="border-border bg-primary-container relative h-40 w-full overflow-hidden rounded-xl border opacity-90">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle at center, transparent 30%, var(--primary-container) 80%), repeating-linear-gradient(45deg, transparent, transparent 10px, color-mix(in srgb, var(--on-primary-container) 10%, transparent) 10px, color-mix(in srgb, var(--on-primary-container) 10%, transparent) 11px), repeating-linear-gradient(-45deg, transparent, transparent 15px, color-mix(in srgb, var(--on-primary-container) 10%, transparent) 15px, color-mix(in srgb, var(--on-primary-container) 10%, transparent) 16px)",
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="border-on-primary-container/20 size-48 rounded-full border"></div>
              <div className="border-on-primary-container/20 absolute size-24 rounded-full border"></div>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <Button
            onClick={handleCancel}
            variant="secondary"
            className="bg-muted hover:bg-muted/80 text-foreground flex-1 cursor-pointer py-5"
          >
            Hủy cập nhật
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1 cursor-pointer py-5"
          >
            {isSaving && <Loader2 className="mr-2 size-4 animate-spin" />}
            Lưu cấu hình AI
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ChatbotConfigForm;
