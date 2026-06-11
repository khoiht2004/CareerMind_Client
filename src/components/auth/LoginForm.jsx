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

  const handleGoogleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = `${window.location.origin}/oauth/callback/google`;
    const scope = "email profile openid";
    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl;
  };

  const handleGithubLogin = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const redirectUri = `${window.location.origin}/oauth/callback/github`;
    const scope = "user:email";
    const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scope)}`;
    window.location.href = authUrl;
  };

  const googleLogo =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/3840px-Google_%22G%22_logo.svg.png";
  const githubLogo =
    "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg";
  const linkedinLogo =
    "https://cdn.worldvectorlogo.com/logos/linkedin-icon.svg";

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
              className="bg-muted border-0 pl-10"
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
              className="bg-muted border-0 pr-10 pl-10"
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
        <div className="grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            type="button"
            className="h-9 w-full cursor-pointer gap-2 border-slate-200 text-sm font-semibold transition-colors hover:bg-slate-50 sm:h-12 dark:border-slate-800 dark:hover:bg-slate-900"
            onClick={handleGoogleLogin}
          >
            <img
              src={googleLogo}
              alt="google"
              className="size-5 object-cover"
            />
            <span className="hidden sm:inline-block">Google</span>
          </Button>
          <Button
            variant="outline"
            type="button"
            className="h-9 w-full cursor-pointer gap-2 border-slate-200 text-sm font-semibold transition-colors hover:bg-slate-50 sm:h-12 dark:border-slate-800 dark:hover:bg-slate-900"
            onClick={handleGithubLogin}
          >
            <img
              src={githubLogo}
              alt="github"
              className="size-5 object-cover"
            />
            <span className="hidden sm:inline-block">GitHub</span>
          </Button>
          <Button
            variant="outline"
            type="button"
            className="h-9 w-full cursor-pointer gap-2 border-slate-200 text-sm font-semibold transition-colors hover:bg-slate-50 sm:h-12 dark:border-slate-800 dark:hover:bg-slate-900"
          >
            <img
              src={linkedinLogo}
              alt="linkedin"
              className="size-5 object-cover"
            />
            <span className="hidden sm:inline-block">LinkedIn</span>
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
