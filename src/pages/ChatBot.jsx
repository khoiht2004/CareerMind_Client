import { useChatBot } from "@/hooks/useChatBot";
import ChatSidebar from "@/components/chatbot/ChatSidebar";
import ChatArea from "@/components/chatbot/ChatArea";

function ChatBot() {
  const {
    activeSessionId,
    input,
    setInput,
    isSending,
    pendingMessage,
    sidebarOpen,
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
    <div className="-mb-25 flex h-[calc(100svh-3.5rem)] w-full gap-3 overflow-hidden md:p-6">
      <ChatSidebar
        isOpen={sidebarOpen}
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
      />
    </div>
  );
}

export default ChatBot;
