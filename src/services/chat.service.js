import { apiSlice } from "@/store/slice/apiSlice";

export const chatService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSessions: builder.query({
      query: () => "/chat/sessions",
      providesTags: [{ type: "Chat", id: "LIST" }],
    }),
    createSession: builder.mutation({
      query: (body = {}) => ({ url: "/chat/sessions", method: "POST", body }),
      invalidatesTags: [{ type: "Chat", id: "LIST" }],
    }),
    getMessages: builder.query({
      query: (sessionId) => `/chat/sessions/${sessionId}`,
      providesTags: (result, error, id) => [{ type: "Chat", id }],
    }),
    sendMessage: builder.mutation({
      query: ({ sessionId, content, images }) => ({
        url: `/chat/sessions/${sessionId}/messages`,
        method: "POST",
        body: { content, ...(images?.length && { images }) },
      }),
      invalidatesTags: (result, error, { sessionId }) => [{ type: "Chat", id: sessionId }],
    }),
    updateSessionTitle: builder.mutation({
      query: ({ sessionId, title }) => ({
        url: `/chat/sessions/${sessionId}`,
        method: "PATCH",
        body: { title },
      }),
      invalidatesTags: (result, error, { sessionId }) => [
        { type: "Chat", id: "LIST" },
        { type: "Chat", id: sessionId },
      ],
    }),
    deleteSession: builder.mutation({
      query: (sessionId) => ({ url: `/chat/sessions/${sessionId}`, method: "DELETE" }),
      invalidatesTags: [{ type: "Chat", id: "LIST" }],
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
