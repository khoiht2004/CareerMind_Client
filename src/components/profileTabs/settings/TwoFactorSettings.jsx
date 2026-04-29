import { Smartphone } from "lucide-react";

function TwoFactorSettings() {
  return (
    <div className="bg-card flex gap-4 rounded-xl border border-border p-6 shadow-sm">
      <div className="bg-secondary/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
        <Smartphone className="size-5 text-secondary" />
      </div>
      <div>
        <h3 className="font-semibold">Xác thực 2 yếu tố</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Tăng thêm một lớp bảo mật cho tài khoản của bạn bằng mã OTP qua tin nhắn hoặc ứng dụng.
        </p>
        <button className="mt-3 text-sm font-medium text-secondary hover:underline cursor-pointer">
          Thiết lập ngay
        </button>
      </div>
    </div>
  );
}

export default TwoFactorSettings;
