import { useState, useEffect } from "react";
import { FaEthereum, FaWallet, FaUserCircle, FaPlus, FaUserPlus,FaCopy } from "react-icons/fa";
import { ethers } from "ethers";
import toast from "react-hot-toast";
import TransactionProgress from './TransactionProgress';


function Welcome({ setSelectedAccount, selectedAccount }) {
  const [accounts, setAccounts] = useState([]);
  const [balance, setBalance] = useState(null);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [recipient, setRecipient] = useState(""); // For recipient address input
  const [amount, setAmount] = useState(""); // For ETH amount input
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  


  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }
  }, []);


  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Address copied to clipboard!");

  };


  async function connectWallet() {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const userAccounts = await window.ethereum.request({ method: "eth_requestAccounts" });

        setAccounts(userAccounts);
        setSelectedAccount(userAccounts[0]);
        updateBalance(userAccounts[0], provider);
      } catch (error) {

       toast.error("Wallet connection failed:");

      }
    } else {
      toast.error("Please install MetaMask");

    }
  }

  async function updateBalance(account, provider) {
    if (!account) return;
    const balanceRaw = await provider.getBalance(account);
    setBalance(parseFloat(ethers.formatEther(balanceRaw)).toFixed(4));
  }

  function handleAccountsChanged(newAccounts) {
    setAccounts(newAccounts);
    if (newAccounts.length > 0) {
      setSelectedAccount(newAccounts[0]);
      updateBalance(newAccounts[0], new ethers.BrowserProvider(window.ethereum));
    } else {
      setSelectedAccount(null);
      setBalance(null);
    }
  }

  async function sendTransaction(event) {
    event.preventDefault(); // Prevent form reload

    if (!window.ethereum) {
      toast.error("Please install MetaMask");

      return;
    }
    
    if (!selectedAccount) {

      toast.error("Connect your wallet first!");

      return;
    }

    if (!recipient || !amount) {
      toast.error("Please enter recipient address and amount.");

      return;
    }

    if (recipient.toLowerCase() === selectedAccount.toLowerCase()) {
      setTransactionStatus("failed");
      setErrorMessage("You cannot send a transaction to your own address!");
      toast.error("You cannot send a transaction to your own address!");
      setRecipient("");
      setAmount("");

      return;
    }

    try {
      setIsSubmitting(true);
      setTransactionStatus("submitting");
      setErrorMessage("");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const tx = await signer.sendTransaction({
        to: recipient,
        value: ethers.parseEther(amount),
      });

      setTransactionStatus("on_the_way");

      // alert(`Transaction Sent! Tx Hash: ${tx.hash}`);

      // Wait for the transaction to be confirmed
      await tx.wait();

      setTransactionStatus("complete");
      toast.success("Your transaction is successful!");

      // alert("Transaction Confirmed!");
      setRecipient("");
      setAmount("");
      updateBalance(selectedAccount, provider);
      
    } catch (error) {

      setRecipient("");
      setAmount("");
      setTransactionStatus("failed");

        // Extract the error code
      const errorCode = error.code || error.info?.error?.code;
      
      // Define user-friendly messages for specific errors
      let errorMessage = "Transaction failed!";
      if (errorCode === "INSUFFICIENT_FUNDS") {
        errorMessage = "Insufficient funds! Please check your balance.";
      } else if (error.info?.error?.message) {
        errorMessage = error.info.error.message;
      }
      setErrorMessage(errorMessage);

      toast.error(errorMessage);


      console.error("Transaction failed:", error);
    }
    finally {
      setRecipient("");
      setAmount("");
      setIsSubmitting(false);
    }
  }



  return (
    <section className="flex flex-col md:flex-row b-2 items-center justify-between mx-6 mt-30 p-6 rounded-lg shadow-lg">
      <div className="md:w-3/5 text-center md:text-left flex flex-col items-start space-y-4">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-purple-500 animate-fade-in">
            Welcome to Web3
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
            Your gateway to decentralized applications, smart contracts, and secure transactions.
        </p>

        <p className="text-md text-gray-400 italic">
            Experience the future of finance, powered by blockchain.
        </p>

        <button className="hidden lg:block mt-4 px-6 py-3 bg-gradient-to-r from-orange-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:opacity-90 transition-all">
            Get Started Now!
        </button>
      </div>

      {/* Right Side - Wallet Section */}
      <div className="md:w-2/5 flex flex-col items-center space-y-6 mt-6 md:mt-0">
        {/* Connect Wallet Section */}
        <div className="w-80 h-40 bg-gradient-to-r from-orange-500 to-purple-600 rounded-xl shadow-lg p-4 text-white flex flex-col relative">
          <FaEthereum className="absolute top-3 left-3 w-8 h-8 opacity-90" />
          <div className="absolute top-3 right-3 w-8 h-8 cursor-pointer" onClick={() => setShowAccountMenu(!showAccountMenu)}>
            <FaUserCircle className="absolute top-3 right-3  w-8 h-8" />
            {accounts.length > 1 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{accounts.length}</span>
            )}
          </div>
          {showAccountMenu && (
            <div className="absolute top-12 z-12 right-3 bg-gray-900 text-white shadow-lg rounded-lg p-2 w-48">
              {accounts.map((acc) => (
                <div
                  key={acc}
                  className={`p-1 cursor-pointer rounded ${selectedAccount === acc ? 'bg-purple-500' : 'hover:bg-gray-700'}`}
                  onClick={() => {
                    setSelectedAccount(acc);
                    updateBalance(acc, new ethers.BrowserProvider(window.ethereum));
                    setShowAccountMenu(false);
                  }}
                >
                  {acc.slice(0, 6)}...{acc.slice(-4)}
                </div>
              ))}
            </div>
          )}

          {selectedAccount ? (
            <>
              <div className="flex flex-1 items-center justify-center">
                <FaWallet className="mr-4 w-9 h-9" />
                <p className="text-2xl font-semibold">{balance} ETH</p>
              </div>
              <div className="absolute bottom-3 left-3 flex items-center space-x-3">
              <p className="text-sm bg-black/30 px-8 py-1 rounded-lg flex items-center">
                {selectedAccount.slice(0, 6)}...{selectedAccount.slice(-4)}
                <FaCopy className="ml-2 cursor-pointer hover:text-gray-300" onClick={() => copyToClipboard(selectedAccount)} />
              </p>
              </div>
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <button onClick={connectWallet} className="flex items-center space-x-2 px-6 py-2 bg-black/40 rounded-lg hover:bg-black/50 transition-all">
                <FaPlus className="w-5 h-5" />
                <span>Connect Wallet</span>
              </button>
            </div>
          )}
        </div>

        {/* Send ETH Form */}
        <div className="w-80 h-auto p-6 border-gray-700 border-2 bg-gray-800 rounded-2xl shadow-lg text-white mt-2">
          <p className="text-xl font-semibold text-center mb-4">Transfer ETH</p>

          <form className="space-y-4" onSubmit={sendTransaction}>
            {/* Wallet Address Input */}
            <div>
              <label className="text-sm text-gray-400">Recipient Address</label>
              <input 
                type="text" 
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="0x123...abcd" 
                className="w-full mt-1 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            {/* Amount Input */}
            <div>
              <label className="text-sm text-gray-400">Amount (ETH)</label>
              <input 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00" 
                className="w-full mt-1 p-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>

            <TransactionProgress
              transactionStatus={transactionStatus}
              errorMessage={errorMessage}
              clearStatus={() => setTransactionStatus("")}
            />

            {/* Submit Button */}
            <button type="submit" className="cursor-pointer w-full py-3 mt-2 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full font-semibold hover:opacity-90 transition-all flex justify-center items-center" disabled={isSubmitting}>
              {isSubmitting ? <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div> : "Send ETH"}
            </button>
          </form>
        </div>

        
      </div>

    </section>

    
  );
}

export default Welcome;
