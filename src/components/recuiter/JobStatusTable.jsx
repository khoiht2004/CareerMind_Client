import { Filter, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Pagination from "@/components/shared/Pagination";
import {
  JOB_STATUS_DISPLAY_CONFIG,
  JOB_STATUS_OPTIONS,
} from "@/config/constants/recruiter.constant";
import { JOB_TYPE_LABELS } from "@/config/constants/candidate.constant";
import { formatVN } from "@/utils/helper";

const JOB_STATUS_MAP = Object.fromEntries(
  JOB_STATUS_DISPLAY_CONFIG.map((c) => [c.key, c]),
);

function JobInitials({ title }) {
  const initials = title
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
  return (
    <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-md text-xs font-bold">
      {initials}
    </div>
  );
}

function JobStatusTable({
  jobs,
  isLoading,
  page,
  totalPages,
  total,
  onPageChange,
  statusFilter,
  onStatusFilterChange,
}) {
  const from = (page - 1) * 5 + 1;
  const to = Math.min(page * 5, total);

  return (
    <div className="space-y-4">
      {/* Table header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold">Việc làm theo trạng thái</h2>
          <p className="text-muted-foreground text-xs">
            Chi tiết tình hình tuyển dụng theo vị trí
          </p>
        </div>
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <Select value={statusFilter} onValueChange={onStatusFilterChange}>
            <SelectTrigger className="border-border h-8 w-36 gap-1.5 border text-xs">
              <Filter className="size-3.5" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {JOB_STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button size="sm" className="h-8 gap-1.5 text-xs">
            <Download className="size-3.5" />
            Xuất báo cáo
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-xs font-semibold tracking-wider uppercase">
                Tên vị trí
              </TableHead>
              <TableHead className="text-xs font-semibold tracking-wider uppercase">
                Hình thức
              </TableHead>
              <TableHead className="text-xs font-semibold tracking-wider uppercase">
                Ngày đăng
              </TableHead>
              <TableHead className="text-center text-xs font-semibold tracking-wider uppercase">
                Ứng viên
              </TableHead>
              <TableHead className="text-xs font-semibold tracking-wider uppercase">
                Trạng thái
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center">
                  <Loader2 className="text-muted-foreground mx-auto size-5 animate-spin" />
                </TableCell>
              </TableRow>
            ) : jobs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-muted-foreground h-32 text-center text-sm"
                >
                  Chưa có việc làm nào
                </TableCell>
              </TableRow>
            ) : (
              jobs.map((job) => {
                const statusCfg = JOB_STATUS_MAP[job.status];
                return (
                  <TableRow key={job.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <JobInitials title={job.title} />
                        <div>
                          <p className="text-sm font-medium">{job.title}</p>
                          <p className="text-muted-foreground text-xs">
                            {job.location}
                            {job.type &&
                              ` • ${JOB_TYPE_LABELS[job.type] ?? job.type}`}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">
                      {JOB_TYPE_LABELS[job.type] ?? job.type}
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatVN(job.createdAt)}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="text-sm font-semibold">
                        {job._count?.applications ?? 0}
                      </span>
                    </TableCell>
                    <TableCell>
                      {statusCfg && (
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusCfg.className}`}
                        >
                          {statusCfg.label}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      {total > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground text-xs">
            Hiển thị {from}–{to} trong tổng số {total} vị trí
          </p>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
}

export default JobStatusTable;
