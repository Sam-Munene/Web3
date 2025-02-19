import { FaShieldAlt, FaMoneyBillWave, FaBolt, FaWallet , FaAward} from "react-icons/fa";

function About() {
  return (
    <section id="about" className="flex flex-col md:flex-row items-center justify-between mx-6 mt-20 p-6 bg-gray-800 rounded-lg shadow-lg">
      
      {/* Left Side - Image */}
      <div className="md:w-1/2 flex justify-center">
       <FaAward className="rounded-lg shadow-md w-30 h-30 text-orange-500" />
      </div>

      {/* Right Side - Text */}
      <div className="md:w-1/2 text-center md:text-left mt-6 md:mt-0">
        <h2 className="text-4xl font-bold text-gray-800">About Us</h2>
        <p className="mt-4 text-white text-2xl">
          We provide secure and efficient Web3 decentralized solutions to empower users globally.
        </p>
        <button className="hidden md:block mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all">
          Learn More
        </button>
      </div>

    </section>
  );
}



export default About ;
