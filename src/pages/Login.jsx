import { useState, useContext } from "react";
import { login } from "../services/authService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Simple email validation regex
  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Frontend email validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    try {
      const res = await login({ email, password }); // backend expects email now
      loginUser(res.token); // 🔐 real JWT from backend
      navigate("/dashboard");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-80 bg-white p-6 rounded shadow"
        >
          <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <input
            type="email"
            className="w-full mb-3 p-2 border rounded"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full mb-3 p-2 border rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Login
          </button>

          <p className="text-sm text-center mt-3">
            New user?{" "}
            <Link to="/register" className="text-blue-600">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
