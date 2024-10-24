import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login, googleLogin } from "../firebase/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons'; 
import Footer from "../components/Footer";

const Login = ({ setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
/*f3f4f6*/
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-10 px-6 ">
      <div className='bg-white max-w-lg w-full p-8'>
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
        Welcome back!
        </h1>
        <div className='mb-6'>
          <form>
            <label className="text-lg font-medium">Email</label>
            <input
              className='w-full border-2 border-gray-100 rounded-xl p-4 mb-3 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter Your Email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <label className="text-lg font-medium">Password</label>
            <input
              className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter Your Password"
              type="password"
              autoComplete="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </form>
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
              className="hover:bg-blue-600 transition flex items-center justify-center space-x-3 border p-3 px-6 rounded-md text-white bg-black cursor-pointer"
              onClick={handleLogin}
              type="submit"
              >                
              <p>Login</p>
            </button>
            <button
              className="flex py-3 border border-gray-100 rounded-md hover:bg-blue-600 hover:text-white transition items-center justify-center gap-2"
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
      <Footer />
    </div>
  );
};

export default Login;