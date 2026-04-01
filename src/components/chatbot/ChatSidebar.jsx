import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

function ChatSidebar({ sessions, activeSessionId, onSelect, onCreate, isLoading }) {
  return (
    <div className="flex w-64 shrink-0 flex-col border-r">
      {/* Header - same height as chat area header */}
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
      <ScrollArea className="flex-1 p-2">
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
                  "w-full rounded-lg px-3 py-2.5 text-left transition-colors",
                  activeSessionId === session.id
                    ? "bg-muted"
                    : "hover:bg-muted/60",
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
