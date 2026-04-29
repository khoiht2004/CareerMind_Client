import { AlertCircle, CalendarDays, Filter, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ConfirmDialog from "@/components/shared/ConfirmDialog";
import Pagination from "@/components/shared/Pagination";
import {
  APPLICATION_STATUS_FILTER_OPTIONS,
  APPLICATION_DATE_RANGE_OPTIONS,
} from "@/config/constants/candidate.constant";
import { useMyApplications } from "@/hooks/useMyApplications";
import ApplicationCard from "./components/ApplicationRow";

function MyApplications() {
  const {
    applications,
    total,
    totalPages,
    interviewCount,
    isLoading,
    isDeleting,
    filters,
    setStatusFilter,
    setDaysFilter,
    setPage,
    deleteTarget,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDialogChange,
  } = useMyApplications();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-primary text-3xl font-black">
          Đơn ứng tuyển của tôi
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Theo dõi trạng thái và tiến trình các cơ hội nghề nghiệp của bạn tại
          một nơi duy nhất.
        </p>
      </div>

      {/* Filter row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Status filter */}
        <div className="bg-primary/5 flex items-center gap-2 rounded-lg px-3 py-1.5">
          <Filter className="text-muted-foreground size-4 shrink-0" />
          <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Trạng thái:
          </span>
          <Select value={filters.status} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-auto w-[150px] border-0 p-0 text-sm font-medium shadow-none focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {APPLICATION_STATUS_FILTER_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Date filter */}
        <div className="bg-primary/5 flex items-center gap-2 rounded-lg px-3 py-1.5">
          <CalendarDays className="text-muted-foreground size-4 shrink-0" />
          <Select value={filters.days} onValueChange={setDaysFilter}>
            <SelectTrigger className="h-auto w-[130px] border-0 p-0 text-sm font-medium shadow-none focus:ring-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {APPLICATION_DATE_RANGE_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1" />

        {/* Stat mini-cards */}
        <div className="bg-primary text-background flex overflow-hidden rounded-xl">
          <div className="px-5 py-2.5 text-center">
            <p className="text-background/60 text-xs font-semibold tracking-wider uppercase">
              Tổng cộng
            </p>
            <p className="text-2xl font-black">{total}</p>
          </div>
          <div className="bg-background/10 w-px" />
          <div className="px-5 py-2.5 text-center">
            <p className="text-secondary-container text-xs font-semibold tracking-wider uppercase opacity-80">
              Phỏng vấn
            </p>
            <p className="text-secondary-container text-2xl font-black">
              {interviewCount}
            </p>
          </div>
        </div>
      </div>

      {/* List */}
      {isLoading ? (
        <div className="flex h-40 items-center justify-center">
          <Loader2 className="text-muted-foreground size-6 animate-spin" />
        </div>
      ) : applications.length === 0 ? (
        <div className="text-muted-foreground py-16 text-center">
          <AlertCircle className="mx-auto mb-3 size-10 opacity-30" />
          <p className="text-sm">Chưa có đơn ứng tuyển nào</p>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app) => (
            <ApplicationCard
              key={app.id}
              app={app}
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      <Pagination
        page={filters.page}
        totalPages={totalPages}
        onPageChange={setPage}
        isLoading={isLoading}
        showPageNumbers
      />

      <ConfirmDialog
        open={!!deleteTarget}
        onOpenChange={handleDialogChange}
        onConfirm={handleDeleteConfirm}
        isLoading={isDeleting}
        title="Xóa đơn ứng tuyển"
        description={
          <>
            Bạn có chắc muốn xóa đơn ứng tuyển vị trí{" "}
            <span className="text-foreground font-medium">
              {deleteTarget?.job?.title}
            </span>{" "}
            tại{" "}
            <span className="text-foreground font-medium">
              {deleteTarget?.job?.company?.name}
            </span>
            ? Hành động này không thể hoàn tác.
          </>
        }
      />
    </div>
  );
}

export default MyApplications;
