import React from "react";
import { useMediaQuery } from "react-responsive";
import {
  SparklesIcon,
  DeviceTabletIcon,
  ArrowDownTrayIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import mainLogo from "../assets/inkwise_logo.png";
import Footer from "../components/Footer";

const HomePage = () => {
  const desktopMode = useMediaQuery({ query: '(min-width: 1224px)' });

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="bg-slate-100 flex-1 flex items-center justify-center px-4">
        <div className="flex items-center flex-col text-center space-y-5">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-3 md:space-y-0 md:space-x-3">
            <img className="h-16 w-16 md:h-20 md:w-20" src={mainLogo} alt="Inkwise Logo" />
            <h1 className="font-bold text-3xl md:text-5xl p-3">Welcome to Inkwise</h1>
          </div>
          <p className="text-gray-500 font-bold max-w-xs md:max-w-md">
            An intuitive whiteboard for students and professionals to brainstorm, take notes, and draw.
          </p>
          <div className="w-full flex justify-center">
            <Link to="/signup">
              <button className="flex items-center space-x-3 border p-3 px-6 rounded-md text-white bg-black hover:bg-blue-600 transition w-full md:w-auto justify-center">
                Get Started
              </button>
            </Link>
          </div>
          <p className="text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="underline text-blue-500">
              Login Here
            </Link>
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="flex flex-col items-center py-10 space-y-10 bg-white px-4 md:px-0">
        <div className="flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-10">
          <FeatureDescription
            Icon={SparklesIcon}
            title={"Enhance with AI"}
            desc={"Utilize AI to brainstorm and organize ideas."}
          />
          <FeatureDescription
            Icon={ArrowDownTrayIcon}
            title={"Download"}
            desc={"Download your whiteboard creations with ease."}
          />
          <FeatureDescription
            Icon={DeviceTabletIcon}
            title={"Multi-Device"}
            desc={"Access your whiteboard from any device."}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;

const FeatureDescription = ({ Icon, title, desc }) => {
  return (
    <div className="flex items-center flex-col text-center space-y-4 max-w-xs md:max-w-none">
      <Icons IconComponent={Icon} />
      <h2 className="font-bold text-xl md:text-2xl">{title}</h2>
      <p className="text-gray-500">{desc}</p>
    </div>
  );
};

const Icons = ({ IconComponent }) => {
  return (
    <div className="h-10 w-10 md:h-12 md:w-12 mb-3">
      <IconComponent className="h-full w-full text-gray-600" />
    </div>
  );
};
