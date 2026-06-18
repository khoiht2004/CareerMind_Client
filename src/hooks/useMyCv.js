import { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import {
  useGetMyCvsQuery,
  useUploadCvMutation,
  useDeleteCvMutation,
  useSetDefaultCvMutation,
} from "@/services/cv.service";
import { useUpdateProfileMutation } from "@/services/profile.service";
import { useCvUpload } from "@/hooks/useCvUpload";

export const MAX_CV_COUNT = 5;

export function useMyCv() {
  const [previewCv, setPreviewCv] = useState(null);
  const [cvToDelete, setCvToDelete] = useState(null);
  const [parsedProfile, setParsedProfile] = useState(null);

  const { data, isLoading } = useGetMyCvsQuery();
  const [uploadCv, { isLoading: isUploading }] = useUploadCvMutation();
  const [deleteCv, { isLoading: isDeleting }] = useDeleteCvMutation();
  const [setDefaultCv] = useSetDefaultCvMutation();
  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();

  const cvs = useMemo(() => data?.data ?? [], [data]);
  const defaultCv = useMemo(() => cvs.find((cv) => cv.isDefault) ?? null, [cvs]);
  const otherCvs = useMemo(() => cvs.filter((cv) => !cv.isDefault), [cvs]);

  const handleUploadSuccess = useCallback((res) => {
    if (res?.data?.parsedProfile) {
      setParsedProfile(res.data.parsedProfile);
    }
  }, []);

  const {
    dragging,
    pendingFile,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleCancelPending,
    handleUpload,
  } = useCvUpload(uploadCv, handleUploadSuccess);

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
  const handleConfirmUpdateProfile = useCallback(async () => {
    if (!parsedProfile) return;
    try {
      await updateProfile(parsedProfile).unwrap();
      toast.success("Đã tự động cập nhật Hồ sơ cá nhân của bạn!");
      setParsedProfile(null);
    } catch {
      toast.error("Cập nhật Hồ sơ cá nhân thất bại");
    }
  }, [parsedProfile, updateProfile]);

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
    parsedProfile,
    setParsedProfile,
    isUpdatingProfile,
    handleConfirmUpdateProfile,
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
