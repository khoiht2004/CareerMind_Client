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
      color: "var(--chart-1)",
    },
    apps: {
      label: "Đơn ứng tuyển",
      color: "var(--chart-2)",
    },
    interview: {
      label: "Đang phỏng vấn",
      color: "var(--chart-3)",
    },
    accepted: {
      label: "Đã chấp nhận",
      color: "var(--chart-4)",
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
        <Bar dataKey="value" radius={[8, 8, 0, 0]}>
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
