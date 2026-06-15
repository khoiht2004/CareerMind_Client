import {
  User,
  FileText,
  MessageSquare,
  Loader2,
  Paperclip,
  CheckCircle2,
  MapPin,
  Briefcase,
  Upload,
  Plus,
  Sparkles,
  Save,
  Send,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { useApply } from "@/hooks/useApply";
import { formatFileSize } from "@/utils/helper";
import { JOB_TYPE_LABELS } from "@/config/constants/candidate.constant";
import { BackButton } from "@/components/shared/NotFound";
import PageContainer from "@/components/shared/PageContainer";
import {
  FieldLabel,
  StepHeader,
  ApplyStepper,
} from "@/features/ApplyPageComponent";

function Apply() {
  const {
    job,
    isLoading,
    isGeneratingCL,
    coverLetters,
    myCvs,
    selectedCv,
    effectiveSelectedCvId,
    formData,
    manualCvUrl,
    coverLetterOpen,
    agreedToTerms,
    setAgreedToTerms,
    setManualCvUrl,
    setCoverLetterOpen,
    handleChange,
    handleSelectCoverLetter,
    handleSelectCv,
    handleSubmit,
    handleSaveDraft,
    handleGenerateCoverLetter,
    currentStep,
    setCurrentStep,
    dragging,
    isUploading,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    setSelectedCvId,
  } = useApply();

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!formData.name?.trim()) {
        toast.error("Vui lòng nhập họ và tên");
        return;
      }
      if (!formData.email?.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
        toast.error("Vui lòng nhập email hợp lệ");
        return;
      }
      if (!formData.phone?.trim()) {
        toast.error("Vui lòng nhập số điện thoại");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      // Step 2 CV is optional, but let's notify user if they haven't selected anything
      if (!selectedCv && !manualCvUrl.trim()) {
        toast.warning("Mày đang nộp hồ sơ mà không đính kèm CV!");
      }
      setCurrentStep(3);
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
    <PageContainer className="max-w-4xl">
      <BackButton label="Quay lại danh sách việc làm" />

      {/* Job header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col items-start gap-4">
          <section>
            <h1 className="text-3xl leading-tight font-black">{job.title}</h1>
            <div className="text-muted-foreground flex gap-4 py-3 text-sm font-semibold">
              {job.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="size-4 shrink-0" />
                  {job.location}
                </span>
              )}
              {job.type && (
                <span className="flex items-center gap-1">
                  <Briefcase className="size-4 shrink-0" />
                  {JOB_TYPE_LABELS[job.type] ?? job.type}
                </span>
              )}
            </div>
          </section>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Stepper component */}
        <ApplyStepper currentStep={currentStep} />

        {/* ── Step 1: Personal info ── */}
        {currentStep === 1 && (
          <article className="bg-primary/10 animate-in fade-in rounded-2xl p-6 transition-all duration-300">
            <StepHeader icon={User} title="Thông tin cá nhân" />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <FieldLabel>Họ và tên</FieldLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nguyễn Văn A"
                  className="bg-input border-0"
                  required
                />
              </div>
              <div>
                <FieldLabel>Email</FieldLabel>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  className="bg-input border-0"
                  required
                />
              </div>
              <div>
                <FieldLabel>Số điện thoại</FieldLabel>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+84 000 000 000"
                  className="bg-input border-0"
                  required
                />
              </div>

              <div>
                <FieldLabel>
                  LinkedIn Profile{" "}
                  <span className="font-light">(Tùy chọn)</span>
                </FieldLabel>
                <Input
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="linkedin.com/in/username"
                  className="bg-input border-0"
                />
              </div>
            </div>
          </article>
        )}

        {/* ── Step 2: CV & Portfolio ── */}
        {currentStep === 2 && (
          <article className="bg-primary/10 animate-in fade-in rounded-2xl p-6 transition-all duration-300">
            <StepHeader icon={FileText} title="Hồ sơ ứng tuyển & Portfolio" />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-[2fr_1fr]">
              {/* CV Option Area */}
              <div className="space-y-6">
                {/* 1. List of existing CVs */}
                {myCvs.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                      Chọn từ thư viện CV của bạn
                    </p>
                    <div className="grid max-h-48 grid-cols-1 gap-2 overflow-y-auto pr-1 [scrollbar-width:thin] sm:grid-cols-2">
                      {myCvs.map((cv) => (
                        <div
                          key={cv.id}
                          onClick={() => {
                            handleSelectCv(cv);
                            setManualCvUrl(""); // clear link if selected library cv
                          }}
                          className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3 transition-all ${
                            effectiveSelectedCvId === cv.id
                              ? "border-primary bg-primary/5 shadow-sm"
                              : "border-border bg-card hover:bg-accent"
                          }`}
                        >
                          <FileText
                            className={`size-5 shrink-0 ${effectiveSelectedCvId === cv.id ? "text-primary" : "text-muted-foreground"}`}
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold">
                              {cv.name}
                            </p>
                            <p className="text-muted-foreground text-[10px]">
                              {formatFileSize(cv.fileSize)}
                            </p>
                          </div>
                          {cv.isDefault && (
                            <span className="bg-primary/10 text-primary shrink-0 rounded-full px-1.5 py-0.5 text-[8px] font-black">
                              Mặc định
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Drag & drop file upload */}
                <div className="space-y-2">
                  <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                    Tải lên CV mới
                  </p>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() =>
                      !isUploading &&
                      document.getElementById("cv-file-upload")?.click()
                    }
                    className={`cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all ${
                      dragging
                        ? "border-primary bg-primary/5"
                        : "border-border bg-card hover:bg-accent/40"
                    }`}
                  >
                    <input
                      type="file"
                      id="cv-file-upload"
                      accept=".pdf,.doc,.docx"
                      className="hidden"
                      onChange={handleFileSelect}
                    />
                    {isUploading ? (
                      <div className="flex flex-col items-center py-2">
                        <Loader2 className="text-primary mb-2 size-6 animate-spin" />
                        <p className="text-xs font-semibold">
                          Đang tải CV lên hệ thống...
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="text-muted-foreground mb-1.5 size-6" />
                        <p className="text-primary text-xs font-bold hover:underline">
                          Tải lên CV từ thiết bị
                        </p>
                        <p className="text-muted-foreground mt-0.5 text-[10px]">
                          Hỗ trợ PDF, DOCX (Tối đa 5MB)
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 4. External URL */}
                <div className="space-y-2">
                  <p className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                    Hoặc nhập đường dẫn CV bên ngoài
                  </p>
                  <Input
                    placeholder="https://drive.google.com/..."
                    value={manualCvUrl}
                    onChange={(e) => {
                      setManualCvUrl(e.target.value);
                      if (e.target.value.trim()) {
                        setSelectedCvId(null); // Clear library selection
                      }
                    }}
                    className="bg-input h-9 border-0 text-xs"
                  />
                </div>
              </div>

              {/* Portfolio and Secondary Details */}
              <div className="space-y-4">
                <div>
                  <FieldLabel>Portfolio / CV Phụ (Tùy chọn)</FieldLabel>
                  <div className="bg-card/50 flex h-32 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed">
                    <Plus className="text-muted-foreground size-6" />
                    <p className="text-muted-foreground text-xs font-bold">
                      Thêm tài liệu bổ sung
                    </p>
                    <p className="text-muted-foreground text-[10px]">
                      Tùy chọn
                    </p>
                  </div>
                </div>

                <div className="bg-muted/30 space-y-2 rounded-xl p-4">
                  <h4 className="text-foreground text-xs font-bold tracking-wide uppercase">
                    Mẹo nộp CV
                  </h4>
                  <ul className="text-muted-foreground list-disc space-y-1 pl-4 text-[11px]">
                    <li>Nên nộp file định dạng PDF để giữ nguyên bố cục.</li>
                    <li>
                      Sử dụng CV mới nhất và cập nhật đầy đủ thông tin liên hệ.
                    </li>
                    <li>
                      Nếu dùng link Drive, hãy bật quyền "Người xem công khai".
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>
        )}

        {/* ── Step 3: Cover letter ── */}
        {currentStep === 3 && (
          <article className="bg-primary/10 animate-in fade-in rounded-2xl p-6 transition-all duration-300">
            <StepHeader icon={MessageSquare} title="Thư ngỏ (Cover Letter)" />
            <FieldLabel>Tại sao bạn phù hợp với vị trí này?</FieldLabel>
            <Textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              placeholder="Chia sẻ kinh nghiệm và động lực của bạn..."
              className="bg-input border-0 text-sm [scrollbar-width:thin]"
              rows={7}
            />
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
              <p className="text-muted-foreground text-xs">
                Đề xuất: 200 - 500 từ
              </p>
              <div className="flex items-center gap-2">
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
                    <PopoverContent
                      align="end"
                      className="w-[calc(100vw-2rem)] max-w-80 p-2"
                    >
                      <p className="text-muted-foreground mb-2 px-1 text-xs font-medium">
                        Chọn thư giới thiệu
                      </p>
                      <div className="space-y-0.5">
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
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="text-primary h-7 gap-1.5 px-2 text-xs font-bold"
                  onClick={handleGenerateCoverLetter}
                  disabled={isGeneratingCL}
                >
                  <Sparkles className="size-3.5" fill="currentColor" />
                  {isGeneratingCL ? "Đang tạo..." : "Tối ưu bằng MindScout"}
                </Button>
              </div>
            </div>

            {/* Terms and Privacy */}
            <div className="border-border mt-6 border-t pt-4">
              <label className="flex cursor-pointer items-start gap-2.5">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 size-4 shrink-0 cursor-pointer"
                />
                <span className="text-muted-foreground text-xs leading-relaxed">
                  Tôi đồng ý với các điều khoản và bảo mật thông tin của
                  CareerPartner & {job.company?.name}.
                </span>
              </label>
            </div>
          </article>
        )}

        {/* Action Controls */}
        <div className="border-border flex items-center justify-between border-t pt-4">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="h-10 gap-1.5 px-4 text-sm font-semibold"
            >
              <ChevronLeft className="size-4" />
              Quay lại
            </Button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-3">
            {currentStep < 3 ? (
              <Button
                type="button"
                onClick={handleNextStep}
                className="h-10 gap-1.5 px-4 text-sm font-semibold"
              >
                Tiếp tục
                <ChevronRight className="size-4" />
              </Button>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSaveDraft}
                  disabled={isLoading}
                  className="h-10 gap-1.5 px-4 text-sm font-semibold"
                >
                  {isLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Save className="size-4" />
                  )}
                  Lưu nháp
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading || !agreedToTerms}
                  className="h-10 gap-1.5 px-5 text-sm font-semibold"
                  onClick={handleSubmit}
                >
                  {isLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Send className="size-4" />
                  )}
                  Nộp hồ sơ ngay
                </Button>
              </>
            )}
          </div>
        </div>
      </form>
    </PageContainer>
  );
}

export default Apply;
