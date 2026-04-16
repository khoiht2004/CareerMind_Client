import { useSearchParams } from "react-router";
import {
  User,
  FileText,
  Mail,
  BotMessageSquare,
  Settings,
  FileUser,
} from "lucide-react";
import { useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyProfile from "@/components/profileTabs/MyProfile";
import MyApplications from "@/components/profileTabs/MyApplications";
import MyCv from "@/components/profileTabs/MyCv";
import MyCoverLetter from "@/components/profileTabs/MyCoverLetter";
import MyChatbot from "@/components/profileTabs/MyChatbot";
import MySettings from "@/components/profileTabs/MySettings";
import { PROFILE_TABS } from "@/config/constants/candidate.constant";
import { cn } from "@/lib/utils";

const RECRUITER_HIDDEN_TABS = new Set(["applications", "cv", "cover-letter"]);

const TAB_ICONS = {
  profile: User,
  applications: Mail,
  cv: FileUser,
  "cover-letter": FileText,
  chatbot: BotMessageSquare,
  settings: Settings,
};

const TAB_CONTENT = {
  profile: <MyProfile />,
  applications: <MyApplications />,
  cv: <MyCv />,
  "cover-letter": <MyCoverLetter />,
  chatbot: <MyChatbot />,
  settings: <MySettings />,
};

function Profile() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user } = useSelector((state) => state.auth);
  const activeTab = searchParams.get("tab") ?? "profile";

  const visibleTabs =
    user?.role === "RECRUITER"
      ? PROFILE_TABS.filter((t) => !RECRUITER_HIDDEN_TABS.has(t.key))
      : PROFILE_TABS;

  const handleTabChange = (val) => setSearchParams({ tab: val });

  return (
    <div className="mx-auto max-w-full p-4 pb-20 sm:p-6 md:pb-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Trang cá nhân</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Quản lý thông tin và hoạt động của bạn
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        {/* Desktop tabs — hiện > md */}
        <TabsList className="mb-6 hidden h-auto flex-wrap gap-1 md:flex">
          {visibleTabs.map(({ key, label }) => {
            const Icon = TAB_ICONS[key];
            return (
              <TabsTrigger
                key={key}
                value={key}
                className="cursor-pointer gap-2 px-2 py-2.5 text-sm"
              >
                {Icon && <Icon className="size-4" />}
                {label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Tab content */}
        {visibleTabs.map(({ key }) => (
          <TabsContent key={key} value={key} className="max-w-full">
            {TAB_CONTENT[key]}
          </TabsContent>
        ))}
      </Tabs>

      {/* Mobile bottom tab nav — hiện < md */}
      <nav className="bg-background/95 fixed bottom-1 left-1/2 flex h-12 w-[95%] translate-x-[-50%] items-center justify-center overflow-hidden rounded-xl border backdrop-blur md:hidden">
        {visibleTabs.map(({ key }) => {
          const Icon = TAB_ICONS[key];
          const isActive = activeTab === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => handleTabChange(key)}
              className={cn(
                "flex h-full flex-1 cursor-pointer flex-col items-center rounded-xl py-2 text-[10px] font-medium transition-all duration-200",
                isActive
                  ? "text-primary bg-secondary/15"
                  : "text-muted-foreground",
              )}
            >
              {Icon && (
                <Icon
                  className={`size-6 flex-1 ${isActive && "stroke-[2.5]"}`}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default Profile;
