import { memo, useState } from "react";
import { Bot, ChevronDown, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAnalyzeCandidateJobFitMutation } from "@/services/chat.service";
import renderText from "../chat-shared/renderText";

function CandidateJobAiAssistant({ jobId }) {
  const [result, setResult] = useState("");
  const [responseOpen, setResponseOpen] = useState(true);
  const [analyze, { isLoading }] = useAnalyzeCandidateJobFitMutation();

  const handleAnalyze = async () => {
    if (!jobId) return;

    try {
      const response = await analyze({ jobId }).unwrap();
      setResult(response.data?.analysis || "AI chưa trả về phân tích.");
      setResponseOpen(true);
    } catch {
      toast.error("Không thể phân tích công việc lúc này");
    }
  };

  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardHeader className="flex items-center justify-between">
        <CardTitle className="text-primary flex items-center gap-2 text-lg font-bold">
          <Bot className="size-5" />
          AI phân tích độ phù hợp
        </CardTitle>

        <div>
          <Button
            onClick={handleAnalyze}
            disabled={isLoading}
            className="gap-2"
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Sparkles className="size-4" />
            )}
            Phân tích
          </Button>
        </div>
      </CardHeader>
      {result && (
        <CardContent className="space-y-4">
          <div className="bg-background overflow-hidden rounded-lg border text-sm leading-relaxed">
            <button
              type="button"
              onClick={() => setResponseOpen((value) => !value)}
              className="hover:bg-muted/60 flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition-colors"
            >
              <span className="font-semibold">Phản hồi từ AI</span>
              <ChevronDown
                className={`size-4 transition-transform ${
                  responseOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {responseOpen && (
              <div className="border-t p-4 whitespace-pre-wrap">
                {renderText(result)}
              </div>
            )}
          </div>
        </CardContent>
      )}
    </Card>
  );
}

export default memo(CandidateJobAiAssistant);
