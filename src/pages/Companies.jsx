import { useMemo, useState } from "react";
import {
  Building2,
  CheckCircle2,
  Loader2,
  MapPin,
  Search,
  Users,
} from "lucide-react";
import { Link } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  COMPANY_SIZE_OPTIONS,
  INDUSTRY_OPTIONS,
} from "@/config/constants/candidate.constant";
import { useGetCompaniesQuery } from "@/services/company.service";
import PageContainer from "@/components/shared/PageContainer";

function Companies() {
  const [search, setSearch] = useState("");
  const [industry, setIndustry] = useState("ALL");
  const [size, setSize] = useState("ALL");
  const params = useMemo(
    () => ({ search, industry, size, limit: 24 }),
    [search, industry, size],
  );
  const { data, isLoading } = useGetCompaniesQuery(params);
  const companies = data?.data?.data ?? [];

  return (
    <PageContainer>
      <div>
        <h1 className="text-2xl font-bold">Danh sách công ty</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Khám phá doanh nghiệp đang tuyển dụng và xem tin việc đang mở.
        </p>
      </div>

      {/* Filter Search */}
      <div className="bg-card border-border grid gap-3 rounded-lg border p-4 md:grid-cols-[1fr_220px_220px]">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tên công ty, địa điểm, ngành nghề..."
            className="bg-muted pl-9"
          />
        </div>

        {/* Filter Industry */}
        <Select value={industry} onValueChange={setIndustry}>
          <SelectTrigger className="bg-muted w-full">
            <SelectValue placeholder="Chọn ngành nghề" />
          </SelectTrigger>
          <SelectContent>
            {INDUSTRY_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Filter Size */}
        <Select value={size} onValueChange={setSize}>
          <SelectTrigger className="bg-muted w-full">
            <SelectValue placeholder="Chọn quy mô" />
          </SelectTrigger>
          <SelectContent>
            {COMPANY_SIZE_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="text-muted-foreground size-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {companies.map((company) => (
            // Company card
            <article
              key={company.id}
              className="bg-card border-border group overflow-hidden rounded-lg border"
            >
              {/* Company cover image */}
              <div className="bg-muted h-40 overflow-hidden">
                {company.coverImageUrl ? (
                  <img
                    src={company.coverImageUrl}
                    alt={company.name}
                    className="h-full w-full object-contain group-hover:scale-105"
                  />
                ) : null}
              </div>
              <div className="relative space-y-4 p-4">
                <div className="flex gap-3">
                  {/* Company Logo */}
                  <div className="bg-background border-border absolute top-0 flex size-14 shrink-0 -translate-y-1/2 items-center justify-center overflow-hidden rounded-lg border">
                    {company.logoUrl ? (
                      <img
                        src={company.logoUrl}
                        alt={company.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <Building2 className="text-muted-foreground size-6" />
                    )}
                  </div>
                  {/* Company info */}
                  <div className="mt-4 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h2 className="line-clamp-1 text-sm font-semibold">
                        {company.name}
                      </h2>
                      {company.isVerified ? (
                        <CheckCircle2 className="text-status-reviewing-text size-4" />
                      ) : null}
                    </div>
                    <p className="text-muted-foreground mt-1 line-clamp-4 text-xs">
                      {company.description || "Chưa có giới thiệu"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <Button size="sm" asChild>
                    <Link
                      to={`/companies/${company.id}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Xem công ty
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </PageContainer>
  );
}

export default Companies;
