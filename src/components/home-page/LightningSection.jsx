import { ArrowRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

function LightningSection({ jobs }) {
  return (
    <section className="from-primary-container via-secondary to-primary text-on-primary-container bg-gradient-to-r py-12">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 lg:grid-cols-[1fr_280px_1fr]">
        <div>
          <h2 className="text-on-primary-container text-4xl font-black">Huy Hiệu Tia Sét</h2>
          <p className="mt-3 text-sm font-semibold">
            Ghi nhận sự tương tác thường xuyên của Nhà tuyển dụng với CV ứng viên
          </p>
          <div className="bg-primary mt-5 w-fit rounded-lg px-5 py-3 text-lg font-black">
            3.523 tin đăng được tương tác trong 24 giờ qua
          </div>
          <p className="mt-7 text-sm font-bold tracking-[0.45em]">TỰ ĐỘNG CẬP NHẬT SAU</p>
          <div className="mt-4 flex gap-4">
            {["09 Giờ", "06 Phút", "23 Giây"].map((item) => (
              <div key={item} className="bg-primary/40 rounded-lg px-4 py-3 text-center">
                <div className="text-2xl font-black">{item.split(" ")[0]}</div>
                <div className="text-xs font-bold">{item.split(" ")[1]}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          {jobs.slice(0, 4).map((job) => (
            <div key={job.id} className="bg-card text-foreground flex items-center gap-2 rounded-lg p-2">
              <Zap className="size-5 shrink-0 fill-primary text-primary" />
              <div className="min-w-0">
                <p className="line-clamp-1 text-xs font-bold">{job.title}</p>
                <p className="text-muted-foreground line-clamp-1 text-[11px]">
                  {job.company?.name ?? "Công ty đang tuyển"} · {job.location}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-primary-fixed-dim/20 mx-auto grid size-56 place-items-center rounded-[2rem]">
            <Zap className="fill-primary-fixed-dim text-primary-fixed-dim size-28" />
          </div>
          <h3 className="text-on-primary-container mt-6 text-xl font-bold">
            Danh sách tin đăng đạt Huy hiệu Tia sét
          </h3>
          <Button className="bg-primary hover:bg-primary/90 mt-4 px-10">
            Xem ngay <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default LightningSection;
