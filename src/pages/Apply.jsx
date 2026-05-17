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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useApply } from "@/hooks/useApply";
import { formatFileSize } from "@/utils/helper";
import { JOB_TYPE_LABELS } from "@/config/constants/candidate.constant";
import { BackButton } from "@/components/shared/NotFound";
import PageContainer from "@/components/shared/PageContainer";
import { FieldLabel, StepHeader } from "@/features/ApplyPageComponent";

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
    cvPickerOpen,
    agreedToTerms,
    setAgreedToTerms,
    setManualCvUrl,
    setCoverLetterOpen,
    setCvPickerOpen,
    handleChange,
    handleSelectCoverLetter,
    handleSelectCv,
    handleSubmit,
    handleSaveDraft,
    handleGenerateCoverLetter,
  } = useApply();

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
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col items-start gap-4">
          {/* Logo + company name */}
          <section className="flex items-center gap-2">
            <div className="bg-muted flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg text-sm font-bold">
              {job.company?.logoUrl ? (
                <img
                  src={job.company.logoUrl}
                  alt={job.company.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                job.company?.name?.[0]
              )}
            </div>
            <p className="text-primary text-xs font-bold tracking-widest uppercase">
              {job.company?.name}
            </p>
          </section>
          {/* Job title + info */}
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

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ── Section 1: Personal info ── */}
        <article className="bg-primary/10 rounded-2xl p-6">
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
              <FieldLabel>LinkedIn Profile (Tùy chọn)</FieldLabel>
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

        {/* ── Section 2: CV & Portfolio ── */}
        <article className="bg-primary/10 rounded-2xl p-6">
          <StepHeader icon={FileText} title="Hồ sơ ứng tuyển & Portfolio" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* CV chính */}
            <div>
              <FieldLabel>CV Chính thức (Bắt buộc)</FieldLabel>
              <Popover open={cvPickerOpen} onOpenChange={setCvPickerOpen}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="hover:bg-muted/40 flex h-28 w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed transition-colors"
                  >
                    {selectedCv ? (
                      <>
                        <FileText className="text-primary size-8" />
                        <p className="max-w-[90%] truncate text-sm font-semibold">
                          {selectedCv.name}
                        </p>
                        <p className="text-muted-foreground text-xs">
                          {formatFileSize(selectedCv.fileSize)}
                        </p>
                      </>
                    ) : (
                      <>
                        <Upload className="text-muted-foreground size-8" />
                        <p className="text-sm font-medium">
                          Tải lên CV của bạn
                        </p>
                        <p className="text-muted-foreground text-xs">
                          PDF, DOCX (Tối đa 5MB)
                        </p>
                      </>
                    )}
                  </button>
                </PopoverTrigger>
                <PopoverContent align="start" className="w-80 p-2">
                  <p className="text-muted-foreground mb-2 px-2 text-xs font-semibold tracking-wider uppercase">
                    Chọn từ thư viện CV
                  </p>
                  {myCvs.length === 0 ? (
                    <p className="text-muted-foreground px-2 py-2 text-sm">
                      Bạn chưa có CV nào.{" "}
                      <a
                        href="/profile?tab=cv"
                        className="text-primary underline underline-offset-2"
                      >
                        Tải lên CV
                      </a>
                    </p>
                  ) : (
                    <div className="space-y-0.5">
                      {myCvs.map((cv) => (
                        <button
                          key={cv.id}
                          type="button"
                          onClick={() => handleSelectCv(cv)}
                          className={`hover:bg-accent flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-left transition-colors ${
                            effectiveSelectedCvId === cv.id ? "bg-accent" : ""
                          }`}
                        >
                          <FileText className="text-muted-foreground size-4 shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium">
                              {cv.name}
                            </p>
                            <p className="text-muted-foreground text-xs">
                              {formatFileSize(cv.fileSize)}
                            </p>
                          </div>
                          {effectiveSelectedCvId === cv.id && (
                            <CheckCircle2 className="text-primary ml-auto size-4 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="mt-2 border-t pt-2">
                    <p className="text-muted-foreground mb-1.5 px-2 text-xs font-medium">
                      Hoặc nhập link CV
                    </p>
                    <div className="px-1">
                      <Input
                        placeholder="https://drive.google.com/..."
                        value={manualCvUrl}
                        onChange={(e) => setManualCvUrl(e.target.value)}
                        className="h-8 text-xs"
                      />
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            {/* Portfolio box */}
            <div>
              <FieldLabel>Portfolio / CV Phụ</FieldLabel>
              <div className="flex h-28 flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed">
                <Plus className="text-muted-foreground size-8" />
                <p className="text-muted-foreground text-sm font-medium">
                  Thêm tài liệu bổ sung
                </p>
                <p className="text-muted-foreground text-xs">Tùy chọn</p>
              </div>
            </div>
          </div>
        </article>

        {/* ── Section 3: Cover letter ── */}
        <article className="bg-primary/10 rounded-2xl p-6">
          <StepHeader icon={MessageSquare} title="Thư ngỏ (Cover Letter)" />
          <FieldLabel>Tại sao bạn phù hợp với vị trí này?</FieldLabel>
          <Textarea
            name="coverLetter"
            value={formData.coverLetter}
            onChange={handleChange}
            placeholder="Chia sẻ kinh nghiệm và động lực của bạn..."
            className="bg-input border-0 [scrollbar-width:thin]"
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
                  <PopoverContent align="end" className="w-80 p-2">
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
                {isGeneratingCL ? "Đang tạo..." : "Tối ưu bằng AI Scout"}
              </Button>
            </div>
          </div>
        </article>

        {/* Bottom actions */}
        <div className="flex flex-wrap items-center gap-4 pt-1">
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
          <div className="ml-auto flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Save className="size-4" />
              )}
              Lưu nháp
            </Button>
            <Button type="submit" disabled={isLoading || !agreedToTerms}>
              {isLoading ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
              Nộp hồ sơ ngay
            </Button>
          </div>
        </div>
      </form>
    </PageContainer>
  );
}

export default Apply;
