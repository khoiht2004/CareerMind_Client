import { useState } from "react";
import { toast } from "sonner";
import {
  useGetMyJobsQuery,
  useDeleteJobMutation,
  useGetMyStatsQuery,
} from "@/services/job.service";
import { useJobForm } from "@/hooks/useJobForm";
import { BriefcaseBusiness, CheckCircle2, MessagesSquare, Users } from "lucide-react";

const PAGE_SIZE = 10;

export const JOB_CARD_CONFIG = [
  {
    id: "totalJobs",
    icon: BriefcaseBusiness,
    label: "Tổng việc tuyển dụng",
    bgColor: "bg-primary/20",
    borderColor: "border-primary",
    trend: "up",
    getValue: (s) => s?.totalJobs,
  },
  {
    id: "totalApplications",
    icon: Users,
    label: "Tổng đơn ứng tuyển",
    bgColor: "bg-secondary/20",
    borderColor: "border-secondary",
    trend: "up",
    getValue: (s) => s?.totalApplications,
  },
  {
    id: "accepted",
    icon: CheckCircle2,
    label: "Đã chấp nhận",
    bgColor: "bg-status-accepted-bg",
    borderColor: "border-status-accepted-border",
    trend: "down",
    getValue: (s) => s?.appsByStatus?.ACCEPTED,
  },
  {
    id: "interview",
    icon: MessagesSquare,
    label: "Đang phỏng vấn",
    bgColor: "bg-status-interview-bg",
    borderColor: "border-status-interview-border",
    trend: "up",
    getValue: (s) => s?.appsByStatus?.INTERVIEW,
  },
];

export function useRecruiterJobs() {
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ search: "", status: "ALL", page: 1 });
  const [deleteId, setDeleteId] = useState(null);

  const { data, isLoading } = useGetMyJobsQuery({
    search: filters.search || undefined,
    status: filters.status !== "ALL" ? filters.status : undefined,
    page: filters.page,
    limit: PAGE_SIZE,
  });

  const { data: statsData } = useGetMyStatsQuery();
  const [deleteJob, { isLoading: deleting }] = useDeleteJobMutation();
  const jobForm = useJobForm();

  const jobs = data?.data?.jobs ?? [];
  const total = data?.data?.total ?? 0;
  const totalPages = data?.data?.totalPages ?? 1;
  const from = total === 0 ? 0 : (filters.page - 1) * PAGE_SIZE + 1;
  const to = Math.min(filters.page * PAGE_SIZE, total);
  const stats = statsData?.data;

  const handleDelete = async () => {
    try {
      await deleteJob(deleteId).unwrap();
      toast.success("Đã xóa việc làm");
      setDeleteId(null);
    } catch {
      toast.error("Không thể xóa việc làm");
    }
  };

  const setSearch = (value) =>
    setFilters((f) => ({ ...f, search: value, page: 1 }));

  const setStatusFilter = (value) =>
    setFilters((f) => ({ ...f, status: value, page: 1 }));

  const setPage = (page) => setFilters((f) => ({ ...f, page }));

  return {
    // filter state
    filterOpen,
    setFilterOpen,
    filters,
    setSearch,
    setStatusFilter,
    setPage,
    // delete state
    deleteId,
    setDeleteId,
    deleting,
    handleDelete,
    // data
    jobs,
    total,
    totalPages,
    from,
    to,
    stats,
    isLoading,
    // form
    ...jobForm,
  };
}
