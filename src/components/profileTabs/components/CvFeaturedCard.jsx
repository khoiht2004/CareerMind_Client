import { memo, useCallback } from "react";
import { FileText, Eye, Download, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatFileSize, formatRelativeTime } from "@/utils/helper";

function CvFeaturedCard({ cv, onPreview, onDelete }) {
  const handlePreview = useCallback(() => onPreview(cv), [cv, onPreview]);
  const handleDelete = useCallback(() => onDelete(cv), [cv, onDelete]);

  return (
    <div
      className="bg-card border-secondary rounded-xl border-l-4 p-5"
      style={{ borderLeftColor: "var(--primary)" }}
    >
      <div className="flex items-start justify-between gap-4">
        {/* Icon + Info */}
        <div className="flex items-start gap-4">
          <div className="bg-primary/10 flex size-14 shrink-0 items-center justify-center rounded-xl">
            <FileText className="text-primary size-7" />
          </div>
          <div>
            <h4 className="text-foreground font-bold">{cv.name}</h4>
            <p className="text-muted-foreground mt-0.5 text-sm">
              Cập nhật {formatRelativeTime(cv.updatedAt ?? cv.createdAt)}
              {cv.fileSize ? ` • ${formatFileSize(cv.fileSize)}` : ""}
            </p>
            <div className="mt-3 flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="cursor-pointer gap-1.5"
                onClick={handlePreview}
              >
                <Eye className="size-3.5" />
                Xem
              </Button>

              <Button
                size="sm"
                variant="outline"
                className="cursor-pointer gap-1.5"
                asChild
              >
                <a href={cv.url} download>
                  <Download className="size-3.5" />
                  Tải về
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Badge + Delete */}
        <div className="flex shrink-0 items-start gap-2">
          <Badge
            variant="outline"
            className="bg-status-accepted-bg text-status-accepted-text border-status-accepted-border text-xs font-bold"
          >
            Mặc định
          </Badge>
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

export default memo(CvFeaturedCard);
