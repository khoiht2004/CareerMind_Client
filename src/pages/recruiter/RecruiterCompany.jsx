import { useEffect, useState } from "react";
import { Building2, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { NotFound } from "@/components/shared/NotFound";
import PageContainer from "@/components/shared/PageContainer";
import {
  useGetMyCompanyProfileQuery,
  useUpdateMyCompanyProfileMutation,
} from "@/services/company.service";
import { usePermission } from "@/hooks/usePermission";

const FIELDS = [
  ["name", "Tên công ty"],
  ["email", "Email"],
  ["phone", "Điện thoại"],
  ["industry", "Ngành nghề"],
  ["size", "Quy mô"],
  ["address", "Địa chỉ"],
  ["logoUrl", "Logo URL"],
  ["coverImageUrl", "Cover image URL"],
  ["mapUrl", "Google map embed URL"],
];

function RecruiterCompany() {
  const canManage = usePermission("company:manage");
  const { data, isLoading } = useGetMyCompanyProfileQuery(undefined, {
    skip: !canManage,
  });
  const [updateCompany, { isLoading: isSaving }] =
    useUpdateMyCompanyProfileMutation();
  const [form, setForm] = useState({});

  useEffect(() => {
    if (data?.data) setForm(data.data);
  }, [data]);

  if (!canManage) {
    return <NotFound message="Bạn không có quyền quản lý hồ sơ công ty" />;
  }

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="text-muted-foreground size-8 animate-spin" />
      </div>
    );
  }

  const handleChange = (key, value) =>
    setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCompany(form).unwrap();
    toast.success("Đã cập nhật hồ sơ công ty");
  };

  return (
    <PageContainer as="form" onSubmit={handleSubmit} className="max-w-6xl">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2 text-2xl font-bold">
            <Building2 className="size-6" />
            Hồ sơ công ty
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Cập nhật thông tin hiển thị trên trang công ty public.
          </p>
        </div>
        <Button disabled={isSaving} className="gap-2">
          {isSaving ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Save className="size-4" />
          )}
          Lưu thay đổi
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {FIELDS.map(([key, label]) => (
          <label key={key} className="space-y-1.5">
            <span className="text-sm font-medium">{label}</span>
            <Input
              className="bg-primary/10"
              value={form[key] ?? ""}
              onChange={(e) => handleChange(key, e.target.value)}
              readOnly={key === "name" || key === "email" || key === "phone"}
            />
          </label>
        ))}
      </div>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium">Mô tả ngắn</span>
        <Textarea
          className="bg-primary/10"
          value={form.subDescription ?? ""}
          onChange={(e) => handleChange("subDescription", e.target.value)}
          rows={3}
        />
      </label>

      <label className="block space-y-1.5">
        <span className="text-sm font-medium">Giới thiệu công ty</span>
        <Textarea
          className="bg-primary/10"
          value={form.description ?? ""}
          onChange={(e) => handleChange("description", e.target.value)}
          rows={8}
        />
      </label>
    </PageContainer>
  );
}

export default RecruiterCompany;
