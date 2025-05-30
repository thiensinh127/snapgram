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

      <img
        src="/assets/images/side-img.svg"
        alt="logo"
        className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
        loading="lazy"
      />
    </>
  );
};

export default AuthLayout;
