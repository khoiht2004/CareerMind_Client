import { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import {
  useGetMyCvsQuery,
  useUploadCvMutation,
  useDeleteCvMutation,
  useSetDefaultCvMutation,
} from "@/services/cv.service";
import { useCvUpload } from "@/hooks/useCvUpload";

export const MAX_CV_COUNT = 5;

export function useMyCv() {
  const [previewCv, setPreviewCv] = useState(null);
  const [cvToDelete, setCvToDelete] = useState(null);

  const { data, isLoading } = useGetMyCvsQuery();
  const [uploadCv, { isLoading: isUploading }] = useUploadCvMutation();
  const [deleteCv, { isLoading: isDeleting }] = useDeleteCvMutation();
  const [setDefaultCv] = useSetDefaultCvMutation();

  const cvs = useMemo(() => data?.data ?? [], [data]);
  const defaultCv = useMemo(() => cvs.find((cv) => cv.isDefault) ?? null, [cvs]);
  const otherCvs = useMemo(() => cvs.filter((cv) => !cv.isDefault), [cvs]);

  const {
    dragging,
    pendingFile,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleCancelPending,
    handleUpload,
  } = useCvUpload(uploadCv);

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

  return {
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
  };
}
