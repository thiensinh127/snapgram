import {
  createUserAccount as apiCreateUserAccount,
  signInAccount as apiSignInAccount,
  signOutAccount as apiSignOutAccount,
  getCurrentUser,
  refreshJWT,
} from "@/lib/appwrite/api";
import { client } from "@/lib/appwrite/config";
import { IContextType, INewUser, ISignIn, IUser } from "@/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";

const INITIAL_USER = {
  id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: "",
  bio: "",
};

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
  login: async () => false as boolean,
  signup: async () => null,
  logout: async () => false as boolean,
};

const AuthContext = createContext<IContextType>(INITIAL_STATE);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<IUser>(INITIAL_USER);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  const checkAuthUser = useCallback(async () => {
    setIsLoading(true);
    try {
      let currentUser = await getCurrentUser();
      console.log("có nhảy vô đây không");
      //If JWT expired
      if (!currentUser) {
        const refreshed = await refreshJWT();
        if (refreshed) {
          currentUser = await getCurrentUser();
        }
      }

      if (currentUser) {
        setUser({
          id: currentUser.$id,
          name: currentUser.name,
          username: currentUser.username,
          email: currentUser.email,
          imageUrl: currentUser.imageUrl,
          bio: currentUser.bio,
        });
        setIsAuthenticated(true);
        return true;
      } else {
        throw new Error("No current user");
      }
    } catch (error) {
      console.error("Error in checkAuthUser:", error);
      setIsAuthenticated(false);
      setUser(INITIAL_USER);
      navigate("/sign-in");
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const login = useCallback(
    async (values: ISignIn) => {
      setIsLoading(true);
      try {
        await apiSignInAccount(values);
        await checkAuthUser();
        return true;
      } catch (error) {
        console.error("Login failed:", error);
        setIsAuthenticated(false);
        setUser(INITIAL_USER);
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [checkAuthUser]
  );

  const signup = useCallback(
    async (values: INewUser) => {
      setIsLoading(true);
      try {
        const newUser = await apiCreateUserAccount(values);
        await checkAuthUser();
        return newUser;
      } catch (error) {
        console.error("Signup failed:", error);
        setIsAuthenticated(false);
        setUser(INITIAL_USER);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [checkAuthUser]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      const success = await apiSignOutAccount();
      if (success) {
        setIsAuthenticated(false);
        setUser(INITIAL_USER);
        navigate("/sign-in");
        return true;
      }
      return false;
    } catch (error) {
      console.error("Logout failed:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const jwt = localStorage.getItem("appwrite-jwt");
    if (jwt && jwt !== "[]" && jwt !== "null") {
      client.setJWT(jwt);
      checkAuthUser();
    } else {
      setIsLoading(false);
      navigate("/sign-in");
    }
  }, [checkAuthUser, navigate]);

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useUserContext = () => useContext(AuthContext);
