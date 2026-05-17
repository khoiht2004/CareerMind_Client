import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

function LightningSection({ jobs }) {
  return (
    <section className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-500 py-12 text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 lg:grid-cols-[1fr_280px_1fr]">
        <div>
          <h2 className="text-4xl font-black text-white">Huy Hiệu Tia Sét</h2>
          <p className="mt-3 text-sm font-semibold">
            Ghi nhận sự tương tác thường xuyên của Nhà tuyển dụng với CV ứng viên
          </p>
          <div className="mt-5 w-fit rounded-lg bg-emerald-500 px-5 py-3 text-lg font-black">
            3.523 tin đăng được tương tác trong 24 giờ qua
          </div>
          <p className="mt-7 text-sm font-bold tracking-[0.45em]">TỰ ĐỘNG CẬP NHẬT SAU</p>
          <div className="mt-4 flex gap-4">
            {["09 Giờ", "06 Phút", "23 Giây"].map((item) => (
              <div key={item} className="rounded-lg bg-emerald-500/40 px-4 py-3 text-center">
                <div className="text-2xl font-black">{item.split(" ")[0]}</div>
                <div className="text-xs font-bold">{item.split(" ")[1]}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {jobs.slice(0, 4).map((job) => (
            <div key={job.id} className="flex items-center gap-2 rounded-lg bg-white p-2 text-slate-800">
              <Zap className="size-5 shrink-0 fill-primary text-primary" />
              <div className="min-w-0">
                <p className="line-clamp-1 text-xs font-bold">{job.title}</p>
                <p className="line-clamp-1 text-[11px] text-slate-500">
                  {job.company?.name ?? "Công ty đang tuyển"} · {job.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="mx-auto grid size-56 place-items-center rounded-[2rem] bg-emerald-300/20">
            <Zap className="size-28 fill-emerald-300 text-emerald-300" />
          </div>
          <h3 className="mt-6 text-xl font-bold text-white">
            Danh sách tin đăng đạt Huy hiệu Tia sét
          </h3>
          <Button className="mt-4 bg-emerald-500 px-10 hover:bg-emerald-600">
            Xem ngay <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default LightningSection;
