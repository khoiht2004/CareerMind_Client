import { LogOut, Headset } from "lucide-react";
import { SETTINGS_SIDEBAR_ITEMS } from "@/config/constants/candidate.constant";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import handleLogout from "@/hooks/useLogout";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

function SettingsSidebar({ activeTab = "security", onTabChange }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="w-full shrink-0 space-y-6 lg:w-[280px]">
      <div className="bg-primary/10 rounded-xl p-4">
        <h3 className="text-muted-foreground mb-3 px-2 text-xs font-semibold tracking-wider uppercase">
          Cài đặt hệ thống
        </h3>
        <nav className="space-y-1">
          {SETTINGS_SIDEBAR_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange?.(item.id)}
                className={cn(
                  "flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </button>
            );
          })}

          <div className="border-border/50 my-2 border-t"></div>

          <button
            onClick={() => handleLogout(dispatch, navigate)}
            className="text-destructive hover:bg-destructive/10 flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
          >
            <LogOut className="size-4" />
            Đăng xuất
          </button>
        </nav>
      </div>

      <div className="bg-primary text-primary-foreground relative overflow-hidden rounded-xl p-5">
        <div className="relative z-10">
          <h4 className="mb-2 font-semibold">Cần trợ giúp?</h4>
          <p className="text-primary-foreground/80 mb-4 text-sm leading-relaxed">
            Đội ngũ hỗ trợ của CareerPartner luôn sẵn sàng giải đáp thắc mắc của
            bạn.
          </p>
          <Button
            variant="secondary"
            size="sm"
            className="w-fit cursor-pointer text-xs font-medium"
          >
            Liên hệ ngay
          </Button>
        </div>
        <Headset className="text-primary-foreground/10 absolute -right-4 -bottom-4 size-32" />
      </div>
    </div>
  );
}

export default SettingsSidebar;
