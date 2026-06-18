import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useDeleteAvatarMutation,
} from "@/services/profile.service";

export function useMyProfile() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const handleOpen = useCallback(() => setPreviewOpen(true), []);
  const handleClose = useCallback(() => setPreviewOpen(false), []);

  const { data: response, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const [uploadAvatar, { isLoading: isUploading }] = useUploadAvatarMutation();
  const [deleteAvatar, { isLoading: isDeleting }] = useDeleteAvatarMutation();
  const profile = response?.data;

  const [editing, setEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [addingSkill, setAddingSkill] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName ?? "");
      setBio(profile.bio ?? "");
      setPhone(profile.phone ?? "");
      setAddress(profile.address ?? "");
      setSkills(profile.skills ?? []);
    }
  }, [profile]);

  const handleCancel = useCallback(() => {
    if (profile) {
      setFullName(profile.fullName ?? "");
      setBio(profile.bio ?? "");
      setPhone(profile.phone ?? "");
      setAddress(profile.address ?? "");
      setSkills(profile.skills ?? []);
    }
    setEditing(false);
  }, [profile]);

  const handleSave = useCallback(async () => {
    try {
      await updateProfile({ fullName, bio, phone, address, skills }).unwrap();
      setEditing(false);
      toast.success("Đã cập nhật thông tin");
    } catch {
      toast.error("Cập nhật thất bại");
    }
  }, [updateProfile, fullName, bio, phone, address, skills]);

  const handleDeleteAvatar = useCallback(async () => {
    try {
      await deleteAvatar().unwrap();
      setShowDeleteDialog(false);
      toast.success("Đã xóa ảnh đại diện");
    } catch {
      toast.error("Xóa ảnh đại diện thất bại");
    }
  }, [deleteAvatar]);

  const handleAvatarChange = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const formData = new FormData();
      formData.append("avatar_url", file);
      try {
        await uploadAvatar(formData).unwrap();
        toast.success("Cập nhật ảnh đại diện thành công");
      } catch {
        toast.error("Tải ảnh lên thất bại");
      }
      e.target.value = "";
    },
    [uploadAvatar],
  );

  const handleAddSkill = useCallback(() => {
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
    }
    setNewSkill("");
    setAddingSkill(false);
  }, [newSkill, skills]);

  const handleRemoveSkill = useCallback((skill) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  }, []);

  return {
    profile,
    isLoading,
    isSaving,
    isUploading,
    isDeleting,
    editing,
    setEditing,
    showDeleteDialog,
    setShowDeleteDialog,
    fullName,
    setFullName,
    bio,
    setBio,
    phone,
    setPhone,
    address,
    setAddress,
    skills,
    newSkill,
    setNewSkill,
    previewOpen,
    handleOpen,
    handleClose,
    addingSkill,
    setAddingSkill,
    handleCancel,
    handleSave,
    handleDeleteAvatar,
    handleAvatarChange,
    handleAddSkill,
    handleRemoveSkill,
  };
}
