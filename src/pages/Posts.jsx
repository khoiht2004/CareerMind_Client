/* eslint-disable no-unused-vars */
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import PageContainer from "@/components/shared/PageContainer";
import Pagination from "@/components/shared/Pagination";
import PostCard from "@/components/posts/PostCard";
import { Button } from "@/components/ui/button";
import {
  POST_CATEGORY_OPTIONS,
  POST_HERO_FLOATING_CARDS,
} from "@/config/constants/post.constant";
import { usePosts } from "@/hooks/usePosts";

function Posts() {
  const {
    filters,
    posts,
    isLoading,
    total,
    totalPages,
    setSearch,
    setCategory,
    setPage,
  } = usePosts();
  const featuredPosts = posts.slice(0, 3);
  const remainingPosts = posts.slice(3);

  return (
    <div className="bg-background">
      <section className="from-primary/15 to-background bg-linear-to-b pt-8">
        <PageContainer className="space-y-8">
          <div className="bg-primary/10 relative min-h-64 overflow-hidden rounded-lg px-4 py-8 text-center sm:px-6 sm:py-10">
            <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-4">
              {POST_HERO_FLOATING_CARDS.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="bg-background/90 flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-3 text-sm shadow-sm sm:w-auto"
                >
                  <Icon className="text-primary size-4" />
                  {label}
                </div>
              ))}
            </div>
            <div className="mx-auto mt-10 max-w-3xl">
              <h1 className="text-primary text-3xl font-black sm:text-4xl">
                Cẩm nang nghề nghiệp
              </h1>
              <p className="text-muted-foreground mt-3 text-sm">
                Khám phá thông tin hữu ích liên quan tới nghề nghiệp, kinh
                nghiệm tìm việc và phát triển bản thân.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {POST_CATEGORY_OPTIONS.map((option) => (
                <Button
                  key={option.value}
                  variant={
                    filters.category === option.value ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setCategory(option.value)}
                >
                  {option.label}
                </Button>
              ))}
            </div>
            <div className="relative w-full lg:w-80">
              <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
              <Input
                value={filters.search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm bài viết..."
                className="pl-9"
              />
            </div>
          </div>
        </PageContainer>
      </section>

      <PageContainer className="space-y-12">
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="text-muted-foreground size-8 animate-spin" />
          </div>
        ) : (
          <>
            {featuredPosts.length ? (
              <section className="space-y-5">
                <h2 className="text-2xl font-bold sm:text-3xl">
                  Bài viết nổi bật
                </h2>
                <div className="grid gap-5 lg:grid-cols-3">
                  {featuredPosts.map((post, index) => (
                    <PostCard
                      key={post.id}
                      post={post}
                      featured={index === 0}
                    />
                  ))}
                </div>
              </section>
            ) : null}

            <section className="space-y-5">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Bài viết mới nhất
              </h2>
              {remainingPosts.length ? (
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {remainingPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground py-12 text-center text-sm">
                  Chưa có bài viết phù hợp.
                </p>
              )}
            </section>

            {total > 0 ? (
              <Pagination
                page={filters.page}
                totalPages={totalPages}
                onPageChange={setPage}
                showPageNumbers
              />
            ) : null}
          </>
        )}
      </PageContainer>
    </div>
  );
}

export default Posts;
