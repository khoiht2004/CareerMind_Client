import { Eye, Loader2, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { Link } from "react-router";
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
import PostFormDialog from "@/components/posts/PostFormDialog";
import { POST_STATUS_OPTIONS } from "@/config/constants/post.constant";
import { useRecruiterPosts } from "@/hooks/useRecruiterPosts";
import { formatDate } from "@/utils/helper";

function RecruiterPosts() {
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
  } = useRecruiterPosts();

  return (
    <div className="max-w-full space-y-6 px-10 pt-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-primary text-4xl font-black">Quản lý bài viết</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Viết blog tuyển dụng, quản lý bản nháp và xuất bản nội dung cho ứng viên.
          </p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="size-4" />
          Viết bài mới
        </Button>
      </div>

      <div className="flex flex-wrap gap-3 rounded-lg border p-4">
        <div className="relative w-80">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tìm theo tiêu đề..."
            className="pl-9"
          />
        </div>
        <Select value={filters.status} onValueChange={setStatus}>
          <SelectTrigger className="w-44">
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
                        <Button size="icon" variant="ghost" className="size-8" asChild>
                          <Link to={`/post/${post.id}`}>
                            <Eye className="size-4" />
                          </Link>
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8"
                          onClick={() => openEdit(post)}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8 text-destructive"
                          onClick={() => setDeleteId(post.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">Tổng {total} bài viết</p>
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
    </div>
  );
}

export default RecruiterPosts;
