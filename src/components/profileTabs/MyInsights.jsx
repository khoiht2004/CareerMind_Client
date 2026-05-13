import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetMyInsightsQuery } from "@/services/application.service";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { APPLICATION_STATUS_LABELS } from "@/config/constants/candidate.constant";

export default function MyInsights() {
  const { data: response, isLoading, isError } = useGetMyInsightsQuery();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="size-6 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !response?.data) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-muted-foreground gap-2">
        <AlertCircle className="size-8" />
        <p>Không thể tải dữ liệu phân tích</p>
      </div>
    );
  }

  const { total, statusCounts, feedback } = response.data;

  // Prepare chart data
  const chartData = Object.keys(statusCounts).map(status => ({
    name: APPLICATION_STATUS_LABELS[status] || status,
    "Số lượng": statusCounts[status]
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Tổng số đơn ứng tuyển</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Thành công (Đã nhận)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{statusCounts['ACCEPTED'] || 0}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Thống kê trạng thái</CardTitle>
        </CardHeader>
        <CardContent>
          {chartData.length > 0 ? (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="Số lượng" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">Chưa có dữ liệu thống kê</div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-primary">
            <Sparkles className="size-5" />
            AI Phân tích & Lời khuyên
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-foreground/80 whitespace-pre-line">
            {feedback}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
