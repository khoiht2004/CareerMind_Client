import { Link } from "react-router";
import { path } from "@/config/path";

function HeaderBrand() {
  return (
    <Link to={path.home} className="flex shrink-0 items-center gap-2">
      <div className="leading-none">
        <div className="text-2xl font-black tracking-tight">
          <span className="text-slate-800">top</span>
          <span className="text-primary">cv</span>
        </div>
        <div className="text-[9px] font-semibold text-slate-500">
          Tiếp lợi thế - Nối thành công
        </div>
      </div>
    </Link>
  );
}

export default HeaderBrand;
