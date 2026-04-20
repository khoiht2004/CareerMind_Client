import { memo } from "react";
import { Camera, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ConfirmDialog from "@/components/shared/ConfirmDialog";

function AvatarCard({
  profile,
  isUploading,
  isDeleting,
  showDeleteDialog,
  onAvatarChange,
  onDeleteDialogOpen,
  onDeleteDialogChange,
  onDeleteConfirm,
}) {
  return (
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

            {profile?.avatarUrl && (
              <Button
                size="icon"
                variant="outline"
                disabled={isDeleting}
                onClick={onDeleteDialogOpen}
                className="absolute -top-1 -right-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full"
              >
                <X className="size-3" />
              </Button>
            )}

            <Button
              disabled={isUploading}
              className="bg-primary text-primary-foreground absolute -right-1 -bottom-1 flex h-7 w-7 items-center justify-center rounded-full shadow-sm transition-opacity hover:opacity-90"
            >
              <label htmlFor="avatar-file-input" className="cursor-pointer">
                {isUploading ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Camera className="size-3.5" />
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

          <div className="flex-1 space-y-1 text-center sm:text-left">
            <h2 className="text-lg font-bold">{profile?.fullName}</h2>
            <p className="text-muted-foreground text-sm">
              {profile?.user?.email}
            </p>
            <Badge variant="secondary" className="text-xs">
              {profile?.user?.role === "CANDIDATE"
                ? "Ứng viên"
                : "Nhà tuyển dụng"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(AvatarCard);
