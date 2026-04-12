import { useState } from "react";
import { Loader2, Plus, Pencil, Trash2, Eye } from "lucide-react";
import Pagination from "@/components/shared/Pagination";
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
  useGetMyJobsQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
} from "@/services/job.service";
import { useNavigate } from "react-router";
import JobFormDialog from "@/components/recuiter/JobFormDialog";
import JobDeleteDialog from "@/components/recuiter/JobDeleteDialog";
import {
  JOB_STATUS_OPTIONS,
  JOB_STATUS_BADGE,
  JOB_STATUS_LABELS,
  EMPTY_JOB_FORM,
} from "@/config/constants/recruiter.constant";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JOB_TYPE_LABELS } from "@/config/constants/candidate.constant";
import { convertArray } from "@/utils/helper";

function RecruiterJobs() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    search: "",
    status: "ALL",
    page: 1,
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editJob, setEditJob] = useState(null);
  const [form, setForm] = useState(EMPTY_JOB_FORM);

  const { data, isLoading } = useGetMyJobsQuery({
    search: filters.search || undefined,
    status: filters.status !== "ALL" ? filters.status : undefined,
    page: filters.page,
    limit: 10,
  });

  const [createJob, { isLoading: creating }] = useCreateJobMutation();
  const [updateJob, { isLoading: updating }] = useUpdateJobMutation();
  const [deleteJob, { isLoading: deleting }] = useDeleteJobMutation();

  const jobs = data?.data?.jobs ?? [];
  const totalPages = data?.data?.totalPages ?? 1;

  const openCreate = () => {
    setEditJob(null);
    setForm(EMPTY_JOB_FORM);
    setDialogOpen(true);
  };

  const openEdit = (job) => {
    setEditJob(job);
    setForm({
      title: job.title,
      company: job.company,
      location: job.location,
      description: job.description,
      salary: job.salary ?? "",
      type: job.type,
      level: job.level ?? "",
      slots: job.slots,
      tags: job.tags,
      benefits: job.benefits,
      status: job.status,
      isHot: job.isHot,
      deadline: job.deadline ? job.deadline.slice(0, 10) : "",
    });
    setDialogOpen(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSelectChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      slots: +form.slots,
      tags: convertArray(form.tags),
      benefits: convertArray(form.benefits),
      deadline: form.deadline || undefined,
    };
    try {
      if (editJob) {
        await updateJob({ id: editJob.id, ...payload }).unwrap();
        toast.success("Cập nhật việc làm thành công");
      } else {
        await createJob(payload).unwrap();
        toast.success("Tạo việc làm thành công");
      }
      setDialogOpen(false);
    } catch (err) {
      toast.error(err?.data?.message ?? "Có lỗi xảy ra");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteJob(deleteId).unwrap();
      toast.success("Đã xóa việc làm");
      setDeleteId(null);
    } catch {
      toast.error("Không thể xóa việc làm");
    }
  };

  const isSaving = creating || updating;

  return (
    <div className="mx-auto max-w-6xl space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Quản lý việc làm</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {data?.data?.total ?? 0} việc làm đã đăng
          </p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="size-4" />
          Tạo mới
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Input
          placeholder="Tìm kiếm theo tiêu đề, công ty..."
          className="w-72"
          value={filters.search}
          onChange={(e) =>
            setFilters((f) => ({ ...f, search: e.target.value, page: 1 }))
          }
        />
        <Select
          value={filters.status}
          onValueChange={(v) =>
            setFilters((f) => ({ ...f, status: v, page: 1 }))
          }
        >
          <SelectTrigger className="w-40">
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
          <div className="rounded-lg border">
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
                    {/* Tiêu đề */}
                    <TableCell className="font-medium">{job.title}</TableCell>
                    {/* Công ty */}
                    <TableCell>{job.company}</TableCell>
                    {/* Trạng thái */}
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${JOB_STATUS_BADGE[job.status]}`}
                      >
                        {JOB_STATUS_LABELS[job.status]}
                      </span>
                    </TableCell>
                    {/* Loại */}
                    <TableCell>{JOB_TYPE_LABELS[job.type]}</TableCell>
                    {/* Số lượng ứng tuyển */}
                    <TableCell className="text-center">
                      {job._count?.applications ?? 0}
                    </TableCell>
                    {/* Hạn nộp */}
                    <TableCell className="text-sm">
                      {job.deadline
                        ? new Date(job.deadline).toLocaleDateString("vi-VN")
                        : "—"}
                    </TableCell>
                    {/* Thao tác */}
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8"
                          title="Xem"
                          onClick={() => navigate(`/jobs/${job.id}`)}
                        >
                          <Eye className="size-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8"
                          title="Sửa"
                          onClick={() => openEdit(job)}
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="size-8 text-red-500 hover:text-red-600"
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

          {/* Pagination */}
          <Pagination
            page={filters.page}
            totalPages={totalPages}
            onPageChange={(p) => setFilters((f) => ({ ...f, page: p }))}
          />
        </>
      )}

      {/* Create / Edit Dialog */}
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

      {/* Delete Confirm Dialog */}
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
