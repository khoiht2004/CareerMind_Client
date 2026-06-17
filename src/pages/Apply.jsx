import { Loader2, MapPin, Briefcase } from "lucide-react";
import { useApply } from "@/hooks/useApply";
import { JOB_TYPE_LABELS } from "@/config/constants/candidate.constant";
import { BackButton } from "@/components/shared/NotFound";
import PageContainer from "@/components/shared/PageContainer";
import { ApplyStepperIndicator } from "@/features/ApplyPageComponent";
import ApplyPersonalInfoStep from "@/components/apply/ApplyPersonalInfoStep";
import ApplyCvDocumentsStep from "@/components/apply/ApplyCvDocumentsStep";
import ApplyCoverLetterStep from "@/components/apply/ApplyCoverLetterStep";
import ApplyReviewSummaryStep from "@/components/apply/ApplyReviewSummaryStep";
import ApplyFooterActions from "@/components/apply/ApplyFooterActions";

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
    currentStep,
    setCurrentStep,
    handleNext,
    handleBack,
    setAgreedToTerms,
    setManualCvUrl,
    setCoverLetterOpen,
    handleChange,
    handleSelectCoverLetter,
    handleSelectCv,
    isUploadingCv,
    cvSource,
    setCvSource,
    dragging,
    pendingFile,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleCancelPending,
    handleUpload,
    handleSubmit,
    handleSaveDraft,
    handleGenerateCoverLetter,
  } = useApply();

  const handleBackToStep = (targetStep) => {
    if (targetStep < currentStep) {
      setCurrentStep(targetStep);
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
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col items-start gap-4">
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

      {/* Stepper progress indicator */}
      <ApplyStepperIndicator
        currentStep={currentStep}
        handleBackToStep={handleBackToStep}
      />

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* ── Section 1: Personal info ── */}
        {currentStep === 1 && (
          <ApplyPersonalInfoStep
            formData={formData}
            handleChange={handleChange}
          />
        )}

        {/* ── Section 2: CV & Portfolio ── */}
        {currentStep === 2 && (
          <ApplyCvDocumentsStep
            selectedCv={selectedCv}
            myCvs={myCvs}
            handleSelectCv={handleSelectCv}
            effectiveSelectedCvId={effectiveSelectedCvId}
            manualCvUrl={manualCvUrl}
            setManualCvUrl={setManualCvUrl}
            isUploadingCv={isUploadingCv}
            cvSource={cvSource}
            setCvSource={setCvSource}
            dragging={dragging}
            pendingFile={pendingFile}
            handleFileSelect={handleFileSelect}
            handleDrop={handleDrop}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleCancelPending={handleCancelPending}
            handleUpload={handleUpload}
          />
        )}

        {/* ── Section 3: Cover letter ── */}
        {currentStep === 3 && (
          <ApplyCoverLetterStep
            formData={formData}
            handleChange={handleChange}
            coverLetters={coverLetters}
            coverLetterOpen={coverLetterOpen}
            setCoverLetterOpen={setCoverLetterOpen}
            handleSelectCoverLetter={handleSelectCoverLetter}
            handleGenerateCoverLetter={handleGenerateCoverLetter}
            isGeneratingCL={isGeneratingCL}
          />
        )}

        {/* ── Section 4: Review summary ── */}
        {currentStep === 4 && (
          <ApplyReviewSummaryStep
            formData={formData}
            selectedCv={selectedCv}
            manualCvUrl={manualCvUrl}
          />
        )}

        {/* Bottom Actions Footer */}
        <ApplyFooterActions
          currentStep={currentStep}
          agreedToTerms={agreedToTerms}
          setAgreedToTerms={setAgreedToTerms}
          isLoading={isLoading}
          handleBack={handleBack}
          handleNext={handleNext}
          handleSaveDraft={handleSaveDraft}
          companyName={job.company?.name}
        />
      </form>
    </PageContainer>
  );
}

export default Apply;
