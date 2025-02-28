import { Routes, Route } from "react-router-dom";
import { Toaster } from "@/components/ui/sonner";
import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import {
  AllUsers,
  CreatePost,
  EditPost,
  Explore,
  Home,
  PostDetail,
  Profile,
  Saved,
  UpdateProfile,
} from "./_root/pages";
import "./globals.css";
import AuthLayout from "./_auth/AuthLayout";
import RootLayout from "./_root/RootLayout";
const App = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SigninForm />}></Route>
          <Route path="/sign-up" element={<SignupForm />}></Route>
        </Route>

        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route index path="/explore" element={<Explore />} />
          <Route index path="/saved" element={<Saved />} />
          <Route index path="/all-users" element={<AllUsers />} />
          <Route index path="/create-post" element={<CreatePost />} />
          <Route index path="/update-post/:id" element={<EditPost />} />
          <Route index path="/post/:id" element={<PostDetail />} />
          <Route index path="/profile/:id" element={<Profile />} />
          <Route index path="/update-profile/:id" element={<UpdateProfile />} />
        </Route>
      </Routes>

      <Toaster />
    </main>
  );
};

export default App;
