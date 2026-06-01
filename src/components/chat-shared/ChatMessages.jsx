import { useRef, useEffect } from "react";
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
import { cn } from "@/lib/utils";

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
    q: "Xu hướng tuyển dụng 2026?",
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

export default function ChatMessages({
  messages,
  pendingMessage,
  isLoading,
  hasActiveSession,
  isSending,
  onSend,
  className,
  suggestedQuestions = true,
  welcomeTitle = "Xin chào, tôi là MindScout",
  welcomeDescription = "Tôi là trợ lý sự nghiệp thông minh của bạn. Hãy bắt đầu cuộc trò chuyện để tối ưu hóa tương lai của bạn.",
  welcomeIcon = Bot,
  showBotAvatar = true,
  partnerAvatar = null,
  userAvatar = null,
  isAiChat = false,
}) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending, pendingMessage]);

  const isEmpty = messages.length === 0 && !pendingMessage;
  const WelcomeIcon = welcomeIcon;

  return (
    <ScrollArea className={cn("min-h-0 flex-1 px-3 pt-3 sm:px-6", className)}>
      <div className="max-w-full space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="text-muted-foreground size-5 animate-spin" />
          </div>
        ) : isEmpty ? (
          <div className="flex flex-col items-center justify-center gap-6 py-12 text-center">
            <div className="bg-foreground text-background flex size-20 items-center justify-center rounded-3xl shadow-lg sm:size-24">
              <WelcomeIcon className="size-10 sm:size-12" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold sm:text-2xl">{welcomeTitle}</h2>
              <p className="text-muted-foreground mx-auto max-w-sm text-sm leading-relaxed">
                {welcomeDescription}
              </p>
            </div>
            {suggestedQuestions && (
              <div className="grid w-full max-w-lg grid-cols-1 gap-3 sm:grid-cols-2">
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
            )}
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                message={msg}
                showBotAvatar={showBotAvatar}
                partnerAvatar={partnerAvatar}
                userAvatar={userAvatar}
                isAiChat={isAiChat}
              />
            ))}
            {pendingMessage && (
              <MessageBubble
                message={{
                  ...PENDING_MESSAGE_TEMPLATE,
                  content: pendingMessage.content,
                  images: pendingMessage.attachments,
                  createdAt: new Date().toISOString(),
                }}
                showBotAvatar={showBotAvatar}
                partnerAvatar={partnerAvatar}
                userAvatar={userAvatar}
                isAiChat={isAiChat}
              />
            )}
          </>
        )}

        {isSending && (
          <div className="flex gap-2">
            {showBotAvatar && (
              <div className="bg-muted border-border text-foreground flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border">
                {isAiChat ? (
                  <Bot className="size-4" />
                ) : partnerAvatar ? (
                  <img
                    src={partnerAvatar}
                    alt="Partner avatar"
                    className="h-full w-full rounded-full object-cover"
                  />
                ) : (
                  <Bot className="size-4" />
                )}
              </div>
            )}
            <div className="bg-muted flex h-[38px] min-w-[56px] items-center justify-center rounded-2xl rounded-tl-sm px-4 py-2">
              <div className="flex items-center gap-1.5 pt-1.5">
                <div
                  className="bg-muted-foreground/70 animate-jump size-1.25 rounded-full"
                  style={{ animationDelay: "-0.32s" }}
                />
                <div
                  className="bg-muted-foreground/70 animate-jump size-1.25 rounded-full"
                  style={{ animationDelay: "-0.16s" }}
                />
                <div className="bg-muted-foreground/70 animate-jump size-1.25 rounded-full" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
