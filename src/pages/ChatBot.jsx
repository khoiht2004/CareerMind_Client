import { useChatBot } from "@/hooks/useChatBot";
import ChatSidebar from "@/components/chatbot/ChatSidebar";
import ChatArea from "@/components/chatbot/ChatArea";
import { ChevronLeft } from "lucide-react";
import { memo } from "react";

const ChatBotHeader = memo(function ChatBotHeader({ onMenuClick }) {
  return (
    <div className="border-border bg-card flex shrink-0 items-center gap-3 border-b px-4 py-3 md:hidden md:py-4">
      <button
        type="button"
        onClick={onMenuClick}
        className="border-border bg-background hover:bg-muted flex size-8 items-center justify-center rounded-lg border transition-colors md:hidden"
      >
        <ChevronLeft className="size-4" />
      </button>
      <h2 className="text-sm font-bold md:text-base">Trợ lý CareerMind</h2>
    </div>
  );
});

function ChatBot() {
  const {
    activeSessionId,
    input,
    setInput,
    isSending,
    pendingMessage,
    sidebarOpen,
    setSidebarOpen,
    sessions,
    messages,
    sessionsLoading,
    messagesLoading,
    handleCreateSession,
    handleSend,
    handleDeleteSession,
    handleRenameSession,
    handleSelectSession,
  } = useChatBot();

  return (
    <div className="-mb-25 flex h-[calc(100svh-3.5rem)] w-full min-w-0 flex-col gap-3 overflow-hidden p-2 sm:p-3 md:flex-row md:p-6">
      <ChatSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelect={handleSelectSession}
        onCreate={handleCreateSession}
        onRename={handleRenameSession}
        onDelete={handleDeleteSession}
        isLoading={sessionsLoading}
      />
      <ChatArea
        messages={messages}
        pendingMessage={pendingMessage}
        input={input}
        onInputChange={setInput}
        onSend={handleSend}
        isSending={isSending}
        isLoading={messagesLoading}
        hasActiveSession={!!activeSessionId}
        userAvatar={sessions[0]?.user?.profile?.avatarUrl}
        header={<ChatBotHeader onMenuClick={() => setSidebarOpen(true)} />}
      />
    </div>
  );
}

export default ChatBot;
