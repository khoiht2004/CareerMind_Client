import { memo, useState } from "react";
import { UserSearch, Circle } from "lucide-react";
import ConversationSidebar from "@/components/conversations/ConversationSidebar";
import ConversationArea from "@/components/conversations/ConversationArea";
import UserProfileDialog from "@/components/shared/UserProfileDialog";
import { formatRelativeTime } from "@/utils/helper";
import { useConversations } from "@/hooks/useConversations";
import { AVATAR_PLACEHOLDER } from "@/config/constants/constants";

const ConversationsHeader = memo(function ConversationsHeader({
  partner,
  onPartnerClick,
}) {
  if (!partner) return null;

  return (
    <div className="border-border bg-card flex items-center justify-between border-b px-3 py-3 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onPartnerClick}
          className="bg-primary/10 text-primary border-border flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-full border text-sm font-bold transition-opacity hover:opacity-80 focus:outline-none"
        >
          <img
            src={partner.avatar || AVATAR_PLACEHOLDER}
            alt={partner.name}
            className="h-full w-full object-cover object-top"
          />
        </button>
        <div className="flex flex-col gap-0.5">
          <button
            onClick={onPartnerClick}
            className="text-foreground cursor-pointer text-left text-sm font-bold transition-colors focus:outline-none"
          >
            <span className="hover:text-primary hover:underline">
              {partner.name}
            </span>
            <span className="text-muted-foreground ml-1 text-xs font-medium">
              {partner.company ? `• ${partner.company}` : ""}
            </span>
          </button>

          <div className="flex items-center gap-1.5">
            <Circle
              className={`size-2.5 ${partner.isActive ? "fill-trend-up text-trend-up" : "fill-muted-foreground/30 text-muted-foreground/30"}`}
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

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handlePartnerClick = () => {
    if (activeConv?.partner?.id) {
      setSelectedUserId(activeConv.partner.id);
      setIsProfileOpen(true);
    }
  };

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
        header={
          <ConversationsHeader
            partner={activeConv?.partner}
            onPartnerClick={handlePartnerClick}
          />
        }
        welcomeTitle="Trò chuyện với Nhà tuyển dụng"
        welcomeDescription="Hãy trao đổi trực tiếp với nhà tuyển dụng để cập nhật thông tin chi tiết về cơ hội sự nghiệp của bạn."
        welcomeIcon={UserSearch}
        showBotAvatar={true}
        partnerAvatar={activeConv?.partner?.avatar}
        userAvatar={user?.avatarUrl}
        footerText="Mọi thông tin hội thoại đều được bảo mật an toàn giữa bạn và nhà tuyển dụng."
        placeholder="Nhập tin nhắn..."
      />

      <UserProfileDialog
        userId={selectedUserId}
        open={isProfileOpen}
        onOpenChange={setIsProfileOpen}
      />
    </div>
  );
}
