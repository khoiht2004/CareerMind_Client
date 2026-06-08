import { Document, Page } from "react-pdf";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ExternalLink,
} from "lucide-react";

function PdfViewer({ fileUrl, containerWidth }) {
  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadError, setLoadError] = useState(false);

  const handleLoadSuccess = useCallback(({ numPages: n }) => {
    setNumPages(n);
    setCurrentPage(1);
    setLoadError(false);
  }, []);

  // Subtract 2px for the border so the page fits cleanly
  const pageWidth = containerWidth > 2 ? containerWidth - 2 : undefined;

  return (
    <div className="flex h-full flex-col">
      {/* Scrollable PDF area */}
      <div className="bg-muted flex flex-1 justify-center overflow-auto p-4">
        {loadError ? (
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <AlertCircle className="text-destructive size-10" />
            <p className="text-muted-foreground text-sm">
              Không thể tải file PDF.
            </p>
            <Button variant="outline" size="sm" asChild>
              <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1.5 size-3.5" />
                Mở trong tab mới
              </a>
            </Button>
          </div>
        ) : (
          <Document
            file={fileUrl}
            onLoadSuccess={handleLoadSuccess}
            onLoadError={() => setLoadError(true)}
            loading={
              <div className="text-muted-foreground flex items-center gap-2 py-16 text-sm">
                <Loader2 className="size-5 animate-spin" />
                Đang tải PDF…
              </div>
            }
          >
            <Page
              pageNumber={currentPage}
              width={pageWidth}
              renderTextLayer
              renderAnnotationLayer
            />
          </Document>
        )}
      </div>

      {/* Page navigation — only shown when there is more than one page */}
      {numPages && numPages > 1 && (
        <div className="flex shrink-0 items-center justify-center gap-3 border-t px-4 py-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            disabled={currentPage <= 1}
            onClick={() => setCurrentPage((p) => p - 1)}
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span className="text-muted-foreground min-w-[80px] text-center text-xs">
            Trang {currentPage} / {numPages}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="size-7"
            disabled={currentPage >= numPages}
            onClick={() => setCurrentPage((p) => p + 1)}
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      )}
    </div>
  );
}

export default PdfViewer;
