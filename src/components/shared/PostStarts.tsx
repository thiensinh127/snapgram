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
    <div className="flex justify-between items-center z-20">
      <div className="flex gap-2 mr-5">
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-xl transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          onClick={handleLikePost}
          aria-label={checkIsLiked(likes, userId) ? "Unlike post" : "Like post"}
        >
          <Heart size={21} fill={checkIsLiked(likes, userId) ? "currentColor" : "none"} aria-hidden="true" />
        </button>

        <p className="small-medium lag:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        {isSavingPost || isDeletingSaved ? (
          <Loader />
        ) : (
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center rounded-xl transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
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
