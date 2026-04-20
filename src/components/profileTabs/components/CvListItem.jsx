import { memo, useCallback } from "react";
import { FileText, Trash2, Star, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/utils/helper";

function CvListItem({ cv, onPreview, onSetDefault, onDelete }) {
  const handlePreview = useCallback(() => onPreview(cv), [cv, onPreview]);
  const handleSetDefault = useCallback(
    () => onSetDefault(cv.id),
    [cv.id, onSetDefault],
  );
  const handleDelete = useCallback(() => onDelete(cv), [cv, onDelete]);

  return (
    <li className="bg-muted/40 flex items-center gap-3 rounded-lg border px-4 py-3">
      <FileText className="text-primary size-5 shrink-0" />

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="truncate text-xs font-medium sm:text-sm">
            {cv.name}
          </span>
          {cv.isDefault && (
            <Badge
              variant="secondary"
              className="hidden shrink-0 text-xs sm:flex"
            >
              <Star className="mr-1 size-2.5 fill-current" />
              Mặc định
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground mt-0.5 text-xs">
          {cv.fileType?.toUpperCase()} · {formatFileSize(cv.fileSize)} ·{" "}
          {new Date(cv.createdAt).toLocaleDateString("vi-VN")}
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="size-9"
          title="Xem CV"
          onClick={handlePreview}
        >
          <Eye className="size-4.5" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-9"
          title="Đặt làm mặc định"
          onClick={handleSetDefault}
        >
          <Star
            className="size-4.5"
            color={
              cv.isDefault ? "var(--secondary-container)" : "currentColor"
            }
          />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-destructive hover:text-destructive size-8"
          title="Xóa CV"
          onClick={handleDelete}
        >
          <Trash2 className="size-4.5" />
        </Button>
      </div>
    </li>
  );
}

export default memo(CvListItem);
