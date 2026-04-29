import { useState } from "react";
import { useMySettings } from "@/hooks/useMySettings";
import SettingsSidebar from "./settings/SettingsSidebar";
import PasswordSettings from "./settings/PasswordSettings";
import TwoFactorSettings from "./settings/TwoFactorSettings";
import DeviceSettings from "./settings/DeviceSettings";

function MySettings() {
  const [activeTab, setActiveTab] = useState("security");
  const { form, show, isLoading, onSubmit, toggleShow } = useMySettings();

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <SettingsSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 space-y-6">
        {activeTab === "security" && (
          <>
            <PasswordSettings
              form={form}
              show={show}
              isLoading={isLoading}
              onSubmit={onSubmit}
              toggleShow={toggleShow}
            />

            <div className="grid gap-6 md:grid-cols-2">
              <TwoFactorSettings />
              <DeviceSettings />
            </div>
          </>
        )}

        {/* Mocking other tabs if needed later */}
        {activeTab === "personal" && (
          <div className="bg-card border-border rounded-xl border p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Thông tin cá nhân</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Chức năng đang được phát triển.
            </p>
          </div>
        )}
        {activeTab === "notifications" && (
          <div className="bg-card border-border rounded-xl border p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Thông báo</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Chức năng đang được phát triển.
            </p>
          </div>
        )}
        {activeTab === "privacy" && (
          <div className="bg-card border-border rounded-xl border p-6 shadow-sm">
            <h2 className="text-lg font-semibold">Quyền riêng tư</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              Chức năng đang được phát triển.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MySettings;
