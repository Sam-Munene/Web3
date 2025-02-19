import { FaTwitter, FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa";

function Footer() {
  return (
    <footer className=" bg-gradient-to-r from-gray-900 to-gray-800 text-white py-10 px-6 mt-20">
      
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left">
        
        {/* Brand Section */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-2xl font-bold">Web3 Defi</h2>
          <p className="text-sm text-gray-400 mt-2">Bringing decentralized finance to everyone.</p>
        </div>

        {/* Quick Links */}
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="mt-2 space-y-2 text-gray-300">
            <li><a href="#" className="hover:text-orange-400">Home</a></li>
            <li><a href="#" className="hover:text-orange-400">About</a></li>
            <li><a href="#" className="hover:text-orange-400">Services</a></li>
            <li><a href="#" className="hover:text-orange-400">Contact</a></li>
          </ul>
        </div>

 
        {/* Social Media Icons */}
        <div>
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex space-x-4 mt-2">
            <a href="#" className="hover:text-orange-400"><FaTwitter className="w-6 h-6" /></a>
            <a href="#" className="hover:text-orange-400"><FaGithub className="w-6 h-6" /></a>
            <a href="#" className="hover:text-orange-400"><FaLinkedin className="w-6 h-6" /></a>
            <a href="#" className="hover:text-orange-400"><FaDiscord className="w-6 h-6" /></a>
          </div>
        </div>

      </div>

      {/* Bottom Text */}
      <div className="text-center text-gray-500 text-sm mt-8 border-t border-gray-700 pt-4">
        &copy; {new Date().getFullYear()} Web3 Defi. All rights reserved.
      </div>

    </footer>
  );
}

export default Footer;
