import { memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { buildPageList } from "@/utils/helper";

/**
 * Pagination component dùng chung trong FE
 *
 * Props:
 * - page         : number  — trang hiện tại
 * - totalPages   : number  — tổng số trang
 * - onPageChange : (page: number) => void — callback đổi trang
 * - isLoading?   : boolean — disable button khi đang fetch (default: false)
 * - showPageNumbers? : boolean — hiển thị số trang + dấu "..." (default: false)
 */
function Pagination({
  page,
  totalPages,
  onPageChange,
  isLoading = false,
  showPageNumbers = false,
}) {
  if (totalPages <= 1) return null;

  return (
    <div className="text-primary mt-6 flex items-center justify-center gap-3 text-sm font-semibold">
      <Button
        variant="outline"
        size="icon"
        disabled={page <= 1 || isLoading}
        onClick={() => onPageChange(page - 1)}
        className="size-8 cursor-pointer rounded-full"
      >
        <ChevronLeft className="size-4" />
      </Button>

      {showPageNumbers ? (
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
                size="icon"
                disabled={isLoading}
                onClick={() => onPageChange(item)}
                className="size-8 cursor-pointer rounded-full"
              >
                {item}
              </Button>
            ),
          )}
        </div>
      ) : (
        <span>{page} / {totalPages} trang</span>
      )}

      <Button
        variant="outline"
        size="icon"
        disabled={page >= totalPages || isLoading}
        onClick={() => onPageChange(page + 1)}
        className="size-8 cursor-pointer rounded-full"
      >
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}

export default memo(Pagination);
