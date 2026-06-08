import { useMemo } from "react";
import { Download, ExternalLink, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatFileSize, formatVN } from "@/utils/helper";

function getGoogleViewerUrl(fileUrl) {
  return `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`;
}

function CvPreviewDialog({ open, onClose, cv }) {
  // Convert base64 data URL to blob URL for viewer (avoids data URL size limits)
  const resolvedFileUrl = useMemo(() => {
    if (!cv?.fileUrl) return null;
    if (!cv.fileUrl.startsWith("data:")) return cv.fileUrl;
    try {
      const [header, base64] = cv.fileUrl.split(",");
      const mime = header.match(/:(.*?);/)?.[1] ?? "application/octet-stream";
      const bytes = atob(base64);
      const arr = new Uint8Array(bytes.length);
      for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
      return URL.createObjectURL(new Blob([arr], { type: mime }));
    } catch {
      return cv.fileUrl;
    }
  }, [cv?.fileUrl]);

  if (!cv) return null;

  const { name, fileType, fileSize, createdAt, isLocalBlob } = cv;
  const isPdf = fileType === "pdf";
  const sizeLabel = fileSize ? formatFileSize(fileSize) : null;
  const dateLabel = createdAt ? formatVN(createdAt) : null;

  const canGoogleView = !isLocalBlob && !isPdf;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        showCloseButton={false}
        className="flex h-[90vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-4xl"
      >
        {/* ── Header ── */}
        <DialogHeader className="flex-row items-center gap-3 border-b px-4 py-2.5">
          <FileText className="text-muted-foreground size-4 shrink-0" />
          <DialogTitle className="flex-1 truncate text-sm font-semibold">
            {name}
          </DialogTitle>

          {/* Metadata */}
          <div className="text-muted-foreground hidden shrink-0 items-center gap-2.5 text-xs sm:flex">
            {fileType && (
              <span className="bg-muted rounded px-1.5 py-0.5 font-mono uppercase">
                {fileType}
              </span>
            )}
            {sizeLabel && <span>{sizeLabel}</span>}
            {dateLabel && <span>{dateLabel}</span>}
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-0.5">
            {resolvedFileUrl && (
              <Button
                variant="ghost"
                size="icon"
                className="size-8"
                title="Mở tab mới"
                asChild
              >
                <a
                  href={resolvedFileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="size-4" />
                </a>
              </Button>
            )}

            {resolvedFileUrl && (
              <Button variant="ghost" size="icon" className="size-8" asChild>
                <a href={resolvedFileUrl} download={name}>
                  <Download className="size-4" />
                </a>
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              title="Đóng"
              onClick={onClose}
            >
              <X className="size-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* ── Body ── */}
        <div className="flex-1 overflow-hidden">
          {isPdf && resolvedFileUrl ? (
            // Browser native PDF rendering — no worker needed, no CORS issues
            <iframe
              src={resolvedFileUrl}
              title={name}
              className="size-full border-0"
            />
          ) : canGoogleView && resolvedFileUrl ? (
            <iframe
              src={getGoogleViewerUrl(resolvedFileUrl)}
              title={name}
              className="size-full border-0"
              allow="fullscreen"
            />
          ) : (
            <div className="text-muted-foreground flex h-full flex-col items-center justify-center gap-2 text-sm">
              <FileText className="size-10 opacity-40" />
              <p>Không thể xem trước file này.</p>
              {resolvedFileUrl && (
                <a
                  href={resolvedFileUrl}
                  download={name}
                  className="text-primary underline"
                >
                  Tải xuống để xem
                </a>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CvPreviewDialog;
