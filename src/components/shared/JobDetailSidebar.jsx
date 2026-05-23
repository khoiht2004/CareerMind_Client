import { memo } from "react";
import { Link } from "react-router";
import {
  Bot,
  ExternalLink,
  MapPin,
  Building2,
  Users,
  Medal,
  BriefcaseBusiness,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function JobDetailSidebar({ job, id, typeLabel }) {
  const company = job.company;
  const companyName = company?.name ?? "Công ty";

  return (
    <div className="space-y-4">
      {/* Về công ty */}
      <Card className="overflow-hidden rounded-xl shadow-sm">
        <CardContent className="space-y-4 p-5">
          <div className="flex items-start gap-4">
            <div className="bg-muted flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border font-bold">
              {company?.logoUrl ? (
                <img
                  src={company.logoUrl}
                  alt={companyName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-foreground text-xl">
                  {companyName?.[0]?.toUpperCase()}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-base leading-tight font-bold text-slate-800">
                {companyName}
              </p>
            </div>
          </div>

          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex items-start gap-2">
              <Users className="mt-0.5 size-4 shrink-0 text-slate-400" />
              <span className="w-20 shrink-0">Quy mô:</span>
              <span className="font-medium text-slate-800">
                {company?.companySize || "25-99 nhân viên"}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Building2 className="mt-0.5 size-4 shrink-0 text-slate-400" />
              <span className="w-20 shrink-0">Lĩnh vực:</span>
              <span className="font-medium text-slate-800">
                {company?.industry || "Chưa xác định"}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-slate-400" />
              <span className="w-20 shrink-0">Địa điểm:</span>
              <span className="font-medium text-slate-800">
                {company?.address || job.location || "Cập nhật sau"}
              </span>
            </div>
          </div>

          <div className="pt-2 text-center">
            <Link
              to={`/companies/${company?.id}`}
              className="text-primary flex items-center justify-center gap-1 text-sm font-medium hover:underline"
            >
              Xem trang công ty <ExternalLink className="size-3.5" />
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Thông tin chung */}
      <Card className="overflow-hidden rounded-xl shadow-sm">
        <CardContent className="space-y-4 p-5">
          <h3 className="text-lg font-bold text-slate-800">Thông tin chung</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary flex size-10 shrink-0 items-center justify-center rounded-full text-lg text-white">
                <Medal />
              </div>
              <div>
                <p className="text-xs text-slate-500">Cấp bậc</p>
                <p className="text-sm font-semibold text-slate-800">
                  {job.level || "Nhân viên"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary flex size-10 shrink-0 items-center justify-center rounded-full text-lg text-white">
                <Users />
              </div>
              <div>
                <p className="text-xs text-slate-500">Số lượng tuyển</p>
                <p className="text-sm font-semibold text-slate-800">
                  {job.slots ? `${job.slots} người` : "Không giới hạn"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary flex size-10 shrink-0 items-center justify-center rounded-full text-lg text-white">
                <BriefcaseBusiness />
              </div>
              <div>
                <p className="text-xs text-slate-500">Hình thức làm việc</p>
                <p className="text-sm font-semibold text-slate-800">
                  {typeLabel || "Thoả thuận"}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Danh mục ngành nghề liên quan */}
      <Card className="overflow-hidden rounded-xl shadow-sm">
        <CardContent className="space-y-3 p-5">
          <h3 className="text-lg font-bold text-slate-800">
            Danh mục Nghề liên quan
          </h3>
          <div className="flex flex-wrap gap-2">
            {(job.industry || ["Công nghệ Thông tin", "Việc làm IT"]).map(
              (tag, i) => (
                <span
                  key={i}
                  className="cursor-pointer rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-200"
                >
                  {tag}
                </span>
              ),
            )}
          </div>
        </CardContent>
      </Card>

      {/* AI Scout */}
      <Card className="from-chart-1 to-chart-2 text-primary-foreground overflow-hidden rounded-xl bg-linear-to-r shadow-sm">
        <CardContent className="space-y-3 p-5">
          <div className="flex items-center gap-3">
            <div className="bg-primary-foreground/10 flex size-10 shrink-0 items-center justify-center rounded-xl">
              <Bot className="text-primary-foreground size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">AI Scout</p>
              <p className="text-primary-foreground/70 text-xs">
                Trợ lý tuyển dụng
              </p>
            </div>
          </div>
          <p className="text-primary-foreground/80 text-xs leading-relaxed">
            Để AI hỗ trợ bạn chuẩn bị CV & tư vấn về vị trí này một cách tốt
            nhất.
          </p>
          <Button
            size="sm"
            variant="secondary"
            className="w-full cursor-pointer font-bold"
            asChild
          >
            <Link to="/chatbot" state={{ jobId: id }}>
              Tư vấn CV ngay!
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default memo(JobDetailSidebar);
