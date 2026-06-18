import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import AppHeader from "@/components/shared/AppHeader";
import AppFooter from "@/components/shared/AppFooter";

function LayoutContent() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <AppHeader />
      <main className="bg-background min-h-[calc(100vh-5rem)] flex-1 overflow-x-hidden">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}

function DefaultLayout() {
  return <LayoutContent />;
}

export default DefaultLayout;
