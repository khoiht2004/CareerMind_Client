import { useParams } from "react-router";
import { useSelector } from "react-redux";
import {
  useGetJobByIdQuery,
  useCheckJobSavedQuery,
  useSaveJobMutation,
  useUnsaveJobMutation,
} from "@/services/job.service";
import { useCheckAppliedQuery } from "@/services/application.service";
import { JOB_TYPE_LABELS } from "@/config/constants/candidate.constant";
import { toast } from "sonner";

export function useJobDetail() {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  const { data: response, isLoading, isError } = useGetJobByIdQuery(id);
  const job = response?.data;

  const { data: savedData } = useCheckJobSavedQuery(id, { skip: !user });
  const isSaved = savedData?.data?.isSaved ?? false;

  const { data: appliedData } = useCheckAppliedQuery(id, { skip: !user });
  const hasApplied = appliedData?.data?.applied ?? false;

  const [saveJob, { isLoading: isSaving }] = useSaveJobMutation();
  const [unsaveJob, { isLoading: isUnsaving }] = useUnsaveJobMutation();

  const handleBookmark = async () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để lưu việc làm");
      return;
    }
    try {
      if (isSaved) {
        await unsaveJob(id).unwrap();
        toast.success("Đã bỏ lưu việc làm");
      } else {
        await saveJob(id).unwrap();
        toast.success("Đã lưu việc làm");
      }
    } catch {
      toast.error("Có lỗi xảy ra");
    }
  };

  const typeLabel = job ? (JOB_TYPE_LABELS[job.type] ?? job.type) : "";
  const tags = job?.tags ?? [];
  const benefits = job?.benefits ?? [];
  const requirements = job?.requirements ?? [];

  return {
    id,
    user,
    job,
    isLoading,
    isError,
    isSaved,
    hasApplied,
    isSaving,
    isUnsaving,
    handleBookmark,
    typeLabel,
    tags,
    benefits,
    requirements,
  };
}
