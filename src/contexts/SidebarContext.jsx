import { MOBILE_BREAKPOINT } from "@/config/constants/constants";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const SidebarContext = createContext(null);

export function SidebarProvider({ children }) {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < MOBILE_BREAKPOINT,
  );
  const [isCollapsed, setIsCollapsed] = useState(
    () => localStorage.getItem("sra-sidebar-collapsed") === "true",
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      const mobile = window.innerWidth < MOBILE_BREAKPOINT;
      setIsMobile(mobile);
      if (!mobile) setMobileOpen(false);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    localStorage.setItem("sra-sidebar-collapsed", isCollapsed);
  }, [isCollapsed]);

  const toggle = () => {
    if (isMobile) {
      setMobileOpen((isOpen) => !isOpen);
    } else {
      setIsCollapsed((v) => !v);
    }
  };

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <SidebarContext.Provider
      value={{ isCollapsed, isMobile, mobileOpen, toggle, closeMobile }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}
