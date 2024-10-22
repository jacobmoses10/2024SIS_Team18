import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="text-gray-500 py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Inkwise. All rights reserved.
        </p>
        <p className="text-sm mt-2">
          <Link to="/privacy" className="text-blue-500 hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;