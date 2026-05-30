import { memo, useMemo } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

function ThemeToggle() {
  const { mode, setMode } = useTheme();

  // Xác định trạng thái dark hiện tại (kể cả khi là system)
  const isDark = useMemo(() => {
    if (mode === "system") {
      return (
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    }
    return mode === "dark";
  }, [mode]);

  const toggleTheme = () => {
    setMode(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border transition-colors duration-300 focus:ring-0 focus:outline-none",
        isDark ? "border-slate-700 bg-[#1E2024]" : "bg-slate-100",
      )}
      aria-label="Chuyển đổi giao diện"
    >
      <span
        className={cn(
          "pointer-events-none flex h-5.5 w-5.5 items-center justify-center rounded-full shadow-sm transition-transform duration-300 ease-in-out",
          isDark
            ? "translate-x-5.5 bg-black text-slate-100"
            : "translate-x-0.5 bg-white text-slate-600",
        )}
      >
        {isDark ? (
          <Moon className="size-3 fill-current" />
        ) : (
          <Sun className="size-3.5" />
        )}
      </span>
    </button>
  );
}

export default memo(ThemeToggle);
