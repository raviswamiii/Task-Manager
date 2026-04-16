import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendURL}/user/signUp`, {
        name,
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.response?.data?.message || error.message);
    }
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-black via-gray-900 to-black flex items-center justify-center p-8">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">
        <p className="text-gray-300 text-center mb-6 text-sm">
          Sign up to continue
        </p>

        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          <input
            className="bg-white/20 text-white placeholder-gray-300 p-3 w-full outline-none rounded-xl focus:ring-2 focus:ring-white/50 transition"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="bg-white/20 text-white placeholder-gray-300 p-3 w-full outline-none rounded-xl focus:ring-2 focus:ring-white/50 transition"
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="bg-white/20 text-white placeholder-gray-300 p-3 w-full outline-none rounded-xl focus:ring-2 focus:ring-white/50 transition"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="mt-2 bg-white text-black p-3 rounded-xl font-bold hover:bg-gray-200 transition-all duration-300 active:scale-95"
          >
            Sign Up
          </button>
        </form>

        <p className="text-red-500 text-center mt-2">{error}</p>

        <Link to="/signIn">
          <div className="text-center mt-4 text-sm text-gray-300">
            Already have an account?{" "}
            <span className="text-white font-semibold cursor-pointer hover:underline">
              Sign In
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};
