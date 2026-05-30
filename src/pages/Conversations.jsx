import { memo } from "react";
import { UserSearch, Circle } from "lucide-react";
import ConversationSidebar from "@/components/conversations/ConversationSidebar";
import ConversationArea from "@/components/conversations/ConversationArea";
import { formatRelativeTime } from "@/utils/helper";
import { useConversations } from "@/hooks/useConversations";

const ConversationsHeader = memo(function ConversationsHeader({ partner }) {
  if (!partner) return null;

  return (
    <div className="border-border bg-card flex items-center justify-between border-b px-3 py-3 sm:px-6">
      <div className="flex items-center gap-3">
        <div className="bg-primary/10 text-primary border-border flex size-10 items-center justify-center overflow-hidden rounded-full border text-sm font-bold">
          {partner.avatar ? (
            <img
              src={partner.avatar}
              alt={partner.name}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            partner.name.charAt(0)
          )}
        </div>
        <div className="flex flex-col gap-0.5">
          <p className="text-foreground text-sm font-bold">
            {partner.name}
            <span className="text-muted-foreground ml-1 text-xs font-medium">
              {partner.company ? `• ${partner.company}` : ""}
            </span>
          </p>

          <div className="flex items-center gap-1.5">
            <Circle
              className={`size-2.5 ${partner.isActive ? "fill-[var(--trend-up)] text-[var(--trend-up)]" : "fill-muted-foreground/30 text-muted-foreground/30"}`}
            />
            <span className="text-muted-foreground text-xs font-medium">
              {partner.isActive
                ? "Đang hoạt động"
                : partner.lastActive
                  ? `Hoạt động ${formatRelativeTime(partner.lastActive)}`
                  : "Ngoại tuyến"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

export default function Conversations() {
  const {
    user,
    conversations,
    activeSessionId,
    activeConv,
    messages,
    input,
    setInput,
    isConvsLoading,
    isMessagesLoading,
    isSending,
    handleSend,
    handleSelectSession,
  } = useConversations();

  return (
    <div className="-mb-25 flex h-[calc(100svh-3.5rem)] w-full min-w-0 flex-col gap-3 overflow-hidden p-2 sm:p-3 md:flex-row md:p-6">
      <ConversationSidebar
        isOpen={true}
        sessions={conversations}
        activeSessionId={activeSessionId}
        onSelect={handleSelectSession}
        isLoading={isConvsLoading}
      />
      <ConversationArea
        messages={messages}
        pendingMessage={null}
        input={input}
        onInputChange={setInput}
        onSend={handleSend}
        isSending={isSending}
        isLoading={isMessagesLoading}
        hasActiveSession={!!activeSessionId}
        header={<ConversationsHeader partner={activeConv?.partner} />}
        welcomeTitle="Trò chuyện với Nhà tuyển dụng"
        welcomeDescription="Hãy trao đổi trực tiếp với nhà tuyển dụng để cập nhật thông tin chi tiết về cơ hội sự nghiệp của bạn."
        welcomeIcon={UserSearch}
        showBotAvatar={true}
        partnerAvatar={activeConv?.partner?.avatar}
        userAvatar={user?.avatarUrl}
        footerText="Mọi thông tin hội thoại đều được bảo mật an toàn giữa bạn và nhà tuyển dụng."
        placeholder="Nhập tin nhắn..."
      />
    </div>
  );
}
