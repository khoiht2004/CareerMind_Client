import { memo } from "react";
import { Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

function CvAutoFillDialog({
  open,
  onOpenChange,
  parsedProfile,
  onConfirm,
  isConfirming,
  onCancel,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="text-primary flex items-center gap-3 font-bold">
            <Sparkles className="size-5 animate-pulse" />
            <DialogTitle>Tự động điền Hồ sơ từ CV</DialogTitle>
          </div>
          <DialogDescription className={"mt-2"}>
            MindScout đã bóc tách được một số thông tin từ CV mới tải lên của
            bạn. Bạn có muốn sử dụng thông tin này để cập nhật hồ sơ cá nhân
            không?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-3 text-sm">
          {parsedProfile?.fullName && (
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="text-muted-foreground font-semibold">
                Họ tên:
              </span>
              <span className="text-foreground font-bold">
                {parsedProfile.fullName}
              </span>
            </div>
          )}
          {parsedProfile?.phone && (
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="text-muted-foreground font-semibold">
                Điện thoại:
              </span>
              <span className="text-foreground">{parsedProfile.phone}</span>
            </div>
          )}
          {parsedProfile?.address && (
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="text-muted-foreground font-semibold">
                Địa chỉ:
              </span>
              <span className="text-foreground">{parsedProfile.address}</span>
            </div>
          )}
          {parsedProfile?.skills && parsedProfile.skills.length > 0 && (
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="text-muted-foreground font-semibold">
                Kỹ năng:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {parsedProfile.skills.map((s, idx) => (
                  <span
                    key={idx}
                    className="bg-primary/10 text-primary rounded-full px-2 py-0.5 text-xs font-semibold"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {parsedProfile?.bio && (
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="text-muted-foreground font-semibold">
                Giới thiệu:
              </span>
              <span className="text-muted-foreground italic">
                &ldquo;{parsedProfile.bio}&rdquo;
              </span>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onCancel}
            disabled={isConfirming}
            className="cursor-pointer"
          >
            Bỏ qua
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isConfirming}
            className="cursor-pointer gap-1.5"
          >
            {isConfirming ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Sparkles className="size-4" />
            )}
            Cập nhật Hồ sơ
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default memo(CvAutoFillDialog);
