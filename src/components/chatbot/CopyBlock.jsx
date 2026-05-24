import { useState } from "react";
import { Check, Copy } from "lucide-react";

function CopyBlock({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="bg-background text-foreground my-2 overflow-hidden rounded-lg border">
      <div className="bg-muted/50 flex items-center justify-between gap-2 border-b px-3 py-2">
        <span className="text-muted-foreground text-xs font-semibold">
          Nội dung có thể sao chép
        </span>
        <button
          type="button"
          onClick={handleCopy}
          className="hover:bg-muted flex size-7 items-center justify-center rounded-md transition-colors"
          title={copied ? "Đã sao chép" : "Sao chép"}
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        </button>
      </div>
      <div className="p-3 text-sm whitespace-pre-wrap">{text}</div>
    </div>
  );
}

export default CopyBlock;
