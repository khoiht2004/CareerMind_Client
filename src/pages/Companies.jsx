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

      <div className="bg-card border-border grid gap-3 rounded-lg border p-4 md:grid-cols-[1fr_220px_220px]">
        <div className="relative">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tên công ty, địa điểm, ngành nghề..."
            className="pl-9"
          />
        </div>
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          className="border-input bg-background h-10 rounded-md border px-3 text-sm"
        >
          {INDUSTRY_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="border-input bg-background h-10 rounded-md border px-3 text-sm"
        >
          {COMPANY_SIZE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="text-muted-foreground size-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {companies.map((company) => (
            <article
              key={company.id}
              className="bg-card border-border overflow-hidden rounded-lg border"
            >
              <div className="bg-muted h-24 overflow-hidden">
                {company.coverImageUrl ? (
                  <img
                    src={company.coverImageUrl}
                    alt={company.name}
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
              <div className="space-y-4 p-4">
                <div className="flex gap-3">
                  <div className="bg-background border-border flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg border">
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
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h2 className="line-clamp-1 text-sm font-semibold">
                        {company.name}
                      </h2>
                      {company.isVerified ? (
                        <CheckCircle2 className="size-4 text-[var(--status-reviewing-text)]" />
                      ) : null}
                    </div>
                    <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">
                      {company.description || "Chưa có giới thiệu"}
                    </p>
                  </div>
                </div>
                <div className="text-muted-foreground space-y-2 text-xs">
                  {company.address ? (
                    <p className="flex gap-1.5">
                      <MapPin className="size-3.5 shrink-0" />
                      <span className="line-clamp-1">{company.address}</span>
                    </p>
                  ) : null}
                  {company.size ? (
                    <p className="flex gap-1.5">
                      <Users className="size-3.5 shrink-0" />
                      {company.size}
                    </p>
                  ) : null}
                </div>
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="secondary">
                    {company.industry || "General"}
                  </Badge>
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
