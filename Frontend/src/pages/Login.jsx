import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, googleLogin } from "../firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'; 

const Login = ({ setUser }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  async function handleGoogleLogin() {
    try {
      const userCredential = await googleLogin();
      setUser(userCredential);
      navigate("/whiteboard");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }

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
      <div className='bg-white rounded-3xl shadow-md max-w-lg w-full p-8'>
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Welcome back!
        </h1>
        <div className='mb-6'>
          <div>
            <label className="text-lg font-medium">Email</label>
            <input
              id="email"
              className='w-full border-2 border-gray-100 rounded-xl p-4 mb-3 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter Your Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label className="text-lg font-medium">Password</label>
            <input
              id="password"
              className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter Your Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <div>
            <div className="py-4">
              <input type="checkbox" id="remember" className="mr-2" />
              <label className="ml-2 font-medium text-base" htmlFor="remember">
                Remember for 30 days
              </label>
            </div>
            <button className='text-blue-500 hover:text-blue-700 font-medium'>Forgot Password</button>
          </div>
          <div className="p-5  flex flex-col gap-y-4">
            <button
              className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all flex item-centre justify-center space-x-3 border p-2 px-6 rounded-md text-white bg-black cursor-pointer"
              onClick={handleLogin}>
              <p>Login</p>
            </button>
            <button
              className="flex py-3 border-2 border-gray-100 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all items-center justify-center gap-2"
              onClick={handleGoogleLogin}>
              <FontAwesomeIcon icon={faGoogle} /> {/* Google icon */}
              <span>Sign in with Google</span>
            </button>
          </div>
            <p className="mt-3 text-gray-500 text-center">
              Don't have an account?{" "}
            <span className="underline text-blue-500">
              <Link to="/signup">Sign Up Here</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;