import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRegisterMutation } from "@/services/auth.service";
import { registerSchema } from "@/validations/auth.schema";
import { path } from "@/config/path";

export function useRegister() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [registerUser, { isLoading }] = useRegisterMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = async ({ name, email, password }) => {
    try {
      await registerUser({ name, email, password }).unwrap();
      toast.success("Đăng ký thành công! Vui lòng xác thực email.");
      navigate(path.verifyEmail, { state: { email } });
    } catch (err) {
      toast.error(err?.data?.message ?? "Đăng ký thất bại");
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    showPassword,
    setShowPassword,
    showConfirm,
    setShowConfirm,
    isLoading,
  };
}
