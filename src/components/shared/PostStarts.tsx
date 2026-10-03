import {
  useDeleteSavePost,
  useGetCurrentUser,
  useLikePost,
  useSavePost,
} from "@/lib/react-query/queriesAndMutation";
import { checkIsLiked } from "@/lib/utils";
import { Models } from "appwrite";
import { useEffect, useState } from "react";
import { Bookmark, Heart } from "lucide-react";
import Loader from "./Loader";

type PostStartsProps = {
  post: Models.Document;
  userId: string;
};
const PostStarts = ({ post, userId }: PostStartsProps) => {
  const likeList = post.likes?.map((user: Models.Document) => user.$id) ?? [];

  const [likes, setLikes] = useState(likeList);
  const [isSaved, setIsSaved] = useState(false);

  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavedPost, isPending: isDeletingSaved } =
    useDeleteSavePost();

  const { data: currentUser } = useGetCurrentUser();

  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  useEffect(() => {
    setIsSaved(!!savedPostRecord);
  }, [currentUser, savedPostRecord]);

  const handleLikePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    let newLikes = [...likes];
    const hasLiked = newLikes.includes(userId);
    if (hasLiked) {
      newLikes = newLikes.filter((id) => id !== userId);
    } else {
      newLikes.push(userId);
    }
    setLikes(newLikes);

    likePost({ postId: post.$id, likeArray: newLikes });
  };
  const handleSavePost = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (savedPostRecord) {
      setIsSaved(false);
      deleteSavedPost(savedPostRecord.$id);
      return;
    } else {
      savePost({ postId: post.$id, userId });
      setIsSaved(true);
    }
  };

  return (
    <div className="z-20 flex items-center justify-between border-t border-white/10 pt-2">
      <div className="flex items-center gap-1">
        <button
          type="button"
          className={`flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
            checkIsLiked(likes, userId) ? "text-primary-500" : "text-light-3"
          }`}
          onClick={handleLikePost}
          aria-label={checkIsLiked(likes, userId) ? "Unlike post" : "Like post"}
        >
          <Heart size={21} fill={checkIsLiked(likes, userId) ? "currentColor" : "none"} aria-hidden="true" />
        </button>

        <p className="flex h-10 items-center px-1 text-sm font-semibold text-light-2">
          {likes.length}
        </p>
      </div>

      <div className="flex h-10 items-center">
        {isSavingPost || isDeletingSaved ? (
          <Loader />
        ) : (
          <button
            type="button"
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${
              isSaved ? "text-primary-500" : "text-light-3"
            }`}
            onClick={handleSavePost}
            aria-label={isSaved ? "Remove from saved posts" : "Save post"}
          >
            <Bookmark size={21} fill={isSaved ? "currentColor" : "none"} aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PostStarts;
