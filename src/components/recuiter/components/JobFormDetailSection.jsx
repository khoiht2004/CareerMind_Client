import { Input } from "@/components/ui/input";
import JobFormField from "./JobFormField";
import JobFormSectionHeader from "./JobFormSectionHeader";

function JobFormDetailSection({ form, onChange }) {
  return (
    <div className="space-y-4">
      <JobFormSectionHeader title="Chi tiết vị trí" />

      <div className="grid grid-cols-2 gap-4">
        <JobFormField label="Mức lương">
          <Input
            name="salary"
            placeholder="VD: 25tr - 40tr"
            value={form.salary}
            onChange={onChange}
            className="bg-primary/10"
          />
        </JobFormField>
        <JobFormField label="Cấp bậc">
          <Input
            name="level"
            placeholder="VD: Senior, Junior, Intern"
            value={form.level}
            onChange={onChange}
            className="bg-primary/10"
          />
        </JobFormField>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <JobFormField label="Số lượng tuyển">
          <Input
            name="slots"
            type="number"
            min={1}
            value={form.slots}
            onChange={onChange}
            className="bg-primary/10"
          />
        </JobFormField>
        <JobFormField label="Hạn nộp hồ sơ">
          <Input
            name="deadline"
            type="date"
            value={form.deadline}
            onChange={onChange}
            className="bg-primary/10"
          />
        </JobFormField>
      </div>
    </div>
  );
}

export default JobFormDetailSection;
