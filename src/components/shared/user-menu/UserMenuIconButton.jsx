import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useNavigate } from "react-router";

function UserMenuIconButton({ icon: Icon, label, toPath = "" }) {
  const navigate = useNavigate();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="bg-muted/70 hover:bg-muted size-10 cursor-pointer rounded-full"
          onClick={() => toPath && navigate(toPath)}
        >
          <Icon className="size-5 text-slate-700" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

export default UserMenuIconButton;
