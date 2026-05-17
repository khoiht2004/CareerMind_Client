import {
  Clock,
  XCircle,
  Compass,
  BotMessageSquare,
  User,
  BookmarkCheck,
  Eye,
  MessagesSquare,
  CircleCheck,
  Bell,
  Lock,
  Shield,
  LogOut,
  Headset,
  FileEdit,
  Building2,
} from "lucide-react";
import { path } from "../path";

export const CANDIDATE_NAV_ITEMS = [
  { to: path.home, icon: Compass, label: "Khám phá", end: true },
  { to: path.savedJobs, icon: BookmarkCheck, label: "Việc làm đã lưu" },
  { to: path.companies, icon: Building2, label: "Công ty" },
  { to: path.chatbot, icon: BotMessageSquare, label: "AI Scout" },
  { to: path.profile, icon: User, label: "Hồ sơ" },
];

export const INDUSTRY_OPTIONS = [
  { label: "Tất cả ngành nghề", value: "ALL" },
  { label: "Công nghệ thông tin", value: "IT" },
  { label: "Marketing/PR", value: "Marketing" },
  { label: "Kinh doanh/Bán hàng", value: "Sales" },
  { label: "Tài chính/Ngân hàng", value: "Finance" },
  { label: "Nhân sự", value: "HR" },
  { label: "Vận hành", value: "Operations" },
];

export const SALARY_OPTIONS = [
  { label: "Tất cả mức lương", value: "ALL" },
  { label: "Dưới 10 triệu", value: "10" },
  { label: "10 - 20 triệu", value: "20" },
  { label: "20 - 30 triệu", value: "30" },
  { label: "Thỏa thuận", value: "Thoa thuan" },
];

export const COMPANY_SIZE_OPTIONS = [
  { label: "Tất cả quy mô", value: "ALL" },
  { label: "1-50 nhân viên", value: "1-50" },
  { label: "51-200 nhân viên", value: "51-200" },
  { label: "201-1000 nhân viên", value: "201-1000" },
  { label: "1000+ nhân viên", value: "1000+" },
];

export const PROFILE_TABS = [
  { key: "profile", label: "Hồ sơ của tôi" },
  { key: "applications", label: "Đơn ứng tuyển" },
  { key: "cv", label: "CV của tôi" },
  { key: "cover-letter", label: "Thư xin việc" },
  { key: "chatbot", label: "Chatbot của tôi" },
  { key: "insights", label: "Phân tích hồ sơ" },
  { key: "settings", label: "Cài đặt" },
];

export const APPLICATION_STATUS_LABELS = {
  DRAFT: "Bản nháp",
  PENDING: "Chờ xét duyệt",
  REVIEWING: "Đang xem xét",
  INTERVIEW: "Phỏng vấn",
  ACCEPTED: "Đã nhận",
  REJECTED: "Từ chối",
};

export const STATUS_CONFIG = {
  DRAFT: {
    icon: FileEdit,
    className:
      "bg-[var(--status-draft-bg,#f3f4f6)] text-[var(--status-draft-text,#6b7280)] border-[var(--status-draft-border,#d1d5db)]",
  },
  PENDING: {
    icon: Clock,
    className:
      "bg-[var(--status-pending-bg)] text-[var(--status-pending-text)] border-[var(--status-pending-border)]",
  },
  REVIEWING: {
    icon: Eye,
    className:
      "bg-[var(--status-reviewing-bg)] text-[var(--status-reviewing-text)] border-[var(--status-reviewing-border)]",
  },
  INTERVIEW: {
    icon: MessagesSquare,
    className:
      "bg-[var(--status-interview-bg)] text-[var(--status-interview-text)] border-[var(--status-interview-border)]",
  },
  ACCEPTED: {
    icon: CircleCheck,
    className:
      "bg-[var(--status-accepted-bg)] text-[var(--status-accepted-text)] border-[var(--status-accepted-border)]",
  },
  REJECTED: {
    icon: XCircle,
    className:
      "bg-[var(--status-rejected-bg)] text-[var(--status-rejected-text)] border-[var(--status-rejected-border)]",
  },
};

export const JOB_TYPE_LABELS = {
  FULL_TIME: "Toàn thời gian",
  PART_TIME: "Bán thời gian",
  REMOTE: "Remote",
  INTERNSHIP: "Thực tập",
  CONTRACT: "Hợp đồng",
};

export const JOB_TYPE_OPTIONS = [
  { label: "Tất cả loại hình", value: "ALL" },
  { label: "Toàn thời gian", value: "FULL_TIME" },
  { label: "Bán thời gian", value: "PART_TIME" },
  { label: "Remote", value: "REMOTE" },
  { label: "Thực tập", value: "INTERNSHIP" },
  { label: "Hợp đồng", value: "CONTRACT" },
];

export const LOCATION_OPTIONS = [
  { label: "Tất cả địa điểm", value: "ALL" },
  { label: "TP. Hồ Chí Minh", value: "TP. Hồ Chí Minh" },
  { label: "Hà Nội", value: "Hà Nội" },
  { label: "Đà Nẵng", value: "Đà Nẵng" },
  { label: "Remote", value: "Remote" },
];

export const EXP_LEVEL_OPTIONS = [
  { label: "Mới đi làm", value: "ENTRY" },
  { label: "Trung cấp / Cao cấp", value: "MID_SENIOR" },
  { label: "Giám đốc", value: "DIRECTOR" },
];

export const JOB_SORT_OPTIONS = [
  { label: "Mới nhất", value: "newest" },
  { label: "Cũ nhất", value: "oldest" },
  { label: "Lương cao nhất", value: "salary_desc" },
];

export const APPLICATION_STATUS_FILTER_OPTIONS = [
  { label: "Tất cả trạng thái", value: "ALL" },
  ...Object.entries(APPLICATION_STATUS_LABELS).map(([value, label]) => ({
    value,
    label,
  })),
];

export const APPLICATION_DATE_RANGE_OPTIONS = [
  { label: "7 ngày qua", value: "7" },
  { label: "30 ngày qua", value: "30" },
  { label: "90 ngày qua", value: "90" },
  { label: "Tất cả thời gian", value: "0" },
];

export const SETTINGS_SIDEBAR_ITEMS = [
  { id: "personal", label: "Thông tin cá nhân", icon: User },
  { id: "notifications", label: "Thông báo", icon: Bell },
  { id: "security", label: "Đổi mật khẩu", icon: Lock },
  { id: "privacy", label: "Quyền riêng tư", icon: Shield },
];

export const AI_INTEREST_OPTIONS = [
  "Phát triển Phần mềm",
  "Thiết kế UI/UX",
  "Marketing Dược",
  "Quản trị Dự án",
  "Data Science",
  "Sales & Business",
];

export const AI_LOCATION_OPTIONS = [
  "TP. Hồ Chí Minh",
  "Hà Nội",
  "Đà Nẵng",
  "Từ xa",
];
