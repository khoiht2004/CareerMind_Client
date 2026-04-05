import {
  Clock,
  CheckCircle2,
  XCircle,
  BriefcaseBusiness,
  BotMessageSquare,
  User,
  BarChart3,
  FileText,
} from "lucide-react";
import { path } from "../path";

// ─── Job Management ────────────────────────────────────────────────────────────

export const RECRUITER_NAV_ITEMS = [
  { to: path.recruiter.stats, icon: BarChart3, label: "Thống kê" },
  {
    to: path.recruiter.jobs,
    icon: BriefcaseBusiness,
    label: "Quản lý việc làm",
  },
  { to: path.recruiter.applications, icon: FileText, label: "Đơn ứng tuyển" },
  { to: path.chatbot, icon: BotMessageSquare, label: "Trợ lý AI" },
  { to: path.profile, icon: User, label: "Hồ sơ" },
];

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
  PUBLISHED: "bg-green-100 text-green-700 border-green-200",
  DRAFT: "bg-gray-100 text-gray-600 border-gray-200",
  CLOSED: "bg-red-100 text-red-600 border-red-200",
};

export const EMPTY_JOB_FORM = {
  title: "",
  company: "",
  location: "",
  description: "",
  salary: "",
  type: "FULL_TIME",
  level: "",
  slots: 1,
  tags: "",
  benefits: "",
  status: "PUBLISHED",
  isHot: false,
  deadline: "",
};

// ─── Application Management ────────────────────────────────────────────────────

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

// ─── Stats Display ─────────────────────────────────────────────────────────────

export const APP_STATUS_DISPLAY_CONFIG = [
  {
    key: "PENDING",
    label: "Chờ xét duyệt",
    icon: Clock,
    color: "text-gray-500",
    bg: "bg-gray-50",
  },
  {
    key: "REVIEWING",
    label: "Đang xem xét",
    icon: Clock,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    key: "INTERVIEW",
    label: "Phỏng vấn",
    icon: CheckCircle2,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    key: "ACCEPTED",
    label: "Đã nhận",
    icon: CheckCircle2,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    key: "REJECTED",
    label: "Từ chối",
    icon: XCircle,
    color: "text-red-500",
    bg: "bg-red-50",
  },
];

export const JOB_STATUS_DISPLAY_CONFIG = [
  {
    key: "PUBLISHED",
    label: "Đang tuyển",
    color: "bg-green-100 text-green-700",
  },
  { key: "DRAFT", label: "Nháp", color: "bg-gray-100 text-gray-600" },
  { key: "CLOSED", label: "Đã đóng", color: "bg-red-100 text-red-600" },
];

export const JOB_TYPE_LABELS = {
  FULL_TIME: "Toàn thời gian",
  PART_TIME: "Bán thời gian",
  REMOTE: "Remote",
  INTERNSHIP: "Thực tập",
  CONTRACT: "Hợp đồng",
};
