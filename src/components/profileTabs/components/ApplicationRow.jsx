import { memo, useCallback } from "react";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  APPLICATION_STATUS_LABELS,
  STATUS_CONFIG,
} from "@/config/constants/candidate.constant";

function ApplicationRow({ app, onDeleteClick }) {
  const navigate = useNavigate();
  const cfg = STATUS_CONFIG[app.status];
  const Icon = cfg?.icon;
  const label = APPLICATION_STATUS_LABELS[app.status] ?? app.status;

  const handleNavigate = useCallback(() => {
    navigate(`/applications/${app.id}`);
  }, [navigate, app.id]);

  const handleDelete = useCallback(
    (e) => {
      e.stopPropagation();
      onDeleteClick(app);
    },
    [onDeleteClick, app],
  );

  return (
    <TableRow>
      <TableCell
        className="cursor-pointer text-sm font-medium"
        onClick={handleNavigate}
      >
        {app.job?.title}
      </TableCell>
      <TableCell
        className="text-muted-foreground cursor-pointer text-sm"
        onClick={handleNavigate}
      >
        {app.job?.company?.name}
      </TableCell>
      <TableCell
        className="text-muted-foreground cursor-pointer text-sm"
        onClick={handleNavigate}
      >
        {new Date(app.createdAt).toLocaleDateString("vi-VN")}
      </TableCell>
      <TableCell className="cursor-pointer" onClick={handleNavigate}>
        <Badge className={`gap-1 border text-xs ${cfg?.className}`}>
          {Icon && <Icon className="size-3" />}
          {label}
        </Badge>
      </TableCell>
      <TableCell>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive h-8 w-8"
          onClick={handleDelete}
        >
          <Trash2 className="size-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default memo(ApplicationRow);
