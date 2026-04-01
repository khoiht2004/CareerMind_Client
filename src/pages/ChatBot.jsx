import { useState, useMemo, useEffect } from "react";
import { toast } from "sonner";
import {
  useGetSessionsQuery,
  useCreateSessionMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
  useDeleteSessionMutation,
} from "@/services/chat.service";
import ChatSidebar from "@/components/chatbot/ChatSidebar";
import ChatArea from "@/components/chatbot/ChatArea";

function ChatBot() {
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  const { data: sessionsData, isLoading: sessionsLoading } = useGetSessionsQuery();
  const { data: messageData, isLoading: messagesLoading } = useGetMessagesQuery(
    activeSessionId,
    { skip: !activeSessionId },
  );
  const [createSession] = useCreateSessionMutation();
  const [sendMessage] = useSendMessageMutation();
  const [deleteSession] = useDeleteSessionMutation();

  const sessions = useMemo(() => sessionsData?.data ?? [], [sessionsData]);
  const messages = useMemo(() => messageData?.data?.messages ?? [], [messageData]);

  // Auto-select first session
  useEffect(() => {
    if (!activeSessionId && sessions.length > 0) {
      setActiveSessionId(sessions[0].id);
    }
  }, [sessions, activeSessionId]);

  const handleCreateSession = async () => {
    try {
      const session = await createSession({}).unwrap();
      setActiveSessionId(session.id);
    } catch {
      toast.error("Không thể tạo cuộc trò chuyện mới");
    }
  };

  const handleSend = async (text) => {
    const content = (text ?? input).trim();
    if (!content || isSending || !activeSessionId) return;

    setInput("");
    setIsSending(true);
    try {
      await sendMessage({ sessionId: activeSessionId, content }).unwrap();
    } catch {
      toast.error("Gửi tin nhắn thất bại");
    } finally {
      setIsSending(false);
    }
  };

  const handleDeleteSession = async () => {
    if (!activeSessionId) return;
    try {
      await deleteSession(activeSessionId).unwrap();
      setActiveSessionId(null);
      toast.success("Đã xóa cuộc trò chuyện");
    } catch {
      toast.error("Xóa thất bại");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-full">
      <ChatSidebar
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelect={setActiveSessionId}
        onCreate={handleCreateSession}
        isLoading={sessionsLoading}
      />
      <ChatArea
        session={messageData?.data?.session}
        messages={messages}
        input={input}
        onInputChange={setInput}
        onSend={handleSend}
        onDelete={handleDeleteSession}
        onKeyDown={handleKeyDown}
        isSending={isSending}
        isLoading={messagesLoading}
        hasActiveSession={!!activeSessionId}
      />
    </div>
  );
}

export default ChatBot;
