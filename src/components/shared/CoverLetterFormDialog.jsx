import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function CoverLetterFormDialog({
  open,
  onOpenChange,
  formData,
  onFormChange,
  onSubmit,
  isLoading,
  isEditing,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[368px] sm:max-w-[480px] md:max-w-[750px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Sửa thư xin việc" : "Tạo thư xin việc"}
          </DialogTitle>
          <DialogDescription>
            Soạn sẵn thư xin việc để sử dụng nhanh chóng khi ứng tuyển, thể hiện
            điểm mạnh của bạn.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4 pt-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">
              Tiêu đề (VD: Cho vị trí Frontend)
            </label>
            <Input
              placeholder="Nhập tiêu đề thư..."
              value={formData.title}
              onChange={(e) =>
                onFormChange({ ...formData, title: e.target.value })
              }
              className={"border-border border"}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium">Nội dung thư</label>
            <Textarea
              placeholder="Kính gửi nhà tuyển dụng..."
              className="border-border max-h-[350px] min-h-[200px] resize-none border"
              value={formData.content}
              onChange={(e) =>
                onFormChange({ ...formData, content: e.target.value })
              }
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Hủy
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-primary hover:bg-primary/90"
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                "Lưu lại"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CoverLetterFormDialog;
