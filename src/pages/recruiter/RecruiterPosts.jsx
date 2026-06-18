import { Eye, Loader2, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import Pagination from "@/components/shared/Pagination";
import { POST_STATUS_OPTIONS } from "@/config/constants/post.constant";
import { useRecruiterPosts } from "@/hooks/useRecruiterPosts";
import { usePermission } from "@/hooks/usePermission";
import { formatDate } from "@/utils/helper";
import PostFormDialog from "@/components/recuiter/PostFormDialog";
import PageContainer from "@/components/shared/PageContainer";

function RecruiterPosts() {
  const canRead = usePermission("post:read:own");
  const canCreate = usePermission("post:create");
  const canEdit = usePermission("post:update:own");
  const canDelete = usePermission("post:delete:own");
  const {
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
    setSearch,
    setStatus,
    setPage,
  } = useRecruiterPosts({ canRead });

  useEffect(() => {
    if (!canRead) {
      toast.warning("Bạn chưa có quyền quản lý bài viết");
    }
  }, [canRead]);

  return (
    <PageContainer>
      <div className="max-w-full space-y-6 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-primary text-3xl font-black sm:text-4xl">
              Quản lý bài viết
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Viết blog tuyển dụng, quản lý bản nháp và xuất bản nội dung cho
              ứng viên.
            </p>
          </div>
          {canCreate ? (
            <Button onClick={openCreate} className="gap-2">
              <Plus className="size-4" />
              Viết bài mới
            </Button>
          ) : null}
        </div>

        {!canRead ? (
          <div className="rounded-lg border border-dashed p-5 text-center sm:p-10">
            <h2 className="font-semibold">
              Bạn chưa có quyền xem danh sách bài viết
            </h2>
            <p className="text-muted-foreground mt-2 text-sm">
              Vui lòng liên hệ quản trị viên để được cấp quyền post:read:own.
            </p>
          </div>
        ) : (
          <>
            <div className="flex flex-wrap gap-3 rounded-lg border p-4">
              <div className="relative w-full sm:w-80">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  value={filters.search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm theo tiêu đề..."
                  className="pl-9"
                />
              </div>
              <Select value={filters.status} onValueChange={setStatus}>
                <SelectTrigger className="w-full sm:w-44">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POST_STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {isLoading ? (
              <div className="flex h-40 items-center justify-center">
                <Loader2 className="text-muted-foreground size-6 animate-spin" />
              </div>
            ) : posts.length === 0 ? (
              <p className="text-muted-foreground py-16 text-center text-sm">
                Chưa có bài viết nào
              </p>
            ) : (
              <>
                <div className="overflow-x-auto rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Tiêu đề</TableHead>
                        <TableHead>Danh mục</TableHead>
                        <TableHead>Trạng thái</TableHead>
                        <TableHead>Lượt xem</TableHead>
                        <TableHead>Ngày tạo</TableHead>
                        <TableHead className="text-right">Thao tác</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {posts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{post.title}</p>
                              <p className="text-muted-foreground line-clamp-1 text-xs">
                                {post.excerpt}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>{post.category || "Career"}</TableCell>
                          <TableCell>
                            <span className="rounded-full border px-2 py-0.5 text-xs">
                              {post.isPublished ? "Công khai" : "Nháp"}
                            </span>
                          </TableCell>
                          <TableCell>{post.viewCount ?? 0}</TableCell>
                          <TableCell>{formatDate(post.createdAt)}</TableCell>
                          <TableCell>
                            <div className="flex justify-end gap-1">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="size-8"
                                asChild
                              >
                                <Link to={`/post/${post.id}`}>
                                  <Eye className="size-4" />
                                </Link>
                              </Button>
                              {canEdit ? (
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="size-8"
                                  onClick={() => openEdit(post)}
                                >
                                  <Pencil className="size-4" />
                                </Button>
                              ) : null}
                              {canDelete ? (
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="text-destructive size-8"
                                  onClick={() => setDeleteId(post.id)}
                                >
                                  <Trash2 className="size-4" />
                                </Button>
                              ) : null}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-muted-foreground text-sm">
                    Tổng {total} bài viết
                  </p>
                  <Pagination
                    page={filters.page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                    showPageNumbers
                  />
                </div>
              </>
            )}

            <PostFormDialog
              open={dialogOpen}
              onOpenChange={setDialogOpen}
              editPost={editPost}
              form={form}
              onChange={handleChange}
              onSubmit={handleSubmit}
              isSaving={isSaving}
            />
            <ConfirmDialog
              open={!!deleteId}
              onOpenChange={() => setDeleteId(null)}
              onConfirm={handleDelete}
              isLoading={deleting}
              description="Bài viết sẽ bị xóa khỏi hệ thống."
            />
          </>
        )}
      </div>
    </PageContainer>
  );
}

export default RecruiterPosts;
