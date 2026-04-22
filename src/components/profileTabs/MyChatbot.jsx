import { useMyChatbot } from "@/hooks/useMyChatbot";
import ChatbotStats from "./chatbot/ChatbotStats";
import ChatbotConfigForm from "./chatbot/ChatbotConfigForm";

function MyChatbot() {
  const {
    interests,
    toggleInterest,
    salaryRange,
    setSalaryRange,
    locations,
    removeLocation,
    isSaving,
    handleSave,
    handleCancel,
  } = useMyChatbot();

  return (
    <>
      <div className="mb-6">
        <h1 className="text-primary text-3xl font-black">Cài đặt ChatBot AI</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Quản lý và tinh chỉnh ChatBot AI để tìm kiếm cơ hội việc làm tốt nhất
          dành cho bạn.
        </p>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        <ChatbotStats />

        <ChatbotConfigForm
          interests={interests}
          toggleInterest={toggleInterest}
          salaryRange={salaryRange}
          setSalaryRange={setSalaryRange}
          locations={locations}
          removeLocation={removeLocation}
          isSaving={isSaving}
          handleSave={handleSave}
          handleCancel={handleCancel}
        />
      </div>
    </>
  );
}

export default MyChatbot;
