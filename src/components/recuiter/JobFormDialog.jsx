import { Loader2, ClipboardEdit, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import JobFormDetailSection from "./components/JobFormDetailSection";
import JobFormContentSection from "./components/JobFormContentSection";
import JobFormBasicSection from "./components/JobFormBasicSection";

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
      <DialogContent className="flex max-h-[92vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl md:max-w-4xl">
        {/* ── Fixed Header ── */}
        <DialogHeader className="border-border shrink-0 border-b px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
              <ClipboardEdit className="text-primary size-5" />
            </div>
            <div>
              <DialogTitle className="text-base font-semibold">
                {editJob ? "Chỉnh sửa việc làm" : "Tạo việc làm mới"}
              </DialogTitle>
              <p className="text-muted-foreground mt-0.5 text-xs">
                {editJob
                  ? "Cập nhật thông tin chi tiết cho vị trí tuyển dụng"
                  : "Thêm vị trí tuyển dụng mới cho công ty"}
              </p>
            </div>
          </div>
        </DialogHeader>

        {/* ── Scrollable Body ── */}
        <div className="flex-1 space-y-6 overflow-y-auto px-6 py-5 [scrollbar-width:thin]">
          <JobFormBasicSection
            form={form}
            onChange={onChange}
            onSelectChange={onSelectChange}
          />
          <JobFormDetailSection form={form} onChange={onChange} />
          <JobFormContentSection form={form} onChange={onChange} />
        </div>

        {/* ── Fixed Footer ── */}
        <DialogFooter className="border-border m-0 shrink-0 gap-2 border-t px-6 py-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSaving}
            className="cursor-pointer"
          >
            Hủy
          </Button>
          <Button
            onClick={onSubmit}
            disabled={isSaving}
            className="min-w-[120px] cursor-pointer gap-2"
          >
            {isSaving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            {editJob ? "Lưu thay đổi" : "Tạo mới"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default JobFormDialog;
