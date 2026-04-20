import { useState, useEffect, useCallback } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useDeleteAvatarMutation,
} from "@/services/profile.service";
import AvatarCard from "./components/AvatarCard";
import BioSkillsCard from "./components/BioSkillsCard";
import ContactCard from "./components/ContactCard";

function MyProfile() {
  const { data: response, isLoading } = useGetProfileQuery();
  const [updateProfile, { isLoading: isSaving }] = useUpdateProfileMutation();
  const [uploadAvatar, { isLoading: isUploading }] = useUploadAvatarMutation();
  const [deleteAvatar, { isLoading: isDeleting }] = useDeleteAvatarMutation();
  const profile = response?.data;

  const [editing, setEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [bio, setBio] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [addingSkill, setAddingSkill] = useState(false);

  useEffect(() => {
    if (profile) {
      setBio(profile.bio ?? "");
      setPhone(profile.phone ?? "");
      setAddress(profile.address ?? "");
      setSkills(profile.skills ?? []);
    }
  }, [profile]);

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

  const handleSave = useCallback(async () => {
    try {
      await updateProfile({ bio, phone, address, skills }).unwrap();
      setEditing(false);
      toast.success("Đã cập nhật thông tin");
    } catch {
      toast.error("Cập nhật thất bại");
    }
  }, [updateProfile, bio, phone, address, skills]);

  const handleToggleEdit = useCallback(() => setEditing((v) => !v), []);

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

  const handleDeleteDialogChange = useCallback((open) => {
    setShowDeleteDialog(open);
  }, []);

  const handleDeleteDialogOpen = useCallback(() => {
    setShowDeleteDialog(true);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="text-muted-foreground size-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <AvatarCard
        profile={profile}
        isUploading={isUploading}
        isDeleting={isDeleting}
        showDeleteDialog={showDeleteDialog}
        onAvatarChange={handleAvatarChange}
        onDeleteDialogOpen={handleDeleteDialogOpen}
        onDeleteDialogChange={handleDeleteDialogChange}
        onDeleteConfirm={handleDeleteAvatar}
      />

      <BioSkillsCard
        editing={editing}
        onToggleEdit={handleToggleEdit}
        bio={bio}
        onBioChange={setBio}
        skills={skills}
        onRemoveSkill={handleRemoveSkill}
        newSkill={newSkill}
        onNewSkillChange={setNewSkill}
        addingSkill={addingSkill}
        onSetAddingSkill={setAddingSkill}
        onAddSkill={handleAddSkill}
        isSaving={isSaving}
        onSave={handleSave}
      />

      <ContactCard
        email={profile?.user?.email}
        phone={phone}
        onPhoneChange={setPhone}
        address={address}
        onAddressChange={setAddress}
        isSaving={isSaving}
        onSave={handleSave}
      />
    </div>
  );
}

export default MyProfile;
