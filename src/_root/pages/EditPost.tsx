import PostForm from "@/components/forms/PostForm";
import Loader from "@/components/shared/Loader";
import { useGetPostById } from "@/lib/react-query/queriesAndMutation";
import { useParams } from "react-router-dom";
import { Pencil } from "lucide-react";

const EditPost = () => {
  const { id } = useParams();
  const { data: post, isPending } = useGetPostById(id || "");

  if (isPending) return <Loader />;

  return (
    <div className="flex min-w-0 flex-1">
      <div className="create-post-container">
        <header className="create-post-heading">
          <span className="create-post-icon"><Pencil size={22} aria-hidden="true" /></span>
          <div><p className="feed-eyebrow">Creator studio</p><h1 className="h3-bold md:h2-bold">Edit your post</h1><p className="small-regular text-light-3">Refine the details, then share your update.</p></div>
        </header>
        <PostForm action="Update" post={post} />
      </div>
    </div>
  );
};

export default EditPost;
