import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import UserMenu from "./UserMenu";
import AuthButtons from "./header/AuthButtons";
import HeaderBrand from "./header/HeaderBrand";
import HeaderMobileMenu from "./header/HeaderMobileMenu";
import HeaderNav from "./header/HeaderNav";
import ThemeToggle from "./ThemeToggle";

function AppHeader() {
  const { user } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  return (
    <header className="shadow-nav bg-background/95 sticky top-0 z-40 border-b backdrop-blur">
      <div className="flex h-14 min-w-0 items-center gap-2 px-2 min-[576px]:h-15 min-[576px]:px-3 sm:gap-4 lg:gap-6 lg:px-18">
        <HeaderMobileMenu pathname={pathname} user={user} />
        <HeaderBrand />
        <HeaderNav pathname={pathname} />

        <div className="ml-auto flex min-w-0 items-center gap-2 sm:gap-3">
          {/* Switch theme btn */}
          <ThemeToggle />

          {/* Other */}
          {user ? <UserMenu /> : <AuthButtons />}
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
