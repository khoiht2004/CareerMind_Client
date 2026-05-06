import { useState, useCallback, useMemo } from "react";
import { toast } from "sonner";
import {
  useGetMyApplicationsQuery,
  useDeleteApplicationMutation,
} from "@/services/application.service";

const PAGE_SIZE = 8;

export function useMyApplications() {
  const [filters, setFilters] = useState({
    status: "ALL",
    days: "30",
    page: 1,
    tab: "submitted",
  });
  const [deleteTarget, setDeleteTarget] = useState(null);

  const queryParams = useMemo(() => {
    const p = { page: filters.page, limit: PAGE_SIZE };
    if (filters.status !== "ALL") p.status = filters.status;
    if (filters.days !== "0") p.days = filters.days;
    p.isDraft = filters.tab === "draft" ? "true" : "false";
    return p;
  }, [filters]);

  const { data, isLoading } = useGetMyApplicationsQuery(queryParams);
  const [deleteApplication, { isLoading: isDeleting }] =
    useDeleteApplicationMutation();

  const applications = useMemo(
    () => data?.data?.applications ?? [],
    [data],
  );
  const total = data?.data?.total ?? 0;
  const totalPages = Math.ceil(total / PAGE_SIZE);

  const interviewCount = useMemo(
    () => applications.filter((a) => a.status === "INTERVIEW").length,
    [applications],
  );

  const setTab = useCallback(
    (tab) => setFilters((f) => ({ ...f, tab, page: 1, status: "ALL" })),
    [],
  );

  const setStatusFilter = useCallback(
    (status) => setFilters((f) => ({ ...f, status, page: 1 })),
    [],
  );

  const setDaysFilter = useCallback(
    (days) => setFilters((f) => ({ ...f, days, page: 1 })),
    [],
  );

  const setPage = useCallback(
    (page) => setFilters((f) => ({ ...f, page })),
    [],
  );

  const handleDeleteClick = useCallback((app) => setDeleteTarget(app), []);

  const handleDeleteConfirm = useCallback(async () => {
    try {
      await deleteApplication(deleteTarget.id).unwrap();
      toast.success("Đã xóa đơn ứng tuyển");
      setDeleteTarget(null);
    } catch (error) {
      toast.error(
        error?.data?.message || "Có lỗi xảy ra khi xóa đơn ứng tuyển",
      );
    }
  }, [deleteApplication, deleteTarget]);

  const handleDialogChange = useCallback((open) => {
    if (!open) setDeleteTarget(null);
  }, []);

  return {
    applications,
    total,
    totalPages,
    interviewCount,
    isLoading,
    isDeleting,
    filters,
    setTab,
    setStatusFilter,
    setDaysFilter,
    setPage,
    deleteTarget,
    handleDeleteClick,
    handleDeleteConfirm,
    handleDialogChange,
  };
}
