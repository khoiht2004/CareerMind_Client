/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router";

function UserMenuIconButton({
  icon: Icon,
  label,
  toPath = "",
  showBadge = false,
}) {
  const navigate = useNavigate();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="bg-muted/70 hover:bg-muted relative size-10 cursor-pointer rounded-full"
          onClick={() => toPath && navigate(toPath)}
        >
          <Icon className="size-5 text-slate-700" />
          {showBadge && (
            <span className="absolute top-2 right-2 flex size-2.5 rounded-full bg-red-500 ring-2 ring-white" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export default UserMenuIconButton;
