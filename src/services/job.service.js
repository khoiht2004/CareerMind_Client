import { apiSlice } from "@/store/slice/apiSlice";

export const jobService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getJobs: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();
        Object.entries(params).forEach(
          ([k, v]) => v !== undefined && v !== "" && search.set(k, v),
        );
        return `/job?${search.toString()}`;
      },
      providesTags: ["Job"],
    }),
    getJobById: builder.query({
      query: (id) => `/job/${id}`,
      providesTags: (result, error, id) => [{ type: "Job", id }],
    }),
    createJob: builder.mutation({
      query: (body) => ({ url: "/job", method: "POST", body }),
      invalidatesTags: ["Job"],
    }),
    updateJob: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/job/${id}`, method: "PUT", body }),
      invalidatesTags: ["Job"],
    }),
    deleteJob: builder.mutation({
      query: (id) => ({ url: `/job/${id}`, method: "DELETE" }),
      invalidatesTags: ["Job"],
    }),
    saveJob: builder.mutation({
      query: (jobId) => ({ url: "/saved-job", method: "POST", body: { jobId } }),
      invalidatesTags: ["SavedJob"],
    }),
    unsaveJob: builder.mutation({
      query: (jobId) => ({ url: `/saved-job/${jobId}`, method: "DELETE" }),
      invalidatesTags: ["SavedJob"],
    }),
    getSavedJobs: builder.query({
      query: () => "/saved-job",
      providesTags: ["SavedJob"],
    }),
    checkJobSaved: builder.query({
      query: (jobId) => `/saved-job/${jobId}/check`,
      providesTags: (result, error, jobId) => [{ type: "SavedJob", id: jobId }],
    }),
    getMyJobs: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();
        Object.entries(params).forEach(
          ([k, v]) => v !== undefined && v !== "" && search.set(k, v),
        );
        return `/job/my/jobs?${search.toString()}`;
      },
      providesTags: ["Job"],
    }),
    getMyStats: builder.query({
      query: () => "/job/my/stats",
      providesTags: ["Job"],
    }),
  }),
});

export const {
  useGetJobsQuery,
  useGetJobByIdQuery,
  useCreateJobMutation,
  useUpdateJobMutation,
  useDeleteJobMutation,
  useSaveJobMutation,
  useUnsaveJobMutation,
  useGetSavedJobsQuery,
  useCheckJobSavedQuery,
  useGetMyJobsQuery,
  useGetMyStatsQuery,
} = jobService;
