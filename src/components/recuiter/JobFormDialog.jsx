import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  JOB_TYPE_OPTIONS,
  LOCATION_OPTIONS,
} from "@/config/constants/candidate.constant";

function FormField({ label, required, children }) {
  return (
    <div className="space-y-2">
      <Label className="text-foreground text-sm font-medium">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </Label>
      {children}
    </div>
  );
}

function SectionDivider({ title }) {
  return (
    <div className="flex items-center gap-3 pt-1">
      <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
        {title}
      </span>
      <div className="bg-border h-px flex-1" />
    </div>
  );
}

function JobFormDialog({
  open,
  onOpenChange,
  editJob,
  form,
  onChange,
  onSelectChange,
  onSubmit,
  isSaving,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[92vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl">
        {/* ── Fixed Header ── */}
        <DialogHeader className="shrink-0 border-b px-6 pt-5 pb-4">
          <DialogTitle className="text-lg font-semibold">
            {editJob ? "Chỉnh sửa việc làm" : "Tạo việc làm mới"}
          </DialogTitle>
        </DialogHeader>

        {/* ── Scrollable Body ── */}
        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {/* Section: Thông tin cơ bản */}
          <SectionDivider title="Thông tin cơ bản" />

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Tiêu đề" required>
              <Input
                name="title"
                value={form.title}
                onChange={onChange}
                placeholder="VD: Senior Frontend Engineer"
              />
            </FormField>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <FormField label="Địa điểm" required>
              <Select
                value={form.location}
                onValueChange={(v) => onSelectChange("location", v)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn địa điểm" />
                </SelectTrigger>
                <SelectContent>
                  {LOCATION_OPTIONS.filter((o) => o.value !== "ALL").map(
                    (o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Loại hình">
              <Select
                value={form.type}
                onValueChange={(v) => onSelectChange("type", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {JOB_TYPE_OPTIONS.filter((o) => o.value !== "ALL").map(
                    (o) => (
                      <SelectItem key={o.value} value={o.value}>
                        {o.label}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Trạng thái">
              <Select
                value={form.status}
                onValueChange={(v) => onSelectChange("status", v)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PUBLISHED">Công khai</SelectItem>
                  <SelectItem value="DRAFT">Nháp</SelectItem>
                  <SelectItem value="CLOSED">Đóng</SelectItem>
                </SelectContent>
              </Select>
            </FormField>
          </div>

          {/* Section: Chi tiết vị trí */}
          <SectionDivider title="Chi tiết vị trí" />

          <div className="grid grid-cols-4 gap-4">
            <FormField label="Mức lương">
              <Input
                name="salary"
                placeholder="VD: 15–25 triệu"
                value={form.salary}
                onChange={onChange}
              />
            </FormField>
            <FormField label="Cấp bậc">
              <Input
                name="level"
                placeholder="VD: Senior"
                value={form.level}
                onChange={onChange}
              />
            </FormField>
            <FormField label="Số lượng tuyển">
              <Input
                name="slots"
                type="number"
                min={1}
                value={form.slots}
                onChange={onChange}
              />
            </FormField>
            <FormField label="Hạn nộp hồ sơ">
              <Input
                name="deadline"
                type="date"
                value={form.deadline}
                onChange={onChange}
              />
            </FormField>
          </div>

          {/* Section: Nội dung */}
          <SectionDivider title="Nội dung" />

          <FormField label="Mô tả công việc" required>
            <Textarea
              name="description"
              rows={6}
              value={form.description}
              onChange={onChange}
              placeholder="Mô tả chi tiết về công việc, trách nhiệm, yêu cầu..."
              className="resize-none"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-4">
            <FormField label="Tags">
              <Textarea
                rows={3}
                name="tags"
                placeholder="ReactJS, NodeJS, TypeScript"
                value={form.tags}
                onChange={onChange}
                className="resize-none"
              />
              <p className="text-muted-foreground text-xs">
                Cách nhau bằng dấu phẩy
              </p>
            </FormField>
            <FormField label="Phúc lợi">
              <Textarea
                rows={3}
                name="benefits"
                placeholder="BHXH, Thưởng lễ, Laptop"
                value={form.benefits}
                onChange={onChange}
                className="resize-none"
              />
              <p className="text-muted-foreground text-xs">
                Cách nhau bằng dấu phẩy
              </p>
            </FormField>
          </div>

          {/* Hot toggle */}
          <label
            htmlFor="isHot"
            className="border-border bg-muted/40 hover:bg-muted/70 flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors"
          >
            <input
              id="isHot"
              name="isHot"
              type="checkbox"
              checked={form.isHot}
              onChange={onChange}
              className="size-4 cursor-pointer accent-orange-500"
            />
            <div>
              <p className="text-sm leading-none font-medium">
                Đánh dấu Hot 🔥
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                Việc làm sẽ được gắn badge nổi bật trên trang tìm kiếm
              </p>
            </div>
          </label>
        </div>

        {/* ── Fixed Footer ── */}
        <DialogFooter className="mx-0 mb-0 shrink-0 gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSaving}
          >
            Hủy
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isSaving}
            className="min-w-[100px]"
          >
            {isSaving && <Loader2 className="mr-2 size-4 animate-spin" />}
            {editJob ? "Lưu thay đổi" : "Tạo mới"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default JobFormDialog;
