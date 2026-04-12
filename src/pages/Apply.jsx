import { useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Loader2,
  Paperclip,
  FileText,
  Star,
  Upload,
  File,
  CheckCircle2,
  X,
} from "lucide-react";

import { useGetJobByIdQuery } from "@/services/job.service";
import { useApplyJobMutation } from "@/services/application.service";
import { useGetMyCoverLettersQuery } from "@/services/coverLetter.service";
import { useGetMyCvsQuery } from "@/services/cv.service";

function formatFileSize(bytes) {
  if (!bytes) return "";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];
const MAX_SIZE_BYTES = 2 * 1024 * 1024;

function Apply() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const { data: jobData } = useGetJobByIdQuery(id);
  const [applyJob, { isLoading }] = useApplyJobMutation();
  const { data: coverLettersData } = useGetMyCoverLettersQuery();
  const { data: myCvsData } = useGetMyCvsQuery();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    coverLetter: "",
  });
  const [coverLetterOpen, setCoverLetterOpen] = useState(false);

  // CV selection state — one of three modes:
  // "library" → user picked a CV from their library (cvId is set)
  // "file"    → user picked a new local file to submit URL as cvUrl (NOT uploaded here — they manage CVs in profile)
  // "url"     → user typed a manual URL
  const [cvMode, setCvMode] = useState("library"); // "library" | "url"
  const [selectedCvId, setSelectedCvId] = useState(null);
  const [manualCvUrl, setManualCvUrl] = useState("");

  const job = jobData?.data;
  const coverLetters = coverLettersData?.data ?? [];
  const myCvs = myCvsData?.data ?? [];

  // Auto-select default CV if user has one
  const defaultCv = myCvs.find((cv) => cv.isDefault) ?? myCvs[0] ?? null;
  const effectiveSelectedCvId = selectedCvId ?? defaultCv?.id ?? null;
  const selectedCv = myCvs.find((cv) => cv.id === effectiveSelectedCvId) ?? null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectCoverLetter = (cl) => {
    setFormData((prev) => ({ ...prev, coverLetter: cl.content }));
    setCoverLetterOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Determine CV to submit
    let cvUrl = undefined;
    let cvId = undefined;

    if (cvMode === "library" && selectedCv) {
      cvId = selectedCv.id;
      cvUrl = selectedCv.fileUrl;
    } else if (cvMode === "url" && manualCvUrl.trim()) {
      cvUrl = manualCvUrl.trim();
    }

    try {
      await applyJob({ jobId: id, ...formData, cvUrl, cvId }).unwrap();
      toast.success("Ứng tuyển thành công! Chúng tôi sẽ liên hệ bạn sớm.");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || "Có lỗi xảy ra khi ứng tuyển");
    }
  };

  if (!job) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="text-primary size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6 p-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Ứng tuyển vị trí</h1>
        <div className="flex items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-muted-foreground">{job.company}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ── Personal info ── */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
            <CardDescription>
              Vui lòng cung cấp thông tin chính xác để chúng tôi có thể liên hệ
              với bạn
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Họ và tên *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Số điện thoại *</Label>
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* ── CV section ── */}
        <Card>
          <CardHeader>
            <CardTitle>CV & Hồ sơ</CardTitle>
            <CardDescription>
              Chọn CV từ thư viện cá nhân hoặc nhập link CV từ Google Drive,
              Dropbox…
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Mode toggle */}
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                variant={cvMode === "library" ? "default" : "outline"}
                onClick={() => setCvMode("library")}
              >
                <FileText className="mr-1.5 size-3.5" />
                CV của tôi
              </Button>
              <Button
                type="button"
                size="sm"
                variant={cvMode === "url" ? "default" : "outline"}
                onClick={() => setCvMode("url")}
              >
                <Paperclip className="mr-1.5 size-3.5" />
                Nhập link
              </Button>
            </div>

            {/* Library mode */}
            {cvMode === "library" && (
              <>
                {myCvs.length === 0 ? (
                  <div className="text-muted-foreground rounded-lg border border-dashed p-5 text-center text-sm">
                    Bạn chưa có CV nào.{" "}
                    <a
                      href="/profile?tab=cv"
                      className="text-primary underline underline-offset-2"
                    >
                      Tải lên CV
                    </a>{" "}
                    trong trang hồ sơ trước.
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {myCvs.map((cv) => {
                      const isSelected = cv.id === effectiveSelectedCvId;
                      return (
                        <li key={cv.id}>
                          <button
                            type="button"
                            onClick={() => setSelectedCvId(cv.id)}
                            className={`flex w-full items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors
                              ${isSelected
                                ? "border-primary bg-primary/5"
                                : "hover:bg-muted/50"
                              }`}
                          >
                            <FileText
                              className={`size-5 shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground"}`}
                            />
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
                                {new Date(cv.createdAt).toLocaleDateString(
                                  "vi-VN",
                                )}
                              </p>
                            </div>
                            {isSelected && (
                              <CheckCircle2 className="text-primary size-5 shrink-0" />
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </>
            )}

            {/* URL mode */}
            {cvMode === "url" && (
              <div className="space-y-2">
                <Label htmlFor="cvUrl">Link CV</Label>
                <Input
                  id="cvUrl"
                  name="cvUrl"
                  placeholder="https://drive.google.com/file/d/..."
                  value={manualCvUrl}
                  onChange={(e) => setManualCvUrl(e.target.value)}
                />
              </div>
            )}

            {/* Cover letter */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="coverLetter">Thư giới thiệu (Tùy chọn)</Label>
                {coverLetters.length > 0 && (
                  <Popover
                    open={coverLetterOpen}
                    onOpenChange={setCoverLetterOpen}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground h-7 gap-1.5 px-2 text-xs"
                      >
                        <Paperclip className="size-3.5" />
                        Dùng thư có sẵn
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end" className="w-80 p-2">
                      <p className="text-muted-foreground mb-2 px-1 text-xs font-medium">
                        Chọn thư giới thiệu
                      </p>
                      <div className="space-y-1">
                        {coverLetters.map((cl) => (
                          <button
                            key={cl.id}
                            type="button"
                            onClick={() => handleSelectCoverLetter(cl)}
                            className="hover:bg-accent flex w-full items-start gap-2 rounded-md px-2 py-2 text-left transition-colors"
                          >
                            <FileText className="text-muted-foreground mt-0.5 size-4 shrink-0" />
                            <div className="min-w-0">
                              <p className="truncate text-sm font-medium">
                                {cl.title}
                              </p>
                              <p className="text-muted-foreground line-clamp-1 text-xs">
                                {cl.content}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                )}
              </div>
              <Textarea
                id="coverLetter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                placeholder="Viết một vài dòng giới thiệu về bản thân và lý do bạn phù hợp với vị trí này..."
                rows={5}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate(`/jobs/${id}`)}
            disabled={isLoading}
          >
            Quay lại
          </Button>
          <Button type="submit" disabled={isLoading} className="cursor-pointer">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Đang gửi...
              </>
            ) : (
              "Gửi hồ sơ"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default Apply;
