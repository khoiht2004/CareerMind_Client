import { useState, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { toast } from "sonner";
import { useGetJobByIdQuery } from "@/services/job.service";
import { useApplyJobMutation } from "@/services/application.service";
import { useGetMyCoverLettersQuery } from "@/services/coverLetter.service";
import { useGetMyCvsQuery, useUploadCvMutation } from "@/services/cv.service";
import { useGenerateCoverLetterMutation } from "@/services/chat.service";
import { applyPersonalInfoSchema } from "@/validations/apply.shema";
import { useCvUpload } from "@/hooks/useCvUpload";

export function useApply() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Pre-fill from draft if user navigated from draft card
  const draft = location.state?.draft ?? null;

  const { data: jobData } = useGetJobByIdQuery(id);
  const [applyJob, { isLoading }] = useApplyJobMutation();
  const [generateCoverLetterAI, { isLoading: isGeneratingCL }] =
    useGenerateCoverLetterMutation();
  const { data: coverLettersData } = useGetMyCoverLettersQuery();
  const { data: myCvsData } = useGetMyCvsQuery();
  const [uploadCv, { isLoading: isUploadingCv }] = useUploadCvMutation();

  const [formData, setFormData] = useState({
    name: draft?.user?.profile?.fullName ?? "",
    email: draft?.user?.email ?? "",
    phone: draft?.phone ?? "",
    linkedin: "",
    coverLetter: draft?.coverLetter ?? "",
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [coverLetterOpen, setCoverLetterOpen] = useState(false);
  const [cvPickerOpen, setCvPickerOpen] = useState(false);
  // Pre-select the CV that was saved in the draft
  const [selectedCvId, setSelectedCvId] = useState(draft?.cvId ?? null);
  // Pre-fill manual URL only when draft has a URL but no linked CV
  const [manualCvUrl, setManualCvUrl] = useState(
    !draft?.cvId && draft?.cvUrl ? draft.cvUrl : "",
  );
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [cvSource, setCvSource] = useState(
    draft?.cvUrl && !draft?.cvId ? "link" : "library",
  );

  const job = jobData?.data;
  const coverLetters = coverLettersData?.data ?? [];
  const myCvs = myCvsData?.data ?? [];
  const defaultCv = myCvs.find((cv) => cv.isDefault) ?? myCvs[0] ?? null;
  const effectiveSelectedCvId = selectedCvId ?? defaultCv?.id ?? null;
  const selectedCv =
    myCvs.find((cv) => cv.id === effectiveSelectedCvId) ?? null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectCoverLetter = (cl) => {
    setFormData((prev) => ({ ...prev, coverLetter: cl.content }));
    setCoverLetterOpen(false);
  };

  const handleSelectCv = (cv) => {
    setSelectedCvId(cv.id);
    setCvPickerOpen(false);
  };

  const {
    dragging,
    pendingFile,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleCancelPending,
    handleUpload,
  } = useCvUpload(uploadCv, (res) => {
    if (res?.data?.id) {
      setSelectedCvId(res.data.id);
      setCvSource("library");
    }
  });

  const handleNext = useCallback(() => {
    if (currentStep === 1) {
      const result = applyPersonalInfoSchema.safeParse(formData);
      if (!result.success) {
        const firstError =
          result.error.issues[0]?.message || "Thông tin không hợp lệ";
        toast.error(firstError);
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  }, [currentStep, formData]);

  const handleBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const doSubmit = useCallback(
    async (isDraft) => {
      if (!isDraft) {
        const result = applyPersonalInfoSchema.safeParse(formData);
        if (!result.success) {
          const firstError =
            result.error.issues[0]?.message || "Thông tin không hợp lệ";
          toast.error(firstError);
          return;
        }
      }
      let cvUrl, cvId;
      if (cvSource === "library" && selectedCv) {
        cvId = selectedCv.id;
        cvUrl = selectedCv.fileUrl;
      } else if (cvSource === "link" && manualCvUrl.trim()) {
        cvUrl = manualCvUrl.trim();
      }
      try {
        await applyJob({
          jobId: id,
          ...formData,
          cvUrl,
          cvId,
          isDraft,
        }).unwrap();
        if (isDraft) {
          toast.success("Đã lưu bản nháp thành công");
        } else {
          toast.success("Ứng tuyển thành công! Chúng tôi sẽ liên hệ bạn sớm.");
        }
      } catch (error) {
        toast.error(error?.data?.message || "Có lỗi xảy ra khi ứng tuyển");
      } finally {
        navigate(-1);
      }
    },
    [selectedCv, manualCvUrl, cvSource, applyJob, id, formData, navigate],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    await doSubmit(false);
  };

  const handleSaveDraft = useCallback(async () => {
    await doSubmit(true);
  }, [doSubmit]);

  const handleGenerateCoverLetter = useCallback(async () => {
    try {
      const res = await generateCoverLetterAI({ jobId: id }).unwrap();
      setFormData((prev) => ({ ...prev, coverLetter: res.data.coverLetter }));
      toast.success("AI đã tạo cover letter cho bạn");
    } catch {
      toast.error("Không thể tạo cover letter, vui lòng thử lại");
    }
  }, [generateCoverLetterAI, id]);

  return {
    id,
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
    currentStep,
    isUploadingCv,
    cvSource,
    setCvSource,
    // Drag & drop upload state & handlers
    dragging,
    pendingFile,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    handleCancelPending,
    handleUpload,
    setCurrentStep,
    handleNext,
    handleBack,
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
  };
}
