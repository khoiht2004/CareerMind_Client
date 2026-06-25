import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import "./index.css";
import App from "./App.jsx";
import { store } from "./store/store.js";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SocketProvider } from "@/contexts/SocketContext";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <SocketProvider>
        <TooltipProvider>
          <App />
          {/* 0.9s sẽ tự tắt */}
          <Toaster richColors position="top-right" duration={1300} />
        </TooltipProvider>
      </SocketProvider>
    </ThemeProvider>
  </Provider>,
);
