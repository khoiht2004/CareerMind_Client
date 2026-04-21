import { APP_STATUS_DISPLAY_CONFIG } from "@/config/constants/recruiter.constant";

function AppStatusList({ appsByStatus = {} }) {
  return (
    <div className="space-y-3">
      {APP_STATUS_DISPLAY_CONFIG.map((item) => {
        const count = appsByStatus[item.key] ?? 0;
        return (
          <div
            key={item.key}
            className="bg-primary/10 flex items-center gap-3 rounded-xl px-4 py-3"
          >
            <span
              className="size-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: `var(${item.dotVar})` }}
            />
            <span className="text-foreground/80 text-md flex-1">
              {item.label}
            </span>
            <span className="text-foreground text-md font-bold">
              {count.toLocaleString("vi-VN")}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default AppStatusList;
