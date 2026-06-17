import { FileText, Plus, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import CvDropZone from "@/components/profileTabs/components/CvDropZone";
import { formatFileSize } from "@/utils/helper";
import { FieldLabel, StepHeader } from "@/features/ApplyPageComponent";

export default function ApplyCvDocumentsStep({
  myCvs,
  handleSelectCv,
  effectiveSelectedCvId,
  manualCvUrl,
  setManualCvUrl,
  isUploadingCv,
  cvSource,
  setCvSource,
  // Drag & drop
  dragging,
  pendingFile,
  handleFileSelect,
  handleDrop,
  handleDragOver,
  handleDragLeave,
  handleCancelPending,
  handleUpload,
}) {
  return (
    <article className="bg-primary/10 animate-fade-in space-y-6 rounded-2xl p-6">
      <StepHeader icon={FileText} title="Hồ sơ ứng tuyển & Portfolio" />

      {/* Lựa chọn nguồn CV */}
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <button
          type="button"
          onClick={() => setCvSource("library")}
          className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
            cvSource === "library"
              ? "border-primary bg-primary/5 text-primary"
              : "border-border hover:border-primary/30"
          }`}
        >
          <div
            className={`flex size-4 items-center justify-center rounded-full border-2 ${
              cvSource === "library"
                ? "border-primary"
                : "border-muted-foreground"
            }`}
          >
            {cvSource === "library" && (
              <div className="bg-primary size-2 rounded-full" />
            )}
          </div>
          <div>
            <p className="text-sm font-bold">Chọn từ thư viện CV</p>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Sử dụng CV đã tải lên tài khoản của bạn
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setCvSource("link")}
          className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-4 text-left transition-all ${
            cvSource === "link"
              ? "border-primary bg-primary/5 text-primary"
              : "border-border hover:border-primary/30"
          }`}
        >
          <div
            className={`flex size-4 items-center justify-center rounded-full border-2 ${
              cvSource === "link" ? "border-primary" : "border-muted-foreground"
            }`}
          >
            {cvSource === "link" && (
              <div className="bg-primary size-2 rounded-full" />
            )}
          </div>
          <div>
            <p className="text-sm font-bold">Nhập link CV thủ công</p>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Liên kết từ Google Drive, Dropbox, v.v.
            </p>
          </div>
        </button>
      </div>

      {/* Chi tiết nội dung nguồn CV */}
      <div className="grid grid-cols-1 gap-6">
        {cvSource === "library" ? (
          <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2">
            {/* Cột trái: DropZone */}
            <div className="space-y-2">
              <FieldLabel>Tải lên CV mới</FieldLabel>
              <CvDropZone
                pendingFile={pendingFile}
                isDragging={dragging}
                isUploading={isUploadingCv}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onUpload={handleUpload}
                onCancel={handleCancelPending}
                onFileSelect={handleFileSelect}
                maxSizeMb={5}
              />
            </div>

            {/* Cột phải: Thư viện CV */}
            <div className="space-y-2">
              <FieldLabel>Chọn CV trong thư viện</FieldLabel>
              <div className="max-h-[260px] space-y-2 overflow-y-auto pr-1">
                {myCvs.length === 0 ? (
                  <div className="text-muted-foreground bg-background/50 rounded-xl border border-dashed p-8 text-center text-sm">
                    <FileText className="mx-auto mb-2 size-8 animate-pulse opacity-30" />
                    Chưa có CV nào. Kéo thả file bên cạnh để tải lên CV đầu
                    tiên!
                  </div>
                ) : (
                  myCvs.map((cv) => {
                    const isSelected = effectiveSelectedCvId === cv.id;
                    return (
                      <button
                        key={cv.id}
                        type="button"
                        onClick={() => handleSelectCv(cv)}
                        className={`flex w-full cursor-pointer items-center justify-between rounded-xl border-2 p-4 text-left transition-all ${
                          isSelected
                            ? "border-primary bg-primary/5 text-primary font-semibold shadow-sm"
                            : "border-border hover:border-primary/30 hover:bg-muted/30 bg-background/40"
                        }`}
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <FileText
                            className={`size-5 shrink-0 ${
                              isSelected
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                          />
                          <div className="min-w-0">
                            <p className="truncate text-sm">{cv.name}</p>
                            <div className="text-muted-foreground mt-0.5 flex items-center gap-1.5 text-xs">
                              <span className="bg-primary/10 text-primary rounded px-1.5 py-0.5 text-[10px] font-bold uppercase">
                                {cv.fileType || "pdf"}
                              </span>
                              <span>{formatFileSize(cv.fileSize)}</span>
                            </div>
                          </div>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="text-primary animate-fade-in ml-3 size-5 shrink-0" />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-background/40 border-border animate-fade-in space-y-2 rounded-xl border p-5">
            <FieldLabel>Đường dẫn link tới CV của bạn</FieldLabel>
            <Input
              placeholder="https://drive.google.com/file/d/..."
              value={manualCvUrl}
              onChange={(e) => setManualCvUrl(e.target.value)}
              className="bg-input focus:ring-primary border-0 focus:ring-1"
            />
            <p className="text-muted-foreground text-xs leading-normal">
              Lưu ý: Hãy đảm bảo bạn đã mở quyền truy cập công khai (bất kỳ ai
              có liên kết đều có thể xem) để nhà tuyển dụng xem được CV của bạn.
            </p>
          </div>
        )}
      </div>

      {/* Portfolio / Tài liệu bổ sung */}
      <div className="border-border/40 border-t pt-6">
        <FieldLabel>Portfolio / CV Phụ (Tùy chọn)</FieldLabel>
        <div className="border-border hover:border-primary/40 hover:bg-muted/20 flex h-24 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border-2 border-dashed transition-all">
          <Plus className="text-muted-foreground size-6" />
          <p className="text-muted-foreground text-xs font-semibold">
            Thêm tài liệu bổ sung
          </p>
          <p className="text-muted-foreground/60 text-[10px]">
            Hình ảnh, chứng chỉ hoặc file nén (Tối đa 10MB)
          </p>
        </div>
      </div>
    </article>
  );
}
