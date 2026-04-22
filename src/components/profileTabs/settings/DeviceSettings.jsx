import { Laptop } from "lucide-react";

function DeviceSettings() {
  return (
    <div className="bg-card flex gap-4 rounded-xl border border-border p-6 shadow-sm">
      <div className="bg-hot/50 flex size-10 shrink-0 items-center justify-center rounded-lg">
        <Laptop className="size-5 text-hot-foreground" />
      </div>
      <div>
        <h3 className="font-semibold">Thiết bị đã đăng nhập</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Xem danh sách và quản lý các trình duyệt cũng như thiết bị hiện đang truy cập tài khoản của bạn.
        </p>
        <button className="mt-3 text-sm font-medium text-secondary hover:underline cursor-pointer">
          Xem chi tiết
        </button>
      </div>
    </div>
  );
}

export default DeviceSettings;
