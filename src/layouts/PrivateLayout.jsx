import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";
import { Loader2 } from "lucide-react";
import AppSidebar from "@/components/shared/AppSidebar";
import AppHeader from "@/components/shared/AppHeader";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";
import { path } from "@/config/path";
import { cn } from "@/lib/utils";
import AppFooter from "@/components/shared/AppFooter";

function LayoutContent() {
  const { isCollapsed, isMobile, mobileOpen, closeMobile } = useSidebar();
  const location = useLocation();

  const hideFooter =
    location.pathname === path.profile || location.pathname === path.chatbot;

  const isChatbotPage = location.pathname === path.chatbot;

  // Scroll to top on every route change + close mobile sidebar
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
    closeMobile();
  }, [location.pathname, closeMobile]);

  return (
    <div className="flex min-h-screen items-start">
      {/* Mobile backdrop */}
      {isMobile && mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/60" onClick={closeMobile} />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "text-sidebar-foreground transition-all duration-500",
          !isMobile && "sticky top-0 h-screen shrink-0 overflow-y-auto",
          !isMobile && (isCollapsed ? "w-14" : "w-55"),
          isMobile && "fixed inset-y-0 left-0 z-50 h-full w-64 overflow-y-auto",
          isMobile && (mobileOpen ? "translate-x-0" : "-translate-x-full"),
        )}
      >
        <AppSidebar />
      </aside>

      {/* Main content */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col self-stretch">
        <AppHeader />
        <main
          className={cn(
            "bg-background flex min-h-0 flex-1 flex-col",
            isChatbotPage
              ? "h-[calc(100vh-3.5rem)]"
              : "min-h-[calc(100vh-3.5rem)]",
            !hideFooter && "pb-25",
          )}
        >
          <Outlet />
        </main>
        {!hideFooter && <AppFooter />}
      </div>
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

  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
}

export default PrivateLayout;
