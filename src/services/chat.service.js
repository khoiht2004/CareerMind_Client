import { apiSlice } from "@/store/slice/apiSlice";

export const chatService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSessions: builder.query({
      query: () => "/chat/sessions",
      providesTags: ["Chat"],
    }),
    createSession: builder.mutation({
      query: (body = {}) => ({ url: "/chat/sessions", method: "POST", body }),
      invalidatesTags: ["Chat"],
    }),
    getMessages: builder.query({
      query: (sessionId) => `/chat/sessions/${sessionId}`,
      providesTags: (result, error, id) => [{ type: "Chat", id }],
    }),
    sendMessage: builder.mutation({
      query: ({ sessionId, content }) => ({
        url: `/chat/sessions/${sessionId}/messages`,
        method: "POST",
        body: { content },
      }),
      invalidatesTags: (result, error, { sessionId }) => [{ type: "Chat", id: sessionId }],
    }),
    updateSessionTitle: builder.mutation({
      query: ({ sessionId, title }) => ({
        url: `/chat/sessions/${sessionId}`,
        method: "PATCH",
        body: { title },
      }),
      invalidatesTags: ["Chat"],
    }),
    deleteSession: builder.mutation({
      query: (sessionId) => ({ url: `/chat/sessions/${sessionId}`, method: "DELETE" }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const {
  useGetSessionsQuery,
  useCreateSessionMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
  useUpdateSessionTitleMutation,
  useDeleteSessionMutation,
} = chatService;
