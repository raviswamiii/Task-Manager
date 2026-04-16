import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignIn = () => {
  // 📌 Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ❌ Error state
  const [error, setError] = useState("");

  // ⏳ Loading state
  const [loading, setLoading] = useState(false);

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  // 🔐 Handle Sign In
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Reset error
    setError("");

    // Basic validation
    if (!email || !password) {
      return setError("Please fill all fields");
    }

    try {
      setLoading(true);

      const response = await axios.post(`${backendURL}/user/signIn`, {
        email,
        password,
      });

      if (response.data.success) {
        // ✅ Store token
        localStorage.setItem("token", response.data.token);

        // 🚀 Redirect to Home
        navigate("/");
      } else {
        setError(response.data.message || "Something went wrong");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Server error. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black flex items-center justify-center p-8">
      {/* 📦 Container */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
        
        {/* 📝 Heading */}
        <p className="text-gray-300 text-center mb-6 text-sm">
          Sign in to continue
        </p>

        {/* 📄 Form */}
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          
          {/* 📧 Email Input */}
          <input
            className="bg-white/20 text-white placeholder-gray-300 p-3 w-full outline-none rounded-xl focus:ring-2 focus:ring-white/50 transition"
            type="email"
            placeholder="Email address"
            value={email}
            disabled={loading}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* 🔑 Password Input */}
          <input
            className="bg-white/20 text-white placeholder-gray-300 p-3 w-full outline-none rounded-xl focus:ring-2 focus:ring-white/50 transition"
            type="password"
            placeholder="Password"
            value={password}
            disabled={loading}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* 🔘 Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-2 p-3 rounded-xl font-bold transition-all duration-300 ${
              loading
                ? "bg-gray-400 text-black cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-200 active:scale-95"
            }`}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        {/* ❌ Error Message */}
        {error && (
          <p className="text-red-500 text-center mt-3 text-sm">{error}</p>
        )}

        {/* 🔗 Redirect to Sign Up */}
        <Link to="/signUp">
          <div className="text-center mt-4 text-sm text-gray-300">
            Don’t have an account?{" "}
            <span className="text-white font-semibold cursor-pointer hover:underline">
              Sign Up
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};