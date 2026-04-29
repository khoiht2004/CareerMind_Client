import { memo, useMemo } from "react";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";
import InlineJobCard from "./InlineJobCard";
import { parseContent } from "@/utils/chatbot.helper";
import renderText from "./renderText";
import AttachmentThumbnail from "@/components/shared/AttachmentThumbnail";

function ImageAttachments({ images }) {
  if (!images?.length) return null;
  return (
    <div className="mb-2 flex flex-wrap gap-1.5">
      {images.map((img, i) => (
        <AttachmentThumbnail key={i} attachment={img} />
      ))}
    </div>
  );
}

function MessageBubble({ message }) {
  const isUser = message.role === "USER";

  const segments = useMemo(() => {
    const raw = message.content.replace(/\[LOAD_MORE_JOBS\]/g, "");
    return parseContent(raw);
  }, [message.content]);

  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted",
        )}
      >
        {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
      </div>
      <div
        className={cn(
          "max-w-[80%] space-y-1",
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
          <ImageAttachments images={message.images} />
          {segments.map((seg, i) =>
            seg.type === "jobs" ? (
              <div key={i} className="grid grid-cols-3 gap-2">
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
        <span className="text-muted-foreground px-1 text-[10px]">
          {new Date(message.createdAt).toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>
    </div>
  );
}

// Re-render only when content or images change
export default memo(
  MessageBubble,
  (prev, next) =>
    prev.message.id === next.message.id &&
    prev.message.content === next.message.content &&
    prev.message.images === next.message.images,
);
