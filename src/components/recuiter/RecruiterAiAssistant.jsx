import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Bot, ChevronDown, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAnalyzeRecruiterCandidatesMutation } from "@/services/chat.service";
import renderText from "../chat-shared/renderText";

const TEXTAREA_BASE_HEIGHT = 65.6;
const TEXTAREA_MAX_HEIGHT = 160;

function RecruiterAiAssistant({ jobs = [], defaultJobId = "ALL" }) {
  const firstJobId = useMemo(() => {
    if (defaultJobId !== "ALL") return defaultJobId;
    return jobs[0]?.id || "";
  }, [defaultJobId, jobs]);
  const [jobId, setJobId] = useState(firstJobId);
  const [criteria, setCriteria] = useState("");
  const [result, setResult] = useState("");
  const [responseOpen, setResponseOpen] = useState(true);
  const [analyze, { isLoading }] = useAnalyzeRecruiterCandidatesMutation();

  const textareaRef = useRef(null);

  const prevCriteriaRef = useRef(criteria);
  if (prevCriteriaRef.current !== "" && criteria === "") {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${TEXTAREA_BASE_HEIGHT}px`;
    }
  }
  prevCriteriaRef.current = criteria;

  const handleResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = `${TEXTAREA_BASE_HEIGHT}px`;
    el.style.height = `${Math.min(el.scrollHeight, TEXTAREA_MAX_HEIGHT)}px`;
  }, []);

  useEffect(() => {
    if (defaultJobId !== "ALL") {
      setJobId(defaultJobId);
      return;
    }
    if (!jobId && firstJobId) setJobId(firstJobId);
  }, [defaultJobId, firstJobId, jobId]);

  const selectedJobId = jobId || firstJobId;
  const canAnalyze = Boolean(selectedJobId) && !isLoading;

  const handleAnalyze = async () => {
    if (!selectedJobId) {
      toast.error("Vui lòng chọn công việc cần phân tích");
      return;
    }

    try {
      const response = await analyze({
        jobId: selectedJobId,
        criteria,
      }).unwrap();
      setResult(response.data?.analysis || "AI chưa trả về phân tích.");
      setResponseOpen(true);
    } catch {
      toast.error("Không thể phân tích ứng viên lúc này");
    }
  };

  return (
    <Card className="border-primary/30 bg-primary/5">
      <CardHeader>
        <CardTitle className="text-primary text-md flex items-center gap-2 font-bold md:text-lg">
          <Bot className="size-5" />
          MindScout hỗ trợ sàng lọc ứng viên
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-3 lg:grid-cols-[minmax(220px,320px)_1fr_auto] lg:items-end">
          <div>
            <p className="text-muted-foreground mb-1.5 text-xs font-medium tracking-wider uppercase">
              Công việc
            </p>
            <Select value={selectedJobId} onValueChange={setJobId}>
              <SelectTrigger className="bg-background w-full">
                <SelectValue placeholder="Chọn công việc" />
              </SelectTrigger>
              <SelectContent>
                {jobs.map((job) => (
                  <SelectItem key={job.id} value={job.id}>
                    {job.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="min-w-0">
            <p className="text-muted-foreground mb-1.5 text-xs font-medium tracking-wider uppercase">
              Tiêu chí bổ sung
            </p>
            <Textarea
              ref={textareaRef}
              value={criteria}
              onChange={(event) => setCriteria(event.target.value)}
              onInput={handleResize}
              placeholder="Ví dụ: ưu tiên React, 2+ năm kinh nghiệm..."
              className="bg-background min-h-10 resize-none [scrollbar-width:none] focus-visible:ring-0 [&::-webkit-scrollbar]:hidden"
            />
          </div>
          <Button
            onClick={handleAnalyze}
            disabled={!canAnalyze}
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

        {result && (
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
        )}
      </CardContent>
    </Card>
  );
}

export default memo(RecruiterAiAssistant);
