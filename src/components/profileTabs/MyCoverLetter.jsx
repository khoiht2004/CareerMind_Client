import {
  FileText,
  Loader2,
  Plus,
  Search,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useMyCoverLetter } from "@/hooks/useMyCoverLetter";
import CoverLetterFormDialog from "../shared/CoverLetterFormDialog";
import CoverLetterDeleteDialog from "../shared/CoverLetterDeleteDialog";
import CoverLetterCard from "./components/CoverLetterCard";

function StatRow({ label, value }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <span className="text-muted-foreground text-sm">{label}</span>
      <span className="text-foreground text-sm font-semibold">{value}</span>
    </div>
  );
}

function MyCoverLetter() {
  const {
    coverLetters,
    total,
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
    handleGenerateCoverLetter,
    isGeneratingCL,
  } = useMyCoverLetter();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-primary text-3xl font-black">Thư xin việc</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Quản lý và tinh chỉnh các lá thư xin việc để tạo ấn tượng với nhà
          tuyển dụng.
        </p>
        <div className="mt-4 flex gap-2">
          <Button onClick={handleOpenCreate} className="cursor-pointer gap-2">
            <Plus className="size-4" />
            Tạo thư mới
          </Button>
          <Button variant="outline" className="cursor-pointer">
            Mẫu thư có sẵn
          </Button>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid gap-6 lg:grid-cols-[1fr_2fr]">
        {/* Left sidebar */}
        <div className="space-y-4">
          {/* Stats card */}
          <Card className="border-secondary border-l-4">
            <CardContent className="px-5">
              <h3 className="text-muted-foreground text-md mb-3 font-bold tracking-wider uppercase">
                Trạng thái hồ sơ
              </h3>
              <div>
                <StatRow label="Tổng số thư" value={total} />
                <StatRow label="Mới cập nhật" value={recentCount} />
              </div>
            </CardContent>
          </Card>

          {/* AI promo card */}
          <div className="bg-primary-container text-primary-foreground rounded-xl p-5">
            <div className="bg-primary-foreground/10 mb-3 inline-flex size-9 items-center justify-center rounded-lg">
              <Sparkles className="size-5" />
            </div>
            <h3 className="font-bold">Tư vấn bởi AI</h3>
            <p className="mt-1 text-sm opacity-75">
              Tự động điều chỉnh thư xin việc dựa trên mô tả công việc (JD) để
              tăng 80% tỷ lệ phản hồi.
            </p>
            <Button
              size="sm"
              variant="secondary"
              className="mt-4 cursor-pointer"
            >
              Thử ngay
            </Button>
          </div>
        </div>

        {/* Right main */}
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              className="bg-primary/10 px-9 py-6"
              placeholder="Tìm kiếm thư xin việc..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <SlidersHorizontal className="text-muted-foreground absolute top-1/2 right-3 size-4 -translate-y-1/2" />
          </div>

          {/* List */}
          {isLoading ? (
            <div className="flex h-40 items-center justify-center">
              <Loader2 className="text-muted-foreground size-6 animate-spin" />
            </div>
          ) : (
            <div className="space-y-3">
              {coverLetters.map((cl) => (
                <CoverLetterCard
                  key={cl.id}
                  cl={cl}
                  onEdit={handleOpenEdit}
                  onDelete={handleOpenDelete}
                />
              ))}

              {/* Add new card */}
              <button
                onClick={handleOpenCreate}
                className="border-border hover:border-primary/50 hover:bg-accent w-full cursor-pointer rounded-xl border-2 border-dashed p-8 text-center transition-colors"
              >
                <FileText className="text-muted-foreground/40 mx-auto mb-3 size-10" />
                <p className="text-muted-foreground text-sm">
                  Bạn có muốn tạo thêm một bản thư mới?
                </p>
                <p className="text-foreground mt-1 text-sm font-semibold">
                  Nhấp để tạo ngay
                </p>
              </button>
            </div>
          )}
        </div>
      </div>

      <CoverLetterFormDialog
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        formData={formData}
        onFormChange={setFormData}
        onSubmit={handleSubmit}
        isLoading={isCreating || isUpdating}
        isEditing={!!editingItem}
        onGenerate={handleGenerateCoverLetter}
        isGeneratingCL={isGeneratingCL}
      />

      <CoverLetterDeleteDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
}

export default MyCoverLetter;
