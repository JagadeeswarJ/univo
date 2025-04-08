import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "../context/LoginContext";
import { useState, useContext } from "react";
import logo from "../assets/logo.jpg";

const Navbar = () => {
  const navigate = useNavigate();
  const context = useContext(LoginContext);
  // const [userContext, setUserContext] = useState(context);
  // setContext(() => useContext(LoginContext));
  // useEffect(() => {
  // }, []);

  function handleSignout() {
    localStorage.removeItem("userContext");
    localStorage.removeItem("token");
    context.setUser(null);
    navigate("/login");
  }
  console.log(context.user);
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="text-3xl font-extrabold tracking-tight text-violet-700 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate("/")}
          >
            <img src={logo} className="w-36"></img>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex gap-10 text-sm font-medium text-gray-700">
            {["features", "events", "about", "pricing", "calendar"].map(
              (path) => (
                <NavLink
                  key={path}
                  to={`/${path}`}
                  className={({ isActive }) =>
                    `relative group transition-all duration-200 ${
                      isActive
                        ? "text-violet-700 font-semibold"
                        : "hover:text-violet-700"
                    }`
                  }
                >
                  {path.charAt(0).toUpperCase() + path.slice(1)}
                  <span className="absolute left-0 bottom-[-3px] w-0 h-0.5 bg-violet-700 transition-all group-hover:w-full"></span>
                </NavLink>
              )
            )}
          </div>

          {/* CTAs */}
          <div className="hidden md:flex gap-4 items-center">
            {context.user === null && (
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-1.5 text-sm font-semibold bg-violet-700 text-white rounded-lg hover:bg-violet-800 transition duration-200 shadow-md"
              >
                Log In
              </button>
            )}
            {context.user?.role === "organizer" && (
              <button
                onClick={() => navigate("/event/orgdsh")}
                className="px-4 py-1.5 text-sm font-semibold bg-violet-700 text-white rounded-lg hover:bg-violet-800 transition duration-200 shadow-md"
              >
                Organize
              </button>
            )}
            {context.user?.role !== "organizer" && context.user !== null && (
              <button
                onClick={() => navigate("/event/studsh")}
                className="px-4 py-1.5 text-sm font-semibold bg-violet-700 text-white rounded-lg hover:bg-violet-800 transition duration-200 shadow-md"
              >
                My Dashboard
              </button>
            )}
            {context.user !== null && (
              <button
                onClick={() => handleSignout()}
                className="px-4 py-1.5 text-sm font-semibold bg-violet-700 text-white rounded-lg hover:bg-violet-800 transition duration-200 shadow-md"
              >
                Sign out
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
