import React from "react";

const SignUp = () => {
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
              <input className="border rounded-md" type="text" />
            </div>
            <div>
              <h2>Email</h2>
              <input className="border rounded-md" type="text" />
            </div>
            <div>
              <h2>Password</h2>
              <input className="border rounded-md" type="text" />
            </div>
            <div className="p-3">
              <button
                className="flex space-x-3 border p-2 px-6 rounded-md text-white bg-black"
                type="button">
                <p>Create Account</p>
              </button>
            </div>

            <p className="text-gray-500">
              Already have an account?{" "}
              <span className="underline">Login in Here</span>
            </p>
          </div>
      </div>
    </div>
  );
};

export default SignUp;
