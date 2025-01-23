"use client";

import { useState } from 'react';


export default function WalletBalance() {
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

//   const handleFundWallet = async () => {
//     if (!amount || isNaN(parseFloat(amount))) {
//       toast({
//         title: 'Invalid amount',
//         description: 'Please enter a valid amount',
//         variant: 'destructive',
//       });
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const { data: { user } } = await supabase.auth.getUser();
//       if (!user) throw new Error('User not found');

//       // Create a transaction record
//       const { error: transactionError } = await supabase
//         .from('transactions')
//         .insert({
//           user_id: user.id,
//           amount: parseFloat(amount),
//           type: 'deposit',
//           status: 'completed',
//         });

//       if (transactionError) throw transactionError;

//       // Update user's wallet balance
//       const { error: updateError } = await supabase.rpc('increment_wallet_balance', {
//         user_id: user.id,
//         increment_amount: parseFloat(amount),
//       });

//       if (updateError) throw updateError;

//       toast({
//         title: 'Wallet funded successfully',
//         description: `$${amount} has been added to your wallet`,
//       });
//       setAmount('');
//     } catch (error) {
//       toast({
//         title: 'Error funding wallet',
//         description: 'Please try again later',
//         variant: 'destructive',
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

  return (
    <>
     {/* <div className="p-6 border bg-white/20 shadow-md rounded-md max-w-4xl">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
      
        <div className="flex flex-col items-start gap-4">
          <h2 className="text-lg font-semibold">Available Balance</h2>
          <div className="flex items-center text-2xl font-bold">
            <span className="mr-1">₦</span>0
          </div>
          <button className="px-4 py-2 bg-orange-500 text-white font-medium rounded hover:bg-orange-600 transition">
            Fund Wallet
          </button>
        </div>

      
        <div className="hidden md:block w-px h-20 bg-gray-300"></div>

   
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
      </div>
    </div> */}

    <div className="p-5 border bg-white/20 shadow-md rounded-md max-w-4xl flex flex-col md:flex-row items-start justify-between">
        
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
    </div>
    </>
  );
}