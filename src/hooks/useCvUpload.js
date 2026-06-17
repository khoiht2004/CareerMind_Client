import { useState, useCallback } from "react";
import { toast } from "sonner";
import { ALLOWED_TYPES } from "@/config/constants/constants";

export const MAX_CV_SIZE_MB = 5;
const MAX_CV_SIZE_BYTES = MAX_CV_SIZE_MB * 1024 * 1024;

export function useCvUpload(uploadCvMutation, onUploadSuccess) {
  const [dragging, setDragging] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);

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

  const handleCancelPending = useCallback(() => setPendingFile(null), []);

  const handleUpload = useCallback(async () => {
    if (!pendingFile) return;
    const formData = new FormData();
    formData.append("cv", pendingFile);
    formData.append("name", pendingFile.name.replace(/\.[^.]+$/, ""));
    try {
      const res = await uploadCvMutation(formData).unwrap();
      toast.success("Tải lên CV thành công!");
      setPendingFile(null);
      if (onUploadSuccess) {
        onUploadSuccess(res);
      }
    } catch (err) {
      toast.error(err?.data?.message || "Tải lên thất bại, vui lòng thử lại");
    }
  }, [pendingFile, uploadCvMutation, onUploadSuccess]);

  return {
    dragging,
    pendingFile,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleCancelPending,
    handleUpload,
  };
}
