import { useParams, useNavigate, Link } from "react-router";
import {
  MapPin,
  DollarSign,
  Briefcase,
  Clock,
  Building2,
  ArrowLeft,
  Bookmark,
  Share2,
  CheckCircle2,
  Flame,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import {
  useGetJobByIdQuery,
  useCheckJobSavedQuery,
  useSaveJobMutation,
  useUnsaveJobMutation,
} from "@/services/job.service";
import { useCheckAppliedQuery } from "@/services/application.service";
import { formatDate } from "@/utils/helper";
import { JOB_TYPE_LABELS } from "@/config/constants/candidate.constant";
import { toast } from "sonner";
import { useSelector } from "react-redux";

function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const { data: response, isLoading, isError } = useGetJobByIdQuery(id);
  const job = response?.data;

  const { data: savedData } = useCheckJobSavedQuery(id, { skip: !user });
  const isSaved = savedData?.data?.isSaved ?? false;

  const { data: appliedData } = useCheckAppliedQuery(id, { skip: !user });
  const hasApplied = appliedData?.data?.applied ?? false;

  const [saveJob, { isLoading: isSaving }] = useSaveJobMutation();
  const [unsaveJob, { isLoading: isUnsaving }] = useUnsaveJobMutation();

  const handleBookmark = async () => {
    if (!user) {
      toast.error("Vui lòng đăng nhập để lưu việc làm");
      return;
    }
    try {
      if (isSaved) {
        await unsaveJob(id).unwrap();
        toast.success("Đã bỏ lưu việc làm");
      } else {
        await saveJob(id).unwrap();
        toast.success("Đã lưu việc làm");
      }
    } catch {
      toast.error("Có lỗi xảy ra");
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="text-muted-foreground size-8 animate-spin" />
      </div>
    );
  }

  if (isError || !job) {
    return (
      <div className="text-muted-foreground p-6 text-center">
        <p className="font-medium">Không tìm thấy công việc này</p>
        <Button
          variant="link"
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        >
          Quay lại
        </Button>
      </div>
    );
  }

  const tags = job.tags ?? [];
  const benefits = job.benefits ?? [];
  const typeLabel = JOB_TYPE_LABELS[job.type] ?? job.type;

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="text-muted-foreground hover:text-foreground inline-flex cursor-pointer items-center gap-2 text-sm transition-colors"
      >
        <ArrowLeft className="size-4" />
        Quay lại
      </button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left - main content */}
        <div className="space-y-5 lg:col-span-2">
          {/* Job header card */}
          <Card>
            <CardContent className="space-y-4 p-6">
              <div className="flex items-start gap-4">
                <div className="bg-muted flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-lg font-bold">
                  {job.company[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-xl font-bold">{job.title}</h1>
                    {job.isHot && (
                      <Badge className="gap-1 border-orange-200 bg-orange-100 text-orange-600">
                        <Flame className="size-3" />
                        Hot
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground mt-0.5">{job.company}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="text-muted-foreground flex items-center gap-2">
                  <MapPin className="size-4 shrink-0" />
                  {job.location}
                </div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <DollarSign className="size-4 shrink-0" />
                  {job.salary ?? "Thỏa thuận"}
                </div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <Briefcase className="size-4 shrink-0" />
                  {typeLabel}
                  {job.level ? ` · ${job.level}` : ""}
                </div>
                <div className="text-muted-foreground flex items-center gap-2">
                  <Clock className="size-4 shrink-0" />
                  Hạn nộp: {formatDate(job.deadline)}
                </div>
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {!user ||
                (user?.role === "CANDIDATE" && (
                  <div className="flex gap-2 pt-1">
                    <Button
                      size="lg"
                      asChild={!hasApplied}
                      disabled={hasApplied}
                      className="flex-1 cursor-pointer"
                    >
                      {hasApplied ? (
                        "Bạn đã ứng tuyển vị trí này rồi"
                      ) : (
                        <Link to={`/jobs/${id}/apply`}>Ứng tuyển ngay</Link>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9.5 w-9.5 cursor-pointer"
                      onClick={handleBookmark}
                      disabled={isSaving || isUnsaving}
                    >
                      <Bookmark
                        className="size-4"
                        fill={isSaved ? "#eab308" : "none"}
                        stroke={isSaved ? "#eab308" : "currentColor"}
                      />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-9.5 w-9.5 cursor-pointer"
                    >
                      <Share2 className="size-4" />
                    </Button>
                  </div>
                ))}
            </CardContent>
          </Card>

          {/* Job description */}
          {job.description && (
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-base font-semibold">
                  Chi tiết công việc
                </h2>
                <div className="prose prose-sm text-muted-foreground max-w-none text-sm leading-relaxed whitespace-pre-line">
                  {job.description}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Benefits */}
          {benefits.length > 0 && (
            <Card>
              <CardContent className="p-6">
                <h2 className="mb-4 text-base font-semibold">Quyền lợi</h2>
                <ul className="space-y-2">
                  {benefits.map((b, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-green-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right - company info */}
        <div className="space-y-4">
          <Card>
            <CardContent className="space-y-4 p-5">
              <div className="flex items-center gap-3">
                <Building2 className="text-muted-foreground size-5" />
                <h3 className="text-sm font-semibold">Về công ty</h3>
              </div>
              <Separator />
              <div className="space-y-3">
                <div className="bg-muted flex h-12 w-12 items-center justify-center rounded-xl text-base font-bold">
                  {job.company[0]}
                </div>
                <p className="text-sm font-medium">{job.company}</p>
                {job.postedBy?.profile?.fullName && (
                  <p className="text-muted-foreground text-xs">
                    Đăng bởi: {job.postedBy.profile.fullName}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="space-y-3 p-5">
              <h3 className="text-sm font-semibold">Thông tin chung</h3>
              <Separator />
              {[
                {
                  label: "Số lượng tuyển",
                  value: job.slots ? `${job.slots} người` : "Không giới hạn",
                },
                {
                  label: "Đăng ngày",
                  value: formatDate(job.createdAt),
                },
                { label: "Hạn nộp hồ sơ", value: formatDate(job.deadline) },
                { label: "Hình thức", value: typeLabel },
                ...(job.level ? [{ label: "Cấp bậc", value: job.level }] : []),
                {
                  label: "Đơn ứng tuyển",
                  value: `${job._count?.applications ?? 0} người`,
                },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-xs">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {!user ||
            (user?.role === "CANDIDATE" && (
              <Button
                size="lg"
                asChild={!hasApplied}
                disabled={hasApplied}
                className="w-full cursor-pointer"
              >
                {hasApplied ? (
                  "Bạn đã ứng tuyển vị trí này rồi"
                ) : (
                  <Link to={`/jobs/${id}/apply`}>Ứng tuyển ngay</Link>
                )}
              </Button>
            ))}
          <Button size="lg" variant="outline" className="w-full cursor-pointer">
            <Link to={`/chatbot?job=${id}`}>Chat với AI</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default JobDetail;
