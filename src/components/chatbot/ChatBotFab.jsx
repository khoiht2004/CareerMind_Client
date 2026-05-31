import { StickyNote as StickyNotes } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CHATBOT_FAB_ACTIONS } from "@/config/constants/fab.constant";

function FabActionButton({ icon: Icon, label, badge }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          size="icon"
          aria-label={label}
          className="bg-background text-primary hover:bg-primary hover:text-primary-foreground relative size-10 rounded-full border shadow-lg"
        >
          <Icon className="size-[18px]" />
          {badge ? (
            <span className="bg-primary text-primary-foreground absolute -top-1 -right-1 flex size-[18px] items-center justify-center rounded-full text-[10px] font-bold">
              {badge}
            </span>
          ) : null}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="left">{label}</TooltipContent>
    </Tooltip>
  );
}

function ChatBotFab({ open, onToggle }) {
  return (
    <div className="group/fab fixed right-4 bottom-8 z-50 flex flex-col items-center gap-2">
      <div className="pointer-events-none flex translate-y-2 flex-col items-center gap-2 opacity-0 transition-all duration-200 group-focus-within/fab:pointer-events-auto group-focus-within/fab:translate-y-0 group-focus-within/fab:opacity-100 group-hover/fab:pointer-events-auto group-hover/fab:translate-y-0 group-hover/fab:opacity-100">
        {CHATBOT_FAB_ACTIONS.map((action) => (
          <FabActionButton key={action.label} {...action} />
        ))}
      </div>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            aria-label={open ? "Đóng MindScout" : "Mở MindScout"}
            className="bg-primary hover:bg-primary/90 size-14 rounded-full shadow-lg transition-transform hover:-translate-y-1"
            onClick={onToggle}
          >
            <StickyNotes className="text-primary-foreground size-7" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">MindScout</TooltipContent>
      </Tooltip>
    </div>
  );
}

export default ChatBotFab;
