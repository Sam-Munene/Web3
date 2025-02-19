import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import  About from "./components/About";
import Services from './components/Services';
import Footer from "./components/Footer";
import Transactions from './components/Transactions';
import { Toaster } from "react-hot-toast";
import Contact from './components/Contact';

function App() {

  const [selectedAccount, setSelectedAccount] = useState(null);
  return (
    <div className="min-h-screen bg-gray-900">

      <Toaster position="top-right" reverseOrder={false} />

      
      {/* Navbar Section */}
      <div className="h-4">
        <Navbar />
      </div>

      {/* Welcome Section */}
      <div className="container mx-auto px-4">
        <Welcome setSelectedAccount={setSelectedAccount} selectedAccount={selectedAccount} />
        <Transactions selectedAccount={selectedAccount} />
        <About />
        {/* <Services /> */}
        <Contact />
      
      </div>

      <div className='flex flex-col mt-10 mx-auto '>
        <Footer />
        
      </div>
    </div>
  );
}

export default App;
