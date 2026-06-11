import { useState } from "react";
import { Check, Minus, ChevronDown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    id: "free",
    name: "Miễn phí",
    subtitle: "Dành cho nhà tuyển dụng cá nhân",
    monthlyPrice: 0,
    yearlyPrice: 0,
    cta: "Bắt đầu ngay",
    ctaVariant: "outline",
    featured: false,
    features: [
      "Đăng 2 tin tuyển dụng/tháng",
      "Gợi ý viết CV cơ bản (AI)",
      "Tìm việc theo hồ sơ cá nhân",
    ],
  },
  {
    id: "pro",
    name: "Chuyên nghiệp",
    subtitle: "Cho các công ty đang tăng trưởng",
    monthlyPrice: 2500000,
    yearlyPrice: 2000000,
    featuredLabel: "PHỔ BIẾN NHẤT",
    cta: "Nâng cấp ngay",
    ctaVariant: "default",
    featured: true,
    features: [
      "Không giới hạn token AI",
      "Chấm điểm CV & Phân tích kỹ năng",
      "Truy xuất thông tin ứng viên thông minh",
      "Tối ưu hóa tìm việc nâng cao",
    ],
  },
  {
    id: "enterprise",
    name: "Nâng cao",
    subtitle: "Giải pháp toàn diện cho tập đoàn",
    monthlyPrice: null,
    yearlyPrice: null,
    cta: "Liên hệ tư vấn",
    ctaVariant: "outline",
    featured: false,
    features: [
      "Toàn bộ tính năng Chuyên nghiệp",
      "AI tùy chỉnh cho doanh nghiệp",
      "Công cụ quản lý tuyển dụng tập trung",
      "Hỗ trợ kỹ thuật 24/7 & Training AI",
    ],
  },
];

const COMPARISON_ROWS = [
  {
    feature: "Giới hạn Token AI",
    free: "1,000/tháng",
    pro: { text: "Không giới hạn", highlight: true },
    enterprise: "Không giới hạn",
  },
  {
    feature: "Chấm điểm & Gợi ý CV",
    free: "Cơ bản",
    pro: { check: true },
    enterprise: { check: true },
  },
  {
    feature: "Truy xuất thông tin thông minh",
    free: null,
    pro: { check: true },
    enterprise: { check: true },
  },
  {
    feature: "Tối ưu hóa theo hồ sơ cá nhân",
    free: "Tiêu chuẩn",
    pro: { text: "Ưu tiên", highlight: true },
    enterprise: "Ưu tiên cao nhất",
  },
  {
    feature: "Tính năng cho Nhà quản lý",
    free: null,
    pro: null,
    enterprise: { check: true },
  },
];

