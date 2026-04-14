/* eslint-disable no-unused-vars */
import { Card, CardContent } from "../ui/card";

function StatCard({
  icon: Icon,
  label,
  value,
  color = "text-primary",
  bg = "bg-primary/10",
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-2 sm:px-3 lg:px-4 lg:py-3">
        <div
          className={`flex shrink-0 items-center justify-center rounded-full ${bg}`}
        >
          <Icon className={`size-5 ${color}`} />
        </div>
        <div className="flex flex-1 items-center justify-between">
          <p className="text-muted-foreground md:text-md text-sm md:tracking-wide">
            {label}
          </p>
          <p className="text-xl font-bold">{value ?? 0}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default StatCard;
