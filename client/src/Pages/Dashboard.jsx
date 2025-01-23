import AvailableProducts from ".././Components/Dashboard/AvailableProducts"
import WalletBalance from "../Components/UserWallet/Wallet";

export default function Dashboard() {
  
  return (
    <>
    <WalletBalance />

    <div>
      <h1 className="text-2xl font-semibold mt-8 mb-5">Available Products</h1>
     <AvailableProducts />
     </div>
    </>
  );
}
