import React, { useState } from "react";
import { Link } from "react-router-dom";
import { signUp } from "../firebase/auth";

const SignUp = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  async function handleSignUp() {
    try {
      const userCredential = await signUp(email, password);
      setUser(userCredential.user);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-6 bg-[#f3f4f6]">
      <div className="bg-white rounded-md shadow-md max-w-lg w-full p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
          Create a New Account
        </h1>
        <div className="mb-6">
          <label htmlFor="name" className="block text-lg text-gray-600 mb-2">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full border rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
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
          />
        </div>
        <button
          className="w-full bg-black text-white py-3 px-6 rounded-md mt-4 hover:bg-gray-800 transition"
          onClick={handleSignUp}
        >
          Create Account
        </button>
        <p className="text-center text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="underline text-blue-500 hover:text-blue-700">
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;