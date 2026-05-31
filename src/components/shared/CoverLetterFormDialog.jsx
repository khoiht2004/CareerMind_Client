import { Loader2, Sparkles } from "lucide-react";
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
  onGenerate,
  isGeneratingCL,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-[480px] md:max-w-[750px]">
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
            <label className="text-sm font-semibold">
              Tiêu đề (VD: Cho vị trí Frontend)
            </label>
            <Input
              placeholder="Nhập tiêu đề thư..."
              value={formData.title}
              onChange={(e) =>
                onFormChange({ ...formData, title: e.target.value })
              }
              className="bg-primary/10"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <label className="text-sm font-semibold">Nội dung thư</label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-primary h-7 gap-1.5 px-2 text-xs font-bold"
                onClick={onGenerate}
                disabled={isGeneratingCL}
              >
                <Sparkles className="size-3.5" fill="currentColor" />
                {isGeneratingCL ? "Đang tạo..." : "Tối ưu bằng MindScout"}
              </Button>
            </div>
            <Textarea
              placeholder="Kính gửi nhà tuyển dụng..."
              className="bg-primary/10 max-h-[min(350px,50svh)] min-h-[200px] resize-none"
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
