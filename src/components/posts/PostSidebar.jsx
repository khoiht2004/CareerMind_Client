import { MapPin, Search } from "lucide-react";
import { createElement } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { POST_RESOURCE_LINKS } from "@/config/constants/post.constant";

function PostSidebar() {
  return (
    <aside className="space-y-5">
      <section className="bg-card rounded-lg border p-5">
        <h2 className="text-primary text-xl font-bold">Tìm việc ngay</h2>
        <div className="mt-5 space-y-2">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input
              className="pl-9"
              placeholder="Vị trí tuyển dụng, tên công ty"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input className="pl-9" placeholder="Tất cả tỉnh/thành phố" />
            </div>
            <Button size="icon" className="shrink-0">
              <Search className="size-5" />
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-card rounded-lg border p-5">
        <h2 className="text-primary text-xl font-bold">
          Tài liệu hỗ trợ tìm việc
        </h2>
        <div className="mt-4 divide-y">
          {POST_RESOURCE_LINKS.map(({ label, icon }) => (
            <button
              key={label}
              type="button"
              className="text-muted-foreground hover:text-primary flex w-full items-center gap-3 py-3 text-left text-sm"
            >
              {createElement(icon, { className: "size-4" })}
              {label}
            </button>
          ))}
        </div>
      </section>
    </aside>
  );
}

export default PostSidebar;
