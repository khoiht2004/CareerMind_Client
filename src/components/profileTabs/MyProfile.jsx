import { Loader2 } from "lucide-react";
import { useMyProfile } from "@/hooks/useMyProfile";
import AvatarCard from "./components/AvatarCard";
import BioSkillsCard from "./components/BioSkillsCard";
import ContactCard from "./components/ContactCard";

function MyProfile() {
  const {
    profile,
    isLoading,
    isSaving,
    isUploading,
    isDeleting,
    editing,
    setEditing,
    showDeleteDialog,
    setShowDeleteDialog,
    bio,
    setBio,
    phone,
    setPhone,
    address,
    setAddress,
    skills,
    newSkill,
    setNewSkill,
    addingSkill,
    setAddingSkill,
    handleCancel,
    handleSave,
    handleDeleteAvatar,
    handleAvatarChange,
    handleAddSkill,
    handleRemoveSkill,
  } = useMyProfile();

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="text-muted-foreground size-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Hero */}
      <AvatarCard
        profile={profile}
        isUploading={isUploading}
        isDeleting={isDeleting}
        isSaving={isSaving}
        showDeleteDialog={showDeleteDialog}
        onAvatarChange={handleAvatarChange}
        onDeleteDialogOpen={() => setShowDeleteDialog(true)}
        onDeleteDialogChange={setShowDeleteDialog}
        onDeleteConfirm={handleDeleteAvatar}
        editing={editing}
        onSave={editing ? handleSave : () => setEditing(true)}
        onCancel={handleCancel}
      />

      {/* Two-column layout */}
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        {/* Left sidebar */}
        <ContactCard
          email={profile?.user?.email}
          phone={phone}
          onPhoneChange={setPhone}
          address={address}
          onAddressChange={setAddress}
          editing={editing}
        />

        {/* Right main */}
        <BioSkillsCard
          editing={editing}
          bio={bio}
          onBioChange={setBio}
          skills={skills}
          onRemoveSkill={handleRemoveSkill}
          newSkill={newSkill}
          onNewSkillChange={setNewSkill}
          addingSkill={addingSkill}
          onSetAddingSkill={setAddingSkill}
          onAddSkill={handleAddSkill}
        />
      </div>
    </div>
  );
}

export default MyProfile;
