import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatCard from "@/components/recuiter/StatCard";
import StatChart from "@/components/recuiter/StatChart";
import AppStatusList from "@/components/recuiter/AppStatusList";
import JobStatusTable from "@/components/recuiter/JobStatusTable";
import { useRecruiterStats, STAT_CARD_CONFIG } from "@/hooks/useRecruiterStats";

function RecruiterStats() {
  const {
    stats,
    statsLoading,
    jobs,
    jobsLoading,
    jobsPage,
    setJobsPage,
    jobsTotalPages,
    jobsTotal,
    jobStatusFilter,
    setJobStatusFilter,
  } = useRecruiterStats();

  if (statsLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="text-muted-foreground size-8 animate-spin" />
      </div>
    );
  }

  const currentYear = new Date().getFullYear();

  return (
    <div className="max-w-full space-y-6 px-4 py-6 sm:px-6 lg:px-10">
      {/* Page header */}
      <div>
        <h1 className="text-primary text-3xl font-black sm:text-4xl">
          Thống kê tuyển dụng
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Tổng quan hoạt động tuyển dụng của bạn
        </p>
      </div>

      {/* Stat cards — 4 columns */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {STAT_CARD_CONFIG.map((cfg) => (
          <StatCard
            key={cfg.id}
            icon={cfg.icon}
            label={cfg.label}
            bgColor={cfg.bgColor}
            borderColor={cfg.borderColor}
            value={cfg.getValue(stats)}
            trend={cfg.trend}
          />
        ))}
      </div>

      {/* Chart + App status list */}
      <div className="grid gap-4 md:grid-cols-5">
        {/* Bar chart (wider) */}
        <Card className="md:col-span-3">
          <CardHeader className="pb-2">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <CardTitle className="text-lg font-bold">
                  Biểu đồ tổng quan
                </CardTitle>
                <p className="text-muted-foreground mt-0.5 text-sm">
                  Xu hướng ứng tuyển hàng tháng
                </p>
              </div>
              <span className="bg-primary/20 rounded-md px-3 py-2 text-xs font-medium">
                Năm {currentYear}
              </span>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <StatChart monthlyData={stats?.monthlyApplications ?? []} />
          </CardContent>
        </Card>

        {/* App status list (narrower) */}
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-bold">
              Đơn ứng tuyển theo trạng thái
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-1">
            <AppStatusList appsByStatus={stats?.appsByStatus} />
          </CardContent>
        </Card>
      </div>

      {/* Job table */}
      <Card>
        <CardContent className="md:p-5">
          <JobStatusTable
            jobs={jobs}
            isLoading={jobsLoading}
            page={jobsPage}
            totalPages={jobsTotalPages}
            total={jobsTotal}
            onPageChange={setJobsPage}
            statusFilter={jobStatusFilter}
            onStatusFilterChange={(v) => {
              setJobStatusFilter(v);
              setJobsPage(1);
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default RecruiterStats;
