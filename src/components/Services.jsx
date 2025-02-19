import { FaShieldAlt, FaMoneyBillWave, FaBolt, FaWallet , FaAward} from "react-icons/fa";

function Services() {
    return (
      <section id="services" className="mx-6 mt-20 p-6 bg-gray-800 border-2 border-gray-700 rounded-lg shadow-lg">
        <h2 className="text-4xl font-bold text-center text-gray-800">Our Services</h2>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Service 1 - Secure Transactions */}
          <div className="p-6 bg-gradient-to-r from-orange-500 to-purple-600 rounded-xl shadow-lg text-white flex flex-col items-center text-center">
            <FaShieldAlt className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold">Secure Transactions</h3>
            <p className="mt-2 text-sm">Your transactions are protected with blockchain security.</p>
          </div>
  
          {/* Service 2 - Low Fees */}
          <div className="p-6 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl shadow-lg text-white flex flex-col items-center text-center">
            <FaMoneyBillWave className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold">Low Fees</h3>
            <p className="mt-2 text-sm">Enjoy minimal transaction costs with decentralized finance.</p>
          </div>
  
          {/* Service 3 - Fast Transfers */}
          <div className="p-6 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl shadow-lg text-white flex flex-col items-center text-center">
            <FaBolt className="w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold">Fast Transfers</h3>
            <p className="mt-2 text-sm">Experience lightning-fast crypto transactions worldwide.</p>
          </div>
  
        </div>
      </section>
    );
  }

export default Services;