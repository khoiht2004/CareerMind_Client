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

export const POST_BANNER_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='720' height='480' viewBox='0 0 720 480'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' x2='1' y1='0' y2='1'%3E%3Cstop stop-color='%2300b14f'/%3E%3Cstop offset='1' stop-color='%2300472b'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='720' height='480' rx='28' fill='url(%23g)'/%3E%3Ccircle cx='590' cy='88' r='92' fill='%23ffffff' opacity='.12'/%3E%3Ccircle cx='88' cy='396' r='136' fill='%23ffffff' opacity='.1'/%3E%3Cpath d='M112 126h312v42H112zM112 198h496v28H112zM112 252h410v28H112z' fill='%23fff' opacity='.9'/%3E%3Crect x='112' y='330' width='190' height='58' rx='29' fill='%23fff'/%3E%3Cpath d='M515 313l68 40-68 40z' fill='%23fff' opacity='.95'/%3E%3Ctext x='112' y='100' font-family='Arial' font-size='38' font-weight='700' fill='%23fff'%3ESRA Career%3C/text%3E%3C/svg%3E";

export const POST_HERO_FLOATING_CARDS = [
  { label: "Kiến thức chuyên ngành", icon: BookOpen },
  { label: "Bí kíp tìm việc", icon: Lightbulb },
  { label: "Xu hướng tuyển dụng", icon: TrendingUp },
  { label: "Định hướng nghề nghiệp", icon: Compass },
];
