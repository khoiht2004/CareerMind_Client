import { ArrowLeft, Home, SearchX } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { path } from "@/config/path";

function NotFoundPage() {
  return (
    <div className="flex min-h-[calc(100vh-12rem)] items-center justify-center px-6 py-16">
      <div className="max-w-lg text-center">
        <div className="bg-primary/10 text-primary mx-auto mb-6 flex size-20 items-center justify-center rounded-full">
          <SearchX className="size-10" />
        </div>
        <p className="text-primary text-sm font-bold tracking-wide uppercase">
          Lỗi 404
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          Không tìm thấy trang
        </h1>
        <p className="text-muted-foreground mt-3 text-sm">
          Trang bạn đang tìm có thể chưa được xây dựng, đã đổi đường dẫn hoặc
          tạm thời không khả dụng.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild className="gap-2 rounded-full">
            <Link to={path.home}>
              <Home className="size-4" />
              Về trang chủ
            </Link>
          </Button>
          <Button asChild variant="outline" className="gap-2 rounded-full">
            <Link to={path.jobs}>
              <ArrowLeft className="size-4" />
              Xem việc làm
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
