import { memo, useCallback } from "react";
import { PenLine, Loader2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { formatRelativeTime } from "@/utils/helper";
import ChatActions from "./ChatActions";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { path } from "@/config/path";

const SessionItem = memo(function SessionItem({
  session,
  isActive,
  onSelect,
  onRename,
  onDelete,
}) {
  const handleSelect = useCallback(
    () => onSelect(session.id),
    [onSelect, session.id],
  );
  const handleRename = useCallback(
    (title) => onRename(title, session.id),
    [onRename, session.id],
  );
  const handleDelete = useCallback(
    () => onDelete(session.id),
    [onDelete, session.id],
  );

  return (
    <div
      className={cn(
        "group flex items-center rounded-xl transition-colors",
        isActive
          ? "bg-background border-primary border-l-[3px] shadow-sm"
          : "hover:bg-muted/60",
      )}
    >
      <button
        type="button"
        onClick={handleSelect}
        className="min-w-0 flex-1 cursor-pointer px-3 py-3 text-left"
      >
        <p className="text-sm font-medium">{session.title}</p>
        <p className="text-muted-foreground mt-0.5 text-[11px]">
          {formatRelativeTime(session.updatedAt ?? session.createdAt) ||
            `${session._count?.messages ?? 0} tin nhắn`}
        </p>
      </button>
      <div className="mr-1 shrink-0 opacity-0 transition-opacity group-hover:opacity-100 has-data-[state=open]:opacity-100">
        <ChatActions
          session={session}
          onRename={handleRename}
          onDelete={handleDelete}
          hasActiveSession={true}
        />
      </div>
    </div>
  );
});

function ChatSidebar({
  isOpen,
  sessions,
  activeSessionId,
  onSelect,
  onCreate,
  onRename,
  onDelete,
  isLoading,
}) {
  return (
    <div
      className={cn(
        "bg-primary/5 flex h-full min-h-0 shrink-0 flex-col overflow-hidden rounded-4xl",
        "transition-all duration-200",
        isOpen ? "w-75" : "w-0 border-0",
      )}
    >
      <div className="flex h-14 shrink-0 items-center justify-between px-4">
        <h3 className="font-bold">Lịch sử trò chuyện</h3>
        <button
          type="button"
          onClick={onCreate}
          title="Cuộc trò chuyện mới"
          className="bg-card hover:bg-card/60 cursor-pointer rounded-lg p-1.5 transition-colors"
        >
          <PenLine className="size-4" />
        </button>
      </div>

      <ScrollArea className="min-h-0 flex-1 p-2">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="text-muted-foreground size-4 animate-spin" />
          </div>
        ) : sessions.length === 0 ? (
          <p className="text-muted-foreground py-8 text-center text-xs">
            Chưa có cuộc trò chuyện nào
          </p>
        ) : (
          <div className="space-y-1">
            {sessions.map((session) => (
              <SessionItem
                key={session.id}
                session={session}
                isActive={activeSessionId === session.id}
                onSelect={onSelect}
                onRename={onRename}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </ScrollArea>

      <div className="p-3">
        <div className="bg-foreground text-background rounded-xl p-3">
          <p className="text-background/50 mb-1 text-[10px] font-bold tracking-widest uppercase">
            Nâng cấp Pro
          </p>
          <p className="text-xs leading-snug">
            Mở khóa phân tích chuyên sâu từ AI Scout.
          </p>
          <Button className="mt-3" variant="secondary" asChild>
            <Link to={path.membership}>Nâng cấp Pro</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default memo(ChatSidebar);
