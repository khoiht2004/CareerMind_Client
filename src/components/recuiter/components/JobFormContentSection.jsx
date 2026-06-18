import { useState } from "react";
import { Bold, Italic, List, Link2, Flame, Sparkles, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import JobFormField from "./JobFormField";
import JobFormSectionHeader from "./JobFormSectionHeader";
import RequirementsList from "./RequirementsList";
import BenefitsList from "./BenefitsList";

const TOOLBAR_ACTIONS = [
  { Icon: Bold, title: "Bold" },
  { Icon: Italic, title: "Italic" },
  { Icon: List, title: "Danh sách" },
  { Icon: Link2, title: "Liên kết" },
];

function RichTextarea({ name, value, onChange, rows = 6, placeholder }) {
  return (
    <div className="border-input bg-primary/10 overflow-hidden rounded-lg border">
      <div className="border-input bg-primary/20 flex items-center gap-0.5 border-b px-2 py-1.5">
        {TOOLBAR_ACTIONS.map((action) => {
          const ActionIcon = action.Icon;
          return (
            <button
              key={action.title}
              type="button"
              title={action.title}
              className="text-muted-foreground hover:text-foreground hover:bg-accent cursor-pointer rounded p-1.5 transition-colors"
            >
              <ActionIcon className="size-3.5" />
            </button>
          );
        })}
      </div>
      <Textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className="resize-none rounded-none border-0 shadow-none focus-visible:ring-0"
      />
    </div>
  );
}

function JobFormContentSection({ form, onChange, handleGenerateJDAI, generatingJD }) {
  const [promptText, setPromptText] = useState("");
  const [showAiInput, setShowAiInput] = useState(false);

  const onGenerateClick = async () => {
    if (!form.title) {
      toast.error("Vui lòng nhập Tiêu đề công việc trước khi tạo JD bằng AI!");
      return;
    }
    await handleGenerateJDAI({
      title: form.title,
      experience: form.level || "",
      location: form.location || "",
      keyRequirements: promptText,
    });
    setShowAiInput(false);
    setPromptText("");
  };

  return (
    <div className="space-y-4">
      <JobFormSectionHeader title="Mô tả công việc" />

      {/* AI Smart JD Generator */}
      <div className="flex flex-col gap-2 rounded-xl border border-primary/20 bg-primary/5 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-primary font-semibold text-sm">
            <Sparkles className="size-4 animate-pulse" />
            <span>Sinh mô tả công việc thông minh bằng AI</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowAiInput(!showAiInput)}
            className="text-xs text-primary hover:text-primary/80 hover:bg-primary/10 cursor-pointer"
          >
            {showAiInput ? "Đóng" : "Sử dụng AI"}
          </Button>
        </div>

        {showAiInput && (
          <div className="space-y-3 mt-2">
            <p className="text-muted-foreground text-xs">
              AI sẽ dựa vào <strong>Tiêu đề công việc</strong> ({form.title || "Chưa nhập"}), <strong>Địa điểm</strong> và các từ khóa bạn nhập dưới đây để tự động tạo Mô tả, Yêu cầu, Phúc lợi và Tags.
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ví dụ: Cần 2 năm kinh nghiệm React, biết thiết kế UI, làm việc hybrid..."
                value={promptText}
                onChange={(e) => setPromptText(e.target.value)}
                className="flex-1 bg-background border border-input text-foreground text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <Button
                type="button"
                size="sm"
                disabled={generatingJD}
                onClick={onGenerateClick}
                className="cursor-pointer gap-1.5"
              >
                {generatingJD ? (
                  <Loader2 className="size-3.5 animate-spin" />
                ) : (
                  <Sparkles className="size-3.5" />
                )}
                Sinh JD
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Description */}
      <JobFormField label="Nội dung mô tả" required>
        <RichTextarea
          name="description"
          value={form.description}
          onChange={onChange}
          rows={6}
          placeholder="Mô tả chi tiết về công việc, trách nhiệm, môi trường làm việc..."
        />
      </JobFormField>

      {/* Tags and Industry */}
      <div className="grid gap-4 md:grid-cols-2">
        <JobFormField label="Tags kỹ năng" hint="Cách nhau bằng dấu phẩy">
          <Textarea
            name="tags"
            placeholder="ReactJS, NodeJS, TypeScript"
            value={form.tags}
            onChange={onChange}
            className="bg-primary/10 resize-none"
          />
        </JobFormField>

        <JobFormField label="Ngành nghề" hint="Cách nhau bằng dấu phẩy">
          <Textarea
            name="industry"
            placeholder="IT, Kế toán, Sales"
            value={form.industry}
            onChange={onChange}
            className="bg-primary/10 resize-none"
          />
        </JobFormField>
      </div>

      {/* Requirements */}
      <JobFormField label="Yêu cầu ứng viên">
        <RequirementsList
          items={
            Array.isArray(form.requirements)
              ? form.requirements
              : [{ label: "", content: "" }]
          }
          onChange={onChange}
        />
      </JobFormField>

      {/* Benefits */}
      <JobFormField label="Phúc lợi">
        <BenefitsList
          items={
            Array.isArray(form.benefits)
              ? form.benefits
              : [{ icon: "", label: "", content: "" }]
          }
          onChange={onChange}
        />
      </JobFormField>

      {/* Hot toggle */}
      <label
        htmlFor="isHot"
        className="border-border bg-muted/40 hover:bg-muted/60 flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors"
      >
        <Checkbox
          id="isHot"
          name="isHot"
          checked={form.isHot}
          onCheckedChange={(checked) =>
            onChange({ target: { name: "isHot", type: "checkbox", checked } })
          }
        />
        <div className="space-y-0.5">
          <Label
            htmlFor="isHot"
            className="flex cursor-pointer items-center gap-1.5 text-sm font-medium"
          >
            <Flame
              className="size-4"
              style={{ color: "var(--hot-foreground)" }}
            />
            Đánh dấu Hot
          </Label>
          <p className="text-muted-foreground hidden text-xs md:block">
            Việc làm sẽ được gắn badge nổi bật trên trang tìm kiếm
          </p>
        </div>
      </label>
    </div>
  );
}

export default JobFormContentSection;
