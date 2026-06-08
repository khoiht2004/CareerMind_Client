import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function FilterChipBar({ filterGroups, activeValues = {}, onChipChange }) {
  const [activeFilterKey, setActiveFilterKey] = useState(
    filterGroups[0]?.value ?? "",
  );
  const scrollRef = useRef(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const currentGroup =
    filterGroups.find((g) => g.value === activeFilterKey) ?? filterGroups[0];
  const activeChipValue = activeValues[currentGroup?.paramKey] ?? "ALL";

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 200, behavior: "smooth" });
  };

  const handleMouseDown = (e) => {
    isDragging.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
    scrollRef.current.style.cursor = "grabbing";
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft.current - (x - startX.current);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (scrollRef.current) scrollRef.current.style.cursor = "grab";
  };

  return (
    <div className="mb-4 grid gap-2 min-[576px]:flex min-[576px]:items-center">
      {/* Filter Select */}
      <div className="bg-card text-muted-foreground flex min-w-0 shrink-0 items-center gap-2 rounded-md border px-3 py-2 text-sm max-[575px]:w-full">
        <Filter className="size-4 shrink-0" />
        <span className="shrink-0">Lọc theo:</span>
        <Select value={activeFilterKey} onValueChange={setActiveFilterKey}>
          <SelectTrigger className="text-foreground h-auto w-auto gap-1 border-none p-0 font-medium shadow-none focus:ring-0">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {filterGroups.map((g) => (
              <SelectItem key={g.value} value={g.value}>
                {g.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex min-w-0 items-center gap-2">
        {/* Left chevron */}
        <Button
          variant="outline"
          size="icon"
          className="size-8 shrink-0 rounded-full"
          onClick={() => scroll(-1)}
        >
          <ChevronLeft className="size-4" />
        </Button>

        {/* Scrollable chips */}
        <div
          ref={scrollRef}
          className="flex min-w-0 flex-1 cursor-grab gap-2 overflow-x-auto scroll-smooth select-none [scrollbar-width:none]"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {currentGroup?.chips.map((chip) => (
            <button
              key={chip.value}
              type="button"
              className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                chip.value === activeChipValue
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
              onClick={() => onChipChange?.(currentGroup.paramKey, chip.value)}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* Right chevron */}
        <Button
          variant="outline"
          size="icon"
          className="size-8 shrink-0 rounded-full"
          onClick={() => scroll(1)}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

export default FilterChipBar;