const FAQ_ITEMS = [
  {
    id: "q1",
    question: "Tôi có thể thay đổi gói dịch vụ sau khi đăng ký không?",
    answer:
      "Bạn có thể nâng cấp hoặc hạ cấp gói dịch vụ bất kỳ lúc nào. Số tiền chênh lệch sẽ được tính toán lại vào chu kỳ thanh toán tiếp theo.",
  },
  {
    id: "q2",
    question: "Hình thức thanh toán nào được chấp nhận?",
    answer:
      "Chúng tôi chấp nhận thanh toán qua thẻ tín dụng (Visa, Mastercard), chuyển khoản ngân hàng và các ví điện tử phổ biến tại Việt Nam.",
  },
  {
    id: "q3",
    question: "Có chương trình dùng thử miễn phí không?",
    answer:
      "Gói Miễn phí của chúng tôi là vĩnh viễn. Ngoài ra, bạn có thể đăng ký trải nghiệm gói Chuyên nghiệp trong 14 ngày trước khi quyết định thanh toán.",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatVND(amount) {
  return amount.toLocaleString("vi-VN") + "đ";
}

function CellValue({ value }) {
  if (value === null || value === undefined) {
    return <Minus className="text-muted-foreground mx-auto size-4" />;
  }
  if (typeof value === "object" && value.check) {
    return (
      <div className="bg-primary text-primary-foreground mx-auto flex size-5 items-center justify-center rounded-full">
        <Check className="size-3" strokeWidth={3} />
      </div>
    );
  }
  if (typeof value === "object" && value.text) {
    return (
      <span className={value.highlight ? "text-primary font-semibold" : ""}>
        {value.text}
      </span>
    );
  }
  return <span className="text-muted-foreground text-sm">{String(value)}</span>;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function BillingToggle({ isYearly, onChange }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <span
        className={cn(
          "text-sm font-medium transition-colors",
          !isYearly ? "text-foreground" : "text-muted-foreground",
        )}
      >
        Thanh toán tháng
      </span>

      <button
        type="button"
        role="switch"
        aria-checked={isYearly}
        onClick={() => onChange(!isYearly)}
        className={cn(
          "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors",
          isYearly ? "bg-primary" : "bg-muted-foreground/30",
        )}
      >
        <span
          className={cn(
            "bg-background pointer-events-none inline-block size-4 transform rounded-full shadow-sm transition-transform",
            isYearly ? "translate-x-6" : "translate-x-1",
          )}
        />
      </button>

      <div className="flex items-center gap-2">
        <span
          className={cn(
            "text-sm font-medium transition-colors",
            isYearly ? "text-foreground" : "text-muted-foreground",
          )}
        >
          Thanh toán năm
        </span>
        <Badge className="bg-primary/10 text-primary border-primary/20 border text-[10px] font-bold tracking-wider">
          TIẾT KIỆM 20%
        </Badge>
      </div>
    </div>
  );
}

function PricingCard({ plan, isYearly }) {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;

  return (
    <div
      className={cn(
        "bg-card relative flex flex-col rounded-2xl border",
        plan.featured
          ? "border-primary shadow-primary/10 shadow-xl"
          : "shadow-sm",
      )}
    >
      {/* Featured label */}
      {plan.featuredLabel && (
        <div className="bg-primary text-primary-foreground rounded-t-2xl py-2 text-center text-xs font-bold tracking-widest">
          {plan.featuredLabel}
        </div>
      )}

      <div className="flex flex-1 flex-col p-6">
        {/* Plan name */}
        <div className="mb-5">
          <h3 className="text-lg font-bold">{plan.name}</h3>
          <p className="text-muted-foreground mt-0.5 text-sm">
            {plan.subtitle}
          </p>
        </div>

        {/* Price */}
        <div className="mb-6">
          {price === null ? (
            <p className="text-4xl font-black">Liên hệ</p>
          ) : (
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-black">
                {price === 0 ? "0đ" : formatVND(price)}
              </span>
              <span className="text-muted-foreground text-sm">/tháng</span>
            </div>
          )}
        </div>

        {/* Features */}
        <ul className="mb-8 flex-1 space-y-3">
          {plan.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm">
              <div className="bg-primary/10 mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full">
                <Check className="text-primary size-2.5" strokeWidth={3} />
              </div>
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Button variant={plan.ctaVariant} className="w-full">
          {plan.cta}
        </Button>
      </div>
    </div>
  );
}

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-5 text-left"
      >
        <span className="pr-4 font-medium">{item.question}</span>
        <ChevronDown
          className={cn(
            "text-muted-foreground size-5 shrink-0 transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>
      {open && (
        <p className="text-muted-foreground pb-5 text-sm leading-relaxed">
          {item.answer}
        </p>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function MembershipPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="space-y-16 py-10 sm:space-y-24 sm:py-16">
      {/* ── Hero ── */}
      <section className="mx-auto max-w-3xl space-y-6 px-4 text-center sm:px-6">
        <div className="bg-primary/10 text-primary mx-auto flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold">
          <Zap className="size-4" />
          MindScout Pricing
        </div>
        <h1 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
          Bảng giá dịch vụ
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed sm:text-lg">
          Chọn giải pháp tuyển dụng phù hợp nhất với quy mô và nhu cầu phát
          triển đội ngũ của doanh nghiệp bạn.
        </p>
        <BillingToggle isYearly={isYearly} onChange={setIsYearly} />
      </section>

      {/* ── Pricing cards ── */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {PLANS.map((plan) => (
            <PricingCard key={plan.id} plan={plan} isYearly={isYearly} />
          ))}
        </div>
      </section>

      {/* ── Comparison table ── */}
      <section className="mx-auto max-w-5xl space-y-10 px-4 sm:px-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-black sm:text-3xl">
            So sánh tính năng chi tiết
          </h2>
          <p className="text-muted-foreground">
            Phân tích sâu hơn để tìm ra gói dịch vụ phù hợp nhất với bạn
          </p>
        </div>

        <div className="overflow-x-auto rounded-2xl border">
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="bg-muted/40">
                <th className="p-4 text-left font-semibold">Tính năng</th>
                <th className="p-4 text-center font-semibold">Miễn phí</th>
                <th className="text-primary p-4 text-center font-semibold">
                  Chuyên nghiệp
                </th>
                <th className="p-4 text-center font-semibold">Nâng cao</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, i) => (
                <tr
                  key={row.feature}
                  className={cn(
                    "border-t transition-colors",
                    i % 2 === 0 ? "bg-card" : "bg-muted/20",
                  )}
                >
                  <td className="p-4 font-medium">{row.feature}</td>
                  <td className="p-4 text-center">
                    <CellValue value={row.free} />
                  </td>
                  <td className="p-4 text-center">
                    <CellValue value={row.pro} />
                  </td>
                  <td className="p-4 text-center">
                    <CellValue value={row.enterprise} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="mx-auto max-w-2xl space-y-8 px-4 sm:px-6">
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-black sm:text-3xl">
            Câu hỏi thường gặp
          </h2>
        </div>
        <div>
          {FAQ_ITEMS.map((item) => (
            <FaqItem key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Separator className="mb-16" />
        <div className="bg-primary/5 space-y-5 rounded-2xl border p-5 sm:p-10">
          <h3 className="text-xl font-black sm:text-2xl">
            Vẫn còn phân vân? Hãy để chúng tôi tư vấn.
          </h3>
          <p className="text-muted-foreground">
            Đội ngũ chuyên gia của chúng tôi sẵn sàng giúp bạn tìm gói dịch vụ
            phù hợp nhất.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button size="lg">Liên hệ ngay</Button>
            <Button size="lg" variant="outline">
              Xem demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MembershipPage;
