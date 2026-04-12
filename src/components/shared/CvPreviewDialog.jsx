import { Download, ExternalLink, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatVN } from "@/utils/helper";

function formatFileSize(bytes) {
  if (!bytes) return null;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

function getViewerUrl(fileUrl, fileType) {
  if (fileType === "pdf") return fileUrl;
  return `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`;
}

function CvPreviewDialog({ open, onClose, cv }) {
  if (!cv) return null;

  const { name, fileUrl, fileType, fileSize, createdAt } = cv;
  const viewerUrl = getViewerUrl(fileUrl, fileType);
  const sizeLabel = formatFileSize(fileSize);
  const dateLabel = formatVN(createdAt);

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="flex h-[90vh] flex-col gap-0 p-0 sm:max-w-4xl">
        {/* Header */}
        <DialogHeader className="flex-row items-center justify-between border-b px-5 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <FileText className="text-muted-foreground size-4 shrink-0" />
            <DialogTitle className="truncate text-sm font-semibold">
              {name}
            </DialogTitle>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            {/* Metadata badges */}
            <div className="text-muted-foreground hidden items-center gap-3 text-xs sm:flex">
              {fileType && (
                <span className="bg-muted rounded px-1.5 py-0.5 font-mono uppercase">
                  {fileType}
                </span>
              )}
              {sizeLabel && <span>{sizeLabel}</span>}
              {dateLabel && <span>{dateLabel}</span>}
            </div>

            {/* Open in new tab */}
            <Button variant="ghost" size="icon" className="size-8" asChild>
              <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="size-4" />
              </a>
            </Button>

            {/* Download */}
            <Button variant="ghost" size="icon" className="size-8" asChild>
              <a href={fileUrl} download={name}>
                <Download className="size-4" />
              </a>
            </Button>

            {/* Close */}
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={onClose}
            >
              <X className="size-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Viewer */}
        <div className="flex-1 overflow-hidden bg-gray-100 dark:bg-zinc-900">
          <iframe
            src={viewerUrl}
            title={name}
            className="size-full border-0"
            allow="fullscreen"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CvPreviewDialog;
