import { useEffect, useState } from "react";
import { ethers } from "ethers";

function Transactions({ selectedAccount }) {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedAccount) {
      fetchTransactions(selectedAccount);
    }
  }, [selectedAccount]);

  const fetchTransactions = async (userAddress) => {
    if (!userAddress) return;

    setLoading(true);
    try {
      const apiKey = "NB9SVQX2THEN1BN8DG8RFKCFB2R6WNKERY";
      const network = "sepolia";

      const response = await fetch(
        `https://api-${network}.etherscan.io/api?module=account&action=txlist&address=${userAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`
      );
      const data = await response.json();

      if (data.status === "1") {
        setTransactions(data.result);
      } else {
        console.error("Error fetching transactions:", data.message);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="transactions" className="w-full p-6 border-gray-700 border-2 bg-gray-800 rounded-2xl shadow-lg text-white mt-6">
      <h2 className="text-xl font-semibold text-center mb-4">Transaction History</h2>
      {loading ? (
        <p className="text-center text-gray-400">Loading transactions...</p>
      ) : transactions.length > 0 ? (
        <ul className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 p-2">
          {transactions.map((tx, index) => (
            <li key={index} className="p-4 bg-gray-700 rounded-lg text-sm shadow-md hover:bg-gray-600 transition duration-300">
              <p className="text-green-400 font-semibold">To: <span className="text-white">{tx.to}</span></p>
              <p className="text-yellow-400 font-semibold">Amount: <span className="text-white">{ethers.formatEther(tx.value)} ETH</span></p>
              <p className="text-blue-400 font-semibold">Hash: <a href={`https://sepolia.etherscan.io/tx/${tx.hash}`} target="_blank" rel="noopener noreferrer" className="underline">View</a></p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-400">No transactions found.</p>
      )}
    </section>
  );
}

export default Transactions;
