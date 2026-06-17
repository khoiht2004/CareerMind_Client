import { useRef } from "react";
import { FileText, Lightbulb, Loader2, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import CvDropZone from "./components/CvDropZone";
import CvFeaturedCard from "./components/CvFeaturedCard";
import CvListItem from "./components/CvListItem";
import CvPreviewDialog from "@/components/shared/CvPreviewDialog";
import ConfirmDialog from "../shared/ConfirmDialog";
import { useMyCv, MAX_CV_COUNT } from "@/hooks/useMyCv";
import { MAX_CV_SIZE_MB } from "@/hooks/useCvUpload";

const CV_TIPS = [
  "Sử dụng định dạng PDF để giữ nguyên bố cục chuyên nghiệp.",
  "Đặt tên CV theo cấu trúc: HoTen_ViTri_CongTy.",
];

function MyCv() {
  const addMoreRef = useRef(null);
  const {
    cvs,
    defaultCv,
    otherCvs,
    isLoading,
    isUploading,
    isDeleting,
    dragging,
    pendingFile,
    previewCv,
    cvToDelete,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleUpload,
    handleCancelPending,
    handleDelete,
    handleSetDefault,
    handlePreview,
    handleClosePreview,
    handleDeleteClick,
    handleDeleteDialogChange,
  } = useMyCv();

  const canAddMore = cvs.length < MAX_CV_COUNT;

  return (
    <>
      {/* Header */}
      <div className="mb-6">
        <p className="text-secondary mb-2 text-xs font-semibold tracking-widest uppercase">
          Hồ sơ nghề nghiệp
        </p>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-primary text-3xl font-black">CV của tôi</h1>
            <p className="text-muted-foreground mt-1 max-w-sm text-sm">
              Quản lý và tối ưu các phiên bản CV để sẵn sàng cho những cơ hội
              nghề nghiệp hàng đầu.
            </p>
          </div>
          {/* Stat card */}
          <div className="bg-primary/10 shrink-0 rounded-xl p-4 text-center">
            <FileText className="text-primary mx-auto mb-1 size-6" />
            <p className="text-muted-foreground text-xs">Tổng số CV</p>
            <p className="text-foreground text-2xl font-black">
              {String(cvs.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid gap-6 md:grid-cols-[1fr_2fr]">
        {/* Left: Upload zone + Tips */}
        <div className="space-y-4">
          <CvDropZone
            pendingFile={pendingFile}
            isDragging={dragging}
            isUploading={isUploading}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onUpload={handleUpload}
            onCancel={handleCancelPending}
            onFileSelect={handleFileSelect}
            maxSizeMb={MAX_CV_SIZE_MB}
          />

          {/* Tips */}
          <Card>
            <CardContent className="p-4">
              <h4 className="text-foreground mb-3 flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase">
                <Lightbulb className="size-3.5" />
                Mẹo nhỏ cho bạn
              </h4>
              <ul className="space-y-2">
                {CV_TIPS.map((tip, i) => (
                  <li
                    key={i}
                    className="text-muted-foreground flex items-start gap-2 text-sm"
                  >
                    <span className="text-secondary mt-0.5 shrink-0">•</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Right: CV list */}
        <div>
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="text-muted-foreground size-6 animate-spin" />
            </div>
          ) : (
            <div className="space-y-3">
              {/* Default CV featured */}
              {defaultCv && (
                <CvFeaturedCard
                  cv={defaultCv}
                  onPreview={handlePreview}
                  onDelete={handleDeleteClick}
                />
              )}

              {/* Other CVs grid + Add slot */}
              {(otherCvs.length > 0 || canAddMore) && (
                <div className="grid grid-cols-2 gap-3">
                  {otherCvs.map((cv) => (
                    <CvListItem
                      key={cv.id}
                      cv={cv}
                      onPreview={handlePreview}
                      onSetDefault={handleSetDefault}
                      onDelete={handleDeleteClick}
                    />
                  ))}
                  {canAddMore && (
                    <button
                      onClick={() => addMoreRef.current?.click()}
                      className="border-border hover:border-primary/50 hover:bg-accent flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-colors"
                    >
                      <div className="bg-muted flex size-10 items-center justify-center rounded-full">
                        <Plus className="text-muted-foreground size-5" />
                      </div>
                      <p className="text-muted-foreground text-xs">
                        Sử dụng tối đa {MAX_CV_COUNT} CV
                      </p>
                    </button>
                  )}
                </div>
              )}

              {/* Empty state */}
              {cvs.length === 0 && (
                <div className="border-border text-muted-foreground rounded-xl border-2 border-dashed py-16 text-center">
                  <FileText className="mx-auto mb-3 size-10 opacity-30" />
                  <p className="text-sm">
                    Chưa có CV nào. Hãy tải lên CV đầu tiên!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Hidden input for grid "add more" slot */}
      <input
        ref={addMoreRef}
        type="file"
        accept=".pdf,.doc,.docx"
        className="hidden"
        onChange={handleFileSelect}
      />

      <CvPreviewDialog
        open={!!previewCv}
        onClose={handleClosePreview}
        cv={previewCv}
      />

      <ConfirmDialog
        open={!!cvToDelete}
        onOpenChange={handleDeleteDialogChange}
        title="Xóa CV"
        description={
          <span>
            Bạn có chắc muốn xóa{" "}
            <strong>&ldquo;{cvToDelete?.name}&rdquo;</strong> không? Hành động
            này không thể hoàn tác.
          </span>
        }
        confirmText="Xóa"
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </>
  );
}

export default MyCv;
