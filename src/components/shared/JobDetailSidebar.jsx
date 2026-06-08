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
              <p className="text-foreground text-base leading-tight font-bold">
                {companyName}
              </p>
            </div>
          </div>

          <div className="text-muted-foreground space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <Users className="text-muted-foreground mt-0.5 size-4 shrink-0" />
              <span className="w-20 shrink-0">Quy mô:</span>
              <span className="text-foreground font-medium">
                {company?.companySize || "25-99 nhân viên"}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Building2 className="text-muted-foreground mt-0.5 size-4 shrink-0" />
              <span className="w-20 shrink-0">Lĩnh vực:</span>
              <span className="text-foreground font-medium">
                {company?.industry || "Chưa xác định"}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <MapPin className="text-muted-foreground mt-0.5 size-4 shrink-0" />
              <span className="w-20 shrink-0">Địa điểm:</span>
              <span className="text-foreground font-medium">
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
          <h3 className="text-foreground text-lg font-bold">Thông tin chung</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-full text-lg">
                <Medal />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Cấp bậc</p>
                <p className="text-foreground text-sm font-semibold">
                  {job.level || "Nhân viên"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-full text-lg">
                <Users />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Số lượng tuyển</p>
                <p className="text-foreground text-sm font-semibold">
                  {job.slots ? `${job.slots} người` : "Không giới hạn"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-full text-lg">
                <BriefcaseBusiness />
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Hình thức làm việc</p>
                <p className="text-foreground text-sm font-semibold">
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
          <h3 className="text-foreground text-lg font-bold">
            Danh mục Nghề liên quan
          </h3>
          <div className="flex flex-wrap gap-2">
            {(job.industry || ["Công nghệ Thông tin", "Việc làm IT"]).map(
              (tag, i) => (
                <span
                  key={i}
                  className="bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-colors"
                >
                  {tag}
                </span>
              ),
            )}
          </div>
        </CardContent>
      </Card>

      {/* MindScout */}
      <Card className="from-chart-1 to-chart-2 text-primary-foreground overflow-hidden rounded-xl bg-linear-to-r shadow-sm">
        <CardContent className="space-y-3 p-5">
          <div className="flex items-center gap-3">
            <div className="bg-primary-foreground/10 flex size-10 shrink-0 items-center justify-center rounded-xl">
              <Bot className="text-primary-foreground size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">MindScout</p>
              <p className="text-primary-foreground/70 text-xs">
                Trợ lý tuyển dụng thông minh
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
