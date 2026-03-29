import { apiSlice } from "@/store/slice/apiSlice";

export const coverLetterService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMyCoverLetters: builder.query({
      query: () => "/cover-letter",
      providesTags: ["CoverLetter"],
    }),
    createCoverLetter: builder.mutation({
      query: (body) => ({
        url: "/cover-letter",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CoverLetter"],
    }),
    updateCoverLetter: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `/cover-letter/${id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["CoverLetter"],
    }),
    deleteCoverLetter: builder.mutation({
      query: (id) => ({
        url: `/cover-letter/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CoverLetter"],
    }),
  }),
});

export const {
  useGetMyCoverLettersQuery,
  useCreateCoverLetterMutation,
  useUpdateCoverLetterMutation,
  useDeleteCoverLetterMutation,
} = coverLetterService;
