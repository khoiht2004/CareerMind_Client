import { useState, useEffect } from "react";
import { Camera, Pencil, Loader2, X, Plus } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useDeleteAvatarMutation,
} from "@/services/profile.service";

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

  const handleDeleteAvatar = async () => {
    try {
      await deleteAvatar().unwrap();
      setShowDeleteDialog(false);
      toast.success("Đã xóa ảnh đại diện");
    } catch {
      toast.error("Xóa ảnh đại diện thất bại");
    }
  };

  const handleAvatarChange = async (e) => {
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
  };

  const handleSave = async () => {
    try {
      await updateProfile({ bio, phone, address, skills }).unwrap();
      setEditing(false);
      toast.success("Đã cập nhật thông tin");
    } catch {
      toast.error("Cập nhật thất bại");
    }
  };

  const handleAddSkill = () => {
    const trimmed = newSkill.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
    }
    setNewSkill("");
    setAddingSkill(false);
  };

  const handleRemoveSkill = (skill) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="text-muted-foreground size-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Avatar + basic info */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-start">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile?.avatarUrl} />
                <AvatarFallback className="text-xl font-bold">
                  {profile?.fullName?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {/* Nút X */}
              {profile?.avatarUrl && (
                <Button
                  size="icon"
                  variant="outline"
                  disabled={isDeleting}
                  onClick={() => setShowDeleteDialog(true)}
                  className="absolute -top-1 -right-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full"
                >
                  <X className="size-3" />
                </Button>
              )}

              {/* Nút Camera */}
              <Button
                disabled={isUploading}
                className="bg-primary text-primary-foreground absolute -right-1 -bottom-1 flex h-7 w-7 items-center justify-center rounded-full shadow-sm transition-opacity hover:opacity-90"
              >
                <label htmlFor="open-file" className="cursor-pointer">
                  {isUploading ? (
                    <Loader2 className="size-3.5 animate-spin" />
                  ) : (
                    <Camera className="size-3.5" />
                  )}
                  <input
                    type="file"
                    id="open-file"
                    hidden
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleAvatarChange}
                  />
                </label>
              </Button>

              <ConfirmDialog
                open={showDeleteDialog}
                onOpenChange={setShowDeleteDialog}
                onConfirm={handleDeleteAvatar}
                isLoading={isDeleting}
                title="Xóa ảnh đại diện"
                description="Bạn có chắc muốn xóa ảnh đại diện không? Hành động này không thể hoàn tác."
              />
            </div>
            <div className="flex-1 space-y-1 text-center sm:text-left">
              <h2 className="text-lg font-bold">{profile?.fullName}</h2>
              <p className="text-muted-foreground text-sm">
                {profile?.user?.email}
              </p>
              <Badge variant="secondary" className="text-xs">
                {profile?.user?.role}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bio + Skills */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm">Giới thiệu bản thân</CardTitle>
            <Button
              variant="ghost"
              size="sm"
              className="cursor-pointer"
              onClick={() => setEditing(!editing)}
            >
              <Pencil className="mr-1 size-3.5" />
              {editing ? "Hủy" : "Chỉnh sửa"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-0">
          {/* Bio */}
          {editing ? (
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              placeholder="Giới thiệu về bản thân..."
            />
          ) : (
            <p className="text-muted-foreground text-sm leading-relaxed">
              {bio || "Chưa có giới thiệu"}
            </p>
          )}

          {/* Skills */}
          <div className="space-y-2">
            <p className="text-sm font-medium">Kỹ năng</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  size="lg"
                  className="group flex h-[25px] min-w-[65px] items-center gap-1 pr-1.5 text-[13px]"
                >
                  {skill}
                  {editing && (
                    <button
                      onClick={() => handleRemoveSkill(skill)}
                      className="text-muted-foreground hover:text-foreground ml-0.5 cursor-pointer"
                    >
                      <X className="size-3" />
                    </button>
                  )}
                </Badge>
              ))}

              {editing &&
                (addingSkill ? (
                  <input
                    autoFocus
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleAddSkill();
                      if (e.key === "Escape") setAddingSkill(false);
                    }}
                    onBlur={handleAddSkill}
                    className="border-input h-6 w-28 rounded-full border bg-transparent px-2.5 text-xs outline-none"
                    placeholder="Nhập kỹ năng..."
                  />
                ) : (
                  <button
                    onClick={() => setAddingSkill(true)}
                    className="border-input text-muted-foreground hover:text-foreground hover:border-foreground flex h-6 cursor-pointer items-center gap-1 rounded-full border border-dashed px-2.5 text-xs transition-colors"
                  >
                    <Plus className="size-3" />
                    Thêm kỹ năng
                  </button>
                ))}
            </div>
          </div>

          {/* Save button */}
          {editing && (
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
              className="cursor-pointer"
            >
              {isSaving && <Loader2 className="size-3.5 animate-spin" />}
              Lưu
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Contact info */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm">Thông tin liên hệ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 pt-0">
          <div className="space-y-1.5">
            <Label className="text-muted-foreground text-xs">Email</Label>
            <Input
              defaultValue={profile?.user?.email}
              readOnly
              className="bg-muted/40"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-muted-foreground text-xs">
              Số điện thoại
            </Label>
            <Input
              placeholder="Chưa cập nhật"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-muted-foreground text-xs">Địa chỉ</Label>
            <Input
              placeholder="Chưa cập nhật"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <Button
            onClick={handleSave}
            disabled={isSaving}
            size="sm"
            className="h-8 cursor-pointer px-4 py-2.5 text-[14px] font-medium"
          >
            {isSaving && <Loader2 className="size-3.5 animate-spin" />}
            Lưu thay đổi
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default MyProfile;
