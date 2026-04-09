import ConfirmDialog from "@/components/shared/ConfirmDialog";

function JobDeleteDialog({ open, onOpenChange, onConfirm, isLoading }) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      onConfirm={onConfirm}
      isLoading={isLoading}
      description="Bạn có chắc muốn xóa việc làm này? Hành động này không thể hoàn tác."
    />
  );
}

export default JobDeleteDialog;
