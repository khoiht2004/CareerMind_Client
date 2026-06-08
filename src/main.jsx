import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import "./index.css";
import App from "./App.jsx";
import { store } from "./store/store.js";
import { ThemeProvider } from "@/contexts/ThemeContext";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <TooltipProvider>
        <App />
        {/* 0.9s sẽ tự tắt */}
        <Toaster richColors position="top-right" duration={900} />
      </TooltipProvider>
    </ThemeProvider>
  </Provider>,
);
