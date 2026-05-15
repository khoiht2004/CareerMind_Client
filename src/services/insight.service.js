import { apiSlice } from "@/store/slice/apiSlice";

export const insightService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCandidateInsights: builder.query({
      query: () => "/insight/me",
      providesTags: ["Insight"],
    }),
  }),
});

export const { useGetCandidateInsightsQuery } = insightService;
