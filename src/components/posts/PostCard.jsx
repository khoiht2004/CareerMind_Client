import { CalendarDays, Eye } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "@/utils/helper";
import { getPostImage } from "@/utils/post.helper";

function PostCard({ post, featured = false, dark = false }) {
  return (
    <Link
      to={`/post/${post.id}`}
      className={`group block overflow-hidden rounded-lg border transition-colors hover:border-primary ${
        dark ? "border-white/10 bg-transparent text-white" : "border-border bg-card"
      }`}
    >
      <div className={featured ? "h-64 overflow-hidden" : "h-40 overflow-hidden"}>
        <img
          src={getPostImage(post.coverUrl)}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.01]"
        />
      </div>
      <div className="space-y-3 p-4">
        <p className={`text-xs font-semibold uppercase ${dark ? "text-white" : "text-primary"}`}>
          {post.category || "Career"}
        </p>
        <h2
          className={`line-clamp-2 font-semibold transition-transform duration-300 group-hover:translate-x-[3px] group-hover:text-primary ${
            featured ? "text-xl" : "text-base"
          }`}
        >
          {post.title}
        </h2>
        <p className={`line-clamp-3 text-sm ${dark ? "text-white/80" : "text-muted-foreground"}`}>
          {post.excerpt}
        </p>
        <div
          className={`flex items-center justify-between text-xs ${
            dark ? "text-white/70" : "text-muted-foreground"
          }`}
        >
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
  );
}

export default PostCard;
