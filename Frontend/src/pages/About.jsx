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
      <div className="flex flex-col items-center">
        <img src={avatar} alt={name} className="w-24 h-24 rounded-full mb-4" />
        <h3 className="text-xl font-semibold text-gray-700">{name}</h3>
        <p className="text-gray-500">ID: {id}</p>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center py-10 px-6 bg-slate-100">
      <div className="text-center max-w-5xl w-full bg-white p-4 shadow-lg rounded-3xl">
        <h1 className="text-4xl font-bold mt-6 mb-4">About Inkwise</h1>
        <p className="text-lg text-gray-600 mb-6">
          Inkwise is a cutting-edge digital workspace designed to empower
          creativity and collaboration among students, professionals, and anyone
          looking to enhance their brainstorming, note-taking, and artistic
          skills.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          Utilizing advanced AI technology, our whiteboard facilitates real-time
          idea generation, diagramming, and problem-solving. Users can draw,
          type, and instantly convert their thoughts into organized digital
          notes.
        </p>
        <p className="text-lg text-gray-600 mb-6">
          Our mission is to make brainstorming and collaboration more intuitive
          and productive through technology. Whether you're a student organizing
          your study notes, a professional planning your next big project, or a
          team brainstorming new ideas, Inkwise is the tool you need to
          bring your ideas to life.
        </p>
        <h2 className="text-3xl md:text-4xl font-semibold mt-10 mb-6">Why Choose Us?</h2>
        <ul className="list-disc list-inside text-left text-lg text-gray-600 mb-10 mx-auto max-w-3xl">
          <li className="mb-3">Intuitive design easy to use for all skill levels.</li>
          <li className="mb-3">
            AI-enhanced features to help organize and optimize your ideas.</li>
          <li className="mb-3">Accessible from any device, anytime, anywhere.</li>
          <li className="mb-3">Secure and reliable with data encryption and cloud backups.</li>
        </ul>
        <h2 className="text-3xl md:text-4xl font-semibold mt-10 mb-6">Meet the Team</h2>
        <p className="text-lg mb-4">
          Our team is made up of passionate engineers, designers, and thinkers
          dedicated to improving the way people communicate and create together.
          We're constantly working to refine and expand the capabilities of
          Inkwise to meet the needs of our diverse user base.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <TeamMember name="Jacob Moses" id="13193750" avatar={avatar1} />
          <TeamMember name="Abrar Yusuf" id="14166755" avatar={avatar2} />
          <TeamMember name="Ahmed Khilji" id="13525643" avatar={avatar3} />
          <TeamMember name="Benjamin Bagala" id="13889466" avatar={avatar4} />
          <TeamMember name="Daniel Jacob" id="12938458" avatar={avatar5} />
          <TeamMember name="Osasere Eguaibor" id="13623549" avatar={avatar6} />
        </div>
        <Link to="https://github.com/jacobmoses10/2024SIS_Team18" target="_blank">
          <button className="bg-black text-white py-3 px-6 rounded-md mt-8 hover:bg-blue-600 transition">
            Learn More
          </button>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default About;