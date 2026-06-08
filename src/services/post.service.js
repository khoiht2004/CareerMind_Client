import { apiSlice } from "@/store/slice/apiSlice";

const buildQuery = (params = {}) => {
  const search = new URLSearchParams();
  Object.entries(params).forEach(
    ([key, value]) => value !== undefined && value !== "" && search.set(key, value),
  );
  return search.toString();
};

export const postService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (params = {}) => `/post?${buildQuery(params)}`,
      providesTags: ["Post"],
    }),
    getPostById: builder.query({
      query: (id) => `/post/${id}`,
      providesTags: (result, error, id) => [{ type: "Post", id }],
    }),
    getMyPosts: builder.query({
      query: (params = {}) => `/post/my/posts?${buildQuery(params)}`,
      providesTags: ["Post"],
    }),
    createPost: builder.mutation({
      query: (body) => ({ url: "/post", method: "POST", body }),
      invalidatesTags: ["Post"],
    }),
    updatePost: builder.mutation({
      query: ({ id, ...body }) => ({ url: `/post/${id}`, method: "PUT", body }),
      invalidatesTags: ["Post"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({ url: `/post/${id}`, method: "DELETE" }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useGetMyPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postService;
