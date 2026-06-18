import { apiSlice } from "@/store/slice/apiSlice";

export const authService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),
    googleLogin: builder.mutation({
      query: (body) => ({
        url: "/auth/google",
        method: "POST",
        body,
      }),
    }),
    githubLogin: builder.mutation({
      query: (body) => ({
        url: "/auth/github",
        method: "POST",
        body,
      }),
    }),
    verifyEmail: builder.mutation({
      query: (credentials) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: credentials,
      }),
    }),
    resendVerification: builder.mutation({
      query: (body) => ({
        url: "/auth/resend-verification",
        method: "POST",
        body,
      }),
    }),
    changePassword: builder.mutation({
      query: (body) => ({ url: "/auth/change-password", method: "POST", body }),
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({ url: "/auth/forgot-password", method: "POST", body }),
    }),
    logout: builder.mutation({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      invalidatesTags: ["User"],
    }),
    getMe: builder.query({
      query: () => "/auth/me",
      providesTags: ["User"],
    }),
    searchUsers: builder.query({
      query: (q) => `/users/search-by-name?q=${encodeURIComponent(q)}`,
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGoogleLoginMutation,
  useGithubLoginMutation,
  useVerifyEmailMutation,
  useResendVerificationMutation,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useLogoutMutation,
  useGetMeQuery,
  useSearchUsersQuery,
} = authService;
