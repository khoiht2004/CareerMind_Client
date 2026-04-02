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
    <div className="flex items-center justify-center gap-2 pt-4 pb-2">
      {/* Nút Trước */}
      <Button
        variant="outline"
        size="sm"
        disabled={page <= 1 || isLoading}
        onClick={() => onPageChange(page - 1)}
        className="cursor-pointer gap-1"
      >
        <ChevronLeft className="size-4" />
        Trước
      </Button>

      {/* Số trang (optional) */}
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
                size="sm"
                disabled={isLoading}
                onClick={() => onPageChange(item)}
                className="h-9 w-9 cursor-pointer"
              >
                {item}
              </Button>
            ),
          )}
        </div>
      ) : (
        /* Hiển thị "X / Y" đơn giản */
        <span className="flex items-center px-3 text-sm">
          {page} / {totalPages}
        </span>
      )}

      {/* Nút Sau */}
      <Button
        variant="outline"
        size="sm"
        disabled={page >= totalPages || isLoading}
        onClick={() => onPageChange(page + 1)}
        className="cursor-pointer gap-1"
      >
        Sau
        <ChevronRight className="size-4" />
      </Button>
    </div>
  );
}

export default Pagination;
