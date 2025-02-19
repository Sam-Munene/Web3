import { useState } from "react";
import { FaWallet } from "react-icons/fa";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="backdrop-blur-md text-lg mx-6 mt-3 rounded-full bg-gray-100/30 p-4 fixed w-[95%] top-0 z-10 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        
        {/* Logo & Branding */}
        <div className="flex items-center space-x-4">
          <FaWallet className="ml-4 w-10 h-10 text-orange-500" />
          <h4 className="text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-500">
            Web3
          </h4>
        </div>

        {/* Menu Items */}
        <ul className={`absolute md:static md:flex space-x-6 text-black md:text-white rounded-lg p-4 md:p-0 transition-all duration-300 ease-in-out 
          ${menuOpen ? "top-16 left-0 w-full bg-black/70 text-white py-4 text-center shadow-md" : "hidden"}`}>
        
          <li><a href="#transactions" className="block py-2 md:py-0 hover:text-gray-300">Transactions</a></li>
          <li><a href="#services" className="block py-2 md:py-0 hover:text-gray-300">Services</a></li>
          <li><a href="#about" className="block py-2 md:py-0 hover:text-gray-300">About</a></li>
          <li><a href="#contact" className="block py-2 md:py-0 hover:text-gray-300">Contact</a></li>


        </ul>

        <div>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="cursor-pointer md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
