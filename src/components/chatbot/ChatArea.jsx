import { useRef, useEffect } from "react";
import {
  Bot,
  Send,
  BotMessageSquare,
  Loader2,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import MessageBubble from "./MessageBubble";
import { Textarea } from "../ui/textarea";
import ChatHeaderActions from "./ChatHeaderActions";

const SUGGESTED_QUESTIONS = [
  "Tôi phù hợp với vị trí nào?",
  "Cách viết CV hiệu quả?",
  "Mức lương Frontend Developer hiện tại?",
  "Kỹ năng cần có cho Data Scientist?",
];

const TEXTAREA_BASE_HEIGHT = 36;
const TEXTAREA_MAX_HEIGHT = 100;

function ChatArea({
  sidebarOpen,
  onToggleSidebar,
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
  const textareaRef = useRef(null);

  useEffect(() => {
    if (!input && textareaRef.current) {
      textareaRef.current.style.height = `${TEXTAREA_BASE_HEIGHT}px`;
    }
  }, [input]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending, pendingMessage]);

  const handleResize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = `${TEXTAREA_BASE_HEIGHT}px`;
    el.style.height = `${Math.min(el.scrollHeight, TEXTAREA_MAX_HEIGHT)}px`;
  };

  const isEmpty = messages.length === 0 && !pendingMessage;

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
      {/* Header */}
      <div className="flex h-14 shrink-0 items-center border-b pr-5 pl-1">
        {/* Nút mở sidebar — chỉ hiện khi sidebar đang ẩn */}
        <div className="flex items-center gap-2.5">
          <div>
            {!sidebarOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggleSidebar}
                className="mr-1 size-8.5 shrink-0 cursor-pointer"
                title="Mở danh sách hội thoại"
              >
                <ChevronLeft className="size-5" />
              </Button>
            )}
          </div>
        </div>
        {/* Session info */}
        <div className="flex flex-1 items-center justify-between">
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
          <ChatHeaderActions
            session={session}
            onRename={onRename}
            onDelete={onDelete}
            hasActiveSession={hasActiveSession}
          />
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="min-h-0 flex-1 p-3">
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
        <div className="mx-auto flex items-end gap-2">
          <Textarea
            ref={textareaRef}
            placeholder={
              hasActiveSession
                ? "Nhập câu hỏi của bạn..."
                : "Tạo cuộc trò chuyện mới để bắt đầu"
            }
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onInput={handleResize}
            onKeyDown={onKeyDown}
            disabled={isSending || !hasActiveSession}
            className="border-border min-h-0 resize-none overflow-y-auto border leading-tight [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
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
    </div>
  );
}

export default ChatArea;
