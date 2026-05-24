import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import { useGetCompanyByIdQuery } from "@/services/company.service";
import { useGetPostsQuery } from "@/services/post.service";

const COMPANY_JOB_PAGE_SIZE = 8;
const COMPANY_POST_PAGE_SIZE = 5;

export function useCompanyDetail() {
  const { id } = useParams();
  const [jobPage, setJobPage] = useState(1);
  const [postPage, setPostPage] = useState(1);
  const { data: response, isLoading, isError } = useGetCompanyByIdQuery(id);
  const { data: postResponse, isLoading: isPostsLoading } = useGetPostsQuery(
    { companyId: id, page: postPage, limit: COMPANY_POST_PAGE_SIZE },
    { skip: !id },
  );

  const company = response?.data;
  const jobs = useMemo(() => company?.jobs ?? [], [company]);
  const socialLinks = useMemo(() => company?.socialLinks ?? {}, [company]);
  const totalJobPages = Math.ceil(jobs.length / COMPANY_JOB_PAGE_SIZE);
  const paginatedJobs = useMemo(() => {
    const start = (jobPage - 1) * COMPANY_JOB_PAGE_SIZE;
    return jobs.slice(start, start + COMPANY_JOB_PAGE_SIZE);
  }, [jobPage, jobs]);
  const posts = postResponse?.data?.data ?? [];
  const totalPosts = postResponse?.data?.total ?? 0;
  const totalPostPages = postResponse?.data?.totalPages ?? 0;

  useEffect(() => {
    setJobPage(1);
    setPostPage(1);
  }, [id]);

  return {
    company,
    jobs,
    paginatedJobs,
    jobPage,
    totalJobPages,
    setJobPage,
    posts,
    postPage,
    totalPosts,
    totalPostPages,
    setPostPage,
    socialLinks,
    isLoading,
    isPostsLoading,
    isError,
  };
}
