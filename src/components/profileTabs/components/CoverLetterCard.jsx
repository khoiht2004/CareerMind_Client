import { memo, useCallback } from "react";
import { Pencil, MoreVertical, Trash2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatRelativeTime } from "@/utils/helper";
import { Separator } from "@/components/ui/separator";

function CoverLetterCard({ cl, onEdit, onDelete }) {
  const handleEdit = useCallback(() => onEdit(cl), [cl, onEdit]);
  const handleDelete = useCallback(() => onDelete(cl.id), [cl.id, onDelete]);

  const isRecent =
    Date.now() - new Date(cl.updatedAt).getTime() < 7 * 24 * 60 * 60 * 1000;

  return (
    <div className="bg-card border-border rounded-xl border p-4 transition-shadow hover:shadow-sm">
      {/* Header row */}
      <div className="mb-2 flex items-start justify-between gap-2">
        <h4 className="text-foreground line-clamp-1 font-semibold">
          {cl.title}
        </h4>
        <div className="flex shrink-0 items-center gap-0.5">
          <Button
            variant="ghost"
            size="icon"
            className="size-7 cursor-pointer"
            onClick={handleEdit}
          >
            <Pencil className="size-3.5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="size-7 cursor-pointer"
              >
                <MoreVertical className="size-3.5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={handleDelete}
                className="text-destructive focus:text-destructive cursor-pointer"
              >
                <Trash2 className="mr-2 size-4" />
                Xóa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Tags */}
      {isRecent && (
        <div className="mb-3">
          <Badge
            className="bg-status-reviewing-bg text-status-reviewing-text border-status-reviewing-border text-xs"
            variant="outline"
          >
            Mới cập nhật
          </Badge>
        </div>
      )}

      {/* Preview */}
      <p className="text-muted-foreground mb-3 line-clamp-2 text-sm leading-relaxed">
        {cl.content}
      </p>

      <Separator />

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between">
        <p className="text-muted-foreground text-xs">
          Cập nhật {formatRelativeTime(cl.updatedAt)}
        </p>
        <button
          onClick={handleEdit}
          className="text-secondary hover:text-secondary/80 inline-flex cursor-pointer items-center gap-1 text-sm font-semibold transition-colors"
        >
          Xem chi tiết
          <ArrowRight className="size-3" />
        </button>
      </div>
    </div>
  );
}

export default memo(CoverLetterCard);
