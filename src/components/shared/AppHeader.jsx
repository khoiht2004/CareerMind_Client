import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";
import AuthButtons from "./header/AuthButtons";
import HeaderBrand from "./header/HeaderBrand";
import HeaderNav from "./header/HeaderNav";

function AppHeader() {
  const { user } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  return (
    <header className="shadow-nav sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
      <div className="flex h-20 items-center gap-6 px-5">
        <HeaderBrand />
        <HeaderNav pathname={pathname} />

        <div className="ml-auto flex min-w-0 items-center gap-3">
          {user ? <UserMenu /> : <AuthButtons />}
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
