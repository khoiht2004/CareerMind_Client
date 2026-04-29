import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import AppSidebar from "@/components/shared/AppSidebar";
import AppHeader from "@/components/shared/AppHeader";
import { SidebarProvider, useSidebar } from "@/contexts/SidebarContext";
import { cn } from "@/lib/utils";
import AppFooter from "@/components/shared/AppFooter";

function LayoutContent() {
  const { isCollapsed, isMobile, mobileOpen, closeMobile } = useSidebar();
  const location = useLocation();

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
      <div className="flex min-w-0 flex-1 flex-col">
        <AppHeader />
        <main className="bg-background min-h-[calc(100vh-3.5rem)] flex-1 pb-25">
          <Outlet />
        </main>
        <AppFooter />
      </div>
    </div>
  );
}

function DefaultLayout() {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
}

export default DefaultLayout;
