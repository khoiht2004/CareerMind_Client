import { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import {
  useGetMyCvsQuery,
  useUploadCvMutation,
  useDeleteCvMutation,
  useSetDefaultCvMutation,
} from "@/services/cv.service";
import { ALLOWED_TYPES } from "@/config/constants/constants";

export const MAX_CV_SIZE_MB = 5;
const MAX_CV_SIZE_BYTES = MAX_CV_SIZE_MB * 1024 * 1024;
export const MAX_CV_COUNT = 5;

export function useMyCv() {
  const [dragging, setDragging] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const [previewCv, setPreviewCv] = useState(null);
  const [cvToDelete, setCvToDelete] = useState(null);

  const { data, isLoading } = useGetMyCvsQuery();
  const [uploadCv, { isLoading: isUploading }] = useUploadCvMutation();
  const [deleteCv, { isLoading: isDeleting }] = useDeleteCvMutation();
  const [setDefaultCv] = useSetDefaultCvMutation();

  const cvs = useMemo(() => data?.data ?? [], [data]);
  const defaultCv = useMemo(() => cvs.find((cv) => cv.isDefault) ?? null, [cvs]);
  const otherCvs = useMemo(() => cvs.filter((cv) => !cv.isDefault), [cvs]);

  const validateFile = useCallback((file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Chỉ chấp nhận file PDF, DOC, DOCX");
      return false;
    }
    if (file.size > MAX_CV_SIZE_BYTES) {
      toast.error(`File phải nhỏ hơn ${MAX_CV_SIZE_MB}MB`);
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
