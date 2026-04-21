import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function BenefitsList({ items, onChange }) {
  const update = (index, field, value) => {
    const next = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item,
    );
    onChange({ target: { name: "benefits", value: next } });
  };

  const add = () => {
    onChange({
      target: {
        name: "benefits",
        value: [...items, { icon: "", label: "", content: "" }],
      },
    });
  };

  const remove = (index) => {
    if (items.length === 1) return;
    onChange({
      target: {
        name: "benefits",
        value: items.filter((_, i) => i !== index),
      },
    });
  };

  return (
    <div className="space-y-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <div className="grid flex-1 grid-cols-[1fr_1.6fr_3fr] gap-2">
            <Input
              value={item.icon}
              onChange={(e) => update(index, "icon", e.target.value)}
              maxLength={4}
              placeholder="Icon"
              className="bg-primary/10"
            />
            <Input
              value={item.label}
              onChange={(e) => update(index, "label", e.target.value)}
              placeholder="Nhãn (VD: Bảo hiểm)"
              className="bg-primary/10"
            />
            <Input
              value={item.content}
              onChange={(e) => update(index, "content", e.target.value)}
              placeholder="Nội dung"
              className="bg-primary/10"
            />
          </div>

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
        Thêm phúc lợi
      </Button>
    </div>
  );
}

export default BenefitsList;
