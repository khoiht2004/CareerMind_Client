import { apiSlice } from "@/store/slice/apiSlice";

const buildQuery = (params = {}) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(
    ([key, value]) => value !== undefined && value !== "" && search.set(key, value),
  );
  return search.toString();
};

export const templateService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCvTemplates: builder.query({
      query: (params = {}) => `/template/cv?${buildQuery(params)}`,
      providesTags: ["Template"],
    }),
    getCoverLetterTemplates: builder.query({
      query: (params = {}) => `/template/cover-letter?${buildQuery(params)}`,
      providesTags: ["Template"],
    }),
  }),
});

export const { useGetCvTemplatesQuery, useGetCoverLetterTemplatesQuery } =
  templateService;
