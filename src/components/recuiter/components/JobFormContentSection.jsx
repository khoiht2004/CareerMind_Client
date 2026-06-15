import { Bold, Italic, List, Link2, Flame } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
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

function JobFormContentSection({ form, onChange }) {
  return (
    <div className="space-y-4">
      <JobFormSectionHeader title="Mô tả công việc" />

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
