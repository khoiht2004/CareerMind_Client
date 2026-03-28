import { useState, useRef, useEffect, useMemo } from "react";
import { Send, Bot, User, Plus, Trash2, BotMessageSquare, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  useGetSessionsQuery,
  useCreateSessionMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
  useDeleteSessionMutation,
} from "@/services/chat.service";

const SUGGESTED_QUESTIONS = [
  "Tôi phù hợp với vị trí nào?",
  "Cách viết CV hiệu quả?",
  "Mức lương Frontend Developer hiện tại?",
  "Kỹ năng cần có cho Data Scientist?",
];

function MessageBubble({ message }) {
  const isUser = message.role === "USER";
  return (
    <div className={cn("flex gap-3", isUser && "flex-row-reverse")}>
      <div
        className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
          isUser ? "bg-primary text-primary-foreground" : "bg-muted",
        )}
      >
        {isUser ? <User className="size-4" /> : <Bot className="size-4" />}
      </div>
      <div className={cn("max-w-[75%] space-y-1", isUser && "items-end flex flex-col")}>
        <div
          className={cn(
            "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
            isUser
              ? "bg-primary text-primary-foreground rounded-tr-sm"
              : "bg-muted rounded-tl-sm",
          )}
        >
          {message.content}
        </div>
        <span className="text-[10px] text-muted-foreground px-1">
          {new Date(message.createdAt).toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
    </div>
  );
}

function ChatBot() {
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const bottomRef = useRef(null);

  const { data: sessionsData, isLoading: sessionsLoading } = useGetSessionsQuery();
  const { data: messageData, isLoading: messagesLoading } = useGetMessagesQuery(activeSessionId, {
    skip: !activeSessionId,
  });
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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isSending]);

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
    <div className="flex h-screen">
      {/* Conversations sidebar */}
      <div className="w-64 border-r flex flex-col shrink-0">
        <div className="p-3 border-b">
          <Button size="sm" className="w-full gap-2" onClick={handleCreateSession}>
            <Plus className="size-3.5" />
            Cuộc trò chuyện mới
          </Button>
        </div>
        <ScrollArea className="flex-1 p-2">
          {sessionsLoading ? (
            <div className="flex justify-center py-4">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : sessions.length === 0 ? (
            <p className="text-xs text-muted-foreground text-center py-4">Chưa có cuộc trò chuyện</p>
          ) : (
            <div className="space-y-0.5">
              {sessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => setActiveSessionId(session.id)}
                  className={cn(
                    "w-full text-left px-3 py-2.5 rounded-lg transition-colors",
                    activeSessionId === session.id ? "bg-muted" : "hover:bg-muted/60",
                  )}
                >
                  <p className="text-sm font-medium truncate">{session.title}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {session._count?.messages ?? 0} tin nhắn
                  </p>
                </button>
              ))}
            </div>
          )}
        </ScrollArea>
      </div>

      {/* Chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="h-14 border-b px-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <BotMessageSquare className="size-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold">
                {messageData?.data?.session?.title ?? "Trợ lý AI SRA"}
              </p>
              <p className="text-[11px] text-green-500">Đang hoạt động</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
            onClick={handleDeleteSession}
            disabled={!activeSessionId}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-5">
          <div className="space-y-4 max-w-2xl mx-auto">
            {messagesLoading ? (
              <div className="flex justify-center py-4">
                <Loader2 className="size-5 animate-spin text-muted-foreground" />
              </div>
            ) : messages.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <BotMessageSquare className="size-10 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Bắt đầu cuộc trò chuyện của bạn!</p>
              </div>
            ) : (
              messages.map((msg) => <MessageBubble key={msg.id} message={msg} />)
            )}

            {isSending && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                  <Bot className="size-4" />
                </div>
                <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1">
                  <Loader2 className="size-3.5 animate-spin text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Đang trả lời...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>
        </ScrollArea>

        {/* Suggested questions */}
        {messages.length === 0 && !messagesLoading && (
          <div className="px-5 pb-3">
            <p className="text-xs text-muted-foreground mb-2">Gợi ý câu hỏi:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  disabled={!activeSessionId}
                  className="text-xs px-3 py-1.5 rounded-full border hover:bg-muted transition-colors disabled:opacity-40"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        <Separator />

        {/* Input area */}
        <div className="p-4">
          <div className="flex gap-2 max-w-2xl mx-auto">
            <Input
              placeholder={activeSessionId ? "Nhập câu hỏi của bạn..." : "Tạo cuộc trò chuyện mới để bắt đầu"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isSending || !activeSessionId}
              className="rounded-full"
            />
            <Button
              size="icon"
              className="rounded-full shrink-0"
              onClick={() => handleSend()}
              disabled={!input.trim() || isSending || !activeSessionId}
            >
              <Send className="size-4" />
            </Button>
          </div>
          <p className="text-[10px] text-center text-muted-foreground mt-2">
            AI có thể mắc lỗi. Hãy kiểm tra thông tin quan trọng.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
