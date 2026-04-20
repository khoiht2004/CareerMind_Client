import { useState, useCallback } from "react";
import { FileText, Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  useGetMyCoverLettersQuery,
  useCreateCoverLetterMutation,
  useUpdateCoverLetterMutation,
  useDeleteCoverLetterMutation,
} from "@/services/coverLetter.service";
import CoverLetterFormDialog from "../shared/CoverLetterFormDialog";
import CoverLetterDeleteDialog from "../shared/CoverLetterDeleteDialog";
import CoverLetterCard from "./components/CoverLetterCard";

const EMPTY_FORM = { title: "", content: "" };

function MyCoverLetter() {
  const { data: response, isLoading } = useGetMyCoverLettersQuery();
  const coverLetters = response?.data || [];

  const [createCoverLetter, { isLoading: isCreating }] =
    useCreateCoverLetterMutation();
  const [updateCoverLetter, { isLoading: isUpdating }] =
    useUpdateCoverLetterMutation();
  const [deleteCoverLetter, { isLoading: isDeleting }] =
    useDeleteCoverLetterMutation();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const handleOpenCreate = useCallback(() => {
    setEditingItem(null);
    setFormData(EMPTY_FORM);
    setIsFormOpen(true);
  }, []);

  const handleOpenEdit = useCallback((item) => {
    setEditingItem(item);
    setFormData({ title: item.title, content: item.content });
    setIsFormOpen(true);
  }, []);

  const handleOpenDelete = useCallback((id) => {
    setDeletingId(id);
    setIsDeleteOpen(true);
  }, []);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!formData.title.trim() || !formData.content.trim()) {
        return toast.error("Vui lòng nhập đầy đủ tiêu đề và nội dung");
      }
      try {
        if (editingItem) {
          await updateCoverLetter({ id: editingItem.id, ...formData }).unwrap();
          toast.success("Cập nhật thư xin việc thành công");
        } else {
          await createCoverLetter(formData).unwrap();
          toast.success("Tạo thư xin việc thành công");
        }
        setIsFormOpen(false);
      } catch (error) {
        toast.error(error?.data?.message || "Có lỗi xảy ra");
      }
    },
    [formData, editingItem, updateCoverLetter, createCoverLetter],
  );

  const handleDelete = useCallback(async () => {
    try {
      await deleteCoverLetter(deletingId).unwrap();
      toast.success("Đã xóa thư xin việc");
      setIsDeleteOpen(false);
    } catch (error) {
      toast.error(error?.data?.message || "Có lỗi xảy ra");
    }
  }, [deleteCoverLetter, deletingId]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Thư xin việc của tôi</CardTitle>
          <Button
            size="sm"
            onClick={handleOpenCreate}
            className="cursor-pointer gap-1"
          >
            <Plus className="size-4" /> Tạo mới
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="flex h-32 items-center justify-center">
            <Loader2 className="text-muted-foreground size-6 animate-spin" />
          </div>
        ) : coverLetters.length === 0 ? (
          <div className="text-muted-foreground py-12 text-center">
            <FileText className="mx-auto mb-3 size-10 opacity-30" />
            <p className="text-sm">Chưa có thư xin việc nào</p>
            <p className="mt-1 text-xs">
              Tạo thư xin việc để ứng tuyển nhanh hơn
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {coverLetters.map((cl) => (
              <CoverLetterCard
                key={cl.id}
                cl={cl}
                onEdit={handleOpenEdit}
                onDelete={handleOpenDelete}
              />
            ))}
          </div>
        )}
      </CardContent>

      <CoverLetterFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        formData={formData}
        onFormChange={setFormData}
        onSubmit={handleSubmit}
        isLoading={isCreating || isUpdating}
        isEditing={!!editingItem}
      />

      <CoverLetterDeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </Card>
  );
}

export default MyCoverLetter;
