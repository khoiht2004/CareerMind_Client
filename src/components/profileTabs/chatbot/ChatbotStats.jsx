import { Bot } from "lucide-react";

function ChatbotStats() {
  return (
    <div className="flex flex-col gap-6 lg:w-[320px] shrink-0">
      <div className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="bg-primary-foreground/10 mb-6 flex size-12 items-center justify-center rounded-xl">
          <Bot className="size-6" />
        </div>
        <h3 className="mb-2 text-xl font-bold">Trợ lý Cá nhân</h3>
        <p className="text-primary-foreground/80 text-sm leading-relaxed">
          Chatbot sẽ tự động lọc các vị trí dựa trên thông tin bạn cung cấp tại đây.
        </p>
      </div>

      <div className="bg-muted/30 rounded-2xl p-6">
        <h4 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          THỐNG KÊ HIỆN TẠI
        </h4>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">Độ chính xác AI</span>
          <span className="text-secondary font-bold">94%</span>
        </div>
        <div className="h-2 w-full rounded-full bg-secondary/20 overflow-hidden">
          <div className="h-full bg-secondary rounded-full" style={{ width: '94%' }} />
        </div>
      </div>
    </div>
  );
}

export default ChatbotStats;
