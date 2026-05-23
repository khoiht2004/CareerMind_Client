import { CalendarDays, Eye, Loader2 } from "lucide-react";
import { NotFound } from "@/components/shared/NotFound";
import PageContainer from "@/components/shared/PageContainer";
import PostSidebar from "@/components/posts/PostSidebar";
import TableOfContents from "@/components/posts/TableOfContents";
import { usePostDetail } from "@/hooks/usePostDetail";
import { formatDate } from "@/utils/helper";
import { getPostImage } from "@/utils/post.helper";

function PostDetail() {
  const { post, isLoading, isError, contentHtml, toc } = usePostDetail();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="text-muted-foreground size-8 animate-spin" />
      </div>
    );
  }

  if (isError || !post) return <NotFound message="Không tìm thấy bài viết" />;

  return (
    <div className="bg-muted/40">
      <PageContainer className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_348px]">
        <article className="rounded-lg bg-background p-5 md:p-8">
          <div className="space-y-3">
            <p className="text-primary text-sm font-semibold uppercase">
              {post.category || "Career"}
            </p>
            <h1 className="text-3xl font-bold leading-tight md:text-4xl">{post.title}</h1>
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

          <div className="mt-6">
            <TableOfContents items={toc} />
          </div>

          <img
            src={getPostImage(post.coverUrl)}
            alt={post.title}
            className="mt-6 h-72 w-full rounded-lg object-cover"
          />

          <div
            className="mt-8 max-w-none scroll-smooth text-[15px] leading-8 text-foreground/90 [&_a]:text-primary [&_h1]:scroll-mt-24 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:mt-8 [&_h2]:scroll-mt-24 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mt-6 [&_h3]:scroll-mt-24 [&_h3]:text-xl [&_h3]:font-semibold [&_li]:ml-5 [&_ol]:list-decimal [&_p]:my-4 [&_ul]:list-disc"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </article>

        <PostSidebar />
      </PageContainer>
    </div>
  );
}

export default PostDetail;
