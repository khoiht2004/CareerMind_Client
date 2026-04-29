import { useMemo } from "react";
import { useParams } from "react-router";
import { useGetCompanyByIdQuery } from "@/services/company.service";

export function useCompanyDetail() {
  const { id } = useParams();
  const { data: response, isLoading, isError } = useGetCompanyByIdQuery(id);

  const company = response?.data;
  const jobs = useMemo(() => company?.jobs ?? [], [company]);
  const socialLinks = useMemo(() => company?.socialLinks ?? {}, [company]);

  return { company, jobs, socialLinks, isLoading, isError };
}
