import { CalendarDays, Eye, Loader2 } from "lucide-react";
import { useParams } from "react-router";
import { NotFound } from "@/components/shared/NotFound";
import PageContainer from "@/components/shared/PageContainer";
import { useGetPostByIdQuery } from "@/services/post.service";
import { formatDate } from "@/utils/helper";

function PostDetail() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetPostByIdQuery(id);
  const post = data?.data;

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="text-muted-foreground size-8 animate-spin" />
      </div>
    );
  }

  if (isError || !post) return <NotFound message="Khong tim thay bai viet" />;

  return (
    <PageContainer as="article" className="max-w-3xl">
      {post.coverUrl ? (
        <img src={post.coverUrl} alt={post.title} className="h-72 w-full rounded-lg object-cover" />
      ) : null}
      <div className="space-y-3">
        <p className="text-primary text-sm font-semibold">{post.category || "Career"}</p>
        <h1 className="text-3xl font-bold leading-tight">{post.title}</h1>
        <div className="text-muted-foreground flex flex-wrap gap-4 text-sm">
          <span>{post.authorName || "SRA Editorial"}</span>
          <span className="flex items-center gap-1">
            <CalendarDays className="size-4" />
            {formatDate(post.createdAt)}
          </span>
          <span className="flex items-center gap-1">
            <Eye className="size-4" />
            {post.viewCount ?? 0}
          </span>
        </div>
      </div>
      <div className="text-foreground/85 whitespace-pre-line text-sm leading-7">
        {post.content}
      </div>
    </PageContainer>
  );
}

export default PostDetail;
