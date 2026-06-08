import { useState, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { toast } from "sonner";
import { useGetJobByIdQuery } from "@/services/job.service";
import { useApplyJobMutation } from "@/services/application.service";
import { useGetMyCoverLettersQuery } from "@/services/coverLetter.service";
import { useGetMyCvsQuery } from "@/services/cv.service";
import { useGenerateCoverLetterMutation } from "@/services/chat.service";

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
  };
}
