import { memo, useCallback } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/utils/helper";

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
          {partner?.avatar ? (
            <img
              src={partner.avatar}
              alt={partner.name}
              className="h-full w-full object-cover object-top"
            />
          ) : (
            partner?.name?.charAt(0) || "U"
          )}
        </div>
        {partner?.isActive && (
          <span className="ring-background absolute right-0 bottom-0 size-2.5 rounded-full bg-[var(--trend-up)] ring-2" />
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
        <span className="absolute top-1/2 right-3 flex size-2 -translate-y-1/2 rounded-full bg-destructive shadow-sm" />
      )}
    </button>
  );
});

function ConversationSidebar({
  isOpen,
  sessions,
  activeSessionId,
  onSelect,
  isLoading,
}) {
  return (
    <div
      className={cn(
        "bg-primary/5 flex min-h-0 shrink-0 flex-col overflow-hidden rounded-2xl md:h-full md:rounded-4xl",
        "border-border border-r transition-all duration-200",
        isOpen
          ? "h-48 w-full md:h-full md:w-75"
          : "h-0 w-full border-0 md:h-full md:w-0",
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
  );
}

export default memo(ConversationSidebar);
