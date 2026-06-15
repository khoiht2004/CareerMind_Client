import { useState, useEffect, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useSocket } from "@/contexts/SocketContext";
import {
  useGetConversationsQuery,
  useCreateOrGetConversationMutation,
  useGetConversationMessagesQuery,
  useSendConversationMessageMutation,
  useMarkAsReadMutation,
} from "@/services/conversation.service";

export function useConversations() {
  const { user } = useSelector((state) => state.auth);
  const socket = useSocket();
  const location = useLocation();
  const navigate = useNavigate();

  const [activeSessionId, setActiveSessionId] = useState(null);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 768,
  );

  // API Queries & Mutations
  const {
    data: convsData,
    isLoading: isConvsLoading,
    refetch: refetchConvs,
  } = useGetConversationsQuery(undefined, {
    skip: !user,
  });
  const [createOrGetConversation] = useCreateOrGetConversationMutation();

  const {
    data: messagesData,
    isLoading: isMessagesLoading,
    refetch: refetchMessages,
  } = useGetConversationMessagesQuery(activeSessionId, {
    skip: !activeSessionId,
  });

  const [sendMessage, { isLoading: isSending }] = useSendConversationMessageMutation();
  const [markAsRead] = useMarkAsReadMutation();

  // useMemo hóa danh sách cuộc hội thoại và tin nhắn để tránh tạo reference mới khi re-render
  const conversations = useMemo(() => {
    return convsData?.data || convsData || [];
  }, [convsData]);

  const activeConv = useMemo(() => {
    if (!conversations.length || !activeSessionId) return null;
    return conversations.find((c) => c.id === activeSessionId) || null;
  }, [conversations, activeSessionId]);

  const messages = useMemo(() => {
    return messagesData?.data || messagesData || [];
  }, [messagesData]);

  // 1. Kiểm tra posterId từ query param hoặc location state để tự động tạo/lấy phòng chat
  useEffect(() => {
    if (!user) return;

    const searchParams = new URLSearchParams(window.location.search);
    const posterId = searchParams.get("posterId") || location.state?.posterId;

    if (posterId) {
      createOrGetConversation({ partnerId: posterId })
        .unwrap()
        .then((res) => {
          const convId = res?.data?.id || res?.id;
          if (convId) {
            setActiveSessionId(convId);
          }
          // Xóa param/state để tránh reload bị gọi lại
          navigate("/conversations", { replace: true, state: {} });
        })
        .catch((err) => {
          console.error("Lỗi khi tự động tạo cuộc hội thoại:", err);
        });
    }
  }, [user, location.state, createOrGetConversation, navigate]);

  // 2. Tự động chọn cuộc hội thoại đầu tiên nếu có danh sách và chưa chọn phòng
  useEffect(() => {
    if (!activeSessionId && conversations.length > 0) {
      setActiveSessionId(conversations[0].id);
    }
  }, [conversations, activeSessionId]);

  // 3. Socket.io Realtime room joining & Message listening
  useEffect(() => {
    if (!socket || !activeSessionId) return;

    // Join vào room chat
    socket.emit("chat:join_room", { roomId: activeSessionId });

    // Đánh dấu đã đọc ngay lập tức khi mở phòng chat
    markAsRead(activeSessionId);

    const handleMessageReceived = (message) => {
      // Nếu tin nhắn thuộc phòng đang active, refetch tin nhắn mới và markAsRead luôn
      if (message.conversationId === activeSessionId) {
        refetchMessages();
        markAsRead(activeSessionId);
      }
      refetchConvs();
    };

    const handleNewMessageGlobal = () => {
      // Khi nhận tin nhắn mới ở bất kỳ phòng nào, cập nhật sidebar
      refetchConvs();
    };

    socket.on("chat:message_received", handleMessageReceived);
    socket.on("chat:new_message", handleNewMessageGlobal);

    return () => {
      socket.off("chat:message_received", handleMessageReceived);
      socket.off("chat:new_message", handleNewMessageGlobal);
    };
  }, [socket, activeSessionId, refetchMessages, refetchConvs, markAsRead]);

  // 4. Xử lý gửi tin nhắn mới (hỗ trợ cả attachments) - dùng useCallback để tối ưu render
  const handleSend = useCallback(
    async (text, attachments = []) => {
      const content = (typeof text === "string" ? text : input).trim();
      if (!activeSessionId) return;
      if (!content && (!attachments || attachments.length === 0)) return;

      try {
        const formattedAttachments = attachments.map((att) => ({
          name: att.name || att.fileName,
          size: att.size || att.fileSize,
          category: att.category || (att.type?.startsWith("image/") || att.mediaType?.startsWith("image/") ? "image" : "file"),
          mediaType: att.mediaType || att.type || att.fileType,
          data: att.data,
          previewUrl: att.previewUrl || att.url || att.fileUrl,
        }));

        await sendMessage({
          id: activeSessionId,
          content,
          attachments:
            formattedAttachments.length > 0 ? formattedAttachments : undefined,
          messageType: "TEXT",
        }).unwrap();

        setInput("");
        refetchMessages();
        refetchConvs();
      } catch (error) {
        console.error("Gửi tin nhắn thất bại:", error);
      }
    },
    [activeSessionId, input, sendMessage, refetchMessages, refetchConvs],
  );

  const handleSelectSession = useCallback((id) => {
    setActiveSessionId(id);
    if (window.innerWidth < 768) setSidebarOpen(false);
  }, []);

  return {
    user,
    conversations,
    activeSessionId,
    activeConv,
    messages,
    input,
    setInput,
    sidebarOpen,
    setSidebarOpen,
    isConvsLoading,
    isMessagesLoading,
    isSending,
    handleSend,
    handleSelectSession,
  };
}
