import { memo, useCallback } from "react";
import ChatInput from "@/components/chat-shared/ChatInput";
import ChatMessages from "@/components/chat-shared/ChatMessages";
import { useAttachments } from "@/hooks/useAttachments";

function ConversationArea({
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
  showBotAvatar = true,
  footerText,
  placeholder,
  partnerAvatar = null,
  userAvatar = null,
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
    <div className="bg-card border-border flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border shadow-sm md:rounded-4xl">
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
        suggestedQuestions={false}
        showBotAvatar={showBotAvatar}
        partnerAvatar={partnerAvatar}
        userAvatar={userAvatar}
        isAiChat={false}
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
        showAiHelpers={false}
        footerText={footerText}
        placeholder={placeholder}
      />
    </div>
  );
}

export default memo(ConversationArea);
