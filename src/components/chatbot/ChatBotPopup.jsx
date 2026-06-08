import { useEffect, useState } from "react";
import { Bot, Minus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePopupChatBot } from "@/hooks/usePopupChatBot";
import ChatMessages from "@/components/chat-shared/ChatMessages";
import ChatInput from "@/components/chat-shared/ChatInput";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import { useAttachments } from "@/hooks/useAttachments";
import ChatBotFab from "./ChatBotFab";

export default function ChatBotPopup() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <ChatBotFab open={open} onToggle={() => setOpen((value) => !value)} />
      <ChatbotWindow open={open} setOpen={setOpen} />
    </>
  );
}

function ChatbotWindow({ open, setOpen }) {
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    activeSessionId,
    input,
    setInput,
    isSending,
    pendingMessage,
    messages,
    sessionsLoading,
    messagesLoading,
    handleCreateSession,
    handleSend,
    handleDeleteSession,
  } = usePopupChatBot();

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
    if (open && !sessionsLoading && !activeSessionId) {
      handleCreateSession();
    }
  }, [open, sessionsLoading, activeSessionId, handleCreateSession]);

  const onSendWrapper = async (text) => {
    const success = await handleSend(text, attachments);
    if (success) {
      clearAttachments();
    }
  };

  const onConfirmClose = async () => {
    const success = await handleDeleteSession();
    if (success) {
      setShowConfirm(false);
      setOpen(false);
    }
  };

  return (
    <>
      <div
        className={`border-border bg-card fixed right-3 bottom-20 left-3 z-50 overflow-hidden rounded-xl border shadow-xl transition-all duration-300 sm:left-auto sm:right-20 sm:bottom-7 sm:w-[360px] ${open ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-4 opacity-0"}`}
      >
        <div className="bg-primary text-primary-foreground flex items-center justify-between px-3 py-2">
          <div className="flex items-center gap-2">
            <div className="bg-background flex size-8 items-center justify-center rounded-full">
              <Bot className="text-primary text-base" />
            </div>
            <div className="flex flex-col gap-0">
              <p className="text-sm font-medium">MindScout</p>
              <span className="text-[10px] opacity-80">
                Hỏi tôi bất cứ điều gì bạn muốn
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              size="icon"
              className="hover:bg-primary-foreground/5 size-7"
              onClick={() => setOpen(false)}
              title="Thu nhỏ"
            >
              <Minus className="size-4" />
            </Button>
            <Button
              size="icon"
              className="hover:bg-primary-foreground/5 hover:text-destructive size-7"
              onClick={() => setShowConfirm(true)}
            >
              <X className="size-4" />
            </Button>
          </div>
        </div>
        <div className="bg-card flex h-[min(480px,calc(100svh-9rem))] flex-col pt-2">
          <ChatMessages
            messages={messages}
            pendingMessage={pendingMessage}
            isLoading={messagesLoading}
            hasActiveSession={!!activeSessionId}
            isSending={isSending}
            onSend={onSendWrapper}
            suggestedQuestions={false}
            className="overflow-y-auto overscroll-contain px-2.5"
          />
          <ChatInput
            input={input}
            onInputChange={setInput}
            onSend={onSendWrapper}
            isSending={isSending}
            hasActiveSession={!!activeSessionId}
            attachments={attachments}
            fileInputRef={fileInputRef}
            triggerFileInput={triggerFileInput}
            handleFileInputChange={handleFileInputChange}
            handlePaste={handlePaste}
            removeAttachment={removeAttachment}
            footer={false}
          />
        </div>
      </div>

      <ConfirmDialog
        open={showConfirm}
        onOpenChange={setShowConfirm}
        onConfirm={onConfirmClose}
        title="Đóng cuộc trò chuyện?"
        description="Bạn có chắc chắn muốn đóng? Cuộc trò chuyện này sẽ bị xóa và không thể khôi phục."
        confirmText="Xóa và đóng"
      />
    </>
  );
}
