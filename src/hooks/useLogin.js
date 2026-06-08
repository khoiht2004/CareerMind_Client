import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { useLoginMutation, authService } from "@/services/auth.service";
import {
  REFRESH_TOKEN_KEY,
  ACCESS_TOKEN_KEY,
} from "@/config/constants/constants";
import { path } from "@/config/path";
import { loginSchema } from "@/validations/auth.schema";

export function useLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();
      const accessToken = res?.data?.accessToken ?? res?.accessToken;
      const refreshToken = res?.data?.refreshToken ?? res?.refreshToken;
      if (accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
      if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
      await dispatch(
        authService.endpoints.getMe.initiate(undefined, { forceRefetch: true }),
      ).unwrap();
      toast.success("Đăng nhập thành công!");
      navigate(path.home);
    } catch (err) {
      toast.error(err?.data?.message ?? "Email hoặc mật khẩu không đúng");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    showPassword,
    setShowPassword,
    isLoading,
  };
}
