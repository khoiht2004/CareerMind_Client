import { useSearchParams } from "react-router";
import { User, FileText, Mail, BotMessageSquare, Settings } from "lucide-react";
import { useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MyProfile from "@/components/profileTabs/MyProfile";
import MyApplications from "@/components/profileTabs/MyApplications";
import MyCv from "@/components/profileTabs/MyCv";
import MyCoverLetter from "@/components/profileTabs/MyCoverLetter";
import MyChatbot from "@/components/profileTabs/MyChatbot";
import MySettings from "@/components/profileTabs/MySettings";
import { PROFILE_TABS } from "@/config/constants/candidate.constant";

const RECRUITER_HIDDEN_TABS = new Set(["applications", "cv", "cover-letter"]);

const TAB_ICONS = {
  profile: User,
  applications: Mail,
  cv: FileText,
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

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Trang cá nhân</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Quản lý thông tin và hoạt động của bạn
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(val) => setSearchParams({ tab: val })}
      >
        <TabsList className="mb-6 h-auto flex-wrap gap-1">
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

        {visibleTabs.map(({ key }) => (
          <TabsContent key={key} value={key}>
            {TAB_CONTENT[key]}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default Profile;
