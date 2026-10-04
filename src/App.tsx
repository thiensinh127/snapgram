import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
const SigninForm = lazy(() => import("./_auth/forms/SigninForm"));
const SignupForm = lazy(() => import("./_auth/forms/SignupForm"));
const AuthLayout = lazy(() => import("./_auth/AuthLayout"));
const RootLayout = lazy(() => import("./_root/RootLayout"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
const AllUsers = lazy(() => import("./_root/pages/AllUsers"));
const CreatePost = lazy(() => import("./_root/pages/CreatePost"));
const EditPost = lazy(() => import("./_root/pages/EditPost"));
const Explore = lazy(() => import("./_root/pages/Explore"));
const Home = lazy(() => import("./_root/pages/Home"));
const PostDetail = lazy(() => import("./_root/pages/PostDetail"));
const Profile = lazy(() => import("./_root/pages/Profile"));
const Saved = lazy(() => import("./_root/pages/Saved"));
const UpdateProfile = lazy(() => import("./_root/pages/UpdateProfile"));

const App = () => {
  return (
    <main className="flex h-screen">
      <Suspense fallback={<div className="flex flex-1 items-center justify-center" role="status">Loading Snapgram</div>}>
        <Routes>
        {/* Auth routes */}
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />} />
          <Route path="/sign-up" element={<SignupForm />} />
        </Route>

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/saved" element={<Saved />} />
            <Route path="/all-users" element={<AllUsers />} />
            <Route path="/create-post" element={<CreatePost />} />
            <Route path="/update-post/:id" element={<EditPost />} />
            <Route path="/post/:id" element={<PostDetail />} />
            <Route path="/profile/:id/*" element={<Profile />} />
            <Route path="/update-profile/:id" element={<UpdateProfile />} />
          </Route>
        </Route>
        </Routes>
      </Suspense>

      <Toaster />
    </main>
  );
};

export default App;
