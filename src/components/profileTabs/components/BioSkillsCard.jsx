import { memo } from "react";
import { Pencil, Loader2, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function BioSkillsCard({
  editing,
  onToggleEdit,
  bio,
  onBioChange,
  skills,
  onRemoveSkill,
  newSkill,
  onNewSkillChange,
  addingSkill,
  onSetAddingSkill,
  onAddSkill,
  isSaving,
  onSave,
}) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Giới thiệu bản thân</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="cursor-pointer"
            onClick={onToggleEdit}
          >
            <Pencil className="mr-1 size-3.5" />
            {editing ? "Hủy" : "Chỉnh sửa"}
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 pt-0">
        {editing ? (
          <Textarea
            value={bio}
            onChange={(e) => onBioChange(e.target.value)}
            rows={4}
            placeholder="Giới thiệu về bản thân..."
          />
        ) : (
          <p className="text-muted-foreground text-sm leading-relaxed">
            {bio || "Chưa có giới thiệu"}
          </p>
        )}

        <div className="space-y-2">
          <p className="text-sm font-medium">Kỹ năng</p>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                size="lg"
                className="group bg-foreground flex h-[25px] min-w-[65px] items-center gap-1 pr-1.5 text-[13px]"
              >
                {skill}
                {editing && (
                  <button
                    onClick={() => onRemoveSkill(skill)}
                    className="text-muted ml-0.5 cursor-pointer hover:scale-105"
                  >
                    <X className="size-3" />
                  </button>
                )}
              </Badge>
            ))}

            {editing &&
              (addingSkill ? (
                <input
                  autoFocus
                  value={newSkill}
                  onChange={(e) => onNewSkillChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") onAddSkill();
                    if (e.key === "Escape") onSetAddingSkill(false);
                  }}
                  onBlur={onAddSkill}
                  className="border-input h-6 w-28 rounded-full border bg-transparent px-2.5 text-xs outline-none"
                  placeholder="Nhập kỹ năng..."
                />
              ) : (
                <button
                  onClick={() => onSetAddingSkill(true)}
                  className="border-input text-muted-foreground hover:text-foreground hover:border-foreground flex h-6 cursor-pointer items-center gap-1 rounded-full border border-dashed px-2.5 text-xs transition-colors"
                >
                  <Plus className="size-3" />
                  Thêm kỹ năng
                </button>
              ))}
          </div>
        </div>

        {editing && (
          <Button
            size="sm"
            onClick={onSave}
            disabled={isSaving}
            className="cursor-pointer"
          >
            {isSaving && <Loader2 className="mr-1.5 size-3.5 animate-spin" />}
            Lưu
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default memo(BioSkillsCard);
