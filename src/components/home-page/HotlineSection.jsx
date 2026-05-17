import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

function HotlineSection() {
  return (
    <section className="bg-linear-to-r from-emerald-950 via-emerald-800 to-emerald-500 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-3 text-2xl font-bold text-white">Hotline Tư Vấn</h2>
        <div className="flex gap-2 text-sm font-bold">
          <span className="text-primary rounded-t-lg bg-white px-6 py-3">
            Dành cho Người tìm việc
          </span>
          <span className="rounded-t-lg bg-slate-200 px-6 py-3 text-slate-400">
            Dành cho Nhà tuyển dụng
          </span>
        </div>
        <div className="overflow-hidden rounded-tr-xl rounded-b-xl bg-emerald-50 p-8">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-3xl font-black text-slate-900">
                Tìm việc khó đã có TopCV
              </h3>
              <div className="bg-primary mt-6 flex w-fit items-center overflow-hidden rounded-full p-1 text-white">
                <span className="px-5 text-lg font-black">(024) 6680 5588</span>
                <Button className="text-primary rounded-full bg-white hover:bg-white/90">
                  <Phone className="size-4" />
                  Gọi ngay
                </Button>
              </div>
              <p className="mt-4 flex items-center gap-2 text-sm text-slate-700">
                Email hỗ trợ Ứng viên:
                <Mail className="text-primary size-4" />
                <span className="text-primary font-bold">hotro@topcv.vn</span>
              </p>
            </div>
            <div className="rounded-xl bg-white/70 p-8 text-center text-slate-500">
              <p className="text-primary font-bold">Slide tư vấn</p>
              <p className="mt-2 text-sm">
                Khu vực placeholder để thay ảnh nhân viên tư vấn sau
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HotlineSection;
