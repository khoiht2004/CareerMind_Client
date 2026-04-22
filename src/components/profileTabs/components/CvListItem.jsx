import { memo, useCallback } from "react";
import { Eye, FileText, Pencil, Trash2 } from "lucide-react";
import { formatRelativeTime } from "@/utils/helper";

function CvListItem({ cv, onPreview, onSetDefault, onDelete }) {
  const handleSetDefault = useCallback(
    () => onSetDefault(cv.id),
    [cv.id, onSetDefault],
  );
  const handleDelete = useCallback(() => onDelete(cv), [cv, onDelete]);

  return (
    <div className="bg-card border-border flex min-h-[120px] flex-col gap-2 rounded-xl border p-4">
      <div className="flex items-start gap-3">
        <div className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
          <FileText className="text-primary size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-foreground line-clamp-1 text-sm font-semibold">
            {cv.name}
          </p>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Cập nhật {formatRelativeTime(cv.updatedAt ?? cv.createdAt)}
          </p>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between">
        <button
          onClick={handleSetDefault}
          className="text-secondary hover:text-secondary/80 cursor-pointer text-xs font-semibold tracking-wide uppercase transition-colors"
        >
          Đặt mặc định
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => onPreview(cv)}
            className="text-muted-foreground hover:text-foreground cursor-pointer rounded p-1 transition-colors"
          >
            <Eye className="size-4" />
          </button>
          <button
            onClick={handleDelete}
            className="text-muted-foreground hover:text-destructive cursor-pointer rounded p-1 transition-colors"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default memo(CvListItem);
