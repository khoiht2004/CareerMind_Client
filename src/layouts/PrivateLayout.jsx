import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";
import { Loader2 } from "lucide-react";
import AppHeader from "@/components/shared/AppHeader";
import { path } from "@/config/path";
import { cn } from "@/lib/utils";
import AppFooter from "@/components/shared/AppFooter";

function LayoutContent() {
  const location = useLocation();

  const hideFooter =
    location.pathname === path.profile || location.pathname === path.chatbot || location.pathname === path.conversations;

  const isChatbotPage = location.pathname === path.chatbot || location.pathname === path.conversations;

  // Scroll to top on every route change + close mobile sidebar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main
        className={cn(
          "bg-background flex min-h-0 flex-1 flex-col overflow-x-hidden",
          isChatbotPage ? "h-[calc(100vh-5rem)]" : "min-h-[calc(100vh-5rem)]",
        )}
      >
        <Outlet />
      </main>
      {!hideFooter && <AppFooter />}
    </div>
  );
}

function PrivateLayout() {
  const { user, isChecked } = useSelector((state) => state.auth);

  if (!isChecked) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="text-muted-foreground size-6 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to={path.auth + "?tab=login"} replace />;
  }

  return <LayoutContent />;
}

export default PrivateLayout;
