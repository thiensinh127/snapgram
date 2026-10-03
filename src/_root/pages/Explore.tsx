import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { SearchResults } from "@/components/shared/SearchResult";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import {
  useGetPosts,
  useSearchPosts,
} from "@/lib/react-query/queriesAndMutation";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { Compass, Search, SlidersHorizontal } from "lucide-react";

const Explore = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedSearch);

  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [inView, searchValue, fetchNextPage]);

  if (!posts)
    return (
      <div className="flex-center w-full h-full">
        <Loader />
      </div>
    );

  const shouldShowSearchResults = searchValue !== "";
  const shouldShowPosts =
    !shouldShowSearchResults &&
    posts.pages.every((item: any) => item.documents.length === 0);

  return (
    <div className="explore-container discovery-page">
      <div className="explore-inner_container discovery-intro">
        <div className="page-header">
          <span className="page-header-icon"><Compass size={22} aria-hidden="true" /></span>
          <div>
            <p className="feed-eyebrow">Discover creators</p>
            <h1 className="h3-bold md:h2-bold">Explore ideas</h1>
            <p className="small-regular text-light-3">Find a little inspiration for your next post.</p>
          </div>
        </div>
        <div className="discovery-search">
          <Search size={20} aria-hidden="true" className="text-light-3" />
          <Input
            type="text"
            placeholder="Search posts, places or topics"
            className="explore-search"
            value={searchValue}
            onChange={(e) => {
              const { value } = e.target;
              setSearchValue(value);
            }}
          />
        </div>
      </div>

      <div className="discovery-section-heading">
        <div>
          <p className="feed-eyebrow">Curated for you</p>
          <h2 className="body-bold md:h3-bold">Popular today</h2>
        </div>

        <button type="button" className="discovery-filter" aria-label="Filter posts">
          <span>All posts</span><SlidersHorizontal size={17} aria-hidden="true" />
        </button>
      </div>

      <div className="w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts}
          />
        ) : shouldShowPosts ? (
          <div className="empty-state"><p className="body-bold">Nothing to explore yet</p><p className="small-regular text-light-3">Check back shortly for fresh ideas.</p></div>
        ) : (
          posts.pages.map((item: any, index) => (
              <GridPostList key={`page-${index}`} posts={item.documents} showStats={false} />
          ))
        )}
      </div>

      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default Explore;
