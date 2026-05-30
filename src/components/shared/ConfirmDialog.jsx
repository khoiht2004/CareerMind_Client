import { AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
  title = "Xác nhận xóa",
  description,
  confirmText = "Xóa",
  cancelText = "Hủy",
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex flex-col items-center gap-0 rounded-2xl p-8 sm:max-w-[400px]"
        showCloseButton={false}
      >
        <div className="bg-destructive/10 text-destructive mb-4 flex size-14 items-center justify-center rounded-full">
          <AlertTriangle className="size-6" />
        </div>

        <DialogHeader className="flex flex-col items-center space-y-3 pb-6">
          <DialogTitle className="text-xl font-bold">{title}</DialogTitle>
          {description && (
            <DialogDescription asChild>
              <div className="text-muted-foreground text-center text-sm leading-relaxed whitespace-pre-wrap">
                {description}
              </div>
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="grid w-full grid-cols-2 gap-3">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
            className="hover:bg-muted h-11 w-full rounded-xl"
          >
            {cancelText}
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
            className="h-11 w-full rounded-xl"
          >
            {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
            {confirmText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDialog;
