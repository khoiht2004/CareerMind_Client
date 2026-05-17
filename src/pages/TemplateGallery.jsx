import { useMemo, useState } from "react";
import { Check, Clipboard, FileText, Loader2, Search } from "lucide-react";
import PageContainer from "@/components/shared/PageContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useGetCoverLetterTemplatesQuery,
  useGetCvTemplatesQuery,
} from "@/services/template.service";

function TemplateCard({ item }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(item.content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <article className="bg-card border-border flex min-h-80 flex-col rounded-lg border">
      <div className="border-border flex items-start gap-3 border-b p-4">
        <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
          <FileText className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="line-clamp-2 text-sm font-semibold">{item.title}</h3>
          <p className="text-muted-foreground mt-1 text-xs">
            {[item.industry, item.level].filter(Boolean).join(" / ") || "Mau chung"}
          </p>
        </div>
      </div>
      <pre className="text-muted-foreground flex-1 overflow-hidden whitespace-pre-wrap p-4 text-xs leading-relaxed">
        {item.content}
      </pre>
      <div className="border-border flex justify-end border-t p-3">
        <Button size="sm" onClick={handleCopy} className="gap-2">
          {copied ? <Check className="size-4" /> : <Clipboard className="size-4" />}
          {copied ? "Da copy" : "Copy"}
        </Button>
      </div>
    </article>
  );
}

function TemplateGallery({ type = "cv" }) {
  const [search, setSearch] = useState("");
  const params = useMemo(() => ({ search, limit: 24 }), [search]);
  const cvQuery = useGetCvTemplatesQuery(params, { skip: type !== "cv" });
  const coverQuery = useGetCoverLetterTemplatesQuery(params, {
    skip: type !== "cover-letter",
  });

  const query = type === "cv" ? cvQuery : coverQuery;
  const items = query.data?.data?.data ?? [];
  const title = type === "cv" ? "CV mẫu" : "Cover Letter mẫu";

  return (
    <PageContainer>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Xem nhanh noi dung mau va copy de tuy bien cho ho so ung tuyen.
          </p>
        </div>
        <div className="relative w-full sm:w-80">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tim theo nganh, cap bac..."
            className="pl-9"
          />
        </div>
      </div>

      {query.isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="text-muted-foreground size-8 animate-spin" />
        </div>
      ) : items.length === 0 ? (
        <div className="text-muted-foreground py-20 text-center text-sm">
          Chua co mau nao. Hay insert data vao bang template tu MySQL.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <TemplateCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}

export default TemplateGallery;
