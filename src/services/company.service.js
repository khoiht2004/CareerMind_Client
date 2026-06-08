import { apiSlice } from "@/store/slice/apiSlice";

export const companyService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCompanies: builder.query({
      query: (params = {}) => {
        const search = new URLSearchParams();
        Object.entries(params).forEach(
          ([k, v]) => v !== undefined && v !== "" && search.set(k, v),
        );
        return `/company?${search.toString()}`;
      },
      providesTags: ["Company"],
    }),
    getCompanyById: builder.query({
      query: (id) => `/company/${id}`,
      providesTags: (result, error, id) => [{ type: "Company", id }],
    }),
    getMyCompanyProfile: builder.query({
      query: () => "/company/my/profile",
      providesTags: ["Company"],
    }),
    updateMyCompanyProfile: builder.mutation({
      query: (body) => ({ url: "/company/my/profile", method: "PUT", body }),
      invalidatesTags: ["Company"],
    }),
    reviewCompany: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/company/${id}/reviews`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Company"],
    }),
    getMyCompanyStats: builder.query({
      query: () => "/company/my/stats",
      providesTags: ["Company"],
    }),
    getMyCompanyPersonnel: builder.query({
      query: () => "/company/my/personnel",
      providesTags: ["Company"],
    }),
  }),
});

export const {
  useGetCompaniesQuery,
  useGetCompanyByIdQuery,
  useGetMyCompanyProfileQuery,
  useUpdateMyCompanyProfileMutation,
  useReviewCompanyMutation,
  useGetMyCompanyStatsQuery,
  useGetMyCompanyPersonnelQuery,
} = companyService;
