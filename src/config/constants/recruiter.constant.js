import {
  Clock,
  CheckCircle2,
  XCircle,
  BriefcaseBusiness,
  BotMessageSquare,
  User,
  BarChart3,
  FileText,
  Compass,
  Building2,
} from "lucide-react";
import { path } from "../path";

export const RECRUITER_NAV_ITEMS = [
  { to: path.home, icon: Compass, label: "Kham pha", end: true },
  { to: path.recruiter.stats, icon: BarChart3, label: "Thong ke" },
  { to: path.recruiter.jobs, icon: BriefcaseBusiness, label: "Quan ly viec lam" },
  { to: path.recruiter.applications, icon: FileText, label: "Don ung tuyen" },
  { to: path.recruiter.company, icon: Building2, label: "Cong ty" },
  { to: path.chatbot, icon: BotMessageSquare, label: "AI Scout" },
  { to: path.profile, icon: User, label: "Ho so" },
];

export const JOB_STATUS_OPTIONS = [
  { label: "Tat ca", value: "ALL" },
  { label: "Cong khai", value: "PUBLISHED" },
  { label: "Nhap", value: "DRAFT" },
  { label: "Da dong", value: "CLOSED" },
];

export const JOB_STATUS_LABELS = {
  PUBLISHED: "Cong khai",
  DRAFT: "Nhap",
  CLOSED: "Da dong",
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
  level: "",
  slots: 1,
  tags: "",
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
  { label: "Tat ca trang thai", value: "ALL" },
  { label: "Cho xet duyet", value: "PENDING" },
  { label: "Dang xem xet", value: "REVIEWING" },
  { label: "Phong van", value: "INTERVIEW" },
  { label: "Da nhan", value: "ACCEPTED" },
  { label: "Tu choi", value: "REJECTED" },
];

export const VALID_APP_STATUSES = [
  "PENDING",
  "REVIEWING",
  "INTERVIEW",
  "ACCEPTED",
  "REJECTED",
];

export const APP_STATUS_DISPLAY_CONFIG = [
  { key: "PENDING", label: "Cho xet duyet", icon: Clock, dotVar: "--status-pending-text" },
  { key: "REVIEWING", label: "Dang xem xet", icon: Clock, dotVar: "--status-reviewing-text" },
  { key: "INTERVIEW", label: "Phong van", icon: CheckCircle2, dotVar: "--status-interview-text" },
  { key: "ACCEPTED", label: "Da nhan", icon: CheckCircle2, dotVar: "--status-accepted-text" },
  { key: "REJECTED", label: "Tu choi", icon: XCircle, dotVar: "--status-rejected-text" },
];

export const JOB_STATUS_DISPLAY_CONFIG = [
  {
    key: "PUBLISHED",
    label: "Dang tuyen",
    className:
      "bg-[var(--job-published-bg)] text-[var(--job-published-text)] border-[var(--job-published-border)]",
  },
  {
    key: "DRAFT",
    label: "Nhap",
    className:
      "bg-[var(--job-draft-bg)] text-[var(--job-draft-text)] border-[var(--job-draft-border)]",
  },
  {
    key: "CLOSED",
    label: "Da dong",
    className:
      "bg-[var(--job-closed-bg)] text-[var(--job-closed-text)] border-[var(--job-closed-border)]",
  },
];

export const JOB_TYPE_LABELS = {
  FULL_TIME: "Toan thoi gian",
  PART_TIME: "Ban thoi gian",
  REMOTE: "Remote",
  INTERNSHIP: "Thuc tap",
  CONTRACT: "Hop dong",
};
