import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import SlidingPanel from "@/components/auth/SlidingPanel";

export default function Auth() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab");
  const [isLogin, setIsLogin] = useState(tab !== "register");

  useEffect(() => {
    if (tab === "register") {
      setIsLogin(false);
    } else {
      setIsLogin(true);
    }
  }, [tab]);

  const handleSetIsLogin = (value) => {
    setIsLogin(value);
    setSearchParams({ tab: value ? "login" : "register" }, { replace: true });
  };

  return (
    <div className="flex min-h-screen w-full flex-col py-8">
      {/* Card */}
      <div className="mx-auto flex w-full max-w-5xl flex-1 items-center px-4">
        <div className="relative w-full overflow-hidden rounded-2xl border shadow-2xl lg:grid lg:grid-cols-2">
          {/* Login form*/}
          <div
            className={`bg-card p-8 lg:block lg:px-11 lg:py-12 ${!isLogin && "hidden"}`}
          >
            <LoginForm onSwitch={() => handleSetIsLogin(false)} />
          </div>

          {/* Register form */}
          <div
            className={`bg-card p-8 lg:block lg:px-11 lg:py-12 ${isLogin && "hidden"}`}
          >
            <RegisterForm onSwitch={() => handleSetIsLogin(true)} />
          </div>

          {/* Sliding dark panel — desktop only */}
          <div
            className={`absolute inset-y-0 left-0 hidden w-1/2 ${isLogin ? "translate-x-full" : "translate-x-0"} transition-transform duration-700 ease-in-out lg:block`}
          >
            <SlidingPanel
              isLogin={isLogin}
              onSwitch={() => handleSetIsLogin(!isLogin)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
