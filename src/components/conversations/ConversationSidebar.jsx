import { memo, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/utils/helper";
import { AVATAR_PLACEHOLDER } from "@/config/constants/constants";

const SessionItem = memo(function SessionItem({ session, isActive, onSelect }) {
  const handleSelect = useCallback(
    () => onSelect(session.id),
    [onSelect, session.id],
  );

  const { partner, unreadCount } = session;

  return (
    <button
      type="button"
      onClick={handleSelect}
      className={cn(
        "relative flex w-full cursor-pointer items-center gap-3 rounded-xl p-3 text-left transition-all duration-200",
        isActive
          ? "bg-card border-primary border-l-[3px] shadow-sm"
          : "hover:bg-card/50",
      )}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="bg-primary/10 text-primary border-border flex size-10 items-center justify-center overflow-hidden rounded-full border text-sm font-bold">
          <img
            src={partner.avatar || AVATAR_PLACEHOLDER}
            alt={partner.name}
            className="h-full w-full object-cover object-top"
          />
        </div>
        {partner?.isActive && (
          <span className="ring-background absolute right-0 bottom-0 size-2.5 rounded-full bg-trend-up ring-2" />
        )}
      </div>

      {/* Info & Message Preview */}
      <div className="min-w-0 flex-1 pr-4">
        <p className="text-foreground mb-1 truncate text-sm font-bold">
          {partner?.name}
        </p>

        <p className="text-muted-foreground shrink-0 text-[10px]">
          {formatRelativeTime(session.updatedAt || session.createdAt)}
        </p>
      </div>

      {/* Red Dot Badge for Unread */}
      {unreadCount > 0 && (
        <span className="bg-destructive absolute top-1/2 right-3 flex size-2 -translate-y-1/2 rounded-full shadow-sm" />
      )}
    </button>
  );
});

function ConversationSidebar({
  isOpen,
  onClose,
  sessions,
  activeSessionId,
  onSelect,
  isLoading,
}) {
  return (
    <>
      {/* Backdrop mờ nền trên mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs transition-opacity md:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={cn(
          "flex min-h-0 shrink-0 flex-col overflow-hidden transition-all duration-300 ease-in-out border-border border-r",
          // Layout trên Mobile: Làm drawer cố định trượt từ bên trái
          "fixed inset-y-0 left-0 z-50 w-72 h-full bg-background shadow-2xl",
          isOpen ? "translate-x-0" : "-translate-x-full",
          // Layout trên Desktop (md): Static sidebar co giãn theo width
          "md:static md:z-0 md:h-full md:bg-primary/5 md:border-r md:shadow-none md:rounded-4xl md:translate-x-0",
          isOpen ? "md:w-75" : "md:w-0",
        )}
      >
      <div className="border-primary/10 flex h-14 shrink-0 items-center border-b px-4">
        <h3 className="text-foreground text-base font-bold">
          Lịch sử trò chuyện
        </h3>
      </div>

      <ScrollArea className="min-h-0 flex-1 p-2">
        {isLoading ? (
          <div className="flex h-32 items-center justify-center">
            <span className="text-muted-foreground text-xs">
              Đang tải hộp thư...
            </span>
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-muted-foreground py-12 text-center text-xs">
            Chưa có cuộc trò chuyện nào
          </div>
        ) : (
          <div className="space-y-1">
            {sessions.map((session) => (
              <SessionItem
                key={session.id}
                session={session}
                isActive={activeSessionId === session.id}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </ScrollArea>
      </div>
    </>
  );
}

export default memo(ConversationSidebar);
