import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  count: {
    label: "Đơn ứng tuyển",
    color: "var(--chart-1)",
  },
};

export default function StatChart({ monthlyData = [] }) {
  return (
    <ChartContainer config={chartConfig} className="h-[240px] w-full">
      <BarChart data={monthlyData} margin={{ top: 8, right: 8, left: -16 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" />
        <XAxis
          dataKey="label"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          className="text-xs"
          tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
          allowDecimals={false}
        />
        <ChartTooltip
          cursor={{ fill: "var(--muted)" }}
          content={<ChartTooltipContent />}
        />
        <Bar
          dataKey="count"
          fill="var(--chart-1)"
          radius={[4, 4, 0, 0]}
          maxBarSize={40}
        />
      </BarChart>
    </ChartContainer>
  );
}
