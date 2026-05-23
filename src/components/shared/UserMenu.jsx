import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  Bell,
  ChevronDown,
  LogOut,
  MessageCircleMore,
  UserRound,
} from "lucide-react";
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
import { path } from "@/config/path";

const INDEPENDENT_COUNT = 2;

function getAvatar(user) {
  if (user.avatarUrl) {
    return (
      <img
        src={user.avatarUrl}
        alt={user.name ?? "Người dùng"}
        className="h-full w-full object-cover object-top"
      />
    );
  }

  return <UserRound className="size-8 text-slate-300" />;
}

function UserMenu() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openIndependent, setOpenIndependent] = useState(new Set());
  const [openExclusive, setOpenExclusive] = useState(null);

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
    <div className="flex items-center gap-2">
      <UserMenuIconButton icon={Bell} label="Thông báo" />
      <UserMenuIconButton
        icon={MessageCircleMore}
        label="Tin nhắn"
        toPath={path.chatbot}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="group flex cursor-pointer items-center gap-1 rounded-full outline-none"
            aria-label="Mở menu tài khoản"
          >
            <span className="bg-muted group-hover:ring-primary/30 flex size-11 items-center justify-center overflow-hidden rounded-full border text-sm font-bold text-white transition group-hover:ring-2">
              {avatar}
            </span>
            <ChevronDown className="size-4 text-slate-500" />
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={10}
          className="shadow-popover-soft w-[400px] rounded-xl p-0"
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
              className="h-11 w-full rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
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
