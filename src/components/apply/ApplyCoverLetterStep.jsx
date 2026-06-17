import { MessageSquare, Paperclip, Sparkles, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { FieldLabel, StepHeader } from "@/features/ApplyPageComponent";

export default function ApplyCoverLetterStep({
  formData,
  handleChange,
  coverLetters,
  coverLetterOpen,
  setCoverLetterOpen,
  handleSelectCoverLetter,
  handleGenerateCoverLetter,
  isGeneratingCL,
}) {
  return (
    <article className="bg-primary/10 rounded-2xl p-6 animate-fade-in">
      <StepHeader icon={MessageSquare} title="Thư ngỏ (Cover Letter)" />
      <FieldLabel>Tại sao bạn phù hợp với vị trí này?</FieldLabel>
      <Textarea
        name="coverLetter"
        value={formData.coverLetter}
        onChange={handleChange}
        placeholder="Chia sẻ kinh nghiệm và động lực của bạn..."
        className="bg-input border-0 [scrollbar-width:thin]"
        rows={7}
      />
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <p className="text-muted-foreground text-xs">
          Đề xuất: 200 - 500 từ
        </p>
        <div className="flex items-center gap-2">
          {coverLetters.length > 0 && (
            <Popover
              open={coverLetterOpen}
              onOpenChange={setCoverLetterOpen}
            >
              <PopoverTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-foreground h-7 gap-1.5 px-2 text-xs cursor-pointer"
                >
                  <Paperclip className="size-3.5" />
                  Dùng thư có sẵn
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                className="w-[calc(100vw-2rem)] max-w-80 p-2"
              >
                <p className="text-muted-foreground mb-2 px-1 text-xs font-medium">
                  Chọn thư giới thiệu
                </p>
                <div className="space-y-0.5">
                  {coverLetters.map((cl) => (
                    <button
                      key={cl.id}
                      type="button"
                      onClick={() => handleSelectCoverLetter(cl)}
                      className="hover:bg-accent flex w-full items-start gap-2 rounded-md px-2 py-2 text-left transition-colors cursor-pointer"
                    >
                      <FileText className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                          {cl.title}
                        </p>
                        <p className="text-muted-foreground line-clamp-1 text-xs">
                          {cl.content}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-primary h-7 gap-1.5 px-2 text-xs font-bold cursor-pointer"
            onClick={handleGenerateCoverLetter}
            disabled={isGeneratingCL}
          >
            <Sparkles className="size-3.5" fill="currentColor" />
            {isGeneratingCL ? "Đang tạo..." : "Tối ưu bằng MindScout"}
          </Button>
        </div>
      </div>
    </article>
  );
}
