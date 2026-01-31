import React from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  BoxIcon,
  GripIcon,
  ListIcon,
  MenuIcon,
  MessageCircleMoreIcon,
  XIcon,
} from "lucide-react";
import { useClerk, useUser, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  return (
    <nav className="h-20">
      <div className="fixed left-0 top-0 right-0 z-100 flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white transition-all">
        <img
          src={assets.logo}
          alt=""
          className="h-10 cursor-pointer"
          onClick={() => {
            navigate("/");
            scrollTo(0, 0);
          }}
        />

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-4 md:gap-8 max-md:text-sm text-gray-800">
          <NavLink
            to={"/"}
            href="#"
            onClick={() => scrollTo(0, 0)}
            className={({ isActive }) =>
              `relative transition-colors duration-300 ${
                isActive ? "text-indigo-600" : "hover:text-indigo-500"
              }
                after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-indigo-600
                after:origin-left after:transition-transform after:duration-300
                ${isActive ? "after:scale-x-100" : "after:scale-x-0"}`
            }
          >
            {" "}
            Home{" "}
          </NavLink>
          <NavLink
            to={"/marketplace"}
            onClick={() => scrollTo(0, 0)}
            className={({ isActive }) =>
              `relative transition-colors duration-300 ${
                isActive ? "text-indigo-600" : "hover:text-indigo-500"
              }
                after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-indigo-600
                after:origin-left after:transition-transform after:duration-300
                ${isActive ? "after:scale-x-100" : "after:scale-x-0"}`
            }
          >
            {" "}
            Marketplace{" "}
          </NavLink>
          <NavLink
            to={user ? "/messages" : "#"}
            onClick={() => (user ? scrollTo(0, 0) : openSignIn())}
            className={({ isActive }) =>
              `relative transition-colors duration-300 ${
                isActive ? "text-indigo-600" : "hover:text-indigo-500"
              }
                after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-indigo-600
                after:origin-left after:transition-transform after:duration-300
                ${isActive ? "after:scale-x-100" : "after:scale-x-0"}`
            }
          >
            {" "}
            Messages{" "}
          </NavLink>
          <NavLink
            to={user ? "/my-listings" : "#"}
            onClick={() => (user ? scrollTo(0, 0) : openSignIn())}
            className={({ isActive }) =>
              `relative transition-colors duration-300 ${
                isActive ? "text-indigo-600" : "hover:text-indigo-500"
              }
                after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-indigo-600
                after:origin-left after:transition-transform after:duration-300
                ${isActive ? "after:scale-x-100" : "after:scale-x-0"}`
            }
          >
            {" "}
            My Listing{" "}
          </NavLink>
        </div>

        {!user ? (
          <div>
            <button
              onClick={() => openSignIn()}
              className="max-sm:hidden cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
            >
              Login
            </button>
            <MenuIcon onClick={() => setMenuOpen(true)} className="sm:hidden" />
          </div>
        ) : (
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action
                label="Marketplace"
                labelIcon={<GripIcon size={16} />}
                onClick={() => navigate("/marketplace")}
              />
              <UserButton.Action
                label="Messages"
                labelIcon={<MessageCircleMoreIcon size={16} />}
                onClick={() => navigate("/messages")}
              />
              <UserButton.Action
                label="My Listing"
                labelIcon={<ListIcon size={16} />}
                onClick={() => navigate("/my-listings")}
              />
              <UserButton.Action
                label="My Orders"
                labelIcon={<BoxIcon size={16} />}
                onClick={() => navigate("/my-orders")}
              />
            </UserButton.MenuItems>
          </UserButton>
        )}
      </div>
      {/* Mobile Menu */}
      <div
        className={`sm:hidden fixed inset-0 ${menuOpen ? "w-full" : "w-0"} overflow-hidden bg-white backdrop-blur shadow-xl rounded-lg z-[200] text-sm transition-all`}
      >
        <div className="flex flex-col items-center justify-center h-full text-xl font-semibold gap-6 p-4">
          <Link to={"/"} onClick={() => setMenuOpen(false)}>
            {" "}
            Home{" "}
          </Link>
          <Link to={"/marketplace"} onClick={() => setMenuOpen(false)}>
            {" "}
            Marketplace{" "}
          </Link>
          <Link to={"/messages"} onClick={() => openSignIn()}>
            {" "}
            Messages{" "}
          </Link>
          <Link to={"/my-listings"} onClick={() => openSignIn()}>
            {" "}
            My Listing{" "}
          </Link>
          <button
            onClick={() => openSignIn()}
            className=" cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full"
          >
            Login
          </button>
          <XIcon
            className="absolute size-8 top-6 right-6 text-gray-500 hover:text-gray-700 cursor-pointer"
            onClick={() => setMenuOpen(false)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
