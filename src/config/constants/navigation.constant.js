import {
  BookOpen,
  Bot,
  Briefcase,
  Building2,
  Compass,
  FileText,
  GraduationCap,
  LayoutTemplate,
  Lightbulb,
  PenLine,
  Search,
  ShieldCheck,
  Sparkles,
  Upload,
} from "lucide-react";
import { path } from "@/config/path";

const profileTabPath = (tab) => `${path.profile}?tab=${tab}`;

const jobMenu = {
  columns: [
    {
      title: "Việc làm",
      items: [
        { label: "Tìm việc làm", to: path.jobs, icon: Search },
        { label: "Việc làm đã lưu", to: path.savedJobs, icon: ShieldCheck },
        {
          label: "Việc làm đã ứng tuyển",
          to: profileTabPath("applications"),
          icon: FileText,
        },
        { label: "Việc làm phù hợp", to: path.notFound, icon: Sparkles },
        { label: "Danh sách công ty", to: path.companies, icon: Building2 },
        { label: "Công ty Pro", to: path.notFound, icon: Building2, pro: true },
      ],
    },
    {
      title: "Việc làm theo vị trí",
      items: [
        { label: "Việc làm Nhân viên kinh doanh", to: path.jobs },
        { label: "Việc làm Kế toán", to: path.jobs },
        { label: "Việc làm Marketing", to: path.jobs },
        { label: "Việc làm Hành chính nhân sự", to: path.jobs },
        { label: "Việc làm Chăm sóc khách hàng", to: path.jobs },
        { label: "Việc làm Ngân hàng", to: path.jobs },
        { label: "Việc làm IT", to: path.jobs },
      ],
    },
    {
      title: "Việc làm theo lĩnh vực",
      items: [
        { label: "Việc làm Sản xuất", to: path.jobs },
        { label: "Việc làm Bán lẻ - FMCG", to: path.jobs },
        { label: "Việc làm IT - Phần mềm", to: path.jobs },
        { label: "Việc làm Xây dựng", to: path.jobs },
        { label: "Việc làm Giáo dục/Đào tạo", to: path.jobs },
      ],
    },
  ],
};

const cvMenu = {
  columns: [
    {
      title: "Mẫu CV theo style",
      items: [
        {
          label: "Mẫu CV Đơn giản",
          to: path.cvTemplates,
          icon: LayoutTemplate,
        },
        { label: "Mẫu CV Ấn tượng", to: path.cvTemplates, icon: Sparkles },
        {
          label: "Mẫu CV Chuyên nghiệp",
          to: path.cvTemplates,
          icon: GraduationCap,
        },
        { label: "Mẫu CV Harvard", to: path.cvTemplates, icon: PenLine },
      ],
    },
    {
      title: "Quản lý hồ sơ",
      items: [
        { label: "Quản lý CV", to: profileTabPath("cv"), icon: FileText },
        { label: "Tải CV lên", to: profileTabPath("cv"), icon: Upload },
        { label: "Hướng dẫn viết CV", to: path.posts, icon: Lightbulb },
        {
          label: "Quản lý Cover Letter",
          to: profileTabPath("cover-letter"),
          icon: PenLine,
        },
        {
          label: "Mẫu Cover Letter",
          to: path.coverLetterTemplates,
          icon: FileText,
        },
      ],
    },
  ],
};

const toolMenu = {
  columns: [
    {
      title: "Công cụ",
      items: [
        { label: "AI Scout", to: path.chatbot, icon: Bot },
        {
          label: "Phân tích hồ sơ",
          to: profileTabPath("insights"),
          icon: Sparkles,
        },
        {
          label: "Cài đặt tài khoản",
          to: profileTabPath("settings"),
          icon: ShieldCheck,
        },
        { label: "Bảng giá AI", to: path.membership, icon: Compass },
      ],
    },
  ],
};

const careerMenu = {
  columns: [
    {
      title: "Cẩm nang nghề nghiệp",
      items: [
        { label: "Định hướng nghề nghiệp", to: path.posts, icon: Compass },
        { label: "Bí kíp tìm việc", to: path.posts, icon: Lightbulb },
        { label: "Chế độ lương thưởng", to: path.posts, icon: ShieldCheck },
        { label: "Kiến thức chuyên ngành", to: path.posts, icon: BookOpen },
        { label: "Hành trang nghề nghiệp", to: path.posts, icon: Briefcase },
      ],
    },
    {
      title: "Bài viết nổi bật",
      items: [
        {
          label: "TopCV Pro - Không gian tuyển dụng chuyên biệt",
          description:
            "Cập nhật các xu hướng tuyển dụng và xây dựng hồ sơ hiệu quả.",
          to: path.posts,
        },
        {
          label: "Bộ câu hỏi phỏng vấn Kế toán kèm gợi ý trả lời",
          description: "Chuẩn bị tốt hơn trước buổi phỏng vấn quan trọng.",
          to: path.posts,
        },
      ],
    },
  ],
};

export const HEADER_NAV_ITEMS = [
  { label: "Việc làm", to: path.jobs, menu: jobMenu },
  { label: "Tạo CV", to: path.cvTemplates, menu: cvMenu },
  { label: "Công cụ", to: path.chatbot, menu: toolMenu },
  { label: "Cẩm nang nghề nghiệp", to: path.posts, menu: careerMenu },
];
