import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutation";
import { Models } from "appwrite";
import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

const Saved = () => {
  const { data: currentUser } = useGetCurrentUser();

  const savePosts = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser.imageUrl,
      },
    }))
    .reverse();

  return (
    <div className="saved-container">
      <div className="page-header w-full max-w-5xl">
        <span className="page-header-icon"><Bookmark size={22} aria-hidden="true" /></span>
        <div>
          <p className="feed-eyebrow">Your collection</p>
          <h1 className="h3-bold md:h2-bold">Saved posts</h1>
          <p className="small-regular text-light-3">{savePosts?.length ?? 0} moments kept for later.</p>
        </div>
      </div>

      {!currentUser ? (
        <Loader />
      ) : (
        <div className="w-full max-w-5xl">
          {savePosts.length === 0 ? (
            <div className="empty-state"><p className="body-bold">Your collection is waiting</p><p className="small-regular text-light-3">Save posts you want to revisit later.</p><Link to="/explore" className="feed-retry">Explore posts</Link></div>
          ) : (
            <GridPostList posts={savePosts} showStats={false} />
          )}
        </div>
      )}
    </div>
  );
};

export default Saved;
