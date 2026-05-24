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
      query: ({ sessionId, content, attachments }) => {
        const cleanAttachments = (attachments ?? []).map(({ data, mediaType, name, category }) => ({
          data,
          mediaType,
          name,
          category: category || "file",
        }));

        return {
          url: `/chat/sessions/${sessionId}/messages`,
          method: "POST",
          body: {
            content,
            attachments: cleanAttachments.length ? cleanAttachments : undefined,
          },
        };
      },
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
    generateCoverLetter: builder.mutation({
      query: ({ jobId, title } = {}) => ({
        url: "/chat/generate-cover-letter",
        method: "POST",
        body: { jobId, title },
      }),
    }),
    analyzeRecruiterCandidates: builder.mutation({
      query: ({ jobId, criteria } = {}) => ({
        url: "/chat/recruiter/candidate-analysis",
        method: "POST",
        body: { jobId, criteria },
      }),
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
  useGenerateCoverLetterMutation,
  useAnalyzeRecruiterCandidatesMutation,
} = chatService;
