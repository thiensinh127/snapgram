import { useUserContext } from "@/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useUserContext();

  if (isLoading)
    return (
      <div className="w-full h-full flex justify-center items-center">
        Loading...
      </div>
    );

  return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
