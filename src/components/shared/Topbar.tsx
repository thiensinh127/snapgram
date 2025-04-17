import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutation";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";

const Topbar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className=" flex gap-3 items-center">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
            loading="lazy"
          />
        </Link>

        <div className="flex gap-4">
          <Button
            onClick={() => signOut()}
            variant={"ghost"}
            className="shad-button__ghost"
          >
            <img src="assets/icons/logout.svg" alt="" loading="lazy" />
          </Button>
          <Link to={`/profile/${user?.id}`} className="flex-center gap-3">
            <img
              src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
              alt="avatar"
              className="h-8 w-8 rounded-full"
              loading="lazy"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
