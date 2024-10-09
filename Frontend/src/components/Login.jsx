import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {login} from "../firebase/auth";
import GoogleLogin from "../components/GoogleLogin";  // Import GoogleLogin component
import { useAuth } from "./AuthContext";


const Login = ({setUser}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { signInWithGoogle } = useAuth();  // Destructure the signInWithGoogle function from useAuth
  const navigate = useNavigate(); // Add this line

  // Handle login with email and password
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

  // Handle login with Google
  async function handleGoogleLogin() {  
    try {
      const result = await signInWithGoogle();  // Call Firebase's Google sign-in method
      setUser(result.user);  // Set the user in your state
      navigate("/whiteboard");  // Redirect after successful login
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }

  return (
    <div className="h-screen bg-[#f3f4f6] flex items-center justify-center">
      <div className='bg-white px-10 py-20 rounded-3xl border-2 border-gray-200'>
        {/* Header */}
        <h1 className="text-3xl font-bold mb-4">
        Welcome back! Please enter your details
        </h1>

        <div classname='mt-8'>
          <div>
            <label className='text-lg font-medium'>Email</label>
            <input
              className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
              placeholder="Enter Your Email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div>
            <label className='text-lg font-medium'>Password</label>
            <input
              className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
              placeholder="Enter Your Password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          
          <div className="p-5 flex flex-col gap-y-4">
            {/* Login Button */}
            <button
              className="active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all flex items-center justify-center space-x-3 border p-2 px-6 rounded-md text-white bg-black cursor-pointer"
              onClick={handleLogin}>
              Log in
            </button>

            {/* Google Sign-in Button */}
            <button
              className="flex py-3 border-2 border-gray-100 active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all items-center justify-center gap-2"
              onClick={handleGoogleLogin}>
              Sign in with Google
            </button>
          </div>
            <p className="text-gray-500">
              Don't have an account?{" "}
              <span className="underline">
                <Link to="/signup">Sign Up Here</Link>
              </span>
            </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
