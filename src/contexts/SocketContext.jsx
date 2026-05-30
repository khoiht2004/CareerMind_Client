import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { toast } from "sonner";
import { useSelector } from "react-redux";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const [socket, setSocket] = useState(null);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!user || !token) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/sra";
    const socketUrl = API_URL.replace(/\/sra\/?$/, "");

    console.log("🔌 Connecting to socket server at:", socketUrl);
    const newSocket = io(socketUrl, {
      auth: { token },
      transports: ["websocket", "polling"],
    });

    newSocket.on("connect", () => {
      console.log("⚡ [Socket] Kết nối thành công, ID:", newSocket.id);
    });

    newSocket.on("connect_error", (error) => {
      console.error("❌ [Socket] Lỗi kết nối:", error.message);
    });

    // Lắng nghe thông báo realtime toàn cục
    newSocket.on("notification:new", (data) => {
      toast.success(
        <div className="flex flex-col gap-1">
          <p className="text-sm font-bold">{data.title}</p>
          <p className="text-muted-foreground text-xs leading-snug">
            {data.content}
          </p>
        </div>,
        {
          duration: 6000,
          action: {
            label: "Xem ngay",
            onClick: () => {
              window.location.href = "/profile"; // Hoặc trang tương ứng
            },
          },
        },
      );
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSocket() {
  return useContext(SocketContext);
}
