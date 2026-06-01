import { useState } from "react";
import { toast } from "sonner";
import { useUpdateApplicationStatusMutation } from "@/services/application.service";

const toDateStr = (iso) =>
  iso ? new Date(iso).toISOString().slice(0, 10) : "";

export function useApplicationUpdate() {
  const [selectedApp, setSelectedApp] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [note, setNote] = useState("");
  const [sendEmail, setSendEmail] = useState(true);
  const [interviewFields, setInterviewFields] = useState({
    interviewDate: "",
    interviewTime: "08:00",
    interviewFormat: "",
    interviewLocation: "",
    confirmDeadline: "",
  });
  const [acceptedFields, setAcceptedFields] = useState({
    startDate: "",
    startTime: "08:00",
    officeAddress: "",
  });

  const [updateStatus, { isLoading: updating }] =
    useUpdateApplicationStatusMutation();

  const openUpdate = (app) => {
    setSelectedApp(app);
    setNewStatus(app.status);
    setNote(app.note ?? "");
    setSendEmail(true);
    setInterviewFields({
      interviewDate: toDateStr(app.interview?.interviewDate),
      interviewTime: app.interview?.interviewTime || "08:00",
      interviewFormat: app.interview?.interviewFormat || "",
      interviewLocation: app.interview?.interviewLocation || "",
      confirmDeadline:
        toDateStr(app.interview?.confirmDeadline) ||
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
          .toISOString()
          .slice(0, 10),
    });
    setAcceptedFields({
      startDate: toDateStr(app.jobOffer?.startDate),
      startTime: app.jobOffer?.startTime || "08:00",
      officeAddress: app.jobOffer?.officeAddress || "",
    });
  };

  const handleInterviewFieldChange = (field, value) => {
    setInterviewFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleAcceptedFieldChange = (field, value) => {
    setAcceptedFields((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdate = async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const isPast = (dateStr) =>
      dateStr ? new Date(dateStr + "T00:00:00") < today : false;

    if (newStatus === "INTERVIEW") {
      if (isPast(interviewFields.interviewDate)) {
        toast.error("Ngày phỏng vấn không được trước ngày hiện tại");
        return;
      }
      if (isPast(interviewFields.confirmDeadline)) {
        toast.error("Hạn phản hồi không được trước ngày hiện tại");
        return;
      }
    }
    if (newStatus === "ACCEPTED" && isPast(acceptedFields.startDate)) {
      toast.error("Ngày bắt đầu không được trước ngày hiện tại");
      return;
    }

    try {
      const payload = {
        id: selectedApp.id,
        status: newStatus,
        note: note || undefined,
        sendEmail,
      };

      if (newStatus === "INTERVIEW") {
        if (interviewFields.interviewDate)
          payload.interviewDate = interviewFields.interviewDate;
        if (interviewFields.interviewTime)
          payload.interviewTime = interviewFields.interviewTime;
        if (interviewFields.interviewFormat)
          payload.interviewFormat = interviewFields.interviewFormat;
        if (interviewFields.interviewLocation)
          payload.interviewLocation = interviewFields.interviewLocation;
        if (interviewFields.confirmDeadline)
          payload.confirmDeadline = interviewFields.confirmDeadline;
      } else if (newStatus === "ACCEPTED") {
        if (acceptedFields.startDate)
          payload.startDate = acceptedFields.startDate;
        if (acceptedFields.startTime)
          payload.startTime = acceptedFields.startTime;
        if (acceptedFields.officeAddress)
          payload.officeAddress = acceptedFields.officeAddress;
      }

      await updateStatus(payload).unwrap();
      toast.success("Cập nhật trạng thái thành công");
      setSelectedApp(null);
    } catch {
      toast.error("Không thể cập nhật trạng thái");
    }
  };

  return {
    selectedApp,
    setSelectedApp,
    newStatus,
    setNewStatus,
    note,
    setNote,
    sendEmail,
    setSendEmail,
    interviewFields,
    acceptedFields,
    openUpdate,
    handleInterviewFieldChange,
    handleAcceptedFieldChange,
    handleUpdate,
    updating,
  };
}
