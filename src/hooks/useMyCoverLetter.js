import { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import {
  useGetMyCoverLettersQuery,
  useCreateCoverLetterMutation,
  useUpdateCoverLetterMutation,
  useDeleteCoverLetterMutation,
} from "@/services/coverLetter.service";

const EMPTY_FORM = { title: "", content: "" };

export function useMyCoverLetter() {
  const { data: response, isLoading } = useGetMyCoverLettersQuery();
  const allLetters = useMemo(() => response?.data ?? [], [response]);

  const [createCoverLetter, { isLoading: isCreating }] =
    useCreateCoverLetterMutation();
  const [updateCoverLetter, { isLoading: isUpdating }] =
    useUpdateCoverLetterMutation();
  const [deleteCoverLetter, { isLoading: isDeleting }] =
    useDeleteCoverLetterMutation();

  const [search, setSearch] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [formData, setFormData] = useState(EMPTY_FORM);

  const filtered = useMemo(() => {
    if (!search.trim()) return allLetters;
    const q = search.toLowerCase();
    return allLetters.filter(
      (cl) =>
        cl.title.toLowerCase().includes(q) ||
        cl.content.toLowerCase().includes(q),
    );
  }, [allLetters, search]);

  const recentCount = useMemo(() => {
    const sevenDaysAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    return allLetters.filter(
      (cl) => new Date(cl.updatedAt).getTime() > sevenDaysAgo,
    ).length;
  }, [allLetters]);

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

  return {
    coverLetters: filtered,
    total: allLetters.length,
    recentCount,
    isLoading,
    isCreating,
    isUpdating,
    isDeleting,
    search,
    setSearch,
    isFormOpen,
    setIsFormOpen,
    isDeleteOpen,
    setIsDeleteOpen,
    editingItem,
    formData,
    setFormData,
    handleOpenCreate,
    handleOpenEdit,
    handleOpenDelete,
    handleSubmit,
    handleDelete,
  };
}
