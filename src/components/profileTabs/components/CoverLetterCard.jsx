import { memo, useCallback } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/utils/helper";

function CoverLetterCard({ cl, onEdit, onDelete }) {
  const handleEdit = useCallback(() => onEdit(cl), [cl, onEdit]);
  const handleDelete = useCallback(() => onDelete(cl.id), [cl.id, onDelete]);

  return (
    <div className="group bg-card hover:border-primary/50 relative rounded-xl border p-4 transition-all hover:shadow-md">
      <div className="mb-2 flex items-start justify-between">
        <div className="space-y-1">
          <h4 className="line-clamp-1 leading-none font-semibold tracking-tight">
            {cl.title}
          </h4>
          <p className="text-muted-foreground text-xs">
            Cập nhật: {formatDate(cl.updatedAt)}
          </p>
        </div>
        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100">
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={handleEdit}
          >
            <Pencil className="size-4 text-blue-500" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 hover:bg-red-50"
            onClick={handleDelete}
          >
            <Trash2 className="size-4 text-red-500" />
          </Button>
        </div>
      </div>
      <div className="text-muted-foreground mt-3 line-clamp-4 overflow-hidden text-sm leading-relaxed">
        {cl.content}
      </div>
    </div>
  );
}

export default memo(CoverLetterCard);
