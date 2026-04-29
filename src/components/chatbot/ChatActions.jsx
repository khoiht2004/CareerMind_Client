import { memo } from "react";
import { Input } from "@/components/ui/input";
import { EllipsisVertical, PenLine, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { Button } from "../ui/button";
import { useChatActions } from "@/hooks/useChatActions";

function ChatActions({ session, onRename, onDelete, hasActiveSession }) {
  const { rename, delete: del } = useChatActions({
    sessionTitle: session?.title,
    onRename,
    onDelete,
  });

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
            disabled={!hasActiveSession}
          >
            <EllipsisVertical className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={rename.handleOpen}>
            <PenLine className="mr-2 size-4" />
            Đổi tên
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={del.handleOpen}
            className="text-destructive focus:text-destructive"
          >
            <Trash2 className="mr-2 size-4" />
            Xóa
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        open={del.open}
        onOpenChange={del.setOpen}
        onConfirm={del.handleConfirm}
        description="Bạn có chắc muốn xóa cuộc trò chuyện này? Hành động này không thể hoàn tác."
      />

      <Dialog open={rename.open} onOpenChange={rename.setOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Đổi tên cuộc trò chuyện</DialogTitle>
          </DialogHeader>
          <Input
            value={rename.value}
            onChange={(e) => rename.setValue(e.target.value)}
            onKeyDown={rename.handleKeyDown}
            placeholder="Nhập tên mới..."
            autoFocus
          />
          <DialogFooter>
            <Button variant="outline" onClick={rename.handleClose}>
              Hủy
            </Button>
            <Button
              onClick={rename.handleSubmit}
              disabled={!rename.value.trim()}
            >
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default memo(ChatActions);
