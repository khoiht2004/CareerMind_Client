import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export default function StatChart({ stats }) {
  const chartData = [
    {
      name: "Tổng việc làm",
      value: stats?.totalJobs || 0,
      fill: "var(--color-jobs)",
    },
    {
      name: "Đơn ứng tuyển",
      value: stats?.totalApplications || 0,
      fill: "var(--color-apps)",
    },
    {
      name: "Đang phỏng vấn",
      value: stats?.appsByStatus?.INTERVIEW || 0,
      fill: "var(--color-interview)",
    },
    {
      name: "Đã chấp nhận",
      value: stats?.appsByStatus?.ACCEPTED || 0,
      fill: "var(--color-accepted)",
    },
  ];

  const chartConfig = {
    jobs: {
      label: "Tổng việc làm",
      color: "#2563eb",
    },
    apps: {
      label: "Đơn ứng tuyển",
      color: "#9333ea",
    },
    interview: {
      label: "Đang phỏng vấn",
      color: "#f97316",
    },
    accepted: {
      label: "Đã chấp nhận",
      color: "#16a34a",
    },
  };

  return (
    <ChartContainer config={chartConfig} className="size-full min-h-[300px]">
      <BarChart accessibilityLayer data={chartData} margin={{ top: 20 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          className="text-xs"
        />
        <YAxis tickLine={false} axisLine={false} tickMargin={10} />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Bar dataKey="value" radius={4}>
          <LabelList
            dataKey="value"
            position="top"
            offset={12}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
