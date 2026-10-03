import PostCard from "@/components/shared/PostCard";
import Loader from "@/components/shared/Loader";
import { useGetHomePosts } from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const Home = () => {
  const { ref, inView } = useInView({ rootMargin: "320px" });
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
  } = useGetHomePosts();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) void fetchNextPage();
  }, [fetchNextPage, hasNextPage, inView, isFetchingNextPage]);

  const posts = data?.pages.flatMap((page) => page?.documents ?? []) ?? [];

  return (
    <div className="flex min-w-0 flex-1">
      <div className="home-container">
        <div className="home-posts">
          <header className="feed-heading">
            <p className="feed-eyebrow">Your space, your story</p>
            <h1 className="h3-bold md:h2-bold">Home Feed</h1>
          </header>
          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className="feed-state">
              <p className="body-bold">Couldn&apos;t load your feed</p>
              <p className="small-regular text-light-3">Check your connection and try again.</p>
              <button type="button" className="feed-retry" onClick={() => void refetch()}>
                Try again
              </button>
            </div>
          ) : posts.length === 0 ? (
            <div className="feed-state">
              <p className="body-bold">Your feed is ready for a first post</p>
              <p className="small-regular text-light-3">Share a photo to start the conversation.</p>
            </div>
          ) : (
            <div className="flex flex-col flex-1 gap-9 w-full">
              {posts.map((post: Models.Document) => (
                <PostCard key={`page-${post.$id}`} post={post} />
              ))}
              <div ref={ref} className="feed-sentinel" aria-live="polite">
                {isFetchingNextPage && <Loader />}
                {!hasNextPage && <p className="small-regular text-light-4">You&apos;re all caught up.</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
