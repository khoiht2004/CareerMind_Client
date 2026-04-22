import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "@/validations/auth.schema";
import { useChangePasswordMutation } from "@/services/auth.service";

export const useMySettings = () => {
  const [show, setShow] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const form = useForm({ 
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  const onSubmit = async (data) => {
    try {
      await changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      }).unwrap();
      toast.success("Đã đổi mật khẩu thành công");
      form.reset();
    } catch (err) {
      toast.error(err?.data?.message ?? "Đổi mật khẩu thất bại");
    }
  };

  const toggleShow = (field) =>
    setShow((prev) => ({ ...prev, [field]: !prev[field] }));

  return {
    form,
    show,
    isLoading,
    onSubmit: form.handleSubmit(onSubmit),
    toggleShow,
  };
};
