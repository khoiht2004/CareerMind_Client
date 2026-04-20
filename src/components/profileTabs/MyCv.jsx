import { useState, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  useGetMyCvsQuery,
  useUploadCvMutation,
  useDeleteCvMutation,
  useSetDefaultCvMutation,
} from "@/services/cv.service";
import CvPreviewDialog from "@/components/shared/CvPreviewDialog";
import { ALLOWED_TYPES } from "@/config/constants/constants";
import ConfirmDialog from "../shared/ConfirmDialog";
import CvDropZone from "./components/CvDropZone";
import CvListItem from "./components/CvListItem";

const MAX_SIZE_MB = 2;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

function MyCv() {
  const [dragging, setDragging] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const [previewCv, setPreviewCv] = useState(null);
  const [cvToDelete, setCvToDelete] = useState(null);

  const { data, isLoading: isLoadingList } = useGetMyCvsQuery();
  const [uploadCv, { isLoading: isUploading }] = useUploadCvMutation();
  const [deleteCv, { isLoading: isDeleting }] = useDeleteCvMutation();
  const [setDefaultCv] = useSetDefaultCvMutation();

  const cvs = data?.data ?? [];

  const validateFile = useCallback((file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Chỉ chấp nhận file PDF, DOC, DOCX");
      return false;
    }
    if (file.size > MAX_SIZE_BYTES) {
      toast.error(`File phải nhỏ hơn ${MAX_SIZE_MB}MB`);
      return false;
    }
    return true;
  }, []);

  const handleFileSelect = useCallback(
    (e) => {
      const file = e.target.files?.[0];
      if (file && validateFile(file)) setPendingFile(file);
      e.target.value = "";
    },
    [validateFile],
  );

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file && validateFile(file)) setPendingFile(file);
    },
    [validateFile],
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setDragging(false), []);

  const handleUpload = useCallback(async () => {
    if (!pendingFile) return;
    const formData = new FormData();
    formData.append("cv", pendingFile);
    formData.append("name", pendingFile.name.replace(/\.[^.]+$/, ""));
    try {
      await uploadCv(formData).unwrap();
      toast.success("Tải lên CV thành công!");
      setPendingFile(null);
    } catch (err) {
      toast.error(err?.data?.message || "Tải lên thất bại, vui lòng thử lại");
    }
  }, [pendingFile, uploadCv]);

  const handleCancelPending = useCallback(() => setPendingFile(null), []);

  const handleDelete = useCallback(async () => {
    if (!cvToDelete) return;
    try {
      await deleteCv(cvToDelete.id).unwrap();
      toast.success("Đã xóa CV");
      setCvToDelete(null);
    } catch (err) {
      toast.error(err?.data?.message || "Xóa thất bại");
    }
  }, [cvToDelete, deleteCv]);

  const handleSetDefault = useCallback(
    async (id) => {
      try {
        await setDefaultCv(id).unwrap();
        toast.success("Đã đặt làm CV mặc định");
      } catch (err) {
        toast.error(err?.data?.message || "Cập nhật thất bại");
      }
    },
    [setDefaultCv],
  );

  const handlePreview = useCallback((cv) => setPreviewCv(cv), []);
  const handleClosePreview = useCallback(() => setPreviewCv(null), []);
  const handleDeleteClick = useCallback((cv) => setCvToDelete(cv), []);
  const handleDeleteDialogChange = useCallback((open) => {
    if (!open) setCvToDelete(null);
  }, []);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">CV của tôi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
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
          />

          {isLoadingList ? (
            <div className="flex justify-center py-4">
              <Loader2 className="text-muted-foreground size-5 animate-spin" />
            </div>
          ) : cvs.length > 0 ? (
            <div className="space-y-3">
              <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                Danh sách CV ({cvs.length})
              </p>
              <ul className="space-y-2">
                {cvs.map((cv) => (
                  <CvListItem
                    key={cv.id}
                    cv={cv}
                    onPreview={handlePreview}
                    onSetDefault={handleSetDefault}
                    onDelete={handleDeleteClick}
                  />
                ))}
              </ul>
            </div>
          ) : null}
        </CardContent>
      </Card>

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
