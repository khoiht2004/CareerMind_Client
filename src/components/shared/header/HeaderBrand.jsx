import { Link } from "react-router";
import { path } from "@/config/path";

function HeaderBrand() {
  return (
    <Link to={path.home} className="flex shrink-0 items-center gap-2">
      <div className="leading-none">
        <div className="text-xl font-black tracking-tight min-[992px]:text-2xl">
          <span className="text-foreground">Career</span>
          <span className="text-primary">Mind</span>
        </div>
        <div className="text-muted-foreground hidden text-[8px] font-semibold min-[576px]:block min-[992px]:text-[9px]">
          Tiếp lợi thế - Nối thành công
        </div>
      </div>
    </Link>
  );
}

export default HeaderBrand;
