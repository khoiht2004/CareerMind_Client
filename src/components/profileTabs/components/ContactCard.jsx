import { memo } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function ContactCard({
  email,
  phone,
  onPhoneChange,
  address,
  onAddressChange,
  isSaving,
  onSave,
}) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm">Thông tin liên hệ</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs">Email</Label>
          <Input defaultValue={email} readOnly className="bg-muted/40" />
        </div>
        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs">Số điện thoại</Label>
          <Input
            placeholder="Chưa cập nhật"
            value={phone}
            onChange={(e) => onPhoneChange(e.target.value)}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-muted-foreground text-xs">Địa chỉ</Label>
          <Input
            placeholder="Chưa cập nhật"
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
          />
        </div>
        <Button
          onClick={onSave}
          disabled={isSaving}
          size="sm"
          className="h-8 cursor-pointer px-4 py-2.5 text-[14px] font-medium"
        >
          {isSaving && <Loader2 className="mr-1.5 size-3.5 animate-spin" />}
          Lưu thay đổi
        </Button>
      </CardContent>
    </Card>
  );
}

export default memo(ContactCard);
