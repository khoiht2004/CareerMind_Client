import { memo } from "react";
import { X, Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

function BioSkillsCard({
  editing,
  bio,
  onBioChange,
  skills,
  onRemoveSkill,
  newSkill,
  onNewSkillChange,
  addingSkill,
  onSetAddingSkill,
  onAddSkill,
}) {
  return (
    <div className="space-y-4">
      {/* Bio */}
      <Card>
        <CardContent className="p-5">
          <h3 className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
            Giới thiệu bản thân
          </h3>
          {editing ? (
            <Textarea
              value={bio}
              onChange={(e) => onBioChange(e.target.value)}
              rows={4}
              placeholder="Giới thiệu về bản thân..."
              className="resize-none"
            />
          ) : (
            <p className="text-muted-foreground text-sm leading-relaxed">
              {bio || "Chưa có giới thiệu"}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardContent className="p-5">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
              Kỹ năng chuyên môn
            </h3>
            {editing && !addingSkill && (
              <button
                onClick={() => onSetAddingSkill(true)}
                className="text-secondary hover:text-secondary/80 flex cursor-pointer items-center gap-1 text-xs font-medium transition-colors"
              >
                <Plus className="size-3" />
                Thêm mới
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Badge
                key={skill}
                variant="secondary"
                className="bg-primary text-primary-foreground text-md flex items-center gap-1 px-3.5 py-2.5"
              >
                {skill}
                {editing && (
                  <button
                    onClick={() => onRemoveSkill(skill)}
                    className="text-background/60 hover:text-background ml-0.5 cursor-pointer"
                  >
                    <X className="size-3" />
                  </button>
                )}
              </Badge>
            ))}

            {editing && addingSkill && (
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
            )}

            {skills.length === 0 && !editing && (
              <p className="text-muted-foreground text-sm">
                Chưa có kỹ năng nào
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default memo(BioSkillsCard);
