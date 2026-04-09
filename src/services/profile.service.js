import { apiSlice } from "@/store/slice/apiSlice";

export const profileService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => "/profile",
      providesTags: ["Profile"],
    }),
    updateProfile: builder.mutation({
      query: (body) => ({ url: "/profile", method: "PUT", body }),
      invalidatesTags: ["Profile", "User"],
    }),
    uploadAvatar: builder.mutation({
      query: (formData) => ({
        url: "/profile/upload-avatar",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Profile", "User"],
    }),
    deleteAvatar: builder.mutation({
      query: (body) => ({
        url: "/profile/delete-avatar",
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Profile", "User"],
    }),
  }),
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadAvatarMutation,
  useDeleteAvatarMutation,
} = profileService;
