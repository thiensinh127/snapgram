import { useUserContext } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useUserContext();

  if (isLoading) return null;

  return isAuthenticated ? (
    <Navigate to="/" />
  ) : (
    <>
      <section className="flex flex-1 justify-center items-center flex-col py-10">
        <Outlet />
      </section>

      <picture className="hidden h-screen w-1/2 xl:block" aria-hidden="true">
        <source media="(min-width: 1280px)" srcSet="/assets/images/side-img.jpg" />
        <img
          src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
          alt=""
          className="h-full w-full object-cover"
          width={720}
          height={1024}
          fetchPriority="high"
          decoding="async"
        />
      </picture>
    </>
  );
};

export default AuthLayout;
