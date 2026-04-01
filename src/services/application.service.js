import { apiSlice } from "@/store/slice/apiSlice";

export const applicationService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    applyJob: builder.mutation({
      query: (body) => ({ url: "/application", method: "POST", body }),
      invalidatesTags: ["Application"],
    }),
    getMyApplications: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();
        Object.entries(params).forEach(
          ([k, v]) => v !== undefined && v !== "" && search.set(k, v),
        );
        return `/application/me?${search.toString()}`;
      },
      providesTags: ["Application"],
    }),
    getApplicationById: builder.query({
      query: (id) => `/application/${id}`,
      providesTags: (result, error, id) => [{ type: "Application", id }],
    }),
    getAllApplications: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();
        Object.entries(params).forEach(
          ([k, v]) => v !== undefined && v !== "" && search.set(k, v),
        );
        return `/application?${search.toString()}`;
      },
      providesTags: ["Application"],
    }),
    updateApplicationStatus: builder.mutation({
      query: ({ id, status, note }) => ({
        url: `/application/${id}/status`,
        method: "PATCH",
        body: { status, note },
      }),
      invalidatesTags: ["Application"],
    }),
    deleteApplication: builder.mutation({
      query: (id) => ({ url: `/application/${id}`, method: "DELETE" }),
      invalidatesTags: ["Application"],
    }),
    checkApplied: builder.query({
      query: (jobId) => `/application/check?jobId=${jobId}`,
      providesTags: (result, error, jobId) => [{ type: "Application", id: `check-${jobId}` }],
    }),
  }),
});

export const {
  useApplyJobMutation,
  useGetMyApplicationsQuery,
  useGetApplicationByIdQuery,
  useGetAllApplicationsQuery,
  useUpdateApplicationStatusMutation,
  useDeleteApplicationMutation,
  useCheckAppliedQuery,
} = applicationService;
