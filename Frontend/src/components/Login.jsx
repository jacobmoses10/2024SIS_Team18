import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../firebase/auth";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const userCredential = await login(email, password);
      setUser(userCredential.user);
      navigate("/whiteboard");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-6 bg-[#f3f4f6]">
      <div className="bg-white rounded-md shadow-md max-w-lg w-full p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Welcome Back! Please Enter Your Details
        </h1>
        <div className="mb-6">
          <label htmlFor="email" className="block text-lg text-gray-600 mb-2">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full border rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Email"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-lg text-gray-600 mb-2">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full border rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Your Password"
          />
        </div>
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="remember"
            className="mr-2"
          />
          <label htmlFor="remember" className="text-gray-600 text-base">
            Remember for 30 days
          </label>
        </div>
        <button className="text-blue-500 hover:text-blue-700 font-medium mb-6">
          Forgot Password?
        </button>
        <button
          className="w-full bg-black text-white py-3 px-6 rounded-md mt-4 hover:bg-gray-800 transition"
          onClick={handleLogin}
        >
          Login
        </button>
        <button className="w-full border-2 border-gray-100 text-gray-600 py-3 px-6 rounded-md mt-4 hover:bg-gray-100 transition flex items-center justify-center gap-2">
          Sign in with Google
        </button>
        <p className="text-center text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="underline text-blue-500 hover:text-blue-700">
            Sign Up Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;