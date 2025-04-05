import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div
            className="text-3xl font-extrabold tracking-tight text-violet-700 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => navigate("/")}
          >
            UNIVO
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex gap-10 text-sm font-medium text-gray-700">
            {["features", "events", "about", "pricing"].map((path) => (
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
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden md:flex gap-4 items-center">
            <button
              onClick={() => navigate("/organize")}
              className="px-4 py-1.5 text-sm font-semibold text-violet-700 border border-violet-700 rounded-lg hover:bg-violet-700 hover:text-white transition duration-200 shadow-sm"
            >
              Organize
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-4 py-1.5 text-sm font-semibold bg-violet-700 text-white rounded-lg hover:bg-violet-800 transition duration-200 shadow-md"
            >
              Log In
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
