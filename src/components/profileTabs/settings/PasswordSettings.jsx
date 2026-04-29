import { Eye, EyeOff, Loader2, KeyRound, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function PasswordSettings({ form, show, isLoading, onSubmit, toggleShow }) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="mb-6 flex gap-4">
        <div className="bg-primary/10 flex size-10 shrink-0 items-center justify-center rounded-lg">
          <KeyRound className="size-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Đổi mật khẩu</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu của bạn.
          </p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-1.5">
          <Label htmlFor="oldPassword">Mật khẩu hiện tại</Label>
          <div className="relative">
            <Input
              id="oldPassword"
              type={show.oldPassword ? "text" : "password"}
              className="pr-10 bg-muted/50 border-transparent focus:border-ring focus:bg-background"
              {...register("oldPassword")}
            />
            <button
              type="button"
              onClick={() => toggleShow("oldPassword")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
              tabIndex={-1}
            >
              {show.oldPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
          {errors.oldPassword && (
            <p className="text-xs text-destructive">{errors.oldPassword.message}</p>
          )}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="newPassword">Mật khẩu mới</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={show.newPassword ? "text" : "password"}
                className="pr-10 bg-muted/50 border-transparent focus:border-ring focus:bg-background"
                {...register("newPassword")}
              />
              <button
                type="button"
                onClick={() => toggleShow("newPassword")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                tabIndex={-1}
              >
                {show.newPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {errors.newPassword && (
              <p className="text-xs text-destructive">{errors.newPassword.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={show.confirmPassword ? "text" : "password"}
                className="pr-10 bg-muted/50 border-transparent focus:border-ring focus:bg-background"
                {...register("confirmPassword")}
              />
              <button
                type="button"
                onClick={() => toggleShow("confirmPassword")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground cursor-pointer"
                tabIndex={-1}
              >
                {show.confirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
            )}
          </div>
        </div>

        <p className="text-xs text-muted-foreground">Mật khẩu ít nhất 8 ký tự, bao gồm chữ cái và số.</p>

        <div className="flex items-center justify-between border-t border-border/50 pt-6">
          <p className="text-xs text-muted-foreground">
            <span className="inline-block mr-1">ⓘ</span> Lần đổi mật khẩu cuối: 3 tháng trước
          </p>
          <Button type="submit" disabled={isLoading} className="cursor-pointer gap-2">
            {isLoading && <Loader2 className="size-4 animate-spin" />}
            Cập nhật mật khẩu
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PasswordSettings;
