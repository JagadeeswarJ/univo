// src/AuthForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { t } from "../components/toast";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "localhost:3000",
});

export default function AuthForm() {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleToggle = () => setIsLogin(!isLogin);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        const response = await api.post("/login", formData);
        t("User Login Success");
        console.log("Login success:", response.data);
        localStorage.setItem("token", response.data.token);
        navigate("/events"); // Redirect to events page after login
      } else {
        const response = await api.post("/register", formData);
        console.log("Signup success:", response.data);

        setIsLogin(true); // optionally switch to login after signup
      }
    } catch (error) {
      console.error("Auth error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Authentication failed.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        {isLogin ? "Login" : "Signup"}
      </h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Full Name</label>
              <input
                type="text"
                name="fullName"
                className="w-full px-3 py-2 border rounded"
                onChange={handleChange}
                value={formData.fullName || ""}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                className="w-full px-3 py-2 border rounded"
                onChange={handleChange}
                value={formData.email || ""}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Phone</label>
              <input
                type="tel"
                name="phone"
                className="w-full px-3 py-2 border rounded"
                onChange={handleChange}
                value={formData.phone || ""}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700">Role</label>
              <select
                name="role"
                className="w-full px-3 py-2 border rounded"
                onChange={handleChange}
                value={formData.role || "student"}
              >
                <option value="student">Student</option>
                <option value="organizer">Organizer</option>
              </select>
            </div>
          </>
        )}

        {/* Always show these two */}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Username</label>
          <input
            type="text"
            name="username"
            className="w-full px-3 py-2 border rounded"
            onChange={handleChange}
            value={formData.username}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            className="w-full px-3 py-2 border rounded"
            onChange={handleChange}
            value={formData.password}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          {isLogin ? "Login" : "Signup"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={handleToggle}
          className="text-blue-600 hover:underline"
        >
          {isLogin ? "Signup" : "Login"}
        </button>
      </p>
    </div>
  );
}
