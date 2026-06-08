import { BriefcaseBusiness, FileText, MapPin, Play } from "lucide-react";
import {
  FOOTER_COMPANY_LINES,
  FOOTER_ECOSYSTEM,
} from "@/config/constants/footer.constant";
import { HOME_TAG_CLOUD } from "@/config/constants/home.constant";

function FooterLink({ children }) {
  return (
    <a
      href="#"
      className="text-muted-foreground hover:text-primary block text-sm transition-colors"
    >
      {children}
    </a>
  );
}

function AppStoreButton({ type }) {
  return (
    <button
      type="button"
      className="bg-foreground text-background flex h-10 min-w-36 items-center gap-2 rounded-md px-3 text-left"
    >
      <Play className="fill-background size-5" />
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
      className="bg-muted-foreground text-background hover:bg-primary hover:text-primary-foreground grid size-8 place-items-center rounded-full transition-colors"
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
          <span className="text-foreground">Career</span>
          <span className="text-primary">Mind</span>
        </div>
        <p className="text-muted-foreground mt-3 text-sm font-bold">
          Tiếp lợi thế - Nối thành công
        </p>
      </div>

      <div>
        <h3 className="text-foreground mb-3 font-bold">Liên hệ</h3>
        <div className="text-muted-foreground space-y-1 text-sm">
          <p>
            Hotline:{" "}
            <strong className="text-foreground">
              (024) 6680 5588 (Giờ hành chính)
            </strong>
          </p>
          <p>
            Email:{" "}
            <strong className="text-foreground">hotro@careermind.vn</strong>
          </p>
          <p>
            Zalo hỗ trợ ứng viên:{" "}
            <strong className="text-foreground">Kết nối ngay →</strong>
          </p>
        </div>
      </div>

      <div>
        <h3 className="text-foreground mb-3 font-bold">Ứng dụng tải xuống</h3>
        <div className="flex flex-wrap gap-2">
          <AppStoreButton type="ios" />
          <AppStoreButton type="android" />
        </div>
      </div>

      <div>
        <h3 className="text-foreground mb-3 font-bold">Cộng đồng CareerMind</h3>
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
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      <section>
        {/* Về CareerMind */}
        <h3 className="text-foreground mb-3 font-bold">Về CareerMind</h3>
        <div className="text-muted-foreground mb-6 flex flex-col gap-3 text-sm">
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
          <h3 className="text-foreground mb-3 font-bold">Đối tác</h3>
          <div className="text-muted-foreground flex flex-col gap-3 text-sm">
            <a href="#">TestCenter</a>
            <a href="#">TopHR</a>
            <a href="#">ViecNgay</a>
            <a href="#">Happy Time</a>
          </div>
        </div>
      </section>

      <section>
        {/* Hồ sơ và CV */}
        <h3 className="text-foreground mb-3 font-bold">Hồ sơ và CV</h3>
        <div className="text-muted-foreground mb-6 flex flex-col gap-3 text-sm">
          <a href="#">Quản lý CV của bạn</a>
          <a href="#">Hướng dẫn viết CV</a>
          <a href="#">Thư viện CV theo ngành nghề</a>
          <a href="#">Review CV</a>
        </div>
        {/* Khám phá */}
        <div>
          <h3 className="text-foreground mb-3 font-bold">Khám phá</h3>
          <div className="text-muted-foreground flex flex-col gap-3 text-sm">
            <a href="#">Ứng dụng di động CareerMind</a>
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
        <h3 className="text-foreground mb-3 font-bold">Xây dựng sự nghiệp</h3>
        <div className="text-muted-foreground mb-6 flex flex-col gap-3 text-sm">
          <a href="#">Việc làm tốt nhất</a>
          <a href="#">Việc làm lương cao</a>
          <a href="#">Việc làm quản lý</a>
          <a href="#">Việc làm IT</a>
          <a href="#">Việc làm Senior</a>
          <a href="#">Việc làm bán thời gian</a>
        </div>
        {/* Quy tắc chung */}
        <div>
          <h3 className="text-foreground mb-3 font-bold">Quy tắc chung</h3>
          <div className="text-muted-foreground flex flex-col gap-3 text-sm">
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
        className="bg-card mx-auto rounded-md p-2 shadow-sm"
      />
      <p className="text-primary mt-2 text-xs font-bold">careermind.com.vn</p>
    </div>
  );
}

function CompanyInfo() {
  const icons = [FileText, BriefcaseBusiness, MapPin, MapPin];

  return (
    <div className="bg-card border-t py-7">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[1fr_auto]">
        <div>
          <h2 className="text-foreground mb-5 text-2xl font-bold">
            Công ty Cổ phần CareerMind Việt Nam
          </h2>
          <div className="text-muted-foreground space-y-3 text-sm">
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

          <h3 className="text-foreground mt-7 mb-4 font-bold">
            Hệ sinh thái HR Tech của CareerMind
          </h3>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {FOOTER_ECOSYSTEM.map((item) => (
              <div
                key={item.name}
                className={`text-primary-foreground rounded-lg p-4 ${item.className}`}
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
    <footer className="bg-footer-app">
      <div className="bg-muted py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-muted-foreground flex flex-wrap gap-x-5 gap-y-3 text-xs leading-6">
            {HOME_TAG_CLOUD.map((tag) => (
              <a
                key={tag}
                href="#"
                className="hover:text-primary hover:underline"
              >
                {tag}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[280px_1fr] lg:gap-14">
        <FooterBrandColumn />
        <FooterLinks />
      </div>
      <CompanyInfo />
    </footer>
  );
}
