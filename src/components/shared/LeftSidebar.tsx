import { sidebarLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutation";
import { INavLink } from "@/types";
import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const LeftSidebar = () => {
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <nav className="leftsidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="hidden gap-3 items-center lg:flex">
          <img
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={36}
            loading="lazy"
          />
        </Link>

        <Link to={`/profile/${user?.id}`} className="flex items-center gap-3 justify-center lg:justify-start">
          <img
            src={user.imageUrl || "/assets/images/profile-placeholder.svg"}
            alt="profile"
            className="h-14 w-14 rounded-full"
            loading="lazy"
          />
          <div className="hidden flex-col lg:flex">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@${user.username}</p>
          </div>
        </Link>
        <ul className="flex flex-col gap-6 ">
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route;
            return (
              <li
                key={link.label}
                className={`${
                  isActive && "bg-blue-700"
                } leftsidebar-link group`}
              >
                <NavLink to={link.route} className="flex items-center justify-center gap-4 p-4 lg:justify-start">
                  <img
                    src={link.imgURL}
                    alt=""
                    className={`group-hover:invert-white ${
                      isActive && "invert-white"
                    }`}
                    loading="lazy"
                  />
                  <span className="hidden lg:block">{link.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </div>
      <Button
        onClick={() => signOut()}
        variant={"ghost"}
        className="shad-button_ghost"
      >
        <img src="assets/icons/logout.svg" alt="" loading="lazy" />
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
