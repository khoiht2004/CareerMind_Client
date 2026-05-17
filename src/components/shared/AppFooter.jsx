/* eslint-disable no-unused-vars */
import {
  BriefcaseBusiness,
  FileText,
  MapPin,
  MessageCircle,
  Phone,
  Play,
  ShieldCheck,
} from "lucide-react";
import {
  FOOTER_COMPANY_LINES,
  FOOTER_ECOSYSTEM,
} from "@/config/constants/footer.constant";

function FooterLink({ children }) {
  return (
    <a
      href="#"
      className="hover:text-primary block text-sm text-slate-600 transition-colors"
    >
      {children}
    </a>
  );
}

function AppStoreButton({ type }) {
  return (
    <button
      type="button"
      className="flex h-10 min-w-36 items-center gap-2 rounded-md bg-black px-3 text-left text-white"
    >
      <Play className="size-5 fill-white" />
      <span>
        <span className="block text-[9px] leading-none">
          {type === "ios" ? "Download on the" : "Get it on"}
        </span>
        <span className="block text-sm font-bold">
          {type === "ios" ? "App Store" : "Google Play"}
        </span>
      </span>
    </button>
  );
}

function SocialButton({ label, shortLabel }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="hover:bg-primary grid size-8 place-items-center rounded-full bg-slate-600 text-white transition-colors"
    >
      <span className="text-xs font-black">{shortLabel}</span>
    </button>
  );
}

function FooterBrandColumn() {
  return (
    <div className="space-y-7">
      <div>
        <div className="text-5xl font-black tracking-tight">
          <span className="text-slate-800">top</span>
          <span className="text-primary">cv</span>
        </div>
        <p className="mt-3 text-sm font-bold text-slate-700">
          Tiếp lợi thế - Nối thành công
        </p>
        {/* <div className="mt-6 flex items-center gap-3 text-sm text-slate-500">
          <span className="font-semibold text-blue-500">
            Google for Startups
          </span>
          <span className="rounded bg-emerald-500 px-2 py-1 text-xs font-bold text-white">
            DMCA
          </span>
        </div> */}
      </div>

      <div>
        <h3 className="mb-3 font-bold text-slate-900">Liên hệ</h3>
        <div className="space-y-1 text-sm text-slate-600">
          <p>
            Hotline:{" "}
            <strong className="text-slate-900">
              (024) 6680 5588 (Giờ hành chính)
            </strong>
          </p>
          <p>
            Email: <strong className="text-slate-900">hotro@topcv.vn</strong>
          </p>
          <p>
            Zalo hỗ trợ ứng viên:{" "}
            <strong className="text-slate-900">Kết nối ngay →</strong>
          </p>
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-bold text-slate-900">Ứng dụng tải xuống</h3>
        <div className="flex flex-wrap gap-2">
          <AppStoreButton type="ios" />
          <AppStoreButton type="android" />
        </div>
      </div>

      <div>
        <h3 className="mb-3 font-bold text-slate-900">Cộng đồng TopCV</h3>
        <div className="flex gap-3">
          <SocialButton label="Facebook" shortLabel="f" />
          <SocialButton label="Youtube" shortLabel="▶" />
          <SocialButton label="LinkedIn" shortLabel="in" />
          <SocialButton label="TikTok" shortLabel="♪" />
        </div>
      </div>
    </div>
  );
}

