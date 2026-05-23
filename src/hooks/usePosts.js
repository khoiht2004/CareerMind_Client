import { useMemo, useState } from "react";
import { POST_PAGE_SIZE } from "@/config/constants/post.constant";
import { useGetPostsQuery } from "@/services/post.service";

export function usePosts() {
  const [filters, setFilters] = useState({
    search: "",
    category: "ALL",
    page: 1,
  });

  const { data, isLoading } = useGetPostsQuery({
    search: filters.search || undefined,
    category: filters.category !== "ALL" ? filters.category : undefined,
    page: filters.page,
    limit: POST_PAGE_SIZE,
  });

  const pagination = useMemo(() => {
    const total = data?.data?.total ?? 0;
    return {
      total,
      totalPages: data?.data?.totalPages ?? 1,
      from: total === 0 ? 0 : (filters.page - 1) * POST_PAGE_SIZE + 1,
      to: Math.min(filters.page * POST_PAGE_SIZE, total),
    };
  }, [data?.data?.total, data?.data?.totalPages, filters.page]);

  return {
    filters,
    posts: data?.data?.data ?? [],
    isLoading,
    ...pagination,
    setSearch: (search) => setFilters((prev) => ({ ...prev, search, page: 1 })),
    setCategory: (category) =>
      setFilters((prev) => ({ ...prev, category, page: 1 })),
    setPage: (page) => setFilters((prev) => ({ ...prev, page })),
  };
}
