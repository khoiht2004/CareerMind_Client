import { useState } from "react";
import { toast } from "sonner";

export const useMyChatbot = () => {
  const [interests, setInterests] = useState(["Phát triển Phần mềm", "Quản trị Dự án"]);
  const [salaryRange, setSalaryRange] = useState([15, 35]); // in millions
  const [locations, setLocations] = useState(["TP. Hồ Chí Minh", "Từ xa"]);
  const [isSaving, setIsSaving] = useState(false);

  const toggleInterest = (interest) => {
    setInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const removeLocation = (loc) => {
    setLocations((prev) => prev.filter((l) => l !== loc));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Đã lưu cấu hình AI thành công");
    } catch (error) {
      console.log(error);
      toast.error("Không thể lưu cấu hình");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset to defaults or fetch from API
    setInterests(["Phát triển Phần mềm", "Quản trị Dự án"]);
    setSalaryRange([15, 35]);
    setLocations(["TP. Hồ Chí Minh", "Từ xa"]);
    toast.info("Đã khôi phục cài đặt gốc");
  };

  return {
    interests,
    toggleInterest,
    salaryRange,
    setSalaryRange,
    locations,
    removeLocation,
    isSaving,
    handleSave,
    handleCancel,
  };
};
