/* eslint-disable no-unused-vars */
import { memo } from "react";
import { Mail, Phone, MapPin, Globe, Link, Podcast } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

function ContactItem({ icon: Icon, label, value, editing, onChange }) {
  return (
    <div className="flex items-start gap-3">
      <div className="bg-primary/10 mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg">
        <Icon className="text-secondary size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-muted-foreground mb-0.5 text-xs">{label}</p>
        {editing && onChange ? (
          <Input
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Chưa cập nhật"
            className="h-7 text-sm"
          />
        ) : (
          <p className="text-foreground truncate text-sm">
            {value || "Chưa cập nhật"}
          </p>
        )}
      </div>
    </div>
  );
}

function ContactCard({
  email,
  phone,
  onPhoneChange,
  address,
  onAddressChange,
  editing,
}) {
  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="p-5">
          <h3 className="text-muted-foreground mb-4 text-xs font-semibold tracking-wider uppercase">
            Thông tin liên hệ
          </h3>
          <div className="space-y-4">
            <ContactItem icon={Mail} label="Email" value={email} />
            <ContactItem
              icon={Phone}
              label="Số điện thoại"
              value={phone}
              editing={editing}
              onChange={onPhoneChange}
            />
            <ContactItem
              icon={MapPin}
              label="Vị trí"
              value={address}
              editing={editing}
              onChange={onAddressChange}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-5">
          <h3 className="text-muted-foreground mb-4 text-xs font-semibold tracking-wider uppercase">
            Mạng xã hội
          </h3>
          <div className="flex gap-2">
            <div className="bg-primary/10 mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg">
              <Link className="text-secondary size-5" />
            </div>
            <div className="bg-primary/10 mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg">
              <Globe className="text-secondary size-5" />
            </div>
            <div className="bg-primary/10 mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg">
              <Podcast className="text-secondary size-5" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default memo(ContactCard);
