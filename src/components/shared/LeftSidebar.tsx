import { sidebarLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutation";
import { INavLink } from "@/types";
import { useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

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
                <NavLink
                  to={link.route}
                  className="flex items-center justify-center gap-4 p-4 lg:justify-start"
                  aria-label={link.label}
                >
                  <link.icon size={21} strokeWidth={isActive ? 2.5 : 2} aria-hidden="true" />
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
        className="h-12 w-12 justify-center p-0 hover:bg-white/10 lg:h-auto lg:w-auto lg:justify-start lg:px-5"
        aria-label="Log out"
      >
        <LogOut size={21} aria-hidden="true" />
        <p className="hidden small-medium lg:block lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};

export default LeftSidebar;
