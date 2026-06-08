import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { path } from "@/config/path";

function AuthButtons() {
  return (
    <div className="hidden items-center gap-2 sm:flex">
      <Button variant="outline" size="sm" className="h-9 rounded-full" asChild>
        <Link to={`${path.auth}?tab=login`}>Đăng nhập</Link>
      </Button>
      <Button size="sm" className="h-9 rounded-full" asChild>
        <Link to={`${path.auth}?tab=register`}>Đăng ký</Link>
      </Button>
    </div>
  );
}

export default AuthButtons;
