import { CircleAlert, Home, SearchX } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { path } from "@/config/path";

function NotFoundPage() {
  const beforeElement =
    " before:absolute before:h-full before:w-0 before:rounded-md before:overflow-hidden before:content-['Về_trang_chủ'] before:flex before:items-center before:justify-center before:text-white before:bg-primary-container before:transition-all before:right-0 hover:before:left-0 hover:before:w-full";

  return (
    <div className="relative flex h-dvh items-center justify-center overflow-hidden p-6">
      {/* --- BACKGROUND EFFECTS --- */}
      {/* 1. Ambient Mesh Gradient */}
      <div className="bg-mesh-cyan/10 absolute -top-[20%] -left-[10%] h-[50%] w-[50%] rounded-full blur-[120px]" />
      <div className="bg-mesh-purple/10 absolute top-[40%] -right-[10%] h-[60%] w-[50%] rounded-full blur-[120px]" />
      <div className="bg-mesh-blue/10 absolute -bottom-[20%] left-[20%] h-[50%] w-[60%] rounded-full blur-[120px]" />

      {/* --- MAIN CONTENT --- */}
      <div className="max-w-lgp-10 relative z-10 text-center shadow-2xl backdrop-blur-xl">
        <div className="bg-primary/10 text-primary mx-auto mb-6 flex size-20 items-center justify-center rounded-full">
          <SearchX className="size-10" />
        </div>
        <p className="text-primary text-sm font-bold tracking-wide uppercase">
          Lỗi 404
        </p>
        <h1 className="text-foreground mt-3 text-3xl font-bold">
          Không tìm thấy trang
        </h1>
        <p className="text-destructive bg-destructive/10 border-destructive mt-3 flex items-center justify-center gap-3 rounded-lg border p-2 text-sm font-normal">
          <CircleAlert className="shrink-0" />
          <span className="text-left">Trang bạn đang tìm không khả dụng.</span>
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <Button
            asChild
            className={`relative h-12 w-60 gap-2 overflow-hidden rounded-md before:duration-600 ${beforeElement}`}
          >
            <Link to={path.home}>Về trang chủ</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
