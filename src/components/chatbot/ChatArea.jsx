import { memo, useCallback } from "react";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { useAttachments } from "@/hooks/useAttachments";

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
  const {
    attachments,
    fileInputRef,
    triggerFileInput,
    handleFileInputChange,
    handlePaste,
    removeAttachment,
    clearAttachments,
  } = useAttachments();

  const handleSend = useCallback(
    (text) => {
      onSend(text, attachments);
      clearAttachments();
    },
    [onSend, attachments, clearAttachments],
  );

  return (
    <div className="bg-card flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-4xl pt-4">
      <ChatMessages
        messages={messages}
        pendingMessage={pendingMessage}
        isLoading={isLoading}
        hasActiveSession={hasActiveSession}
        isSending={isSending}
        onSend={handleSend}
      />

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
