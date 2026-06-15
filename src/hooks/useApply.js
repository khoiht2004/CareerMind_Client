import { useState, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { toast } from "sonner";
import { useGetJobByIdQuery } from "@/services/job.service";
import { useApplyJobMutation } from "@/services/application.service";
import { useGetMyCoverLettersQuery } from "@/services/coverLetter.service";
import { useGetMyCvsQuery, useUploadCvMutation } from "@/services/cv.service";
import { useGenerateCoverLetterMutation } from "@/services/chat.service";
import { ALLOWED_TYPES } from "@/config/constants/constants";

export const MAX_CV_SIZE_MB = 5;
const MAX_CV_SIZE_BYTES = MAX_CV_SIZE_MB * 1024 * 1024;

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

  const [uploadCv, { isLoading: isUploading }] = useUploadCvMutation();

  const [currentStep, setCurrentStep] = useState(1);
  const [dragging, setDragging] = useState(false);

  const [formData, setFormData] = useState({
    name: draft?.user?.profile?.fullName ?? "",
    email: draft?.user?.email ?? "",
    phone: draft?.phone ?? "",
    linkedin: "",
    coverLetter: draft?.coverLetter ?? "",
  });
  const [coverLetterOpen, setCoverLetterOpen] = useState(false);
  const [cvPickerOpen, setCvPickerOpen] = useState(false);
  // Pre-select the CV that was saved in the draft
  const [selectedCvId, setSelectedCvId] = useState(draft?.cvId ?? null);
  // Pre-fill manual URL only when draft has a URL but no linked CV
  const [manualCvUrl, setManualCvUrl] = useState(
    !draft?.cvId && draft?.cvUrl ? draft.cvUrl : "",
  );
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const job = jobData?.data;
  const coverLetters = coverLettersData?.data ?? [];
  const myCvs = myCvsData?.data ?? [];
  const defaultCv = myCvs.find((cv) => cv.isDefault) ?? myCvs[0] ?? null;
  const effectiveSelectedCvId = selectedCvId ?? defaultCv?.id ?? null;
  const selectedCv = myCvs.find((cv) => cv.id === effectiveSelectedCvId) ?? null;

  const validateFile = useCallback((file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Chỉ chấp nhận file PDF, DOC, DOCX");
      return false;
    }
    if (file.size > MAX_CV_SIZE_BYTES) {
      toast.error(`File phải nhỏ hơn ${MAX_CV_SIZE_MB}MB`);
      return false;
    }
    return true;
  }, []);

  const handleUpload = useCallback(async (file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("cv", file);
    formData.append("name", file.name.replace(/\.[^.]+$/, ""));
    try {
      const res = await uploadCv(formData).unwrap();
      toast.success("Tải lên CV thành công!");
      const newCvId = res?.data?.id ?? res?.id;
      if (newCvId) {
        setSelectedCvId(newCvId);
      }
    } catch (err) {
      toast.error(err?.data?.message || "Tải lên thất bại, vui lòng thử lại");
    }
  }, [uploadCv]);

  const handleFileSelect = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      if (file && validateFile(file)) {
        await handleUpload(file);
      }
      e.target.value = "";
    },
    [validateFile, handleUpload],
  );

  const handleDrop = useCallback(
    async (e) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files?.[0];
      if (file && validateFile(file)) {
        await handleUpload(file);
      }
    },
    [validateFile, handleUpload],
  );

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => setDragging(false), []);

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

  const doSubmit = useCallback(
    async (isDraft) => {
      let cvUrl, cvId;
      if (selectedCv) {
        cvId = selectedCv.id;
        cvUrl = selectedCv.fileUrl;
      } else if (manualCvUrl.trim()) {
        cvUrl = manualCvUrl.trim();
      }
      try {
        await applyJob({ jobId: id, ...formData, cvUrl, cvId, isDraft }).unwrap();
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
    [selectedCv, manualCvUrl, applyJob, id, formData, navigate],
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
    currentStep,
    setCurrentStep,
    dragging,
    isUploading,
    handleFileSelect,
    handleDrop,
    handleDragOver,
    handleDragLeave,
    setSelectedCvId,
  };
}
