import { memo } from "react";
import { Link } from "react-router";
import {
  Bookmark,
  Share2,
  Bot,
  ExternalLink,
  Briefcase,
  Clock,
  Users,
  FileText,
  BotMessageSquare,
  SendHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatDate } from "@/utils/helper";

function JobDetailSidebar({
  job,
  id,
  user,
  hasApplied,
  isSaved,
  isSaving,
  isUnsaving,
  handleBookmark,
  typeLabel,
}) {
  const isCandidate = !user || user?.role === "CANDIDATE";

  const infoItems = [
    {
      icon: <Clock className="text-muted-foreground size-4 shrink-0" />,
      label: "Hạn nộp",
      value: formatDate(job.deadline),
    },
    {
      icon: <Briefcase className="text-muted-foreground size-4 shrink-0" />,
      label: "Hình thức",
      value: typeLabel,
    },
    ...(job.level
      ? [
          {
            icon: <Users className="text-muted-foreground size-4 shrink-0" />,
            label: "Cấp bậc",
            value: job.level,
          },
        ]
      : []),
    {
      icon: <FileText className="text-muted-foreground size-4 shrink-0" />,
      label: "Đơn ứng tuyển",
      value: `${job._count?.applications ?? 0} người`,
    },
    ...(job.slots
      ? [
          {
            icon: <Users className="text-muted-foreground size-4 shrink-0" />,
            label: "Số lượng tuyển",
            value: `${job.slots} người`,
          },
        ]
      : []),
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="space-y-3 p-5">
          {/* Action buttons */}
          {isCandidate && (
            <>
              <div className="space-y-2">
                <Button
                  size="lg"
                  asChild={!hasApplied}
                  disabled={hasApplied}
                  className="w-full cursor-pointer"
                >
                  {hasApplied ? (
                    "Bạn đã ứng tuyển vị trí này rồi"
                  ) : (
                    <Link to={`/jobs/${id}/apply`}>
                      <SendHorizontal /> Ứng tuyển ngay
                    </Link>
                  )}
                </Button>

                <Button
                  size="lg"
                  variant="secondary"
                  className="w-full cursor-pointer"
                  asChild
                >
                  <Link to={`/chatbot?job=${id}`}>
                    <BotMessageSquare /> Tư vấn AI về vị trí này
                  </Link>
                </Button>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 cursor-pointer gap-1.5"
                    onClick={handleBookmark}
                    disabled={isSaving || isUnsaving}
                  >
                    <Bookmark
                      className="size-4"
                      fill={isSaved ? "var(--secondary-container)" : "none"}
                      stroke={
                        isSaved ? "var(--secondary-container)" : "currentColor"
                      }
                    />
                    {isSaved ? "Đã lưu" : "Lưu tin"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 cursor-pointer gap-1.5"
                  >
                    <Share2 className="size-4" />
                    Chia sẻ
                  </Button>
                </div>
              </div>
              <Separator />
            </>
          )}

          {/* Thông tin chung */}
          <h3 className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
            Thông tin chung
          </h3>
          <div className="space-y-3">
            {infoItems.map(({ icon, label, value }) => (
              <div key={label} className="flex items-center gap-2.5 text-sm">
                {icon}
                <span className="text-muted-foreground">{label}</span>
                <span className="ml-auto text-right font-medium">{value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Về công ty */}
      <Card>
        <CardContent className="space-y-3 p-5">
          <h3 className="text-muted-foreground text-xs font-bold tracking-widest uppercase">
            Về công ty
          </h3>
          <Separator />
          <div className="flex items-center gap-3">
            <div className="bg-muted flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl text-base font-bold">
              {job.company?.logoUrl ? (
                <img
                  src={job.company.logoUrl}
                  alt={job.company.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-foreground">
                  {job.company?.name?.[0]?.toUpperCase()}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{job.company?.name}</p>
              {job.postedBy?.profile?.fullName && (
                <p className="text-muted-foreground text-xs">
                  Đăng bởi: {job.postedBy.profile.fullName}
                </p>
              )}
            </div>
          </div>
          {/* Link công ty */}
          <Link
            to={`/companies/${job.company?.id}`}
            className="text-secondary hover:text-secondary/80 flex items-center gap-1 text-sm transition-colors hover:underline"
          >
            Xem trang công ty
            <ExternalLink className="size-3" />
          </Link>
        </CardContent>
      </Card>

      {/* AI Scout */}
      <Card className="from-chart-1 to-chart-2 text-primary-foreground overflow-hidden bg-linear-to-r">
        <CardContent className="space-y-3 p-5">
          <div className="flex items-center gap-3">
            <div className="bg-primary-foreground/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
              <Bot className="text-primary-foreground size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold">AI Scout</p>
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
            className="w-full cursor-pointer"
            asChild
          >
            <Link to={`/chatbot?job=${id}`}>Tư vấn CV ngay!</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default memo(JobDetailSidebar);
