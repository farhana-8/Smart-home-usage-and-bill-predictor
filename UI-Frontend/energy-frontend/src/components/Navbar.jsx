import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ThemeContext } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function Navbar({ variant = "protected" }) {
  const { logoutUser } = useContext(AuthContext);
  const { dark, setDark } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const logout = () => {
    logoutUser();
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="w-full bg-green-600 dark:bg-gray-900 text-white px-6 py-4 flex justify-between items-center">

      {/* Brand */}
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() =>
          navigate(variant === "auth" ? "/login" : "/dashboard")
        }
      >
        ⚡ Smart Energy Usage Tracker
      </h1>

      <div className="flex items-center gap-4">

        {/* 🌙 Dark Mode Toggle */}
        <button
          onClick={() => setDark(!dark)}
          className="p-2 rounded-full bg-green-800 dark:bg-gray-700 hover:opacity-80 transition"
          title="Toggle theme"
        >
          {dark ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Menu */}
        {variant === "protected" && (
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="bg-green-800 dark:bg-gray-700 px-4 py-2 rounded"
            >
              ☰
            </button>

            {open && (
              <div className="absolute right-0 mt-2 bg-white dark:bg-gray-800
                text-black dark:text-white rounded shadow w-44 z-50">

                {["dashboard","history","rewards","tips"].map((item) => (
                  <Link
                    key={item}
                    to={`/${item}`}
                    className="block px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                    onClick={() => setOpen(false)}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </Link>
                ))}

                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