function FooterLinks() {
  return (
    <div className="flex justify-between">
      <section>
        {/* Về topcv */}
        <h3 className="mb-3 font-bold text-slate-900">Về TopCV</h3>
        <div className="mb-6 flex flex-col gap-3 text-sm text-slate-600">
          <a href="#">Giới thiệu</a>
          <a href="#">Góc báo chí</a>
          <a href="#">Tuyển dụng</a>
          <a href="#">Liên hệ</a>
          <a href="#">Hỏi đáp</a>
          <a href="#">Chính sách bảo mật</a>
          <a href="#">Điều khoản dịch vụ</a>
        </div>
        {/* Đối tác */}
        <div>
          <h3 className="mb-3 font-bold text-slate-900">Đối tác</h3>
          <div className="flex flex-col gap-3 text-sm text-slate-600">
            <a href="#">TestCenter</a>
            <a href="#">TopHR</a>
            <a href="#">ViecNgay</a>
            <a href="#">Happy Time</a>
          </div>
        </div>
      </section>

      <section>
        {/* Hồ sơ và CV */}
        <h3 className="mb-3 font-bold text-slate-900">Hồ sơ và CV</h3>
        <div className="mb-6 flex flex-col gap-3 text-sm text-slate-600">
          <a href="#">Quản lý CV của bạn</a>
          <a href="#">Hướng dẫn viết CV</a>
          <a href="#">Thư viện CV theo ngành nghề</a>
          <a href="#">Review CV</a>
        </div>
        {/* Khám phá */}
        <div>
          <h3 className="mb-3 font-bold text-slate-900">Khám phá</h3>
          <div className="flex flex-col gap-3 text-sm text-slate-600">
            <a href="#">Ứng dụng di động TopCV</a>
            <a href="#">Tính lương Gross-Net</a>
            <a href="#">Tính lãi suất kép</a>
            <a href="#">Lập kế hoạch tiết kiệm</a>
            <a href="#">Tính bảo hiểm thất nghiệp</a>
            <a href="#">Tính bảo hiểm xã hội một lần</a>
            <a href="#">Trắc nghiệm MBTI</a>
            <a href="#">Trắc nghiệm MI</a>
          </div>
        </div>
      </section>

      <section>
        {/* Xây dựng sự nghiệp */}
        <h3 className="mb-3 font-bold text-slate-900">Xây dựng sự nghiệp</h3>
        <div className="mb-6 flex flex-col gap-3 text-sm text-slate-600">
          <a href="#">Việc làm tốt nhất</a>
          <a href="#">Việc làm lương cao</a>
          <a href="#">Việc làm quản lý</a>
          <a href="#">Việc làm IT</a>
          <a href="#">Việc làm Senior</a>
          <a href="#">Việc làm bán thời gian</a>
        </div>
        {/* Quy tắc chung */}
        <div>
          <h3 className="mb-3 font-bold text-slate-900">Quy tắc chung</h3>
          <div className="flex flex-col gap-3 text-sm text-slate-600">
            <a href="#">Điều kiện giao dịch chung</a>
            <a href="#">Giá dịch vụ & Cách thanh toán</a>
            <a href="#">Thông tin về vận chuyển</a>
          </div>
        </div>
      </section>
    </div>
  );
}

function QrPlaceholder() {
  return (
    <div className="text-center">
      <img
        src="../../assets/qr_code.webp"
        alt="QR"
        className="mx-auto rounded-md bg-white p-2 shadow-sm"
      />
      <p className="text-primary mt-2 text-xs font-bold">topcv.com.vn</p>
    </div>
  );
}

function CompanyInfo() {
  const icons = [FileText, BriefcaseBusiness, MapPin, MapPin];

  return (
    <div className="border-t bg-white py-7">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[1fr_auto]">
        <div>
          <h2 className="mb-5 text-2xl font-bold text-slate-900">
            Công ty Cổ phần TopCV Việt Nam
          </h2>
          <div className="space-y-3 text-sm text-slate-600">
            {FOOTER_COMPANY_LINES.map((line, index) => {
              const Icon = icons[index] ?? FileText;
              return (
                <p key={line} className="flex gap-2">
                  <Icon className="text-primary mt-0.5 size-4 shrink-0" />
                  <span>{line}</span>
                </p>
              );
            })}
          </div>

          <h3 className="mt-7 mb-4 font-bold text-slate-900">
            Hệ sinh thái HR Tech của TopCV
          </h3>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {FOOTER_ECOSYSTEM.map((item) => (
              <div
                key={item.name}
                className={`rounded-lg p-4 text-white ${item.className}`}
              >
                <div className="text-lg font-black">{item.name}</div>
                <p className="mt-2 text-xs leading-5 font-semibold">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <QrPlaceholder />
      </div>
    </div>
  );
}

export default function AppFooter() {
  return (
    <footer className="bg-white">
      <div className="mx-auto grid max-w-6xl gap-14 px-4 py-12 lg:grid-cols-[280px_1fr]">
        <FooterBrandColumn />
        <FooterLinks />
      </div>
      <CompanyInfo />
    </footer>
  );
}
