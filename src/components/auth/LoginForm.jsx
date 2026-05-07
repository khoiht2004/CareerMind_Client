import { useLogin } from "@/hooks/useLogin";
import { path } from "@/config/path";
import { Link } from "react-router";
import { Eye, EyeOff, Loader2, Mail, Lock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

function LoginForm({ onSwitch }) {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    showPassword,
    setShowPassword,
    isLoading,
  } = useLogin();

  return (
    <div className="space-y-7">
      <div className="space-y-1.5">
        <h2 className="text-3xl font-black">Chào mừng trở lại!</h2>
        <p className="text-muted-foreground text-sm">
          Vui lòng nhập thông tin để truy cập tài khoản của bạn.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="login-email">Email</Label>
          <div className="relative">
            <Mail className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
            <Input
              id="login-email"
              type="email"
              placeholder="name@company.com"
              autoComplete="email"
              className="bg-muted-foreground/10 pl-10"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-destructive text-xs">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password">Mật khẩu</Label>
            <Link
              to={path.forgotPassword ?? "/forgot-password"}
              className="text-primary text-xs font-medium hover:underline"
              tabIndex={-1}
            >
              Quên mật khẩu?
            </Link>
          </div>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
            <Input
              id="login-password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              autoComplete="current-password"
              className="bg-muted-foreground/10 pr-10 pl-10"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-destructive text-xs">
              {errors.password.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="hover:bg-primary/70 h-12 w-full gap-2 text-sm font-semibold"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <>Đăng nhập</>
          )}
        </Button>
      </form>

      {/* Social auth */}
      <div className="space-y-4">
        <div className="relative flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-muted-foreground text-[10px] font-bold tracking-widest uppercase">
            Hoặc tiếp tục với
          </span>
          <Separator className="flex-1" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" type="button" className="h-11 gap-2">
            <Globe className="size-4" />
            Google
          </Button>
          <Button variant="outline" type="button" className="h-11 gap-2">
            LinkedIn
          </Button>
        </div>
      </div>

      <p className="text-muted-foreground text-center text-sm">
        Chưa có tài khoản?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-primary cursor-pointer font-semibold hover:underline"
        >
          Đăng ký ngay
        </button>
      </p>
    </div>
  );
}

export default LoginForm;
