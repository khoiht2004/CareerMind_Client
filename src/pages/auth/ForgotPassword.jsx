import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Loader2, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { path } from "@/config/path";
import { useForgotPasswordMutation } from "@/services/auth.service";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (isSubmitted && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (isSubmitted && countdown === 0) {
      navigate(path.login);
    }
    return () => clearInterval(timer);
  }, [isSubmitted, countdown, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Vui lòng nhập email");
      return;
    }

    try {
      await forgotPassword({ email }).unwrap();
      setIsSubmitted(true);
      toast.success("Mật khẩu mới đã được gửi đến email của bạn.");
    } catch (err) {
      toast.error(err?.data?.message ?? "Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-sm shadow-lg md:max-w-md overflow-hidden relative">
        {/* Animated background progress bar */}
        <div 
          className="absolute top-0 left-0 h-1 bg-primary transition-all duration-1000 ease-linear"
          style={{ width: `${(countdown / 5) * 100}%` }}
        />
        <CardHeader className="space-y-4 text-center pt-8">
          <div className="flex justify-center">
            <div className="bg-green-100 dark:bg-green-900/30 flex h-20 w-20 items-center justify-center rounded-full animate-in zoom-in duration-500">
              <CheckCircle2 className="text-green-600 dark:text-green-500 size-10" />
            </div>
          </div>
          <CardTitle className="text-2xl">Thành công!</CardTitle>
          <CardDescription className="text-base">
            Mật khẩu mới đã được gửi đến <span className="font-semibold text-foreground">{email}</span>.
            <br /> Vui lòng kiểm tra hộp thư của bạn.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pb-8">
          <div className="bg-muted/50 rounded-xl p-4 text-center">
            <p className="text-sm text-muted-foreground mb-2">Tự động quay về trang đăng nhập sau</p>
            <div className="flex justify-center items-baseline gap-1">
              <span className="text-4xl font-bold text-primary tabular-nums">{countdown}</span>
              <span className="text-muted-foreground font-medium">giây</span>
            </div>
          </div>
          <Button
            className="w-full h-11"
            onClick={() => navigate(path.login)}
          >
            Quay lại đăng nhập ngay
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-sm shadow-lg md:max-w-md">
      <CardHeader className="space-y-3 text-center">
        <div className="flex justify-center">
          <div className="bg-primary/10 flex h-14 w-14 items-center justify-center rounded-2xl">
            <Mail className="text-primary size-7" />
          </div>
        </div>
        <CardTitle className="text-2xl">Quên mật khẩu?</CardTitle>
        <CardDescription>
          Nhập email của bạn và chúng tôi sẽ gửi cho bạn một mật khẩu mới.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative space-y-1.5">
            <Mail className="text-muted-foreground absolute top-1/2 left-3.5 size-4 -translate-y-1/2" />
            <Input
              id="email"
              type="email"
              placeholder="name@company.com"
              className="bg-muted border-0 pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button
            type="submit"
            className="h-11 w-full text-sm font-semibold"
            disabled={isLoading}
          >
            {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
            Gửi mật khẩu mới
          </Button>
        </form>

        <div className="text-center">
          <Link
            to={path.login}
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
          >
            <ArrowLeft className="size-3.5" />
            Quay lại đăng nhập
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default ForgotPassword;
