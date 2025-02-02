import { useState, useEffect } from "react";
import { FundWalletModal } from "./FundModal"

export default function WalletBalance() {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [walletData, setWalletData] = useState({
    balance: 0,
    virtualAccount: null,
    transactions: [],
  });
  const [showFundModal, setShowFundModal] = useState(false);

  // Fetch wallet data when component mounts
  useEffect(() => {
    fetchWalletData();
  }, []);

  // Function to fetch wallet data
  const fetchWalletData = async () => {
    try {
      const response = await fetch("/wallet/balance", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch wallet data");
      }

      const data = await response.json();
      setWalletData(data);
    } catch (error) {
      console.error("Failed to fetch wallet data:", error);
    }
  };

  // Function to handle wallet funding
  const handleFundWallet = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/wallet/fund", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to initiate funding");
      }

      const data = await response.json();
      // Redirect to Paystack checkout
      window.location.href = data.authorization_url;
    } catch (error) {
      console.error("Failed to initiate funding:", error);
    } finally {
      setIsLoading(false);
      setShowFundModal(false);
    }
  };

  return (
    <>
      {/* <div className="p-5 border bg-white/20 shadow-md rounded-md max-w-4xl flex flex-col md:flex-row items-start justify-between">
        <div className="flex flex-col items-start gap-4">
          <h2 className="text-lg font-semibold">Available Balance</h2>
          <div className="flex items-center text-2xl font-bold">
            <span className="mr-1">₦</span>0
          </div>
          <button className="px-4 py-2 bg-orange-500 text-white font-medium rounded hover:bg-orange-600 transition">
            Fund Wallet
          </button>
        </div>

        <div className="flex flex-col items-start gap-4">
          <h2 className="text-lg font-semibold">Your Virtual Account Number</h2>
          <div>
            <p className="font-medium">Account Number</p>
            <p className="text-gray-700">---</p>
          </div>
          <div>
            <p className="font-medium">Bank Name</p>
            <p className="text-gray-700">---</p>
          </div>
          <p className="text-sm text-orange-500">
            The bank account belongs to only you and payment made to it funds
            your wallet immediately.
          </p>
        </div>
      </div> */}

      <div className="p-5 border bg-white/20 shadow-md rounded-md max-w-4xl flex flex-col md:flex-row items-start justify-between">
        <div className="flex flex-col items-start gap-4">
          <h2 className="text-lg font-semibold">Available Balance</h2>
          <div className="flex items-center text-2xl font-bold">
            <span className="mr-1">₦</span>
            {walletData.balance.toLocaleString()}
          </div>
          <button
            onClick={() => setShowFundModal(true)}
            className="px-4 py-2 bg-orange-500 text-white font-medium rounded hover:bg-orange-600 transition"
          >
            Fund Wallet
          </button>
        </div>

        <div className="flex flex-col items-start gap-4">
          <h2 className="text-lg font-semibold">Your Virtual Account Number</h2>
          <div>
            <p className="font-medium">Account Number</p>
            <p className="text-gray-700">
              {walletData.virtualAccount?.accountNumber || "---"}
            </p>
          </div>
          <div>
            <p className="font-medium">Bank Name</p>
            <p className="text-gray-700">
              {walletData.virtualAccount?.bankName || "---"}
            </p>
          </div>
          <p className="text-sm text-orange-500">
            The bank account belongs to only you and payment made to it funds
            your wallet immediately.
          </p>
        </div>
      </div>

      {/* {showFundModal && (
        <FundModal
          amount={amount}
          setAmount={setAmount}
          isLoading={isLoading}
          handleFundWallet={handleFundWallet}
          setShowFundModal={setShowFundModal}
        />
      )} */}
        <FundWalletModal 
        isOpen={showFundModal} 
        onClose={() => setShowFundModal(false)}
      />
    </>
  );
}
