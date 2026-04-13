import { useRef } from "react";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Download, ExternalLink, FileText, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatFileSize, formatVN } from "@/utils/helper";
import useContainerWidth from "@/hooks/useContainerWidth";
import PdfViewer from "./PdfViewer";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

function getGoogleViewerUrl(fileUrl) {
  return `https://docs.google.com/viewer?url=${encodeURIComponent(fileUrl)}&embedded=true`;
}

function CvPreviewDialog({ open, onClose, cv }) {
  const containerRef = useRef(null);
  const containerWidth = useContainerWidth(containerRef);

  if (!cv) return null;

  const { name, fileUrl, fileType, fileSize, createdAt } = cv;
  const isPdf = fileType === "pdf";
  const sizeLabel = formatFileSize(fileSize);
  const dateLabel = formatVN(createdAt);

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
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              title="Mở tab mới"
              asChild
            >
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
        <div ref={containerRef} className="flex-1 overflow-hidden">
          {isPdf ? (
            <PdfViewer fileUrl={fileUrl} containerWidth={containerWidth} />
          ) : (
            <iframe
              src={getGoogleViewerUrl(fileUrl)}
              title={name}
              className="size-full border-0"
              allow="fullscreen"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default CvPreviewDialog;
