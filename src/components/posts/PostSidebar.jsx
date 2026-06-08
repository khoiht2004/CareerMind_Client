import { MapPin, Search } from "lucide-react";
import { createElement } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { POST_BANNER_PLACEHOLDER, POST_RESOURCE_LINKS } from "@/config/constants/post.constant";

function PostSidebar() {
  return (
    <aside className="space-y-5">
      <section className="rounded-lg border bg-card p-5">
        <h2 className="text-xl font-bold text-primary">Tìm việc ngay</h2>
        <div className="mt-5 space-y-2">
          <div className="relative">
            <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
            <Input className="pl-9" placeholder="Vị trí tuyển dụng, tên công ty" />
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

      <section className="rounded-lg border bg-card p-5">
        <h2 className="text-xl font-bold text-primary">Tài liệu hỗ trợ tìm việc</h2>
        <div className="mt-4 divide-y">
          {POST_RESOURCE_LINKS.map(({ label, icon }) => (
            <button
              key={label}
              type="button"
              className="text-muted-foreground flex w-full items-center gap-3 py-3 text-left text-sm hover:text-primary"
            >
              {createElement(icon, { className: "size-4" })}
              {label}
            </button>
          ))}
        </div>
      </section>

      <img
        src={POST_BANNER_PLACEHOLDER}
        alt="Career banner placeholder"
        className="w-full rounded-lg object-cover"
      />
    </aside>
  );
}

export default PostSidebar;
