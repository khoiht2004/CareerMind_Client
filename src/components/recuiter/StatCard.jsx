/* eslint-disable no-unused-vars */
import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

function StatCard({ icon: Icon, label, value, trend, bgColor, borderColor }) {
  return (
    <Card className={`${borderColor} border-b-4 p-1`}>
      <CardContent className="p-2 sm:p-5">
        <div className="flex items-start justify-between">
          <div
            className={`${bgColor} border-input flex size-11 items-center justify-center rounded-lg border`}
          >
            <Icon className="text-foreground size-5" />
          </div>

          {trend === "up" ? (
            <div className="text-trend-up bg-trend-up/20 flex items-center gap-0.5 rounded-lg px-2 py-1 text-xs font-semibold">
              <TrendingUp className="size-3" /> <span>+12.5%</span>
            </div>
          ) : (
            <div className="text-trend-down bg-trend-down/20 flex items-center gap-0.5 rounded-lg px-2 py-1 text-xs font-semibold">
              <TrendingDown className="size-3" /> <span>-8.3%</span>
            </div>
          )}
        </div>
        <div className="mt-4">
          <p className="text-muted-foreground text-sm">{label}</p>
          <p className="text-foreground mt-0.5 text-3xl font-bold">
            {(value ?? 0).toLocaleString("vi-VN")}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default StatCard;
