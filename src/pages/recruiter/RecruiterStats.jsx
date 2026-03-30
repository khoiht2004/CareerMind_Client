/* eslint-disable no-unused-vars */
import {
  Loader2,
  BriefcaseBusiness,
  FileText,
  CheckCircle2,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetMyStatsQuery } from "@/services/job.service";
import {
  APP_STATUS_DISPLAY_CONFIG,
  JOB_STATUS_DISPLAY_CONFIG,
} from "@/config/constants/recruiter.constant";

function StatCard({
  icon: Icon,
  label,
  value,
  color = "text-primary",
  bg = "bg-primary/10",
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 p-5">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${bg}`}
        >
          <Icon className={`size-5 ${color}`} />
        </div>
        <div>
          <p className="text-muted-foreground text-sm">{label}</p>
          <p className="text-2xl font-bold">{value ?? 0}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function RecruiterStats() {
  const { data, isLoading } = useGetMyStatsQuery();
  const stats = data?.data;

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="text-muted-foreground size-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-6">
      <div>
        <h1 className="text-2xl font-bold">Thống kê</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Tổng quan hoạt động tuyển dụng
        </p>
      </div>

      {/* Tổng quan */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard
          icon={BriefcaseBusiness}
          label="Tổng việc làm"
          value={stats?.totalJobs}
          color="text-blue-600"
          bg="bg-blue-50"
        />
        <StatCard
          icon={FileText}
          label="Tổng đơn ứng tuyển"
          value={stats?.totalApplications}
          color="text-purple-600"
          bg="bg-purple-50"
        />
        <StatCard
          icon={CheckCircle2}
          label="Đã chấp nhận"
          value={stats?.appsByStatus?.ACCEPTED}
          color="text-green-600"
          bg="bg-green-50"
        />
        <StatCard
          icon={Users}
          label="Đang phỏng vấn"
          value={stats?.appsByStatus?.INTERVIEW}
          color="text-orange-500"
          bg="bg-orange-50"
        />
      </div>

      {/* Đơn ứng tuyển theo trạng thái */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            Đơn ứng tuyển theo trạng thái
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {APP_STATUS_DISPLAY_CONFIG.map((item) => (
              <div
                key={item.key}
                className={`flex flex-col items-center gap-2 rounded-lg p-4 ${item.bg}`}
              >
                <item.icon className={`size-5 ${item.color}`} />
                <span className="text-2xl font-bold">
                  {stats?.appsByStatus?.[item.key] ?? 0}
                </span>
                <span className="text-center text-xs text-gray-600">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Việc làm theo trạng thái */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Việc làm theo trạng thái</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4">
            {JOB_STATUS_DISPLAY_CONFIG.map((item) => (
              <div
                key={item.key}
                className="flex items-center gap-3 rounded-lg border px-5 py-3"
              >
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${item.color}`}
                >
                  {item.label}
                </span>
                <span className="text-2xl font-bold">
                  {stats?.jobsByStatus?.[item.key] ?? 0}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default RecruiterStats;
