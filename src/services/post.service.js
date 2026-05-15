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
  }),
});

export const { useGetPostsQuery, useGetPostByIdQuery } = postService;
