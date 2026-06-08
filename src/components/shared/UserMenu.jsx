import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ChevronDown, LogOut, MessageCircleMore } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { USER_MENU_SECTIONS } from "@/config/constants/user-menu.constant";
import { RECRUITER_MENU_SECTIONS } from "@/config/constants/recruiter.constant";
import handleLogout from "@/hooks/useLogout";
import UserMenuIconButton from "./user-menu/UserMenuIconButton";
import UserMenuSection from "./user-menu/UserMenuSection";
import UserSummary from "./user-menu/UserSummary";
import NotificationDropdown from "./NotificationDropdown";
import { path } from "@/config/path";
import { useGetUnreadCountQuery } from "@/services/conversation.service";
import { useSocket } from "@/contexts/SocketContext";
import { AVATAR_PLACEHOLDER } from "@/config/constants/constants";

const INDEPENDENT_COUNT = 2;

function getAvatar(user) {
  return (
    <img
      src={user.avatarUrl || AVATAR_PLACEHOLDER}
      alt={user.name ?? "Người dùng"}
      className="h-full w-full object-cover object-top"
    />
  );
}

function UserMenu() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openIndependent, setOpenIndependent] = useState(new Set());
  const [openExclusive, setOpenExclusive] = useState(null);

  const { data: unreadData, refetch: refetchUnread } = useGetUnreadCountQuery(
    undefined,
    {
      skip: !user,
    },
  );
  const socket = useSocket();

  useEffect(() => {
    if (!socket || !user) return;

    const handleNewMessage = () => {
      refetchUnread();
    };

    socket.on("chat:new_message", handleNewMessage);
    socket.on("chat:message_received", handleNewMessage); // also listen to incoming message in any active chat

    return () => {
      socket.off("chat:new_message", handleNewMessage);
      socket.off("chat:message_received", handleNewMessage);
    };
  }, [socket, user, refetchUnread]);

  if (!user) return null;

  const avatar = getAvatar(user);
  const userName = user.name ?? "Người dùng";
  const userCode = user.id ? `ID ${user.id}` : "Tài khoản ứng viên";

  const isOpen = (index) => {
    if (index < INDEPENDENT_COUNT) return openIndependent.has(index);
    return openExclusive === index;
  };

  const handleToggle = (index) => {
    if (index < INDEPENDENT_COUNT) {
      setOpenIndependent((prev) => {
        const next = new Set(prev);
        if (next.has(index)) next.delete(index);
        else next.add(index);
        return next;
      });
    } else {
      setOpenExclusive((prev) => (prev === index ? null : index));
    }
  };

  return (
    <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
      <NotificationDropdown />

      <UserMenuIconButton
        icon={MessageCircleMore}
        label="Tin nhắn"
        toPath={path.conversations}
        showBadge={
          unreadData?.data?.unreadCount > 0 || unreadData?.unreadCount > 0
        }
      />
      {/* Dropdown menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="relative">
          <button
            type="button"
            className="group flex cursor-pointer items-center gap-1 rounded-full outline-none"
            aria-label="Mở menu tài khoản"
          >
            <span className="bg-muted text-muted-foreground group-hover:ring-primary/30 flex size-11 items-center justify-center overflow-hidden rounded-full border text-sm font-bold transition group-hover:ring-2">
              {avatar}
            </span>
            <ChevronDown className="bg-primary text-primary-foreground absolute right-0 bottom-0 size-4 rounded-full" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={10}
          className="shadow-popover-soft bg-popover text-popover-foreground w-[calc(100vw-1rem)] max-w-[400px] rounded-xl p-0"
        >
          <UserSummary
            avatar={avatar}
            email={user.email}
            name={userName}
            userCode={userCode}
          />

          <DropdownMenuSeparator className="m-0" />

          <div className="py-2">
            {(user.role === "RECRUITER"
              ? [RECRUITER_MENU_SECTIONS, ...USER_MENU_SECTIONS]
              : USER_MENU_SECTIONS
            ).map((section, index) => (
              <UserMenuSection
                key={section.title}
                section={section}
                isOpen={isOpen(index)}
                onToggle={() => handleToggle(index)}
                onNavigate={navigate}
              />
            ))}
          </div>

          <div className="px-5 pt-1 pb-4">
            <Button
              type="button"
              variant="secondary"
              className="bg-muted text-foreground hover:bg-accent hover:text-accent-foreground h-11 w-full rounded-full"
              onClick={() => handleLogout(dispatch, navigate)}
            >
              <LogOut className="size-4" />
              Đăng xuất
            </Button>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default UserMenu;
