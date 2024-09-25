import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {login} from "../firebase/auth";

const Login = ({setUser}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate(); // Add this line

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
    <div className="h-screen bg-[#f3f4f6] flex items-center justify-center ">
      {/* Card  */}
      <div className="bg-white rounded-md shadow-md">
        <div className="p-2">
          <div className="w-1/2 mx-auto">
            <h1 className="font-bold text-xl">Login In</h1>
          </div>

          <div>
            <h2>Email</h2>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="border rounded-md"
            />
          </div>
          <div>
            <h2>Password</h2>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="border rounded-md"
            />
          </div>
          <div className="p-3">
            <button
              className="flex space-x-3 border p-2 px-6 rounded-md text-white bg-black cursor-pointer"
              onClick={handleLogin}>
              <p>Login</p>
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
