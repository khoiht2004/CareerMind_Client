import { memo, useCallback, useRef, useEffect } from "react";
import {
  Bot,
  Loader2,
  UserSearch,
  FileText,
  TrendingUp,
  GraduationCap,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import { useAttachments } from "@/hooks/useAttachments";

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

const PENDING_MESSAGE_TEMPLATE = { id: "__pending__", role: "USER" };

function ChatArea({
  messages,
  pendingMessage,
  input,
  onInputChange,
  onSend,
  isSending,
  isLoading,
  hasActiveSession,
}) {
  const bottomRef = useRef(null);

  const {
    attachments,
    fileInputRef,
    triggerFileInput,
    handleFileInputChange,
    handlePaste,
    removeAttachment,
    clearAttachments,
  } = useAttachments();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending, pendingMessage]);

  const handleSend = useCallback(
    (text) => {
      onSend(text, attachments);
      clearAttachments();
    },
    [onSend, attachments, clearAttachments],
  );

  const isEmpty = messages.length === 0 && !pendingMessage;

  return (
    <div className="bg-card flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-4xl pt-4">
      <ScrollArea className="min-h-0 flex-1 px-6">
        <div className="max-w-full space-y-4">
          {isLoading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="text-muted-foreground size-5 animate-spin" />
            </div>
          ) : isEmpty ? (
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
              <div className="grid w-full max-w-lg grid-cols-2 gap-3">
                {SUGGESTED_QUESTIONS.map(({ q, icon, cls }) => {
                  const Icon = icon;
                  return (
                    <button
                      key={q}
                      type="button"
                      onClick={() => handleSend(q)}
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
                    ...PENDING_MESSAGE_TEMPLATE,
                    content: pendingMessage.content,
                    images: pendingMessage.attachments,
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
      <ChatInput
        input={input}
        onInputChange={onInputChange}
        onSend={handleSend}
        isSending={isSending}
        hasActiveSession={hasActiveSession}
        attachments={attachments}
        fileInputRef={fileInputRef}
        triggerFileInput={triggerFileInput}
        handleFileInputChange={handleFileInputChange}
        handlePaste={handlePaste}
        removeAttachment={removeAttachment}
      />
    </div>
  );
}

export default memo(ChatArea);
