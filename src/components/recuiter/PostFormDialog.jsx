import { Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { POST_CATEGORIES, POST_STATUS } from "@/config/constants/post.constant";
import PostEditor from "./PostEditor";

function PostFormDialog({
  open,
  onOpenChange,
  editPost,
  form,
  onChange,
  onSubmit,
  isSaving,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[92vh] flex-col gap-0 overflow-hidden p-0 sm:max-w-4xl">
        <DialogHeader className="border-b px-6 py-4">
          <DialogTitle>
            {editPost ? "Chỉnh sửa bài viết" : "Tạo bài viết mới"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 space-y-5 overflow-y-auto px-6 py-5">
          <div className="space-y-2 md:col-span-2">
            <Label>Tiêu đề</Label>
            <Input
              value={form.title}
              onChange={(e) => onChange("title", e.target.value)}
              placeholder="Nhập tiêu đề bài viết"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1 space-y-2">
              <Label>Tác giả hiển thị</Label>
              <Input
                value={form.authorName}
                onChange={(e) => onChange("authorName", e.target.value)}
                placeholder="Nhập tên tác giả"
              />
            </div>
            <div className="space-y-2">
              <Label>Danh mục</Label>
              <Select
                value={form.category}
                onValueChange={(value) => onChange("category", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POST_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Trạng thái</Label>
              <Select
                value={form.isPublished}
                onValueChange={(value) => onChange("isPublished", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {POST_STATUS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label>Ảnh bìa URL</Label>
            <Input
              value={form.coverUrl}
              onChange={(e) => onChange("coverUrl", e.target.value)}
              placeholder="Để trống để dùng placeholder"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Mô tả ngắn</Label>
            <Textarea
              value={form.excerpt}
              onChange={(e) => onChange("excerpt", e.target.value)}
              placeholder="Tóm tắt bài viết"
            />
          </div>

          <div className="space-y-2">
            <Label>Nội dung</Label>
            <PostEditor
              value={form.content}
              onChange={(value) => onChange("content", value)}
            />
          </div>
        </div>

        <DialogFooter className="border-border m-0 shrink-0 gap-2 border-t px-6 py-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSaving}
          >
            Hủy
          </Button>
          <Button onClick={onSubmit} disabled={isSaving} className="gap-2">
            {isSaving ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Save className="size-4" />
            )}
            {editPost ? "Lưu thay đổi" : "Tạo mới"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PostFormDialog;
