/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect, useRef, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { Loader2, MailCheck, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { path } from "@/config/path";
import { useVerifyEmailMutation } from "@/services/auth.service";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email ?? "";

  if (!email) return <Navigate to={path.register} replace />;

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(""));
  const [countdown, setCountdown] = useState(RESEND_COOLDOWN);
  const inputRefs = useRef([]);
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setInterval(() => setCountdown((c) => c - 1), 1000);
    return () => clearInterval(t);
  }, [countdown]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...otp];
    next[index] = value.slice(-1);
    setOtp(next);
    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    const text = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    if (!text) return;
    const next = Array(OTP_LENGTH).fill("");
    text.split("").forEach((c, i) => (next[i] = c));
    setOtp(next);
    inputRefs.current[Math.min(text.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleSubmit = async () => {
    const code = otp.join("");
    if (code.length < OTP_LENGTH) {
      toast.error("Vui lòng nhập đủ 6 chữ số");
      return;
    }
    try {
      await verifyEmail({ email, code }).unwrap();
      toast.success("Xác thực email thành công!");
      navigate(path.login);
    } catch (err) {
      toast.error(err?.data?.message ?? "Mã xác thực không đúng");
      setOtp(Array(OTP_LENGTH).fill(""));
      inputRefs.current[0]?.focus();
    }
  };

  const handleResend = () => {
    setCountdown(RESEND_COOLDOWN);
    toast.info("Mã xác thực mới đã được gửi đến email của bạn");
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-3 pb-4 text-center">
        <div className="flex justify-center">
          <div className="bg-primary/10 flex h-14 w-14 items-center justify-center rounded-2xl">
            <MailCheck className="text-primary size-7" />
          </div>
        </div>
        <CardTitle className="text-2xl">Xác thực email</CardTitle>
        <CardDescription>
          Chúng tôi đã gửi mã 6 chữ số đến
          <br />
          <span className="text-foreground font-semibold">
            {email || "email của bạn"}
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex justify-center gap-2" onPaste={handlePaste}>
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="bg-background focus:ring-ring h-12 w-11 rounded-lg border text-center text-lg font-bold transition-all focus:ring-2 focus:outline-none"
            />
          ))}
        </div>

        <Button
          className="h-11 w-full text-lg font-semibold"
          onClick={handleSubmit}
          disabled={isLoading || otp.join("").length < OTP_LENGTH}
        >
          {isLoading && <Loader2 className="size-4 animate-spin" />}
          Xác thực
        </Button>

        <div className="text-center">
          {countdown > 0 ? (
            <p className="text-muted-foreground text-sm">
              Gửi lại mã sau{" "}
              <span className="text-foreground font-semibold">
                {countdown}s
              </span>
            </p>
          ) : (
            <button
              onClick={handleResend}
              className="inline-flex items-center gap-1.5 text-sm font-medium hover:underline"
            >
              <RefreshCw className="size-3.5" />
              Gửi lại mã xác thực
            </button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default VerifyEmail;
