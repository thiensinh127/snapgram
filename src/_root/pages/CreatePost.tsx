import PostForm from "@/components/forms/PostForm";
import { Sparkles } from "lucide-react";

const CreatePost = () => {
  return (
    <div className="flex min-w-0 flex-1">
      <div className="create-post-container">
        <header className="create-post-heading">
          <span className="create-post-icon"><Sparkles size={22} aria-hidden="true" /></span>
          <div>
            <p className="feed-eyebrow">Creator studio</p>
            <h1 className="h3-bold md:h2-bold">Create a post</h1>
            <p className="small-regular text-light-3">Turn a moment into something worth sharing.</p>
          </div>
        </header>
        <PostForm action="Create" />
      </div>
    </div>
  );
};

export default CreatePost;
