import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function HomeSectionHeader({ title, showAll = true }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <h2 className="text-primary text-2xl font-bold">{title}</h2>
        <div className="text-muted-foreground hidden items-center gap-1 border-l pl-3 text-xs font-bold sm:flex">
          <span className="border-primary text-primary grid size-6 place-items-center rounded-full border-2">
            AI
          </span>
          Đề xuất bởi MindScoutAI
        </div>
      </div>
      <div className="flex items-center gap-2">
        {showAll ? (
          <button type="button" className="text-xs font-medium underline">
            Xem tất cả
          </button>
        ) : null}
        <Button variant="outline" size="icon" className="size-8 rounded-full">
          <ChevronLeft className="size-4" />
        </Button>
        <Button variant="outline" size="icon" className="size-8 rounded-full">
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}

export default HomeSectionHeader;
