import Bottombar from "@/components/shared/Bottombar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import Topbar from "@/components/shared/Topbar";
import { useUserContext } from "@/context/AuthContext";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  const { isLoading } = useUserContext();
  return (
    <div className="w-full md:flex">
      <Topbar />
      <LeftSidebar />

      <section className="flex flex-1 h-full">
        {isLoading && (
          <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent" />
          </div>
        )}
        <Outlet />
      </section>
      <Bottombar />
    </div>
  );
};

export default RootLayout;
