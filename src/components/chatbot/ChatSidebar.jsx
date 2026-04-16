import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

function ChatSidebar({
  isOpen,
  sessions,
  activeSessionId,
  onSelect,
  onCreate,
  isLoading,
}) {
  return (
    <div
      className={cn(
        "flex h-full min-h-0 shrink-0 flex-col overflow-hidden border-r transition-all duration-200",
        isOpen ? "w-64" : "w-0 border-0",
      )}
    >
      {/* Header */}
      <div className="flex h-14 shrink-0 items-center border-b px-3">
        <Button
          size="sm"
          className="w-full cursor-pointer gap-2"
          onClick={onCreate}
        >
          <Plus className="size-3.5" />
          Cuộc trò chuyện mới
        </Button>
      </div>

      {/* Session list */}
      <ScrollArea className="min-h-0 flex-1 p-2">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <Loader2 className="text-muted-foreground size-4 animate-spin" />
          </div>
        ) : sessions.length === 0 ? (
          <p className="text-muted-foreground py-4 text-center text-xs">
            Chưa có cuộc trò chuyện
          </p>
        ) : (
          <div className="space-y-0.5">
            {sessions.map((session) => (
              <button
                key={session.id}
                onClick={() => onSelect(session.id)}
                className={cn(
                  "w-full cursor-pointer rounded-lg px-3 py-2.5 text-left transition-colors",
                  activeSessionId === session.id
                    ? "bg-muted-foreground/15"
                    : "hover:bg-muted-foreground/7",
                )}
              >
                <p className="truncate text-sm font-medium">{session.title}</p>
                <p className="text-muted-foreground mt-0.5 text-[11px]">
                  {session._count?.messages ?? 0} tin nhắn
                </p>
              </button>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

export default ChatSidebar;
