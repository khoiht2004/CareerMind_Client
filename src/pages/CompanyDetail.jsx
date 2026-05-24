import { useState } from "react";
import {
  Loader2,
  MapPin,
  Mail,
  Phone,
  Globe,
  CheckCircle2,
  Building2,
  Users,
  Video,
  Info,
  ChevronsLeftRightEllipsis,
  Star,
  ChevronDown,
  FileText,
} from "lucide-react";
import Iframe from "react-iframe";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotFound } from "@/components/shared/NotFound";
import PageContainer from "@/components/shared/PageContainer";
import Pagination from "@/components/shared/Pagination";
import PostCard from "@/components/posts/PostCard";
import { useCompanyDetail } from "@/hooks/useCompanyDetail";
import { CompanyJobCard, ContactRow } from "@/features/CompanyDetail";

const SOCIAL_ICONS = {
  linkedin: Users,
  facebook: Globe,
  youtube: Video,
  website: Globe,
};

function CompanyDetail() {
  const {
    company,
    jobs,
    paginatedJobs,
    jobPage,
    totalJobPages,
    setJobPage,
    posts,
    postPage,
    totalPosts,
    totalPostPages,
    setPostPage,
    socialLinks,
    isLoading,
    isPostsLoading,
    isError,
  } = useCompanyDetail();
  const [showFullDesc, setShowFullDesc] = useState(false);

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

  return (
    <PageContainer className="max-w-full lg:max-w-6xl">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* ── Left col ── */}
        <div className="mb-8 space-y-4 lg:col-span-2">
          {/* Cover hero with logo overlay */}
          <div className="relative">
            {company.coverImageUrl ? (
              <div className="h-52 w-full overflow-hidden rounded-2xl">
                <img
                  src={company.coverImageUrl}
                  alt={company.name}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="bg-primary/10 h-52 w-full rounded-2xl" />
            )}

            {/* Logo */}
            <div className="absolute bottom-4 left-6 flex translate-y-1/2 items-end gap-2.5">
              <div className="bg-background flex size-20 items-center justify-center overflow-hidden rounded-2xl border-4 text-2xl font-bold shadow-lg">
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

              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold text-black text-shadow-sm">
                      {company.name}
                    </h1>
                    {company.isVerified && (
                      <Badge className="gap-1 border-blue-200 bg-blue-50 text-blue-600 dark:border-blue-800 dark:bg-blue-950 dark:text-blue-400">
                        <CheckCircle2 className="size-3" />
                        Đã xác minh
                      </Badge>
                    )}
                  </div>
                  {company.subDescription && (
                    <p className="text-muted-foreground mt-1 flex items-center gap-1 text-sm font-semibold">
                      {company.subDescription}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 space-y-5 lg:col-span-2">
            {/* Description */}
            {company.description && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary flex items-center gap-2 text-xl font-bold">
                    <Building2 className="size-6" />
                    Giới thiệu công ty
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div
                    className={`relative text-muted-foreground text-sm leading-relaxed whitespace-pre-line ${
                      !showFullDesc ? "max-h-[300px] overflow-hidden" : ""
                    }`}
                  >
                    {company.description}
                    {!showFullDesc && (
                      <div className="from-background absolute right-0 bottom-0 left-0 h-24 bg-linear-to-t to-transparent" />
                    )}
                  </div>
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => setShowFullDesc((value) => !value)}
                      className="text-primary border-primary hover:bg-primary/5 flex items-center gap-1 rounded-full border px-4 py-1.5 text-sm font-medium transition-colors"
                    >
                      {showFullDesc
                        ? "Thu gọn giới thiệu công ty"
                        : "Xem đầy đủ giới thiệu công ty"}
                      <ChevronDown
                        className={`size-4 transition-transform ${
                          showFullDesc ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Job list */}
            <Card className="bg-transparent">
              <CardHeader>
                <CardTitle className="text-primary flex items-center justify-between gap-2 text-xl font-bold">
                  <div className="flex items-center gap-2">
                    <ChevronsLeftRightEllipsis className="size-6" />
                    Việc làm đang tuyển
                  </div>
                  {jobs.length > 0 && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Tổng số {jobs.length}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className={"px-0"}>
                {jobs.length === 0 ? (
                  <p className="text-muted-foreground py-6 text-center text-sm">
                    Hiện tại công ty chưa có vị trí nào đang tuyển
                  </p>
                ) : (
                  <div className="flex flex-col gap-3">
                    {paginatedJobs.map((job) => (
                      <CompanyJobCard key={job.id} job={job} />
                    ))}
                    <Pagination
                      page={jobPage}
                      totalPages={totalJobPages}
                      onPageChange={setJobPage}
                      showPageNumbers
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Company posts */}
            <Card className="bg-transparent">
              <CardHeader>
                <CardTitle className="text-primary flex items-center justify-between gap-2 text-xl font-bold">
                  <div className="flex items-center gap-2">
                    <FileText className="size-6" />
                    Bài viết của công ty
                  </div>
                  {totalPosts > 0 && (
                    <Badge variant="secondary" className="px-3 py-1">
                      Tổng số {totalPosts}
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0">
                {isPostsLoading ? (
                  <div className="flex h-32 items-center justify-center">
                    <Loader2 className="text-muted-foreground size-6 animate-spin" />
                  </div>
                ) : posts.length === 0 ? (
                  <p className="text-muted-foreground py-6 text-center text-sm">
                    Hiện tại công ty chưa có bài viết nào.
                  </p>
                ) : (
                  <div className="space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      {posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                      ))}
                    </div>
                    <Pagination
                      page={postPage}
                      totalPages={totalPostPages}
                      onPageChange={setPostPage}
                      showPageNumbers
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ── Right col ── */}
        <div className="space-y-4">
          {/* Contact card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2 font-bold">
                <Info className="size-5" />
                Thông tin liên hệ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {company.email && (
                <ContactRow icon={Mail} label="Email" value={company.email} />
              )}
              {company.phone && (
                <ContactRow
                  icon={Phone}
                  label="Điện thoại"
                  value={company.phone}
                />
              )}
              {company.address && (
                <ContactRow
                  icon={MapPin}
                  label="Địa chỉ"
                  value={company.address}
                />
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-primary flex items-center justify-between gap-2 font-bold">
                <span className="flex items-center gap-2">
                  <Star className="size-5" />
                  Review
                </span>
                <Badge variant="secondary">{company.avgRating ?? 0}/5</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {(company.reviews ?? []).length === 0 ? (
                <p className="text-muted-foreground text-sm">
                  Chưa có review nào.
                </p>
              ) : (
                (company.reviews ?? []).map((review) => (
                  <div key={review.id} className="rounded-lg border p-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="line-clamp-1 text-sm font-semibold">
                        {review.user?.profile?.fullName || "Ung vien"}
                      </p>
                      <span className="flex text-amber-400">
                        {Array.from({ length: review.rating }).map(
                          (_, index) => (
                            <Star key={index} className="size-3 fill-current" />
                          ),
                        )}
                      </span>
                    </div>
                    {review.comment ? (
                      <p className="text-muted-foreground mt-2 line-clamp-3 text-xs">
                        {review.comment}
                      </p>
                    ) : null}
                  </div>
                ))
              )}
            </CardContent>
          </Card>

          {/* Social links */}
          {Object.keys(socialLinks).length > 0 && (
            <Card>
              <CardContent className="p-4">
                <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
                  Mạng xã hội
                </p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(socialLinks).map(([platform, url]) => {
                    if (!url) return null;
                    const SocialIcon =
                      SOCIAL_ICONS[platform.toLowerCase()] ?? Globe;
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={platform}
                        className="bg-muted hover:bg-primary hover:text-primary-foreground flex size-9 items-center justify-center rounded-lg transition-colors"
                      >
                        <SocialIcon className="size-4" />
                      </a>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Map placeholder */}
          <Card className="relative h-34 overflow-hidden p-0">
            <div className="bg-muted flex items-center justify-center">
              <Iframe
                url={company?.mapUrl}
                className="size-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="bg-background text-foreground absolute bottom-2 left-2 rounded-lg p-2 py-1">
              <p className="text-xs font-bold">Trụ sở chính</p>
            </div>
          </Card>

          {/* CTA card – dark */}
          <Card className="bg-foreground text-background">
            <CardContent className="space-y-3 px-5 pt-4">
              <p className="font-bold">Quan tâm đến công ty?</p>
              <p className="text-background/70 text-sm">
                Theo dõi để nhận thông báo về các vị trí mới nhất từ{" "}
                {company.name}.
              </p>
              <Button variant="secondary" size="sm" className="w-full py-5">
                Theo dõi công ty
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}

export default CompanyDetail;
