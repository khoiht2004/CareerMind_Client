import { ShieldCheck } from "lucide-react";

function UserSummary({ avatar, email, name, userCode }) {
  return (
    <div className="flex items-center gap-4 px-5 py-4">
      <div className="bg-muted flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full">
        {avatar}
      </div>
      <div className="min-w-0">
        <div className="truncate text-base font-bold text-slate-800">{name}</div>
        <div className="mt-0.5 flex items-center gap-1 text-xs text-slate-500">
          <ShieldCheck className="size-3.5 text-primary" />
          Tài khoản đã xác thực
        </div>
        <div className="mt-1 truncate text-xs text-slate-500">
          {userCode} <span className="mx-1">|</span> {email}
        </div>
      </div>
    </div>
  );
}

export default UserSummary;
