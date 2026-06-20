import {
  BookOpen,
  Briefcase,
  Compass,
  FileText,
  Lightbulb,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";

export const POST_PAGE_SIZE = 12;
export const RECRUITER_POST_PAGE_SIZE = 10;

export const POST_CATEGORIES = [
  "Định hướng nghề nghiệp",
  "Bí kíp tìm việc",
  "Chế độ lương thưởng",
  "Kiến thức chuyên ngành",
  "Hành trang nghề nghiệp",
  "Thị trường và xu hướng tuyển dụng",
];

export const POST_STATUS = [
  { label: "Công khai", value: true },
  { label: "Nháp", value: false },
];

export const POST_CATEGORY_OPTIONS = [
  { label: "Tất cả", value: "ALL" },
  ...POST_CATEGORIES.map((category) => ({ label: category, value: category })),
];

export const POST_STATUS_OPTIONS = [
  { label: "Tất cả", value: "ALL" },
  { label: "Công khai", value: "PUBLISHED" },
  { label: "Nháp", value: "DRAFT" },
];

export const EMPTY_POST_FORM = {
  title: "",
  excerpt: "",
  content: "",
  coverUrl: "",
  category: POST_CATEGORIES[0],
  authorName: "",
  isPublished: true,
  contentFormat: "HTML",
};

export const POST_TOOLBAR_ITEMS = [
  { key: "bold", label: "B" },
  { key: "italic", label: "I" },
  { key: "heading2", label: "H2" },
  { key: "heading3", label: "H3" },
  { key: "bulletList", label: "•" },
  { key: "orderedList", label: "1." },
];

export const POST_RESOURCE_LINKS = [
  { label: "Sơ yếu lý lịch", icon: FileText },
  { label: "Hồ sơ xin việc", icon: Briefcase },
  { label: "Mẫu đơn xin việc", icon: FileText },
  { label: "Cách viết CV", icon: BookOpen },
  { label: "Cách gửi Email xin việc", icon: Lightbulb },
  { label: "Giới thiệu bản thân khi phỏng vấn", icon: Compass },
  { label: "Câu hỏi phỏng vấn", icon: ShieldCheck },
];

export const POST_HERO_FLOATING_CARDS = [
  { label: "Kiến thức chuyên ngành", icon: BookOpen },
  { label: "Bí kíp tìm việc", icon: Lightbulb },
  { label: "Xu hướng tuyển dụng", icon: TrendingUp },
  { label: "Định hướng nghề nghiệp", icon: Compass },
];
