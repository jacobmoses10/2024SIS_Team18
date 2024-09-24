import React from "react";

const About = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold mt-6 mb-4">About Whiteboard AI</h1>
        <p className="text-lg mb-4">
          Whiteboard AI is a cutting-edge digital workspace designed to empower
          creativity and collaboration among students, professionals, and anyone
          looking to enhance their brainstorming, note-taking, and artistic
          skills.
        </p>
        <p className="text-lg mb-4">
          Utilizing advanced AI technology, our whiteboard facilitates real-time
          idea generation, diagramming, and problem-solving. Users can draw,
          type, and instantly convert their thoughts into organized digital
          notes.
        </p>
        <p className="text-lg mb-4">
          Our mission is to make brainstorming and collaboration more intuitive
          and productive through technology. Whether you're a student organizing
          your study notes, a professional planning your next big project, or a
          team brainstorming new ideas, Whiteboard AI is the tool you need to
          bring your ideas to life.
        </p>
        <h2 className="text-3xl font-semibold mt-6 mb-4">Why Choose Us?</h2>
        <ul className="list-disc list-inside mb-6">
          <li>Intuitive design easy to use for all skill levels.</li>
          <li>
            AI-enhanced features to help organize and optimize your ideas.
          </li>
          <li>Accessible from any device, anytime, anywhere.</li>
          <li>Secure and reliable with data encryption and cloud backups.</li>
        </ul>
        <h2 className="text-3xl font-semibold mt-6 mb-4">Meet the Team</h2>
        <p className="text-lg mb-4">
          Our team is made up of passionate engineers, designers, and thinkers
          dedicated to improving the way people communicate and create together.
          We're constantly working to refine and expand the capabilities of
          Whiteboard AI to meet the needs of our diverse user base.
        </p>
        <button className="bg-black text-white py-2 px-4 rounded mt-4">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default About;
