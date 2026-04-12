import { apiSlice } from "@/store/slice/apiSlice";

export const cvService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadCv: builder.mutation({
      query: (formData) => ({
        url: "/cv",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Cv"],
    }),

    getMyCvs: builder.query({
      query: () => "/cv",
      providesTags: ["Cv"],
    }),

    getCvById: builder.query({
      query: (id) => `/cv/${id}`,
      providesTags: (result, error, id) => [{ type: "Cv", id }],
    }),

    deleteCv: builder.mutation({
      query: (id) => ({ url: `/cv/${id}`, method: "DELETE" }),
      invalidatesTags: ["Cv"],
    }),

    setDefaultCv: builder.mutation({
      query: (id) => ({ url: `/cv/${id}/default`, method: "POST" }),
      invalidatesTags: ["Cv"],
    }),
  }),
});

export const {
  useUploadCvMutation,
  useGetMyCvsQuery,
  useGetCvByIdQuery,
  useDeleteCvMutation,
  useSetDefaultCvMutation,
} = cvService;
