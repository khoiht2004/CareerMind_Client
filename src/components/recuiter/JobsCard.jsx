/* eslint-disable no-unused-vars */
import { Card, CardContent } from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";

function JobsCard({ icon: Icon, label, value, trend }) {
  return (
    <Card>
      <CardContent className="relative flex h-full flex-col justify-between px-5">
        <section>
          {/* Icon */}
          <div className="text-muted-foreground/20 absolute top-0 right-4 flex items-center justify-center rounded-lg">
            <Icon className="size-15" strokeWidth={2} />
          </div>

          {/* Thông tin */}
          <div>
            <p className="text-primary/70 text-xl font-semibold tracking-wider">
              {label}
            </p>
            <p className="text-foreground mt-0.5 text-3xl font-bold">
              {(value ?? 0).toLocaleString("vi-VN")}
            </p>
          </div>
        </section>

        {/* Trend */}
        <section>
          {trend === "up" ? (
            <div className="text-trend-up flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-semibold">
              <TrendingUp className="size-5" />{" "}
              <span> +12.5% so với tháng trước</span>
            </div>
          ) : (
            <div className="text-trend-down flex items-center gap-1 rounded-lg px-2 py-1 text-sm font-semibold">
              <TrendingDown className="size-5" />{" "}
              <span> -8.3% so với tháng trước</span>
            </div>
          )}
        </section>
      </CardContent>
    </Card>
  );
}

export default JobsCard;
