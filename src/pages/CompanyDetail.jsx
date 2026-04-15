import { useParams, Link } from "react-router";
import {
  Loader2,
  MapPin,
  Mail,
  Phone,
  Globe,
  CheckCircle2,
  Building2,
  Briefcase,
  DollarSign,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetCompanyByIdQuery } from "@/services/company.service";
import { formatDate } from "@/utils/helper";
import { JOB_TYPE_LABELS } from "@/config/constants/candidate.constant";
import { BackButton, NotFound } from "@/components/shared/NotFound";

function CompanyDetail() {
  const { id } = useParams();
  const { data: response, isLoading, isError } = useGetCompanyByIdQuery(id);
  const company = response?.data;

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="text-muted-foreground size-8 animate-spin" />
      </div>
    );
  }

  if (isError || !company) {
    return <NotFound message="Không tìm thấy công ty này" />;
  }

  const jobs = company.jobs ?? [];
  const socialLinks = company.socialLinks ?? {};

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      {/* Back */}
      <BackButton />

      {/* Cover image */}
      {company.coverImageUrl && (
        <div className="h-48 w-full overflow-hidden rounded-xl">
          <img
            src={company.coverImageUrl}
            alt={company.name}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      {/* Header card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-5">
            <div className="bg-muted flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl text-2xl font-bold">
              {company.logoUrl ? (
                <img
                  src={company.logoUrl}
                  alt={company.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                company.name?.[0]
              )}
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold">{company.name}</h1>
                {company.isVerified && (
                  <Badge className="gap-1 border-blue-200 bg-blue-50 text-blue-600">
                    <CheckCircle2 className="size-3" />
                    Đã xác minh
                  </Badge>
                )}
              </div>

              <div className="text-muted-foreground flex flex-wrap gap-x-5 gap-y-1.5 text-sm">
                {company.address && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="size-3.5 shrink-0" />
                    {company.address}
                  </span>
                )}
                {company.email && (
                  <span className="flex items-center gap-1.5">
                    <Mail className="size-3.5 shrink-0" />
                    {company.email}
                  </span>
                )}
                {company.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="size-3.5 shrink-0" />
                    {company.phone}
                  </span>
                )}
              </div>

              {/* Social links */}
              {Object.keys(socialLinks).length > 0 && (
                <div className="flex flex-wrap gap-4 pt-1">
                  {Object.entries(socialLinks).map(([platform, url]) =>
                    url ? (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary text- flex items-center gap-1.5 capitalize transition-colors"
                      >
                        <Globe className="size-4" />
                        {platform}
                      </a>
                    ) : null,
                  )}
                </div>
              )}
            </div>

            <div className="hidden flex-col items-end gap-2 sm:flex">
              <div className="text-muted-foreground text-sm">
                <span className="text-foreground text-xl font-bold">
                  {company.totalJobs}
                </span>{" "}
                việc làm
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left - description + jobs */}
        <div className="space-y-5 lg:col-span-2">
          {/* Description */}
          {company.description && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Building2 className="size-4" />
                  Giới thiệu công ty
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                  {company.description}
                </p>
              </CardContent>
            </Card>
          )}

          {/* Job list */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Briefcase className="size-4" />
                Việc làm đang tuyển
                {jobs.length > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {jobs.length}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {jobs.length === 0 ? (
                <p className="text-muted-foreground py-4 text-center text-sm">
                  Hiện tại công ty chưa có việc làm nào đang tuyển
                </p>
              ) : (
                <div className="flex flex-col gap-3">
                  {jobs.map((job) => (
                    <Link key={job.id} to={`/jobs/${job.id}`}>
                      <div className="hover:bg-muted/50 flex items-start justify-between rounded-lg border p-4 transition-colors">
                        <div className="space-y-1">
                          <p className="text-sm font-semibold">{job.title}</p>
                          <div className="text-muted-foreground flex flex-wrap gap-3 text-xs">
                            {job.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="size-3" />
                                {job.location}
                              </span>
                            )}
                            {job.salary && (
                              <span className="flex items-center gap-1">
                                <DollarSign className="size-3" />
                                {job.salary}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="flex shrink-0 flex-col items-end gap-1.5">
                          <Badge variant="secondary" className="text-xs">
                            {JOB_TYPE_LABELS[job.type] ?? job.type}
                          </Badge>
                          <span className="text-muted-foreground text-xs">
                            {formatDate(job.createdAt)}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right - summary */}
        <div className="space-y-4">
          <Card>
            <CardContent className="space-y-3 p-5">
              <h3 className="text-md font-semibold">Thông tin chung</h3>
              <Separator />
              {[
                { label: "Email", value: company.email },
                { label: "Điện thoại", value: company.phone },
                { label: "Địa chỉ", value: company.address },
                {
                  label: "Việc làm đang tuyển",
                  value: `${company.totalJobs ?? jobs.length} vị trí`,
                },
              ]
                .filter((row) => row.value)
                .map(({ label, value }) => (
                  <div key={label} className="space-y-0.5">
                    <p className="text-muted-foreground text-xs">{label}</p>
                    <p className="text-sm font-medium">{value}</p>
                  </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetail;
