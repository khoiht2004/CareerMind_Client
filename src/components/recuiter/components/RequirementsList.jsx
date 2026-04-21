import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function RequirementsList({ items, onChange }) {
  const update = (index, field, value) => {
    const next = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );
    onChange({ target: { name: "requirements", value: next } });
  };

  const add = () => {
    onChange({
      target: {
        name: "requirements",
        value: [...items, { label: "", content: "" }],
      },
    });
  };

  const remove = (index) => {
    if (items.length === 1) return;
    onChange({
      target: {
        name: "requirements",
        value: items.filter((_, i) => i !== index),
      },
    });
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-[1.5fr_3fr_auto] items-center gap-2"
        >
          <Input
            value={item.label}
            onChange={(e) => update(index, "label", e.target.value)}
            placeholder="Nhãn (VD: Học vấn)"
            className="bg-primary/10"
          />
          <Input
            value={item.content}
            onChange={(e) => update(index, "content", e.target.value)}
            placeholder="Nội dung"
            className="bg-primary/10"
          />
          <button
            type="button"
            onClick={() => remove(index)}
            disabled={items.length === 1}
            className="text-muted-foreground hover:text-destructive cursor-pointer rounded p-1 transition-colors disabled:opacity-30"
          >
            <X className="size-4" />
          </button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={add}
        className="cursor-pointer gap-1.5"
      >
        <Plus className="size-3.5" />
        Thêm yêu cầu
      </Button>
    </div>
  );
}

export default RequirementsList;
