import { useEffect } from "react";

const TransactionProgress = ({ transactionStatus, errorMessage, clearStatus }) => {
  useEffect(() => {
    if (transactionStatus && (transactionStatus === "complete" || transactionStatus === "failed")) {
      const timer = setTimeout(() => {
        clearStatus();
      }, 5000);
      
      return () => clearTimeout(timer); // Cleanup function to reset the timer
    }
  }, [transactionStatus]);

  if (!transactionStatus) return null; // Don't render if there's no status

  return (
    <div className="mt-4">
      <div className={`h-2.5 rounded-full transition-all
        ${transactionStatus === "submitting" ? "bg-orange-500 w-1/3" : 
          transactionStatus === "on_the_way" ? "bg-purple-500 w-2/3" : 
          transactionStatus === "complete" ? "bg-green-500 w-full" : 
          transactionStatus === "failed" ? "bg-red-500 w-full" : "bg-transparent"}`}>
      </div>
      <p className="text-center text-sm text-gray-400 mt-2">
        {transactionStatus === "submitting" && "Submitting..."}
        {transactionStatus === "on_the_way" && "On the way..."}
        {transactionStatus === "complete" && "Transaction Complete ✅"}
        {transactionStatus === "failed" && errorMessage}
      </p>
    </div>
  );
};

export default TransactionProgress;
