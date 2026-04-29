import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  JOB_TYPE_OPTIONS,
  LOCATION_OPTIONS,
} from "@/config/constants/candidate.constant";
import { JOB_STATUS_DOT } from "@/config/constants/recruiter.constant";
import JobFormField from "./JobFormField";
import JobFormSectionHeader from "./JobFormSectionHeader";

const STATUS_OPTIONS = [
  { value: "PUBLISHED", label: "Công khai" },
  { value: "DRAFT", label: "Nháp" },
  { value: "CLOSED", label: "Đóng" },
];

function JobFormBasicSection({ form, onChange, onSelectChange }) {
  return (
    <div className="space-y-4">
      <JobFormSectionHeader title="Thông tin cơ bản" />

      {/* Tiêu đề */}
      <JobFormField label="Tiêu đề công việc" required>
        <Input
          name="title"
          value={form.title}
          onChange={onChange}
          placeholder="VD: Senior Frontend Engineer"
          className="bg-primary/10"
        />
      </JobFormField>

      {/* Địa điểm */}
      <div className="grid grid-cols-3 gap-4">
        <JobFormField label="Địa điểm" required>
          <Select
            value={form.location}
            onValueChange={(value) => onSelectChange("location", value)}
          >
            <SelectTrigger className="bg-primary/10 w-full">
              <div className="flex items-center gap-2">
                <MapPin className="text-muted-foreground size-3.5 shrink-0" />
                <SelectValue placeholder="Chọn địa điểm" />
              </div>
            </SelectTrigger>

            <SelectContent>
              {LOCATION_OPTIONS.filter((option) => option.value !== "ALL").map(
                (option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </JobFormField>

        {/* Hình thức */}
        <JobFormField label="Hình thức">
          <Select
            value={form.type}
            onValueChange={(value) => onSelectChange("type", value)}
          >
            <SelectTrigger className="bg-primary/10 w-full">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {JOB_TYPE_OPTIONS.filter((option) => option.value !== "ALL").map(
                (option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ),
              )}
            </SelectContent>
          </Select>
        </JobFormField>

        {/* Trạng thái */}
        <JobFormField label="Trạng thái">
          <Select
            value={form.status}
            onValueChange={(value) => onSelectChange("status", value)}
          >
            <SelectTrigger className="bg-primary/10 w-full">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>
              {STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <span className="flex items-center gap-2">
                    <span
                      className="size-2 rounded-full"
                      style={{ backgroundColor: JOB_STATUS_DOT[option.value] }}
                    />
                    {option.label}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </JobFormField>
      </div>
    </div>
  );
}

export default JobFormBasicSection;
