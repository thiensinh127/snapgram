import { bottombarLinks } from "@/constants";
import { INavLink } from "@/types";
import { Link, useLocation } from "react-router-dom";

const Bottombar = () => {
  const { pathname } = useLocation();
  return (
    <section className="bottom-bar">
      {bottombarLinks.map((link: INavLink) => {
        const isActive = pathname === link.route;
        return (
          <Link
            to={link.route}
            key={link.label}
            className={`bottom-bar-link ${isActive ? "bottom-bar-link_active" : ""}`}
            aria-current={isActive ? "page" : undefined}
          >
            <link.icon size={21} strokeWidth={isActive ? 2.5 : 2} aria-hidden="true" />
            <span className="bottom-bar-label">{link.label}</span>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
