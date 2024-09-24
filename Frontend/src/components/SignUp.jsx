import React, {useState} from "react";
import {Link} from "react-router-dom";
import {signUp} from "../firebase/auth";

const SignUp = ({setUser}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [name, setName] = useState();

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
    <div className="h-screen bg-[#f3f4f6] flex items-center justify-center ">
      {/* Card  */}
      <div className="bg-white rounded-md shadow-md">
        <div className="p-2">
          <div className="w-1/2 mx-auto">
            <h1 className="font-bold text-xl">Create a New Account</h1>
          </div>
          <div>
            <h2>Full Name</h2>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="border rounded-md"
            />
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
              className="flex space-x-3 border p-2 px-6 rounded-md text-white bg-black"
              onClick={handleSignUp}>
              <p>Create Account</p>
            </button>
          </div>

          <p className="text-gray-500">
            Already have an account?{" "}
            <span className="underline">
              <Link to="/login">Login Here</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
