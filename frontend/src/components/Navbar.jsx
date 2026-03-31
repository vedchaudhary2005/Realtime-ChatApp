import useAuthUser from "../hooks/useAuthUser";
import { useLocation, useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { BellIcon, LogOutIcon, MessageCircleMore, ArrowLeftIcon } from "lucide-react";
import ThemeSelector from "./ThemeSelector.jsx";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const navigate = useNavigate();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  return (
    <nav className="bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between w-full">

          {/* LEFT SIDE */}
          {isChatPage ? (
            // Chat page: back arrow + ChatApp logo
            <div className="flex items-center gap-2">
              <button
                className="btn btn-ghost btn-circle" 
                onClick={() => navigate("/")}
              >
                <ArrowLeftIcon className="h-6 w-6 text-base-content opacity-70" />
              </button>
              <Link to="/" className="flex items-center gap-2">
                <MessageCircleMore className="size-7 text-primary" />
                <span className="text-xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider hidden sm:block">
                  ChatApp
                </span>
              </Link>
            </div>
          ) : (
            // Home/other pages: always show ChatApp logo
            <Link to="/" className="flex items-center gap-2">
              <MessageCircleMore className="size-7 text-primary lg:hidden" />
              <span className="text-xl sm:text-2xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider lg:hidden ">
                ChatApp
              </span>
            </Link>
          )}

          {/* RIGHT SIDE: bell, theme, avatar, logout */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link to="/notifications">
              <button className="btn btn-ghost btn-circle">
                <BellIcon className="h-5 w-5 text-base-content opacity-70" />
              </button>
            </Link>

            <ThemeSelector />

            <div className="avatar">
              <div className="w-8 sm:w-9 rounded-full">
                <img
                  src={authUser?.profilePic}
                  alt="User Avatar"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            <button
              className="btn btn-ghost btn-circle"
              onClick={logoutMutation}
            >
              <LogOutIcon className="h-5 w-5 text-base-content opacity-70" />
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;