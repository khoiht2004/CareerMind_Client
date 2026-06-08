import { memo, useMemo, useState } from "react";
import { Bot, User, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import InlineJobCard from "./InlineJobCard";
import { parseContent } from "@/utils/chatbot.helper";
import renderText from "./renderText";
import AttachmentThumbnail from "@/components/shared/AttachmentThumbnail";
import { toast } from "sonner";
import { AVATAR_PLACEHOLDER } from "@/config/constants/constants";

function AttachmentsViewer({ attachments }) {
  if (!attachments?.length) return null;
  return (
    <div className="mb-2 flex flex-wrap gap-1.5">
      {attachments.map((att, i) => (
        <AttachmentThumbnail key={i} attachment={att} />
      ))}
    </div>
  );
}

function MessageBubble({
  message,
  showBotAvatar = true,
  partnerAvatar = null,
  userAvatar = null,
  isAiChat = false,
}) {
  const isUser = message.role === "USER";
  const [copied, setCopied] = useState(false);

  const segments = useMemo(() => {
    const raw = message.content
      .replace(/\[LOAD_MORE_JOBS\]/g, "")
      // Strip separator lines: ---, ===, ─── (3+ chars)
      .replace(/^[ \t]*[-=─—]{3,}[ \t]*$/gm, "")
      // Strip blank line between a label line (ends with ':') and its content
      .replace(/(:[^\n]*)\n\n(?=\s*[\d\-•])/g, "$1\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
    return parseContent(raw);
  }, [message.content]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Lỗi khi copy nội dung");
      console.error("Failed to copy text: ", err);
    }
  };

  const renderAvatar = () => {
    if (isUser) {
      return (
        <img
          src={userAvatar || AVATAR_PLACEHOLDER}
          alt="User avatar"
          className="h-full w-full rounded-full object-cover object-top"
        />
      );
    } else {
      if (isAiChat) {
        return <Bot className="size-4" />;
      }
      return (
        <img
          src={partnerAvatar || AVATAR_PLACEHOLDER}
          alt="Partner avatar"
          className="h-full w-full rounded-full object-cover object-top"
        />
      );
    }
  };

  return (
    <div className={cn("group flex gap-2", isUser && "flex-row-reverse")}>
      {showBotAvatar && (
        <div
          className={cn(
            "border-border flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border",
            isUser
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-foreground",
          )}
        >
          {renderAvatar()}
        </div>
      )}
      <div
        className={cn(
          "max-w-[88%] space-y-1 sm:max-w-[80%]",
          isUser && "flex flex-col items-end",
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-sm"
              : "bg-muted rounded-tl-sm",
          )}
        >
          <AttachmentsViewer attachments={message.attachments} />

          {message.cvAnalysis && (
            <div className="bg-background/10 border-border/20 mb-2 rounded-lg border p-3">
              <p className="mb-1 text-base font-bold">
                📊 Phân tích CV (Điểm: {message.cvAnalysis.score}/100)
              </p>
              <div className="space-y-2 text-xs">
                <p>
                  <b>✨ Điểm mạnh:</b> {message.cvAnalysis.strengths.join(", ")}
                </p>
                <p>
                  <b>⚠️ Điểm yếu:</b> {message.cvAnalysis.weaknesses.join(", ")}
                </p>
                <p>
                  <b>📈 Cải thiện:</b>{" "}
                  {message.cvAnalysis.improvements.join(", ")}
                </p>
                <p className="text-muted-foreground mt-1 italic">
                  {message.cvAnalysis.summary}
                </p>
              </div>
            </div>
          )}

          {segments.map((seg, i) =>
            seg.type === "jobs" ? (
              <div
                key={i}
                className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3"
              >
                {seg.ids.map((id) => (
                  <InlineJobCard key={id} id={id} />
                ))}
              </div>
            ) : (
              <div key={i} className="whitespace-pre-wrap">
                {renderText(seg.content)}
              </div>
            ),
          )}
        </div>
        <div
          className={cn(
            "flex items-center gap-2 px-1",
            isUser && "flex-row-reverse",
          )}
        >
          <span className="text-muted-foreground text-[10px]">
            {new Date(message.createdAt).toLocaleTimeString("vi-VN", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
          {message.content && message.id !== "__pending__" && (
            <button
              onClick={handleCopy}
              className="text-muted-foreground hover:text-foreground hover:bg-muted-foreground/10 rounded p-0.5 opacity-0 transition-opacity group-hover:opacity-100 hover:cursor-pointer"
              title="Sao chép nội dung"
            >
              {copied ? (
                <Check className="text-trend-up size-3" />
              ) : (
                <Copy className="size-3" />
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(
  MessageBubble,
  (prev, next) =>
    prev.message.id === next.message.id &&
    prev.message.content === next.message.content &&
    prev.message.attachments === next.message.attachments &&
    prev.message.cvAnalysis === next.message.cvAnalysis &&
    prev.showBotAvatar === next.showBotAvatar &&
    prev.partnerAvatar === next.partnerAvatar &&
    prev.userAvatar === next.userAvatar &&
    prev.isAiChat === next.isAiChat,
);
