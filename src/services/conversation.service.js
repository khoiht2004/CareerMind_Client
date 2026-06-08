import { apiSlice } from "@/store/slice/apiSlice";

export const conversationService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConversations: builder.query({
      query: () => "/conversation",
      providesTags: ["Conversation"],
    }),
    createOrGetConversation: builder.mutation({
      query: (body) => ({
        url: "/conversation",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Conversation"],
    }),
    getConversationMessages: builder.query({
      query: (id) => `/conversation/${id}/messages`,
      providesTags: (result, error, id) => [
        { type: "ConversationMessage", id },
        "ConversationMessage",
      ],
    }),
    sendConversationMessage: builder.mutation({
      query: ({ id, content, attachments, messageType }) => ({
        url: `/conversation/${id}/messages`,
        method: "POST",
        body: { content, attachments, messageType },
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "ConversationMessage", id },
        "Conversation",
      ],
    }),
    markAsRead: builder.mutation({
      query: (id) => ({
        url: `/conversation/${id}/read`,
        method: "PATCH",
      }),
      invalidatesTags: ["Conversation"],
    }),
    getUnreadCount: builder.query({
      query: () => "/conversation/unread-count",
      providesTags: ["Conversation"],
    }),
  }),
});

export const {
  useGetConversationsQuery,
  useCreateOrGetConversationMutation,
  useGetConversationMessagesQuery,
  useSendConversationMessageMutation,
  useMarkAsReadMutation,
  useGetUnreadCountQuery,
} = conversationService;
