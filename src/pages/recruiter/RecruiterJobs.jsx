import { useState } from "react";
import { Loader2, Plus, Pencil, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetMyJobsQuery, useDeleteJobMutation } from "@/services/job.service";
import { useNavigate } from "react-router";
import Pagination from "@/components/shared/Pagination";
import JobFormDialog from "@/components/recuiter/JobFormDialog";
import JobDeleteDialog from "@/components/recuiter/JobDeleteDialog";
import { useJobForm } from "@/hooks/useJobForm";
import {
  JOB_STATUS_OPTIONS,
  JOB_STATUS_BADGE,
  JOB_STATUS_LABELS,
} from "@/config/constants/recruiter.constant";
import { JOB_TYPE_LABELS } from "@/config/constants/candidate.constant";

function RecruiterJobs() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({ search: "", status: "ALL", page: 1 });
  const [deleteId, setDeleteId] = useState(null);

  const { data, isLoading } = useGetMyJobsQuery({
    search: filters.search || undefined,
    status: filters.status !== "ALL" ? filters.status : undefined,
    page: filters.page,
    limit: 10,
  });

  const [deleteJob, { isLoading: deleting }] = useDeleteJobMutation();

  const {
    form,
    editJob,
    dialogOpen,
    setDialogOpen,
    openCreate,
    openEdit,
    handleChange,
    handleSelectChange,
    handleSubmit,
    isSaving,
  } = useJobForm();

  const jobs = data?.data?.jobs ?? [];
  const totalPages = data?.data?.totalPages ?? 1;

  const handleDelete = async () => {
    try {
      await deleteJob(deleteId).unwrap();
      toast.success("Đã xóa việc làm");
      setDeleteId(null);
    } catch {
      toast.error("Không thể xóa việc làm");
    }
  };

  return (
    <div className="mx-auto max-w-full space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quản lý việc làm</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {data?.data?.total ?? 0} việc làm đã đăng
          </p>
        </div>
        <Button onClick={openCreate} className="gap-2 cursor-pointer">
          <Plus className="size-4" />
          Tạo mới
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Input
          placeholder="Tìm kiếm theo tiêu đề..."
          className="border-border w-72 border"
          value={filters.search}
          onChange={(e) =>
            setFilters((f) => ({ ...f, search: e.target.value, page: 1 }))
          }
        />
        <Select
          value={filters.status}
          onValueChange={(value) =>
            setFilters((f) => ({ ...f, status: value, page: 1 }))
          }
        >
          <SelectTrigger className="border-border w-40 border">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {JOB_STATUS_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="text-muted-foreground size-6 animate-spin" />
        </div>
      ) : jobs.length === 0 ? (
        <p className="text-muted-foreground py-16 text-center text-sm">
          Chưa có việc làm nào
        </p>
      ) : (
        <>
          <div className="overflow-x-auto rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tiêu đề</TableHead>
                  <TableHead>Công ty</TableHead>
                  <TableHead>Trạng thái</TableHead>
                  <TableHead>Loại</TableHead>
                  <TableHead className="text-center">Đơn ứng tuyển</TableHead>
                  <TableHead>Hạn nộp</TableHead>
                  <TableHead className="text-right">Thao tác</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {jobs.map((job) => (
                  <TableRow key={job.id}>
                    <TableCell className="font-medium">{job.title}</TableCell>
                    <TableCell>{job.company?.name}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${JOB_STATUS_BADGE[job.status]}`}
                      >
                        {JOB_STATUS_LABELS[job.status]}
                      </span>
                    </TableCell>
                    <TableCell>{JOB_TYPE_LABELS[job.type]}</TableCell>
                    <TableCell className="text-center">
                      {job._count?.applications ?? 0}
                    </TableCell>
                    <TableCell className="text-sm">
                      {job.deadline
                        ? new Date(job.deadline).toLocaleDateString("vi-VN")
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8 cursor-pointer"
                          title="Xem"
                          onClick={() => navigate(`/jobs/${job.id}`)}
                        >
                          <Eye className="size-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8 cursor-pointer"
                          title="Sửa"
                          onClick={() => openEdit(job)}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8 cursor-pointer"
                          style={{ color: "var(--destructive)" }}
                          title="Xóa"
                          onClick={() => setDeleteId(job.id)}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <Pagination
            page={filters.page}
            totalPages={totalPages}
            onPageChange={(p) => setFilters((f) => ({ ...f, page: p }))}
          />
        </>
      )}

      <JobFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        editJob={editJob}
        form={form}
        onChange={handleChange}
        onSelectChange={handleSelectChange}
        onSubmit={handleSubmit}
        isSaving={isSaving}
      />

      <JobDeleteDialog
        open={!!deleteId}
        onOpenChange={() => setDeleteId(null)}
        onConfirm={handleDelete}
        isLoading={deleting}
      />
    </div>
  );
}

export default RecruiterJobs;
