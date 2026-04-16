import {
  CheckCircle2,
  Clock,
  XCircle,
  Compass,
  BotMessageSquare,
  User,
  BookmarkCheck,
} from "lucide-react";
import { path } from "../path";

export const CANDIDATE_NAV_ITEMS = [
  { to: path.home, icon: Compass, label: "Khám phá", end: true },
  { to: path.savedJobs, icon: BookmarkCheck, label: "Việc làm đã lưu" },
  { to: path.chatbot, icon: BotMessageSquare, label: "Trợ lý AI" },
  { to: path.profile, icon: User, label: "Hồ sơ" },
];

export const PROFILE_TABS = [
  { key: "profile", label: "Hồ sơ của tôi" },
  { key: "applications", label: "Đơn ứng tuyển" },
  { key: "cv", label: "CV của tôi" },
  { key: "cover-letter", label: "Thư xin việc" },
  { key: "chatbot", label: "Chatbot của tôi" },
  { key: "settings", label: "Cài đặt" },
];

export const APPLICATION_STATUS_LABELS = {
  PENDING: "Chờ xét duyệt",
  REVIEWING: "Đang xem xét",
  INTERVIEW: "Phỏng vấn",
  ACCEPTED: "Đã nhận",
  REJECTED: "Từ chối",
};

export const STATUS_CONFIG = {
  PENDING: {
    icon: Clock,
    className: "bg-gray-100 text-gray-600 border-gray-300",
  },
  REVIEWING: {
    icon: Clock,
    className: "bg-yellow-100 text-yellow-700 border-yellow-200",
  },
  INTERVIEW: {
    icon: CheckCircle2,
    className: "bg-blue-100 text-blue-700 border-blue-200",
  },
  ACCEPTED: {
    icon: CheckCircle2,
    className: "bg-green-100 text-green-700 border-green-200",
  },
  REJECTED: {
    icon: XCircle,
    className: "bg-red-100 text-red-700 border-red-200",
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
  { label: "TP. Hồ Chí Minh", value: "Hồ Chí Minh" },
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
