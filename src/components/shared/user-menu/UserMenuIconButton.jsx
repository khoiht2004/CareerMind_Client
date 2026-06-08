import { Button } from "@/components/ui/button";
import { createElement } from "react";
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
          {createElement(Icon, { className: "text-foreground size-5" })}
          {showBadge && (
            <span className="bg-destructive ring-background absolute top-2 right-2 flex size-2.5 rounded-full ring-2" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export default UserMenuIconButton;
