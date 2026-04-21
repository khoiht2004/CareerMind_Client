import { useState } from "react";
import { toast } from "sonner";
import {
  useCreateJobMutation,
  useUpdateJobMutation,
} from "@/services/job.service";
import { EMPTY_JOB_FORM } from "@/config/constants/recruiter.constant";
import { convertArray } from "@/utils/helper";

export function useJobForm() {
  const [form, setForm] = useState(EMPTY_JOB_FORM);
  const [editJob, setEditJob] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const [createJob, { isLoading: creating }] = useCreateJobMutation();
  const [updateJob, { isLoading: updating }] = useUpdateJobMutation();

  const openCreate = () => {
    setEditJob(null);
    setForm(EMPTY_JOB_FORM);
    setDialogOpen(true);
  };

  const openEdit = (job) => {
    setEditJob(job);
    setForm({
      title: job.title,
      location: job.location,
      description: job.description,
      salary: job.salary ?? "",
      type: job.type,
      level: job.level ?? "",
      slots: job.slots,
      tags: job.tags,
      benefits:
        Array.isArray(job.benefits) && job.benefits.length > 0
          ? job.benefits
          : [{ icon: "", label: "", content: "" }],
      requirements:
        Array.isArray(job.requirements) && job.requirements.length > 0
          ? job.requirements
          : [{ label: "", content: "" }],
      status: job.status,
      isHot: job.isHot,
      deadline: job.deadline ? job.deadline.slice(0, 10) : "",
    });
    setDialogOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      slots: +form.slots,
      tags: convertArray(form.tags),
      benefits: form.benefits.filter((benefit) => benefit.label || benefit.content || benefit.icon),
      requirements: form.requirements.filter((requirement) => requirement.label || requirement.content),
      deadline: form.deadline || undefined,
    };
    try {
      if (editJob) {
        await updateJob({ id: editJob.id, ...payload }).unwrap();
        toast.success("Cập nhật việc làm thành công");
      } else {
        await createJob(payload).unwrap();
        toast.success("Tạo việc làm thành công");
      }
      setDialogOpen(false);
    } catch (err) {
      toast.error(err?.data?.message ?? "Có lỗi xảy ra");
    }
  };

  return {
    form,
    editJob,
    dialogOpen,
    setDialogOpen,
    openCreate,
    openEdit,
    handleChange,
    handleSelectChange,
    handleSubmit,
    isSaving: creating || updating,
  };
}
