import { memo, useRef } from "react";
import { Upload, File, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/utils/helper";

const MAX_SIZE_MB = 2;

function CvDropZone({
  pendingFile,
  isDragging,
  isUploading,
  onDragOver,
  onDragLeave,
  onDrop,
  onUpload,
  onCancel,
  onFileSelect,
}) {
  const inputRef = useRef(null);

  const handleZoneClick = () => {
    if (!pendingFile) inputRef.current?.click();
  };

  return (
    <>
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={handleZoneClick}
        className={`cursor-pointer space-y-3 rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
          isDragging
            ? "border-primary bg-primary/5"
            : "hover:border-foreground/30 border-muted-foreground/25"
        }`}
      >
        {pendingFile ? (
          <div className="space-y-3">
            <div className="bg-muted mx-auto flex w-fit items-center gap-2 rounded-lg px-4 py-2">
              <File className="text-primary size-5 shrink-0" />
              <div className="text-left">
                <p className="max-w-[200px] truncate text-sm font-medium">
                  {pendingFile.name}
                </p>
                <p className="text-muted-foreground text-xs">
                  {formatFileSize(pendingFile.size)}
                </p>
              </div>
            </div>

            <div className="flex justify-center gap-2">
              <Button
                type="button"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onUpload();
                }}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-1.5 size-3.5 animate-spin" />
                    Đang tải lên...
                  </>
                ) : (
                  <>
                    <Upload className="mr-1.5 size-3.5" />
                    Tải lên
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onCancel();
                }}
                disabled={isUploading}
              >
                Hủy
              </Button>
            </div>
          </div>
        ) : (
          <>
            <Upload className="text-muted-foreground mx-auto size-8" />
            <div>
              <p className="text-sm font-medium">
                Kéo thả hoặc nhấn để tải lên CV
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                Hỗ trợ PDF, DOC, DOCX (tối đa {MAX_SIZE_MB}MB)
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
            >
              Chọn file
            </Button>
          </>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={onFileSelect}
      />
    </>
  );
}

export default memo(CvDropZone);
