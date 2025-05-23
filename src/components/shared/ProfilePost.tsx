import { useOutletContext } from "react-router-dom";
import GridPostList from "@/components/shared/GridPostList";

const ProfilePosts = () => {
  const { currentUser } = useOutletContext<{ currentUser: any }>();
  return <GridPostList posts={currentUser.posts} showUser={false} />;
};

export default ProfilePosts;
