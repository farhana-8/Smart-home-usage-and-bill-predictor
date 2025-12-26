import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const hideLogout =
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <nav className="flex justify-between items-center bg-blue-600 text-white px-6 py-3 shadow z-1 fixed min-w-full">
      <div className="flex items-center gap-2">
        <img src={logo} alt="Logo" className="w-8 h-8" />
        <h1 className="font-bold text-lg">
          Smart Home Usage & Bill Predictor
        </h1>
      </div>

      {!hideLogout && (
        <button
          onClick={logout}
          className="bg-red-500 hover:bg-red-600 px-4 py-1 rounded"
        >
          Logout
        </button>
      )}
    </nav>
  );
}