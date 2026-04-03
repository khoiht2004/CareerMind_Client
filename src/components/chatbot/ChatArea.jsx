import { useRef, useEffect, useState } from "react";
import {
  Bot,
  Send,
  BotMessageSquare,
  Loader2,
  EllipsisVertical,
  PenLine,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
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
import MessageBubble from "./MessageBubble";

const SUGGESTED_QUESTIONS = [
  "Tôi phù hợp với vị trí nào?",
  "Cách viết CV hiệu quả?",
  "Mức lương Frontend Developer hiện tại?",
  "Kỹ năng cần có cho Data Scientist?",
];

function ChatArea({
  session,
  messages,
  pendingMessage,
  input,
  onInputChange,
  onSend,
  onDelete,
  onRename,
  onKeyDown,
  isSending,
  isLoading,
  hasActiveSession,
}) {
  const bottomRef = useRef(null);
  const [renameOpen, setRenameOpen] = useState(false);
  const [renameValue, setRenameValue] = useState("");

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending, pendingMessage]);

  const handleOpenRename = () => {
    setRenameValue(session?.title ?? "");
    setRenameOpen(true);
  };

  const handleRenameSubmit = async () => {
    await onRename(renameValue);
    setRenameOpen(false);
  };

  const isEmpty = messages.length === 0 && !pendingMessage;

  return (
    <div className="flex min-w-0 flex-1 flex-col">
      {/* Header */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b px-5">
        <div className="flex items-center gap-2.5">
          <div className="bg-primary/10 flex h-8 w-8 items-center justify-center rounded-full">
            <BotMessageSquare className="text-primary size-4" />
          </div>
          <div>
            <p className="text-sm font-semibold">
              {session?.title ?? "Trợ lý AI SRA"}
            </p>
            <p className="text-[11px] text-green-500">Đang hoạt động</p>
          </div>
        </div>
        {/* Dropdown Menu */}
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
            <DropdownMenuItem onClick={handleOpenRename}>
              <PenLine className="mr-2 size-4" />
              Đổi tên
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onDelete}
              className="text-destructive focus:text-destructive"
            >
              <Trash2 className="mr-2 size-4" />
              Xóa
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 overflow-y-auto p-3">
        <div className="mx-auto max-w-full space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="text-muted-foreground size-5 animate-spin" />
            </div>
          ) : isEmpty ? (
            <div className="text-muted-foreground py-8 text-center">
              <BotMessageSquare className="mx-auto mb-2 size-10 opacity-30" />
              <p className="text-sm">Bắt đầu cuộc trò chuyện của bạn!</p>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}

              {/* Optimistic user message while waiting for AI */}
              {pendingMessage && (
                <MessageBubble
                  message={{
                    id: "__pending__",
                    role: "USER",
                    content: pendingMessage,
                    createdAt: new Date().toISOString(),
                  }}
                />
              )}
            </>
          )}

          {isSending && (
            <div className="flex gap-3">
              <div className="bg-muted flex h-8 w-8 shrink-0 items-center justify-center rounded-full">
                <Bot className="size-4" />
              </div>
              <div className="bg-muted flex items-center gap-1 rounded-2xl rounded-tl-sm px-4 py-3">
                <Loader2 className="text-muted-foreground size-3.5 animate-spin" />
                <span className="text-muted-foreground text-xs">
                  Đang trả lời...
                </span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Suggested questions */}
      {isEmpty && !isLoading && (
        <div className="px-5 pb-3">
          <p className="text-muted-foreground mb-2 text-xs">Gợi ý câu hỏi:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((q) => (
              <button
                key={q}
                onClick={() => onSend(q)}
                disabled={!hasActiveSession}
                className="hover:bg-muted rounded-full border px-3 py-1.5 text-xs transition-colors disabled:opacity-40"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* Input */}
      <div className="p-4">
        <div className="mx-auto flex max-w-2xl gap-2">
          <Input
            placeholder={
              hasActiveSession
                ? "Nhập câu hỏi của bạn..."
                : "Tạo cuộc trò chuyện mới để bắt đầu"
            }
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyDown={onKeyDown}
            disabled={isSending || !hasActiveSession}
            className="rounded-full"
          />
          <Button
            size="icon"
            className="shrink-0 rounded-full"
            onClick={() => onSend()}
            disabled={!input.trim() || isSending || !hasActiveSession}
          >
            <Send className="size-4" />
          </Button>
        </div>
        <p className="text-muted-foreground mt-2 text-center text-[10px]">
          * AI có thể mắc lỗi. Hãy kiểm tra thông tin quan trọng. *
        </p>
      </div>

      {/* Rename Dialog */}
      <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Đổi tên cuộc trò chuyện</DialogTitle>
          </DialogHeader>
          <Input
            value={renameValue}
            onChange={(e) => setRenameValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleRenameSubmit()}
            placeholder="Nhập tên mới..."
            autoFocus
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setRenameOpen(false)}>
              Hủy
            </Button>
            <Button onClick={handleRenameSubmit} disabled={!renameValue.trim()}>
              Lưu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ChatArea;
