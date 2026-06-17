import { memo, useRef } from "react";
import { CloudUpload, File, Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/utils/helper";

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
  maxSizeMb = 5,
}) {
  const inputRef = useRef(null);

  return (
    <>
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`rounded-2xl p-6 transition-colors ${
          isDragging
            ? "bg-primary/5 outline-2 outline-dashed"
            : "bg-muted-foreground/10"
        }`}
      >
        {pendingFile ? (
          <div className="space-y-4">
            <div className="bg-background mx-auto flex w-fit items-center gap-3 rounded-xl px-4 py-3">
              <File className="text-primary size-6 shrink-0" />
              <div>
                <p className="max-w-[180px] truncate text-sm font-medium">
                  {pendingFile.name}
                </p>
                <p className="text-muted-foreground text-xs">
                  {formatFileSize(pendingFile.size)}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                className="flex-1 cursor-pointer"
                onClick={onUpload}
                disabled={isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-1.5 size-4 animate-spin" />
                    Đang tải lên...
                  </>
                ) : (
                  <>
                    <Upload className="mr-1.5 size-4" />
                    Tải lên
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer"
                onClick={onCancel}
                disabled={isUploading}
              >
                Hủy
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-center">
            <div className="bg-background border-border mx-auto flex size-16 items-center justify-center rounded-2xl border shadow-sm">
              <CloudUpload className="text-primary size-8" />
            </div>
            <div>
              <p className="text-foreground font-bold">Tải CV mới</p>
              <p className="text-muted-foreground mt-1 text-sm">
                Kéo và thả file tại đây hoặc chọn từ máy tính. Hỗ trợ PDF, DOCX
                (Tối đa {maxSizeMb}MB)
              </p>
            </div>
            <Button
              type="button"
              className="w-full cursor-pointer"
              onClick={() => inputRef.current?.click()}
            >
              Chọn tệp tin
            </Button>
          </div>
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
