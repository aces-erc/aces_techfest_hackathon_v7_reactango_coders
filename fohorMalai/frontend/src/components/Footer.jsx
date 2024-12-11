import { footerLinks } from "../links/footer";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 h-96 text-gray-300 py-8">
      <div className="container mx-auto flex flex-wrap items-center justify-evenly">
        {/* Logo Section */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0 md:text-left">
          <h1 className="text-5xl  font-samarkan font-extrabold text-gray-100">
            <span className="text-green-400">Fohor</span>Malai
          </h1>
          <p className="mt-2 text-gray-400">
            Turning waste into a valuable resource. Clean city, better future.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <h3 className="text-3xl text-center  font-bold text-gray-100 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-center">
            {footerLinks &&
              footerLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.link}
                    className=" text-xl hover:text-green-400 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
          </ul>
        </div>

        {/* Map Section */}
        <div className="w-full md:w-1/3 text-center md:text-right flex flex-col items-center">
          <h3 className="text-xl font-bold text-gray-100 mb-4">Our Location</h3>
          <div className="w-full h-32 bg-gray-700 flex items-center justify-center rounded-md">
            <p className="text-gray-400">Map Placeholder</p>
          </div>
          <p className="mt-2 text-gray-400">
            Find us here and let's work towards a cleaner environment.
          </p>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-8 border-t pt-4 text-center">
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} FohorMalai. All rights reserved.
        </p>
        <p className="mt-2">
          <Link to="" className="text-gray-400 hover:text-green-400">
            Terms & Conditions
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;