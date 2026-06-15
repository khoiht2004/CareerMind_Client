import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRegister } from "@/hooks/useRegister";
import { Eye, EyeOff, Loader2, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";

function RegisterForm({ onSwitch }) {
  const {
    register,
    handleSubmit,
    errors,
    onSubmit,
    showPassword,
    setShowPassword,
    showConfirm,
    setShowConfirm,
    isLoading,
  } = useRegister();

  const preventClipboard = (e) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-6">
      <div className="space-y-1.5">
        <h2 className="text-3xl font-black">Tạo tài khoản</h2>
        <p className="text-muted-foreground text-sm">
          Đăng ký để bắt đầu hành trình sự nghiệp cùng chúng tôi.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div className="space-y-1.5">
          <Label htmlFor="reg-name">Họ và tên</Label>
          <div className="relative">
            <User className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
            <Input
              id="reg-name"
              placeholder="Nguyễn Văn A"
              autoComplete="name"
              className="bg-muted border-0 pl-10"
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="text-destructive text-xs">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <Label htmlFor="reg-email">Email</Label>
          <div className="relative">
            <Mail className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
            <Input
              id="reg-email"
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
          <Label htmlFor="reg-password">Mật khẩu</Label>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
            <Input
              id="reg-password"
              type={showPassword ? "text" : "password"}
              placeholder="Ít nhất 8 ký tự"
              autoComplete="new-password"
              className="bg-muted border-0 pr-10 pl-10"
              onCopy={preventClipboard}
              onCut={preventClipboard}
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

        {/* Confirm password */}
        <div className="space-y-1.5">
          <Label htmlFor="reg-confirm">Xác nhận mật khẩu</Label>
          <div className="relative">
            <Lock className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
            <Input
              id="reg-confirm"
              type={showConfirm ? "text" : "password"}
              placeholder="Nhập lại mật khẩu"
              autoComplete="new-password"
              className="bg-muted border-0 pr-10 pl-10"
              onCopy={preventClipboard}
              onCut={preventClipboard}
              {...register("confirmPassword")}
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              tabIndex={-1}
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
            >
              {showConfirm ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-destructive text-xs">
              {errors.confirmPassword.message}
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
            <>Đăng ký</>
          )}
        </Button>
      </form>

      <p className="text-muted-foreground text-center text-sm">
        Đã có tài khoản?{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-primary cursor-pointer font-semibold hover:underline"
        >
          Đăng nhập
        </button>
      </p>
    </div>
  );
}

export default RegisterForm;
