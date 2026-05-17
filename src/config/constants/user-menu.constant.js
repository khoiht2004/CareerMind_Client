import {
  BriefcaseBusiness,
  FileText,
  IdCard,
  Settings,
  UserRound,
} from "lucide-react";
import { path } from "@/config/path";

const profileTabPath = (tab) => `${path.profile}?tab=${tab}`;

export const USER_MENU_SECTIONS = [
  {
    title: "Quản lý tìm việc",
    icon: BriefcaseBusiness,
    // expanded: true,
    items: [
      { label: "Việc làm đã lưu", to: path.savedJobs },
      { label: "Việc làm đã ứng tuyển", to: profileTabPath("applications") },
      { label: "Việc làm phù hợp với bạn", to: path.notFound },
      { label: "Cài đặt gợi ý việc làm", to: profileTabPath("settings") },
    ],
  },
  {
    title: "Quản lý CV & Cover letter",
    icon: FileText,
    // expanded: true,
    items: [
      { label: "CV của tôi", to: profileTabPath("cv") },
      { label: "Cover Letter của tôi", to: profileTabPath("cover-letter") },
      { label: "Nhà tuyển dụng muốn kết nối với bạn", to: path.notFound },
      { label: "Nhà tuyển dụng xem hồ sơ", to: path.notFound },
    ],
  },
  {
    title: "Cài đặt email & thông báo",
    icon: Settings,
    items: [{ label: "Thiết lập thông báo", to: profileTabPath("settings") }],
  },
  {
    title: "Cá nhân & Bảo mật",
    icon: UserRound,
    items: [
      { label: "Cài đặt thông tin cá nhân", to: profileTabPath("profile") },
      { label: "Cài đặt bảo mật", to: path.notFound },
      { label: "Đổi mật khẩu", to: profileTabPath("settings") },
      { label: "Xác minh 2 bước (Chưa kích hoạt)", to: path.notFound },
    ],
  },
  {
    title: "Nâng cấp tài khoản",
    icon: IdCard,
    items: [
      { label: "Nâng cấp tài khoản VIP", to: path.aiPricing },
      { label: "Kích hoạt quà tặng", to: path.notFound },
    ],
  },
];
