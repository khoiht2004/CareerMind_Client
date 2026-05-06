import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";
import {
  useCreateSessionMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
  useDeleteSessionMutation,
} from "@/services/chat.service";

const POPUP_SESSION_KEY = "sra_popup_session_id";

export function usePopupChatBot() {
  const [activeSessionId, setActiveSessionId] = useState(() => {
    return localStorage.getItem(POPUP_SESSION_KEY) || null;
  });

  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [pendingMessage, setPendingMessage] = useState(null);

  const {
    data: messageData,
    isLoading: messagesLoading,
    isError: messagesError,
    error: messagesErrorObj,
  } = useGetMessagesQuery(activeSessionId, { skip: !activeSessionId });

  const [createSession] = useCreateSessionMutation();
  const [sendMessage] = useSendMessageMutation();
  const [deleteSession] = useDeleteSessionMutation();

  const messages = useMemo(
    () => messageData?.data?.messages ?? [],
    [messageData]
  );

  const isCreatingRef = useRef(false);

  // Chỉ xóa session nếu API trả về 404 (Không tìm thấy) hoặc 403 (Không có quyền)
  useEffect(() => {
    if (
      activeSessionId &&
      messagesError &&
      messagesErrorObj &&
      (messagesErrorObj.status === 404 || messagesErrorObj.status === 403)
    ) {
      setActiveSessionId(null);
      localStorage.removeItem(POPUP_SESSION_KEY);
    }
  }, [activeSessionId, messagesError, messagesErrorObj]);

  const handleCreateSession = useCallback(async () => {
    if (isCreatingRef.current) return;
    isCreatingRef.current = true;
    try {
      const res = await createSession({ title: "Trợ lý nhanh" }).unwrap();
      const newSessionId = res.data.id;
      setActiveSessionId(newSessionId);
      localStorage.setItem(POPUP_SESSION_KEY, newSessionId);
    } catch {
      toast.error("Không thể tạo cuộc trò chuyện mới");
    } finally {
      isCreatingRef.current = false;
    }
  }, [createSession]);

  const handleSend = useCallback(
    async (text, attachments = []) => {
      const content = (typeof text === "string" ? text : input).trim();
      if (!content && !attachments.length) return false;
      if (isSending || !activeSessionId) return false;

      setInput("");
      setIsSending(true);
      setPendingMessage({ content, attachments });
      try {
        await sendMessage({
          sessionId: activeSessionId,
          content,
          attachments,
        }).unwrap();
        return true;
      } catch {
        toast.error("Gửi tin nhắn thất bại");
        return false;
      } finally {
        setIsSending(false);
        setPendingMessage(null);
      }
    },
    [input, isSending, activeSessionId, sendMessage]
  );

  const handleDeleteSession = useCallback(async () => {
    if (!activeSessionId) return false;
    try {
      await deleteSession(activeSessionId).unwrap();
      setActiveSessionId(null);
      localStorage.removeItem(POPUP_SESSION_KEY);
      toast.success("Đã xóa cuộc trò chuyện");
      return true;
    } catch {
      toast.error("Xóa thất bại");
      return false;
    }
  }, [activeSessionId, deleteSession]);

  return {
    activeSessionId,
    input,
    setInput,
    isSending,
    pendingMessage,
    messages,
    messagesLoading,
    handleCreateSession,
    handleSend,
    handleDeleteSession,
  };
}
