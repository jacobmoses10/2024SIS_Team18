import React from "react";
import avatar1 from "../../src/assets/avatar.png";
import avatar2 from "../../src/assets/avatar.png";
import avatar3 from "../../src/assets/avatar.png";
import avatar4 from "../../src/assets/avatar.png";
import avatar5 from "../../src/assets/avatar.png";
import avatar6 from "../../src/assets/avatar.png";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const About = () => {
  const TeamMember = ({ name, id, avatar }) => {
    return (
      <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-lg transform transition hover:-translate-y-2 hover:shadow-2xl duration-300 ease-in-out">
        <img
          src={avatar}
          alt={name}
          className="w-24 h-24 rounded-full mb-4 border-4 border-blue-500 shadow-xl"
        />
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        <p className="text-gray-500 text-sm">ID: {id}</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-slate-100 to-white py-12 px-4 lg:px-8">
      <div className="text-left max-w-5xl w-full bg-white p-10 rounded-3xl shadow-2xl mb-12">

        <h2 className="text-4xl font-bold mb-8 text-gray-900 text-left">
          About <span className="text-blue-500">Inkwise</span>
        </h2>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Inkwise is a cutting-edge digital workspace designed to empower
          creativity and collaboration among students, professionals, and
          anyone looking to enhance their brainstorming, note-taking, and
          artistic skills.
        </p>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Utilizing advanced AI technology, our whiteboard facilitates real-time
          idea generation, diagramming, and problem-solving. Users can draw,
          type, and instantly convert their thoughts into organized digital
          notes.
        </p>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Our mission is to make brainstorming and collaboration more intuitive
          and productive through technology. Whether you're a student organizing
          your study notes, a professional planning your next big project, or a
          team brainstorming new ideas, Inkwise is the tool you need to
          bring your ideas to life.
        </p>
      </div>

      {/* Why Choose Us Section in its own card */}
      <div className="max-w-5xl w-full bg-white p-10 rounded-3xl shadow-2xl mb-12">
        <h2 className="text-4xl font-bold mb-8 text-gray-900 text-left">
          Why Choose <span className="text-blue-500">Us?</span>
        </h2>
        <ul className="list-none grid grid-cols-1 md:grid-cols-2 gap-8 text-lg text-gray-800 mb-10">
          <li className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
            </div>
            <span className="leading-relaxed">
              Intuitive design easy to use for all skill levels.
            </span>
          </li>

          <li className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
            </div>
            <span className="leading-relaxed">
              AI-enhanced features to help organize and optimize your ideas.
            </span>
          </li>

          <li className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
            </div>
            <span className="leading-relaxed">
              Accessible from any device, anytime, anywhere.
            </span>
          </li>

          <li className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-full">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
            </div>
            <span className="leading-relaxed">
              Secure and reliable with data encryption and cloud backups.
            </span>
          </li>
        </ul>
      </div>

      {/* Meet the Team Section in its own card */}
      <div className="max-w-5xl w-full bg-white p-10 rounded-3xl shadow-2xl">
        <h2 className="text-4xl font-bold mb-6 text-gray-900 text-left">
          Meet the <span className="text-blue-500">Team</span>
        </h2>
        <p className="text-lg text-gray-700 mb-10 leading-relaxed">
          Our team is made up of passionate engineers, designers, and thinkers
          dedicated to improving the way people communicate and create together.
          We're constantly working to refine and expand the capabilities of
          Inkwise to meet the needs of our diverse user base.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          <TeamMember name="Jacob Moses" id="13193750" avatar={avatar1} />
          <TeamMember name="Abrar Yusuf" id="14166755" avatar={avatar2} />
          <TeamMember name="Ahmed Khilji" id="13525643" avatar={avatar3} />
          <TeamMember name="Benjamin Bagala" id="13889466" avatar={avatar4} />
          <TeamMember name="Daniel Jacob" id="12938458" avatar={avatar5} />
          <TeamMember name="Osasere Eguaibor" id="13623549" avatar={avatar6} />
        </div>

        <Link to="https://github.com/jacobmoses10/2024SIS_Team18" target="_blank">
          <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-8 rounded-full mt-8 shadow-lg hover:shadow-xl transform transition hover:scale-105 duration-300">
            Learn More
          </button>
        </Link>
      </div>

      <Footer />
    </div>
  );
};

export default About;
