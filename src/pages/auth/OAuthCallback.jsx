import { useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { useGoogleLoginMutation, useGithubLoginMutation, authService } from "@/services/auth.service";
import {
  REFRESH_TOKEN_KEY,
  ACCESS_TOKEN_KEY,
} from "@/config/constants/constants";
import { path } from "@/config/path";

export default function OAuthCallback() {
  const { provider } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const code = searchParams.get("code");
  const [googleLogin] = useGoogleLoginMutation();
  const [githubLogin] = useGithubLoginMutation();

  useEffect(() => {
    if (!code) {
      toast.error("Không tìm thấy mã xác thực OAuth");
      navigate(path.login);
      return;
    }

    const processLogin = async () => {
      try {
        const redirectUri = `${window.location.origin}/oauth/callback/${provider}`;

        let res;
        let providerName;
        if (provider === "google") {
          res = await googleLogin({ code, redirectUri }).unwrap();
          providerName = "Google";
        } else if (provider === "github") {
          res = await githubLogin({ code, redirectUri }).unwrap();
          providerName = "GitHub";
        } else {
          throw new Error("Nhà cung cấp không hợp lệ");
        }

        const accessToken = res?.data?.accessToken ?? res?.accessToken;
        const refreshToken = res?.data?.refreshToken ?? res?.refreshToken;

        if (accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

        await dispatch(
          authService.endpoints.getMe.initiate(undefined, {
            forceRefetch: true,
          }),
        ).unwrap();

        toast.success(
          `Đăng nhập bằng ${providerName} thành công!`,
        );
        navigate(path.home);
      } catch (err) {
        console.error("OAuth callback error:", err);
        toast.error(
          err?.data?.message ??
            `Đăng nhập bằng ${provider} thất bại. Vui lòng thử lại.`,
        );
        navigate(path.login);
      }
    };

    processLogin();
  }, [code, provider, navigate, dispatch, googleLogin, githubLogin]);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
      <Loader2 className="text-primary size-10 animate-spin" />
      <h3 className="text-xl font-semibold">Đang kết nối tài khoản...</h3>
      <p className="text-muted-foreground text-sm">
        Vui lòng đợi trong giây lát khi chúng tôi xác thực với{" "}
        {provider === "google" ? "Google" : provider}.
      </p>
    </div>
  );
}
