import { useRef, useEffect } from "react";
import {
  Bot,
  Send,
  Loader2,
  UserSearch,
  FileText,
  TrendingUp,
  GraduationCap,
  AudioLines,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import MessageBubble from "./MessageBubble";

const SUGGESTED_QUESTIONS = [
  {
    q: "Tôi phù hợp với vị trí nào?",
    icon: UserSearch,
    cls: "bg-[var(--status-reviewing-bg)] text-[var(--status-reviewing-text)]",
  },
  {
    q: "Cách viết CV hiệu quả?",
    icon: FileText,
    cls: "bg-[var(--status-interview-bg)] text-[var(--status-interview-text)]",
  },
  {
    q: "Xu hướng tuyển dụng 2024?",
    icon: TrendingUp,
    cls: "bg-[var(--status-accepted-bg)] text-[var(--status-accepted-text)]",
  },
  {
    q: "Cần học kỹ năng gì mới?",
    icon: GraduationCap,
    cls: "bg-[var(--status-rejected-bg)] text-[var(--status-rejected-text)]",
  },
];

const TEXTAREA_BASE_HEIGHT = 40;
const TEXTAREA_MAX_HEIGHT = 100;

function ChatArea({
  messages,
  pendingMessage,
  input,
  onInputChange,
  onSend,
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
    <div className="bg-card flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-4xl pt-4">
      {/* Messages */}
      <ScrollArea className="min-h-0 flex-1 px-4">
        <div className="mx-auto max-w-2xl space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="text-muted-foreground size-5 animate-spin" />
            </div>
          ) : isEmpty ? (
            /* Welcome state */
            <div className="flex flex-col items-center justify-center gap-6 py-12 text-center">
              <div className="bg-foreground text-background flex size-24 items-center justify-center rounded-3xl shadow-lg">
                <Bot className="size-12" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">
                  Xin chào, tôi là AI Scout
                </h2>
                <p className="text-muted-foreground mx-auto max-w-sm text-sm leading-relaxed">
                  Tôi là trợ lý sự nghiệp thông minh của bạn. Hãy bắt đầu cuộc
                  trò chuyện để tối ưu hóa tương lai của bạn.
                </p>
              </div>

              {/* Suggestion cards */}
              <div className="grid w-full max-w-lg grid-cols-2 gap-3">
                {SUGGESTED_QUESTIONS.map(({ q, icon, cls }) => {
                  const Icon = icon;
                  return (
                    <button
                      key={q}
                      type="button"
                      onClick={() => onSend(q)}
                      disabled={!hasActiveSession}
                      className="bg-muted/40 hover:bg-muted flex items-center gap-3 rounded-2xl p-4 text-left hover:cursor-pointer disabled:opacity-40"
                    >
                      <div
                        className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${cls}`}
                      >
                        <Icon className="size-4" />
                      </div>
                      <p className="text-sm leading-snug font-medium">{q}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
              ))}

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
              <div className="bg-muted flex size-8 shrink-0 items-center justify-center rounded-full">
                <Bot className="size-4" />
              </div>
              <div className="bg-muted flex items-center gap-1.5 rounded-2xl rounded-tl-sm px-4 py-3">
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

      {/* Input area */}
      <div className="bg-primary/10 px-4 py-4">
        <div className="relative mx-auto flex max-w-2xl items-end gap-3">
          <Textarea
            ref={textareaRef}
            placeholder={
              hasActiveSession
                ? "Nhập câu hỏi của bạn tại đây..."
                : "Tạo cuộc trò chuyện mới để bắt đầu"
            }
            value={input}
            onChange={(e) => onInputChange(e.target.value)}
            onInput={handleResize}
            onKeyDown={onKeyDown}
            disabled={isSending || !hasActiveSession}
            className="bg-background min-h-0 resize-none overflow-y-auto rounded-3xl border-0 pt-2 pr-9.5 pb-2 pl-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          />
          <Button
            size="icon"
            className="absolute right-0.5 bottom-1/2 flex size-9 shrink-0 translate-y-1/2 rounded-full"
            onClick={() => onSend()}
            disabled={!input.trim() || isSending || !hasActiveSession}
          >
            {isSending || !input.trim() ? (
              <AudioLines className="size-4" />
            ) : (
              <Send className="size-4" />
            )}
          </Button>
        </div>
        <p className="text-muted-foreground mt-2 text-center text-xs">
          AI Scout có thể mắc lỗi. Hãy kiểm tra các thông tin quan trọng.
        </p>
      </div>
    </div>
  );
}

export default ChatArea;
