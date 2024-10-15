import React from "react";
import {
  SparklesIcon,
  DeviceTabletIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#f3f4f6] h-[500px] flex items-center justify-center px-6 text-center">
        <div className="flex items-center flex-col">
          <h1 className="font-bold text-4xl md:text-5xl p-3">
            Create on the Whiteboard with AI
          </h1>
          <p className="p-3 text-gray-500 font-bold max-w-xl">
            An intuitive whiteboard for students and professionals to brainstorm, take notes, and draw.
          </p>
          <div className="p-3">
            <Link to="/signup">
              <button className="flex items-center space-x-3 border p-2 px-6 rounded-md text-white bg-black hover:bg-gray-800 transition">
                Get Started
              </button>
            </Link>
          </div>
          <p className="text-gray-500">
            Already have an account?{' '}
            <Link to="/login" className="underline text-blue-500 hover:text-blue-700">
              Login here
            </Link>
          </p>
        </div>
      </header>

      <section className="flex flex-col items-center justify-center py-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl w-full">
          <FeatureDescription
            Icon={SparklesIcon}
            title="Enhance with AI"
            desc="Utilize AI to brainstorm and organize ideas."
          />
          <FeatureDescription
            Icon={ArrowDownTrayIcon}
            title="Download"
            desc="Download your whiteboard creations with ease."
          />
          <FeatureDescription
            Icon={DeviceTabletIcon}
            title="Multi-Device"
            desc="Access your whiteboard from any device."
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;

const FeatureDescription = ({ Icon, title, desc }) => {
  return (
    <div className="flex items-center flex-col text-center">
      <div className="p-3">
        <Icons IconComponent={Icon} />
      </div>
      <h2 className="font-bold text-2xl md:text-3xl p-3">{title}</h2>
      <p className="text-gray-500 max-w-xs">{desc}</p>
    </div>
  );
};

const Icons = ({ IconComponent }) => {
  return (
    <div className="h-12 w-12 text-black">
      <IconComponent className="w-full h-full" />
    </div>
  );
};