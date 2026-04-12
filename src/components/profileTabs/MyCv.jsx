import { useRef, useState } from "react";
import {
  Upload,
  FileText,
  Trash2,
  Star,
  Eye,
  Loader2,
  File,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  useGetMyCvsQuery,
  useUploadCvMutation,
  useDeleteCvMutation,
  useSetDefaultCvMutation,
} from "@/services/cv.service";
import CvPreviewDialog from "@/components/shared/CvPreviewDialog";
import { ALLOWED_TYPES } from "@/config/constants/constants";
import { formatFileSize } from "@/utils/helper";

const MAX_SIZE_MB = 2;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

function MyCv() {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const [previewCv, setPreviewCv] = useState(null);

  const { data, isLoading: isLoadingList } = useGetMyCvsQuery();
  const [uploadCv, { isLoading: isUploading }] = useUploadCvMutation();
  const [deleteCv, { isLoading: isDeleting }] = useDeleteCvMutation();
  const [setDefaultCv] = useSetDefaultCvMutation();

  const cvs = data?.data ?? [];

  function validateFile(file) {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Chỉ chấp nhận file PDF, DOC, DOCX");
      return false;
    }
    if (file.size > MAX_SIZE_BYTES) {
      toast.error(`File phải nhỏ hơn ${MAX_SIZE_MB}MB`);
      return false;
    }
    return true;
  }

  function handleFileSelect(e) {
    const file = e.target.files?.[0];
    if (file && validateFile(file)) setPendingFile(file);
    e.target.value = "";
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && validateFile(file)) setPendingFile(file);
  }

  async function handleUpload() {
    if (!pendingFile) return;

    const formData = new FormData();
    formData.append("cv", pendingFile);
    formData.append("name", pendingFile.name.replace(/\.[^.]+$/, ""));

    try {
      await uploadCv(formData).unwrap();
      toast.success("Tải lên CV thành công!");
      setPendingFile(null);
    } catch (err) {
      toast.error(err?.data?.message || "Tải lên thất bại, vui lòng thử lại");
    }
  }

  async function handleDelete(id) {
    try {
      await deleteCv(id).unwrap();
      toast.success("Đã xóa CV");
    } catch (err) {
      toast.error(err?.data?.message || "Xóa thất bại");
    }
  }

  async function handleSetDefault(id) {
    try {
      await setDefaultCv(id).unwrap();
      toast.success("Đã đặt làm CV mặc định");
    } catch (err) {
      toast.error(err?.data?.message || "Cập nhật thất bại");
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">CV của tôi</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* ── Drop zone ── */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            className={`cursor-pointer space-y-3 rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
              dragging
                ? "border-primary bg-primary/5"
                : "hover:border-foreground/30 border-muted-foreground/25"
            }`}
            onClick={() => !pendingFile && inputRef.current?.click()}
          >
            {pendingFile ? (
              /* ── Pending file preview ── */
              <div className="space-y-3">
                <div className="bg-muted mx-auto flex w-fit items-center gap-2 rounded-lg px-4 py-2">
                  <File className="text-primary size-5 shrink-0" />
                  <div className="text-left">
                    <p className="max-w-[200px] truncate text-sm font-medium">
                      {pendingFile.name}
                    </p>
                    <p className="text-muted-foreground text-xs">
                      {formatFileSize(pendingFile.size)}
                    </p>
                  </div>
                </div>
                <div className="flex justify-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpload();
                    }}
                    disabled={isUploading}
                  >
                    {isUploading ? (
                      <>
                        <Loader2 className="mr-1.5 size-3.5 animate-spin" />
                        Đang tải lên...
                      </>
                    ) : (
                      <>
                        <Upload className="mr-1.5 size-3.5" />
                        Tải lên
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPendingFile(null);
                    }}
                    disabled={isUploading}
                  >
                    Hủy
                  </Button>
                </div>
              </div>
            ) : (
              /* ── Empty state ── */
              <>
                <Upload className="text-muted-foreground mx-auto size-8" />
                <div>
                  <p className="text-sm font-medium">
                    Kéo thả hoặc nhấn để tải lên CV
                  </p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Hỗ trợ PDF, DOC, DOCX (tối đa {MAX_SIZE_MB}MB)
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current?.click();
                  }}
                >
                  Chọn file
                </Button>
              </>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            onChange={handleFileSelect}
          />

          {/* ── CV list ── */}
          {isLoadingList ? (
            <div className="flex justify-center py-4">
              <Loader2 className="text-muted-foreground size-5 animate-spin" />
            </div>
          ) : cvs.length > 0 ? (
            <div className="space-y-3">
              <Separator />
              <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                Danh sách CV ({cvs.length})
              </p>
              <ul className="space-y-2">
                {cvs.map((cv) => (
                  <li
                    key={cv.id}
                    className="bg-muted/40 flex items-center gap-3 rounded-lg border px-4 py-3"
                  >
                    <FileText className="text-primary size-5 shrink-0" />

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium">
                          {cv.name}
                        </span>
                        {cv.isDefault && (
                          <Badge
                            variant="secondary"
                            className="shrink-0 text-xs"
                          >
                            <Star className="mr-1 size-2.5 fill-current" />
                            Mặc định
                          </Badge>
                        )}
                      </div>
                      <p className="text-muted-foreground mt-0.5 text-xs">
                        {cv.fileType?.toUpperCase()} ·{" "}
                        {formatFileSize(cv.fileSize)} ·{" "}
                        {new Date(cv.createdAt).toLocaleDateString("vi-VN")}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-1">
                      {/* Preview */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-9"
                        title="Xem CV"
                        onClick={() => setPreviewCv(cv)}
                      >
                        <Eye className="size-4.5" />
                      </Button>

                      {/* Set default */}
                      {!cv.isDefault && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-9"
                          title="Đặt làm mặc định"
                          onClick={() => handleSetDefault(cv.id)}
                        >
                          <Star className="size-4.5" />
                        </Button>
                      )}

                      {/* Delete */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive size-8"
                        title="Xóa CV"
                        onClick={() => handleDelete(cv.id)}
                        disabled={isDeleting}
                      >
                        <Trash2 className="size-4.5" />
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </CardContent>
      </Card>

      {/* CV Preview modal */}
      <CvPreviewDialog
        open={!!previewCv}
        onClose={() => setPreviewCv(null)}
        cv={previewCv}
      />
    </>
  );
}

export default MyCv;
