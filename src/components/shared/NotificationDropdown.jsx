import { useEffect } from "react";
import { Bell, CheckCheck, Loader2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
} from "@/services/notification.service";
import { useSocket } from "@/contexts/SocketContext";
import { formatRelativeTime } from "@/utils/helper";
import { cn } from "@/lib/utils";

function NotificationDropdown() {
  const socket = useSocket();
  const { data: response, isLoading, refetch } = useGetNotificationsQuery();
  const [markAsRead] = useMarkAsReadMutation();
  const [markAllAsRead] = useMarkAllAsReadMutation();

  const notifications = response?.data?.notifications ?? [];
  const unreadCount = response?.data?.unreadCount ?? 0;

  // Realtime refetch when new notification arrives
  useEffect(() => {
    if (!socket) return;

    const handleNewNoti = () => {
      refetch();
    };

    socket.on("notification:new", handleNewNoti);
    return () => {
      socket.off("notification:new", handleNewNoti);
    };
  }, [socket, refetch]);

  const handleMarkAllRead = async (e) => {
    e.stopPropagation();
    try {
      await markAllAsRead().unwrap();
    } catch (err) {
      console.error("Failed to mark all as read:", err);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await markAsRead(id).unwrap();
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="bg-muted/70 hover:bg-muted relative flex size-10 cursor-pointer items-center justify-center rounded-full transition-colors outline-none"
          aria-label="Thông báo"
        >
          <Bell className="text-foreground size-5" />
          {unreadCount > 0 && (
            <span className="ring-background bg-destructive text-destructive-foreground absolute -top-1.5 -right-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-[10px] font-bold ring-2">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="shadow-popover-soft bg-popover text-popover-foreground w-[360px] overflow-hidden rounded-xl p-0 sm:w-[400px]"
      >
        {/* Header */}
        <div className="bg-muted/50 flex items-center justify-between border-b px-4 py-3">
          <h3 className="text-foreground text-sm font-bold">
            Thông báo
          </h3>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="text-primary hover:text-primary/80 flex cursor-pointer items-center gap-1 text-xs font-semibold"
            >
              <CheckCheck className="size-3.5" />
              Đọc tất cả
            </button>
          )}
        </div>

        {/* Content list */}
        <ScrollArea className="h-[360px]">
          {isLoading ? (
            <div className="flex h-[300px] items-center justify-center">
              <Loader2 className="text-muted-foreground size-6 animate-spin" />
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-muted-foreground flex h-[300px] flex-col items-center justify-center gap-2 p-6 text-center text-sm">
              <Bell className="size-8 opacity-20" />
              <p>Bạn không có thông báo nào</p>
            </div>
          ) : (
            <div className="divide-border divide-y">
              {notifications.map((noti) => (
                <div
                  key={noti.id}
                  onClick={() => handleMarkRead(noti.id)}
                  className={cn(
                    "hover:bg-muted/40 flex cursor-pointer flex-col gap-1 p-4 transition-colors",
                    !noti.isRead && "bg-primary/5 font-medium",
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-foreground text-sm leading-snug font-bold">
                      {noti.title}
                    </p>
                    {!noti.isRead && (
                      <span className="bg-primary mt-1.5 size-2 shrink-0 rounded-full" />
                    )}
                  </div>
                  <p className="text-muted-foreground text-xs leading-relaxed">
                    {noti.content}
                  </p>
                  <span className="text-muted-foreground/60 mt-1 text-[10px]">
                    {formatRelativeTime(noti.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default NotificationDropdown;
