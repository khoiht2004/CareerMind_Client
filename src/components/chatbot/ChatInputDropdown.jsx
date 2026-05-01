import { memo } from "react";
import { Plus, ImagePlus, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function ChatInputDropdown({ hasActiveSession, triggerFileInput }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          disabled={!hasActiveSession}
          className="hover:bg-primary/10 flex size-9 shrink-0 rounded-full"
        >
          <Plus className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent side="top" align="start" className="mb-1 w-52">
        <DropdownMenuItem
          onClick={triggerFileInput}
          className="cursor-pointer"
        >
          <ImagePlus className="mr-2 size-4" />
          Thêm ảnh và tệp
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Globe className="mr-2 size-4" />
          Nghiên cứu chuyên sâu
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <Sparkles className="mr-2 size-4" />
          Phân tích và thêm
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default memo(ChatInputDropdown);
