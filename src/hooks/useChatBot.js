import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import {
  useGetSessionsQuery,
  useCreateSessionMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
  useDeleteSessionMutation,
  useUpdateSessionTitleMutation,
} from "@/services/chat.service";
import { useGetJobByIdQuery } from "@/services/job.service";
import { useGetProfileQuery } from "@/services/profile.service";
import { buildJobConsultMessage } from "@/utils/helper";

export function useChatBot() {
  const [activeSessionId, setActiveSessionId] = useState(null);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [pendingMessage, setPendingMessage] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 768,
  );

  // Feature 1: capture jobId from navigation state (lost on page reload — prevents re-trigger)
  const location = useLocation();
  const navigate = useNavigate();
  const [initJobId] = useState(() => location.state?.jobId ?? null);

  const { data: sessionsData, isLoading: sessionsLoading } =
    useGetSessionsQuery();
  const { data: messageData, isLoading: messagesLoading } =
    useGetMessagesQuery(activeSessionId, { skip: !activeSessionId });

  const [createSession] = useCreateSessionMutation();
  const [sendMessage] = useSendMessageMutation();
  const [deleteSession] = useDeleteSessionMutation();
  const [updateSessionTitle] = useUpdateSessionTitleMutation();

  const { data: jobData } = useGetJobByIdQuery(initJobId, { skip: !initJobId });
  const { isLoading: profileLoading } = useGetProfileQuery(undefined, { skip: !initJobId });
  const autoInitRef = useRef(false);

  const sessions = useMemo(() => sessionsData?.data ?? [], [sessionsData]);
  const messages = useMemo(
    () => messageData?.data?.messages ?? [],
    [messageData],
  );

  useEffect(() => {
    if (!activeSessionId && sessions.length > 0 && !initJobId) {
      setActiveSessionId(sessions[0].id);
    }
  }, [sessions, activeSessionId, initJobId]);

  // Auto-create session + send first message when arriving via job consult link
  useEffect(() => {
    if (!initJobId || autoInitRef.current) return;
    const job = jobData?.data;
    if (!job) return;
    if (profileLoading) return;

    autoInitRef.current = true;

    // Clear navigation state so reload doesn't re-trigger
    navigate(location.pathname, { replace: true, state: null });

    (async () => {
      try {
        const sessionRes = await createSession({ title: `Tư vấn ${job.title}` }).unwrap();
        const sessionId = sessionRes.data.id;
        setActiveSessionId(sessionId);

        const message = buildJobConsultMessage(job);
        await sendMessage({ sessionId, content: message, attachments: [] }).unwrap();
      } catch (error) {
        toast.error("Không thể tạo cuộc trò chuyện mới");
        console.error(error);
      }
    })();
  }, [initJobId, jobData, profileLoading, createSession, sendMessage, navigate, location.pathname]);

  const handleCreateSession = useCallback(async () => {
    try {
      const res = await createSession({}).unwrap();
      setActiveSessionId(res.data.id);
    } catch {
      toast.error("Không thể tạo cuộc trò chuyện mới");
    }
  }, [createSession]);

  // text: string | undefined (falls back to input state)
  // attachments: array from useAttachments (contains { data, mediaType, previewUrl, ... })
  const handleSend = useCallback(
    async (text, attachments = []) => {
      const content = (typeof text === "string" ? text : input).trim();
      if (!content && !attachments.length) return;
      if (isSending || !activeSessionId) return;

      setInput("");
      setIsSending(true);
      setPendingMessage({ content, attachments });
      try {
        await sendMessage({ sessionId: activeSessionId, content, attachments }).unwrap();
      } catch {
        toast.error("Gửi tin nhắn thất bại");
      } finally {
        setIsSending(false);
        setPendingMessage(null);
      }
    },
    [input, isSending, activeSessionId, sendMessage],
  );

  const handleDeleteSession = useCallback(
    async (sessionId) => {
      const id = sessionId ?? activeSessionId;
      if (!id) return;
      try {
        await deleteSession(id).unwrap();
        if (id === activeSessionId) setActiveSessionId(null);
        toast.success("Đã xóa cuộc trò chuyện");
      } catch {
        toast.error("Xóa thất bại");
      }
    },
    [activeSessionId, deleteSession],
  );

  const handleRenameSession = useCallback(
    async (title, sessionId) => {
      const id = sessionId ?? activeSessionId;
      if (!id || !title?.trim()) return;
      try {
        await updateSessionTitle({ sessionId: id, title: title.trim() }).unwrap();
        toast.success("Đã đổi tên cuộc trò chuyện");
      } catch {
        toast.error("Đổi tên thất bại");
      }
    },
    [activeSessionId, updateSessionTitle],
  );

  const handleSelectSession = useCallback((id) => {
    setActiveSessionId(id);
    if (window.innerWidth < 768) setSidebarOpen(false);
  }, []);

  return {
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
  };
}
