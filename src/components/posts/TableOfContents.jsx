import { List, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

function TableOfContents({ items }) {
  const [open, setOpen] = useState(true);

  if (!items.length) return null;

  return (
    <section className="bg-muted rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          <List className="size-4" />
          Mục lục
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={() => setOpen((value) => !value)}
        >
          <ChevronUp
            className={`size-4 transition-transform ${open ? "" : "rotate-180"}`}
          />
        </Button>
      </div>
      {open ? (
        <nav className="mt-3 space-y-1 text-sm">
          {items.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="text-foreground/80 hover:text-primary block rounded-md py-1"
              style={{ paddingLeft: `${(item.level - 1) * 14}px` }}
            >
              {item.text}
            </a>
          ))}
        </nav>
      ) : null}
    </section>
  );
}

export default TableOfContents;
