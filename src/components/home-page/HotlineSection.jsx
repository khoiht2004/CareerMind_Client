import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

function HotlineSection() {
  return (
    <section className="from-primary-container via-secondary to-primary bg-linear-to-r py-12">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-on-primary-container mb-3 text-2xl font-bold">Hotline Tư Vấn</h2>
        <div className="flex gap-2 text-sm font-bold">
          <span className="bg-card text-primary rounded-t-lg px-6 py-3">
            Dành cho Người tìm việc
          </span>
          <span className="bg-muted text-muted-foreground rounded-t-lg px-6 py-3">
            Dành cho Nhà tuyển dụng
          </span>
        </div>
        <div className="bg-card overflow-hidden rounded-tr-xl rounded-b-xl p-8">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-foreground text-3xl font-black">
                Tìm việc khó đã có TopCV
              </h3>
              <div className="bg-primary text-primary-foreground mt-6 flex w-fit items-center overflow-hidden rounded-full p-1">
                <span className="px-5 text-lg font-black">(024) 6680 5588</span>
                <Button className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 rounded-full">
                  <Phone className="size-4" />
                  Gọi ngay
                </Button>
              </div>
              <p className="text-muted-foreground mt-4 flex items-center gap-2 text-sm">
                Email hỗ trợ Ứng viên:
                <Mail className="text-primary size-4" />
                <span className="text-primary font-bold">hotro@topcv.vn</span>
              </p>
            </div>
            <div className="bg-muted/70 text-muted-foreground rounded-xl p-8 text-center">
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
