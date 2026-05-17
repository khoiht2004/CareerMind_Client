import { useState } from "react";
import { CalendarDays, Eye, Loader2, Search } from "lucide-react";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";
import { useGetPostsQuery } from "@/services/post.service";
import { formatDate } from "@/utils/helper";
import PageContainer from "@/components/shared/PageContainer";

function Posts() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetPostsQuery({ search, limit: 18 });
  const posts = data?.data?.data ?? [];

  return (
    <PageContainer>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Cam nang nghe nghiep</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Bai viet huong dan ung tuyen, phong van va phat trien su nghiep.
          </p>
        </div>
        <div className="relative w-full sm:w-80">
          <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Tim bai viet..."
            className="pl-9"
          />
        </div>
      </div>

      {isLoading ? (
        <div className="flex h-64 items-center justify-center">
          <Loader2 className="text-muted-foreground size-8 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.id}
              to={`/post/${post.id}`}
              target="_blank"
              rel="noreferrer"
              className="bg-card border-border group overflow-hidden rounded-lg border"
            >
              <div className="bg-muted h-40">
                {post.coverUrl ? (
                  <img src={post.coverUrl} alt={post.title} className="h-full w-full object-cover" />
                ) : null}
              </div>
              <div className="space-y-3 p-4">
                <p className="text-primary text-xs font-semibold">{post.category || "Career"}</p>
                <h2 className="group-hover:text-primary line-clamp-2 font-semibold">
                  {post.title}
                </h2>
                <p className="text-muted-foreground line-clamp-3 text-sm">{post.excerpt}</p>
                <div className="text-muted-foreground flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="size-3.5" />
                    {formatDate(post.createdAt)}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="size-3.5" />
                    {post.viewCount ?? 0}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </PageContainer>
  );
}

export default Posts;
