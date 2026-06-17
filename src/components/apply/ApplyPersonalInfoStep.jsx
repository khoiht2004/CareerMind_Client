import { User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { FieldLabel, StepHeader } from "@/features/ApplyPageComponent";

export default function ApplyPersonalInfoStep({ formData, handleChange }) {
  return (
    <article className="bg-primary/10 rounded-2xl p-6 animate-fade-in">
      <StepHeader icon={User} title="Thông tin cá nhân" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <FieldLabel>Họ và tên</FieldLabel>
          <Input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Nguyễn Văn A"
            className="bg-input border-0"
            required
          />
        </div>
        <div>
          <FieldLabel>Email</FieldLabel>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            className="bg-input border-0"
            required
          />
        </div>
        <div>
          <FieldLabel>Số điện thoại</FieldLabel>
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+84 000 000 000"
            className="bg-input border-0"
            required
          />
        </div>
        <div>
          <FieldLabel>LinkedIn Profile (Tùy chọn)</FieldLabel>
          <Input
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="linkedin.com/in/username"
            className="bg-input border-0"
          />
        </div>
      </div>
    </article>
  );
}
