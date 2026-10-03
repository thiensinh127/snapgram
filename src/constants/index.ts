import { Bookmark, Compass, House, SquarePlus } from "lucide-react";

export const sidebarLinks = [
  {
    icon: House,
    route: "/",
    label: "Home",
  },
  {
    icon: Compass,
    route: "/explore",
    label: "Explore",
  },
  // {
  //   imgURL: "/assets/icons/people.svg",
  //   route: "/all-users",
  //   label: "People",
  // },
  {
    icon: Bookmark,
    route: "/saved",
    label: "Saved",
  },
  {
    icon: SquarePlus,
    route: "/create-post",
    label: "Create Post",
  },
];

export const bottombarLinks = [
  {
    icon: House,
    route: "/",
    label: "Home",
  },
  {
    icon: Compass,
    route: "/explore",
    label: "Explore",
  },
  {
    icon: Bookmark,
    route: "/saved",
    label: "Saved",
  },
  {
    icon: SquarePlus,
    route: "/create-post",
    label: "Create",
  },
];
