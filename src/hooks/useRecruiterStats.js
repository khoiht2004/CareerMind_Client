import { useState } from "react";
import {
  BriefcaseBusiness,
  FileText,
  CheckCircle2,
  MessagesSquare,
} from "lucide-react";
import { useGetMyStatsQuery, useGetMyJobsQuery } from "@/services/job.service";

export const STAT_CARD_CONFIG = [
  {
    id: "totalJobs",
    icon: BriefcaseBusiness,
    label: "Tổng việc làm",
    bgColor: "bg-primary/20",
    borderColor: "border-primary",
    trend: "up",
    getValue: (s) => s?.totalJobs,
  },
  {
    id: "totalApplications",
    icon: FileText,
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

export function useRecruiterStats() {
  const [jobsPage, setJobsPage] = useState(1);
  const [jobStatusFilter, setJobStatusFilter] = useState("ALL");

  const { data: statsData, isLoading: statsLoading } = useGetMyStatsQuery();
  const { data: jobsData, isLoading: jobsLoading } = useGetMyJobsQuery({
    page: jobsPage,
    limit: 5,
    status: jobStatusFilter !== "ALL" ? jobStatusFilter : undefined,
  });

  const stats = statsData?.data;
  const jobs = jobsData?.data?.jobs ?? [];
  const jobsTotalPages = jobsData?.data?.totalPages ?? 1;
  const jobsTotal = jobsData?.data?.total ?? 0;

  return {
    stats,
    statsLoading,
    jobs,
    jobsLoading,
    jobsPage,
    setJobsPage,
    jobsTotalPages,
    jobsTotal,
    jobStatusFilter,
    setJobStatusFilter,
  };
}
