import { memo, useCallback, useRef } from "react";
import { Send, AudioLines } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import AttachmentThumbnail from "@/components/shared/AttachmentThumbnail";
import ChatInputDropdown from "./ChatInputDropdown";
import { FILE_INPUT_ACCEPT } from "@/config/constants/attachment.constants";

const TEXTAREA_BASE_HEIGHT = 22;
const TEXTAREA_MAX_HEIGHT = 100;

function ChatInput({
  input,
  onInputChange,
  onSend,
  isSending,
  hasActiveSession,
  attachments,
  fileInputRef,
  triggerFileInput,
  handleFileInputChange,
  handlePaste,
  removeAttachment,
  footer = true,
}) {
  const textareaRef = useRef(null);

  const prevInputRef = useRef(input);
  if (prevInputRef.current !== "" && input === "") {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${TEXTAREA_BASE_HEIGHT}px`;
    }
  }
  prevInputRef.current = input;

  const handleResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = `${TEXTAREA_BASE_HEIGHT}px`;
    el.style.height = `${Math.min(el.scrollHeight, TEXTAREA_MAX_HEIGHT)}px`;
  }, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSend();
      }
    },
    [onSend],
  );

  const canSend =
    (input.trim() || attachments.length > 0) && !isSending && hasActiveSession;

  return (
    <div className="bg-primary/10 px-4 py-2">
      <div className="relative mx-auto flex max-w-3xl items-end gap-2">
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept={FILE_INPUT_ACCEPT}
          multiple
          className="hidden"
          onChange={handleFileInputChange}
        />

        {/* Textarea container */}
        <div className="bg-card flex min-w-0 flex-1 flex-col rounded-xl px-3 pt-2.5 pb-2">
          {attachments.length > 0 && (
            <div className="mb-2 flex flex-wrap gap-2">
              {attachments.map((attachment) => (
                <AttachmentThumbnail
                  key={attachment.id}
                  attachment={attachment}
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
            className="placeholder:text-muted-foreground/30 min-h-0 resize-none rounded-xs border-0 bg-transparent p-0 shadow-none [scrollbar-width:none] focus-visible:ring-0 [&::-webkit-scrollbar]:hidden"
          />

          <article className="flex justify-between">
            {/* Dropdown menu */}
            <ChatInputDropdown
              hasActiveSession={hasActiveSession}
              triggerFileInput={triggerFileInput}
            />

            {/* Send button */}
            <Button
              size="icon"
              className="flex size-9 shrink-0 rounded-full"
              onClick={onSend}
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

      {footer && (
        <p className="text-muted-foreground mt-2 text-center text-xs">
          <b className="font-bold">AI Scout</b> có thể mắc lỗi. Hãy kiểm tra các
          thông tin quan trọng.
        </p>
      )}
    </div>
  );
}

export default memo(ChatInput, (prev, next) => {
  return (
    prev.input === next.input &&
    prev.isSending === next.isSending &&
    prev.hasActiveSession === next.hasActiveSession &&
    prev.attachments.length === next.attachments.length &&
    prev.attachments === next.attachments
  );
});
