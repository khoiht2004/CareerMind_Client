import {
  Clock,
  CheckCircle2,
  XCircle,
  UserRoundSearch,
} from "lucide-react";
import { path } from "../path";

export const RECRUITER_MENU_SECTIONS = {
  title: "Dành cho nhà tuyển dụng",
  icon: UserRoundSearch,
  items: [
    { to: path.recruiter.stats, label: "Thống kê" },
    { to: path.recruiter.jobs, label: "Quản lý việc làm" },
    { to: path.recruiter.applications, label: "Quản lý đơn ứng tuyển" },
    { to: path.recruiter.company, label: "Quản lý công ty" },
  ]
};

export const JOB_STATUS_OPTIONS = [
  { label: "Tất cả", value: "ALL" },
  { label: "Công khai", value: "PUBLISHED" },
  { label: "Nháp", value: "DRAFT" },
  { label: "Đã đóng", value: "CLOSED" },
];

export const JOB_STATUS_LABELS = {
  PUBLISHED: "Công khai",
  DRAFT: "Nháp",
  CLOSED: "Đã đóng",
};

export const JOB_STATUS_BADGE = {
  PUBLISHED:
    "bg-[var(--job-published-bg)] text-[var(--job-published-text)] border-[var(--job-published-border)]",
  DRAFT: "bg-[var(--job-draft-bg)] text-[var(--job-draft-text)] border-[var(--job-draft-border)]",
  CLOSED:
    "bg-[var(--job-closed-bg)] text-[var(--job-closed-text)] border-[var(--job-closed-border)]",
};

export const EMPTY_JOB_FORM = {
  title: "",
  location: "",
  description: "",
  requirements: [{ label: "", content: "" }],
  salary: "",
  type: "FULL_TIME",
  level: "ALL",
  slots: 1,
  tags: "",
  industry: "",
  benefits: [{ icon: "", label: "", content: "" }],
  status: "PUBLISHED",
  isHot: false,
  deadline: "",
};

export const JOB_STATUS_DOT = {
  PUBLISHED: "var(--status-published)",
  DRAFT: "var(--status-draft)",
  CLOSED: "var(--status-closed)",
};

export const APP_STATUS_FILTER_OPTIONS = [
  { label: "Tất cả trạng thái", value: "ALL" },
  { label: "Chờ xét duyệt", value: "PENDING" },
  { label: "Đang xem xét", value: "REVIEWING" },
  { label: "Phỏng vấn", value: "INTERVIEW" },
  { label: "Đã nhận", value: "ACCEPTED" },
  { label: "Từ chối", value: "REJECTED" },
];

export const VALID_APP_STATUSES = [
  "PENDING",
  "REVIEWING",
  "INTERVIEW",
  "ACCEPTED",
  "REJECTED",
];

export const APP_STATUS_DISPLAY_CONFIG = [
  { key: "PENDING", label: "Chờ xét duyệt", icon: Clock, dotVar: "--status-pending-text" },
  { key: "REVIEWING", label: "Đang xem xét", icon: Clock, dotVar: "--status-reviewing-text" },
  { key: "INTERVIEW", label: "Phỏng vấn", icon: CheckCircle2, dotVar: "--status-interview-text" },
  { key: "ACCEPTED", label: "Đã nhận", icon: CheckCircle2, dotVar: "--status-accepted-text" },
  { key: "REJECTED", label: "Từ chối", icon: XCircle, dotVar: "--status-rejected-text" },
];

export const JOB_STATUS_DISPLAY_CONFIG = [
  {
    key: "PUBLISHED",
    label: "Đang tuyển",
    className:
      "bg-[var(--job-published-bg)] text-[var(--job-published-text)] border-[var(--job-published-border)]",
  },
  {
    key: "DRAFT",
    label: "Nháp",
    className:
      "bg-[var(--job-draft-bg)] text-[var(--job-draft-text)] border-[var(--job-draft-border)]",
  },
  {
    key: "CLOSED",
    label: "Đã đóng",
    className:
      "bg-[var(--job-closed-bg)] text-[var(--job-closed-text)] border-[var(--job-closed-border)]",
  },
];

export const JOB_TYPE_LABELS = {
  FULL_TIME: "Toàn thời gian",
  PART_TIME: "Bán thời gian",
  REMOTE: "Remote",
  INTERNSHIP: "Thực tập",
  CONTRACT: "Hợp đồng",
};
