import GridPostList from "./GridPostList";
import Loader from "./Loader";

export type SearchResultProps = {
  isSearchFetching: boolean;
  searchedPosts: any;
};
export const SearchResults = ({
  isSearchFetching,
  searchedPosts,
}: SearchResultProps) => {
  if (isSearchFetching) {
    return <Loader />;
  } else if (searchedPosts && searchedPosts.documents.length > 0) {
    return <GridPostList posts={searchedPosts.documents} />;
  } else {
    return (
      <div className="empty-state"><p className="body-bold">No matching posts</p><p className="small-regular text-light-3">Try another keyword or explore popular posts.</p></div>
    );
  }
};
