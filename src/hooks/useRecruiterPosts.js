import { useState } from "react";
import { toast } from "sonner";
import { EMPTY_POST_FORM, RECRUITER_POST_PAGE_SIZE } from "@/config/constants/post.constant";
import {
  useCreatePostMutation,
  useDeletePostMutation,
  useGetMyPostsQuery,
  useUpdatePostMutation,
} from "@/services/post.service";

export function useRecruiterPosts({ canRead = true } = {}) {
  const [filters, setFilters] = useState({ search: "", status: "ALL", page: 1 });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editPost, setEditPost] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState(EMPTY_POST_FORM);

  const { data, isLoading } = useGetMyPostsQuery({
    search: filters.search || undefined,
    status: filters.status !== "ALL" ? filters.status : undefined,
    page: filters.page,
    limit: RECRUITER_POST_PAGE_SIZE,
  }, {
    skip: !canRead,
  });
  const [createPost, { isLoading: creating }] = useCreatePostMutation();
  const [updatePost, { isLoading: updating }] = useUpdatePostMutation();
  const [deletePost, { isLoading: deleting }] = useDeletePostMutation();

  const total = data?.data?.total ?? 0;
  const totalPages = data?.data?.totalPages ?? 1;
  const posts = data?.data?.data ?? [];
  const isSaving = creating || updating;

  const openCreate = () => {
    setEditPost(null);
    setForm(EMPTY_POST_FORM);
    setDialogOpen(true);
  };

  const openEdit = (post) => {
    setEditPost(post);
    setForm({
      title: post.title || "",
      excerpt: post.excerpt || "",
      content: post.content || "",
      coverUrl: post.coverUrl || "",
      category: post.category || EMPTY_POST_FORM.category,
      authorName: post.authorName || "",
      isPublished: Boolean(post.isPublished),
      contentFormat: post.contentFormat || "HTML",
    });
    setDialogOpen(true);
  };

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (editPost) {
        await updatePost({ id: editPost.id, ...form }).unwrap();
        toast.success("Đã cập nhật bài viết");
      } else {
        await createPost(form).unwrap();
        toast.success("Đã tạo bài viết");
      }
      setDialogOpen(false);
    } catch {
      toast.error("Không thể lưu bài viết");
    }
  };

  const handleDelete = async () => {
    try {
      await deletePost(deleteId).unwrap();
      toast.success("Đã xóa bài viết");
      setDeleteId(null);
    } catch {
      toast.error("Không thể xóa bài viết");
    }
  };

  return {
    filters,
    posts,
    total,
    totalPages,
    isLoading,
    dialogOpen,
    setDialogOpen,
    editPost,
    deleteId,
    setDeleteId,
    deleting,
    form,
    isSaving,
    openCreate,
    openEdit,
    handleChange,
    handleSubmit,
    handleDelete,
    setSearch: (search) => setFilters((prev) => ({ ...prev, search, page: 1 })),
    setStatus: (status) => setFilters((prev) => ({ ...prev, status, page: 1 })),
    setPage: (page) => setFilters((prev) => ({ ...prev, page })),
  };
}
