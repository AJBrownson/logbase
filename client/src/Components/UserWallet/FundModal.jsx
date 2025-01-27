import { useState } from "react";

export function FundWalletModal({ isOpen, onClose }) {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle wallet funding
  const handleFundWallet = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/wallet/fund', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: parseFloat(amount),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to initiate funding');
      }

      const data = await response.json();
      // Redirect to Paystack checkout
      window.location.href = data.authorization_url;
    } catch (error) {
      console.error('Failed to initiate funding:', error);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  // If modal is not open, don't render anything
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4">Fund Your Wallet</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter Amount (₦)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-orange-500"
            placeholder="Enter amount"
            min="100"
            // Adding autoFocus to automatically focus the input when modal opens
            autoFocus
          />
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleFundWallet}
            disabled={isLoading || !amount || amount < 100}
            className="px-4 py-2 bg-orange-500 text-white font-medium rounded hover:bg-orange-600 transition disabled:bg-orange-300"
          >
            {isLoading ? "Processing..." : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
}