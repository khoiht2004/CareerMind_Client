import { memo, useCallback } from "react";
import ChatInput from "@/components/chat-shared/ChatInput";
import ChatMessages from "@/components/chat-shared/ChatMessages";
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
  header,
  welcomeTitle,
  welcomeDescription,
  welcomeIcon,
  suggestedQuestions,
  showAiHelpers = true,
  showBotAvatar = true,
  userAvatar = null,
  footerText,
  placeholder,
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
    <div className="bg-card flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-4xl">
      {header}
      <ChatMessages
        messages={messages}
        pendingMessage={pendingMessage}
        isLoading={isLoading}
        hasActiveSession={hasActiveSession}
        isSending={isSending}
        onSend={handleSend}
        welcomeTitle={welcomeTitle}
        welcomeDescription={welcomeDescription}
        welcomeIcon={welcomeIcon}
        suggestedQuestions={suggestedQuestions}
        showBotAvatar={showBotAvatar}
        isAiChat={true}
        userAvatar={userAvatar}
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
        showAiHelpers={showAiHelpers}
        footerText={footerText}
        placeholder={placeholder}
      />
    </div>
  );
}

export default memo(ChatArea);
