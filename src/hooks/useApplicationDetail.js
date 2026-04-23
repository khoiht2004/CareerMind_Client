import { useState, useMemo } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import {
  useGetApplicationByIdQuery,
  useUpdateApplicationStatusMutation,
} from "@/services/application.service";

export function useApplicationDetail() {
  const { id } = useParams();
  const { data: response, isLoading, isError } = useGetApplicationByIdQuery(id);
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateApplicationStatusMutation();
  const [cvPreviewOpen, setCvPreviewOpen] = useState(false);

  const application = response?.data;

  const cvFile = useMemo(() => {
    if (!application) return null;
    return (
      application.cv ??
      (application.cvUrl
        ? {
            name: "CV đính kèm",
            fileUrl: application.cvUrl,
            fileType: application.cvUrl.endsWith(".pdf") ? "pdf" : null,
          }
        : null)
    );
  }, [application]);

  const handleQuickApprove = async () => {
    try {
      await updateStatus({ id: application.id, status: "ACCEPTED" }).unwrap();
      toast.success("Đã phê duyệt ứng viên");
    } catch (err) {
      toast.error(err?.data?.message || "Có lỗi xảy ra");
    }
  };

  return {
    application,
    isLoading,
    isError,
    cvFile,
    cvPreviewOpen,
    openCvPreview: () => setCvPreviewOpen(true),
    closeCvPreview: () => setCvPreviewOpen(false),
    handleQuickApprove,
    isUpdating,
  };
}
