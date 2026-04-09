import ConfirmDialog from "./ConfirmDialog";

function CoverLetterDeleteDialog({ open, onOpenChange, onConfirm, isLoading }) {
  return (
    <ConfirmDialog
      open={open}
      onOpenChange={onOpenChange}
      onConfirm={onConfirm}
      isLoading={isLoading}
      description="Bạn có chắc chắn muốn xóa thư xin việc này? Thao tác này không thể hoàn tác."
    />
  );
}

export default CoverLetterDeleteDialog;
