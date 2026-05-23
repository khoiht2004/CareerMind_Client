import { useMemo } from "react";
import { useParams } from "react-router";
import { useGetPostByIdQuery } from "@/services/post.service";
import { buildPostContent } from "@/utils/post.helper";

export function usePostDetail() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetPostByIdQuery(id);
  const post = data?.data;

  const content = useMemo(
    () => buildPostContent(post?.content || ""),
    [post?.content],
  );

  return {
    post,
    isLoading,
    isError,
    contentHtml: content.html,
    toc: content.toc,
  };
}
