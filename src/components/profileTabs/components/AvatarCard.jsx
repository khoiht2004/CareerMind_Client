import { memo } from "react";
import { Camera, Loader2, X, Pencil, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import ImagePreviewModal from "@/components/shared/ImagePreviewModal";

function AvatarCard({
  profile,
  isUploading,
  isDeleting,
  isSaving,
  showDeleteDialog,
  onAvatarChange,
  onDeleteDialogOpen,
  onDeleteDialogChange,
  onDeleteConfirm,
  editing,
  onSave,
  onCancel,
  previewOpen,
  handleOpen,
  handleClose,
}) {
  return (
    <>
      <Card>
        <CardContent className="px-6 md:p-6">
          <div className="flex flex-wrap items-center gap-6">
            {/* Avatar */}
            <div className="relative shrink-0">
              <Avatar
                className="border-border size-20 cursor-pointer overflow-hidden rounded-2xl border-3 text-2xl md:size-28"
                onClick={handleOpen}
              >
                <AvatarImage
                  src={profile?.avatarUrl}
                  loading="lazy"
                  className={`rounded-none`}
                />
                <AvatarFallback className="rounded-none border-none text-2xl font-bold">
                  {profile?.fullName?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>

              {profile?.avatarUrl && (
                <Button
                  size="icon"
                  variant="outline"
                  disabled={isDeleting}
                  onClick={onDeleteDialogOpen}
                  className="hover:text-destructive hover:border-destructive hover:bg-destructive/20 absolute -top-1 -right-1 size-6 cursor-pointer rounded-full"
                >
                  <X className="size-3" />
                </Button>
              )}

              <Button
                disabled={isUploading}
                className="bg-primary text-primary-foreground hover:border-primary hover:bg-primary-foreground hover:text-primary absolute -right-1 -bottom-1 size-8 rounded-full shadow-sm"
                size="icon"
              >
                <label htmlFor="avatar-file-input" className="cursor-pointer">
                  {isUploading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Camera className="size-4" />
                  )}
                  <input
                    type="file"
                    id="avatar-file-input"
                    hidden
                    accept="image/jpeg,image/png,image/webp"
                    onChange={onAvatarChange}
                  />
                </label>
              </Button>

              <ConfirmDialog
                open={showDeleteDialog}
                onOpenChange={onDeleteDialogChange}
                onConfirm={onDeleteConfirm}
                isLoading={isDeleting}
                title="Xóa ảnh đại diện"
                description="Bạn có chắc muốn xóa ảnh đại diện không? Hành động này không thể hoàn tác."
              />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-1">
              <h1 className="text-foreground text-xl font-black md:text-3xl">
                {profile?.fullName ?? "Chưa cập nhật"}
              </h1>
              <p className="text-secondary text-sm font-medium">
                {profile?.user?.role === "CANDIDATE"
                  ? "Ứng viên"
                  : "Nhà tuyển dụng"}
              </p>
              <p className="text-muted-foreground text-xs">
                {profile?.user?.email}
              </p>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">
              {editing ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                    onClick={onCancel}
                  >
                    Hủy
                  </Button>
                  <Button
                    size="sm"
                    className="cursor-pointer gap-1.5"
                    onClick={onSave}
                    disabled={isSaving}
                  >
                    {isSaving ? (
                      <Loader2 className="size-3.5 animate-spin" />
                    ) : (
                      <Check className="size-3.5" />
                    )}
                    Lưu thay đổi
                  </Button>
                </>
              ) : (
                <Button
                  size="lg"
                  className="cursor-pointer gap-1.5 rounded-xl"
                  onClick={onSave}
                >
                  <Pencil className="size-4" />
                  Sửa hồ sơ
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <ImagePreviewModal
        src={profile.avatarUrl}
        alt={profile?.fullName}
        open={previewOpen}
        onClose={handleClose}
      />
    </>
  );
}

export default memo(AvatarCard);
