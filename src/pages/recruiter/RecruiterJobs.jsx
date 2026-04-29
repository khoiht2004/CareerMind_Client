import { Loader2, Plus, Pencil, Trash2, Eye, Filter } from "lucide-react";
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
import { Link, useNavigate } from "react-router";
import Pagination from "@/components/shared/Pagination";
import JobsCard from "@/components/recuiter/JobsCard";
import JobFormDialog from "@/components/recuiter/JobFormDialog";
import JobDeleteDialog from "@/components/recuiter/JobDeleteDialog";
import { JOB_CARD_CONFIG, useRecruiterJobs } from "@/hooks/useRecruiterJobs";
import {
  JOB_STATUS_OPTIONS,
  JOB_STATUS_BADGE,
  JOB_STATUS_LABELS,
} from "@/config/constants/recruiter.constant";
import { JOB_TYPE_LABELS } from "@/config/constants/candidate.constant";
import {
  DeadlineCell,
  JobInitials,
} from "@/components/recuiter/components/JobsComponent";
import { path } from "@/config/path";

function RecruiterJobs() {
  const navigate = useNavigate();
  const {
    filterOpen,
    setFilterOpen,
    filters,
    setSearch,
    setStatusFilter,
    setPage,
    deleteId,
    setDeleteId,
    deleting,
    handleDelete,
    jobs,
    total,
    totalPages,
    from,
    to,
    stats,
    isLoading,
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
  } = useRecruiterJobs();

  return (
    <div className="max-w-full space-y-6 px-10 pt-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-primary text-4xl font-black">Quản lý việc làm</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Theo dõi và tối ưu hóa các chiến dịch tuyển dụng của bạn.
          </p>
        </div>
        <div className="mt-1 flex items-center gap-2">
          <Button
            variant="outline"
            className="cursor-pointer gap-2"
            onClick={() => setFilterOpen((v) => !v)}
          >
            <Filter className="size-4" />
            Lọc nâng cao
          </Button>
          <Button onClick={openCreate} className="cursor-pointer gap-2">
            <Plus className="size-4" />
            Đăng tin mới
          </Button>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {JOB_CARD_CONFIG.map((cfg) => (
          <JobsCard
            key={cfg.id}
            icon={cfg.icon}
            label={cfg.label}
            bgColor={cfg.bgColor}
            borderColor={cfg.borderColor}
            value={cfg.getValue(stats)}
            trend={cfg.trend}
          />
        ))}
      </div>

      {/* Collapsible filters */}
      {filterOpen && (
        <div className="border-border flex flex-wrap gap-3 rounded-lg border p-4">
          <Input
            placeholder="Tìm kiếm theo tiêu đề..."
            className="border-border w-72 border"
            value={filters.search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select value={filters.status} onValueChange={setStatusFilter}>
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
      )}

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
                  <TableHead>Tiêu đề công việc</TableHead>
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
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <JobInitials title={job.title} />
                        <div>
                          <p className="text-sm font-medium">{job.title}</p>
                          <p className="text-muted-foreground text-xs">
                            {job.company?.name}
                            {job.location && ` • ${job.location}`}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${JOB_STATUS_BADGE[job.status]}`}
                      >
                        {JOB_STATUS_LABELS[job.status]}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">
                      {JOB_TYPE_LABELS[job.type]}
                    </TableCell>
                    <TableCell className="text-center font-semibold">
                      {job._count?.applications ?? 0}
                    </TableCell>
                    <TableCell>
                      <DeadlineCell deadline={job.deadline} />
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

          <div className="flex items-center justify-between">
            <p className="text-muted-foreground text-sm">
              Hiển thị {from} - {to} trong số {total} tin
            </p>
            <Pagination
              page={filters.page}
              totalPages={totalPages}
              onPageChange={setPage}
              showPageNumbers
            />
          </div>
        </>
      )}

      {/* Promo cards */}
      <article className="from-primary to-primary-container text-primary-foreground rounded-3xl bg-linear-to-r p-6">
        <div className="max-w-[60%]">
          <span className="bg-primary-foreground/10 text-md rounded-full px-3 py-1 font-bold">
            Mẹo tuyển dụng
          </span>
          <h3 className="mt-3 text-2xl font-bold">
            Tăng 30% lượng ứng viên tiềm năng?
          </h3>
          <p className="text-md mt-3 opacity-75">
            Sử dụng tính năng "Boost" để đẩy tin tuyển dụng của bạn lên vị trí
            ưu tiên và tiếp cận đúng đối tượng mục tiêu dựa trên AI Matching.
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="text-md bg-secondary-container text-primary mt-5 cursor-pointer rounded-2xl p-6 font-semibold"
            asChild
          >
            <Link to={path.aiPricing}>Khám phá gói Premium</Link>
          </Button>
        </div>
      </article>

      {/* Dialogs */}
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
