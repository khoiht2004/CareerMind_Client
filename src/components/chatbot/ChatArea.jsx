import { memo, useCallback, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  Loader2,
  UserSearch,
  FileText,
  TrendingUp,
  GraduationCap,
  AudioLines,
  Plus,
  ImagePlus,
  Globe,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MessageBubble from "./MessageBubble";
import { useAttachments } from "@/hooks/useAttachments";
import AttachmentThumbnail from "@/components/shared/AttachmentThumbnail";

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

const TEXTAREA_BASE_HEIGHT = 32;
const TEXTAREA_MAX_HEIGHT = 100;

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
  const textareaRef = useRef(null);

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
    if (!input && textareaRef.current) {
      textareaRef.current.style.height = `${TEXTAREA_BASE_HEIGHT}px`;
    }
  }, [input]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending, pendingMessage]);

  const handleResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = `${TEXTAREA_BASE_HEIGHT}px`;
    el.style.height = `${Math.min(el.scrollHeight, TEXTAREA_MAX_HEIGHT)}px`;
  }, []);

  const handleSend = useCallback(
    (text) => {
      onSend(text, attachments);
      clearAttachments();
    },
    [onSend, attachments, clearAttachments],
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  const isEmpty = messages.length === 0 && !pendingMessage;
  const canSend =
    (input.trim() || attachments.length > 0) && !isSending && hasActiveSession;

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
      <div className="bg-primary/10 px-4 py-2">
        <div className="relative mx-auto flex max-w-3xl items-end gap-2">
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            multiple
            className="hidden"
            onChange={handleFileInputChange}
          />

          {/* Textarea container*/}
          <div className="bg-background flex min-w-0 flex-1 flex-col rounded-3xl px-3 pt-3 pb-2">
            {attachments.length > 0 && (
              <div className="mb-2 flex flex-wrap gap-2">
                {attachments.map((att) => (
                  <AttachmentThumbnail
                    key={att.id}
                    attachment={att}
                    onRemove={removeAttachment}
                  />
                ))}
              </div>
            )}
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
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              disabled={isSending || !hasActiveSession}
              className="placeholder:text-muted-foreground min-h-0 resize-none border-0 bg-transparent p-0 shadow-none [scrollbar-width:none] focus-visible:ring-0 [&::-webkit-scrollbar]:hidden"
            />

            <article className="flex justify-between">
              {/* Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    variant="ghost"
                    disabled={!hasActiveSession}
                    className="hover:bg-primary/10 flex size-9 shrink-0 rounded-full"
                  >
                    <Plus className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  align="start"
                  className="mb-1 w-52"
                >
                  <DropdownMenuItem
                    onClick={triggerFileInput}
                    className="cursor-pointer"
                  >
                    <ImagePlus className="mr-2 size-4" />
                    Thêm ảnh và tệp
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Globe className="mr-2 size-4" />
                    Nghiên cứu chuyên sâu
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <Sparkles className="mr-2 size-4" />
                    Phân tích và thêm
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {/* Send button */}
              <Button
                size="icon"
                className="flex size-9 shrink-0 rounded-full"
                onClick={() => handleSend()}
                disabled={!canSend}
              >
                {isSending || !canSend ? (
                  <AudioLines className="size-4" />
                ) : (
                  <Send className="size-4" />
                )}
              </Button>
            </article>
          </div>
        </div>
        <p className="text-muted-foreground mt-2 text-center text-xs">
          <b className="font-bold">AI Scout</b> có thể mắc lỗi. Hãy kiểm tra các
          thông tin quan trọng.
        </p>
      </div>
    </div>
  );
}

export default memo(ChatArea);
