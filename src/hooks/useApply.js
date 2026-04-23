import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useGetJobByIdQuery } from "@/services/job.service";
import { useApplyJobMutation } from "@/services/application.service";
import { useGetMyCoverLettersQuery } from "@/services/coverLetter.service";
import { useGetMyCvsQuery } from "@/services/cv.service";

export function useApply() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: jobData } = useGetJobByIdQuery(id);
  const [applyJob, { isLoading }] = useApplyJobMutation();
  const { data: coverLettersData } = useGetMyCoverLettersQuery();
  const { data: myCvsData } = useGetMyCvsQuery();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedin: "",
    coverLetter: "",
  });
  const [coverLetterOpen, setCoverLetterOpen] = useState(false);
  const [cvPickerOpen, setCvPickerOpen] = useState(false);
  const [selectedCvId, setSelectedCvId] = useState(null);
  const [manualCvUrl, setManualCvUrl] = useState("");
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let cvUrl, cvId;
    if (selectedCv) {
      cvId = selectedCv.id;
      cvUrl = selectedCv.fileUrl;
    } else if (manualCvUrl.trim()) {
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

  return {
    id,
    navigate,
    job,
    isLoading,
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
  };
}
