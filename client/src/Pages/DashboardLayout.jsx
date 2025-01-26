import React, { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Features/Auth/authSlice"; // Import the logout action
import {
  MdDashboard,
  MdShoppingBag,
  MdPeople,
  MdShoppingCart,
  MdAccountBalanceWallet,
  MdExitToApp,
} from "react-icons/md";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the user's data from the Redux store
  const user = useSelector((state) => state.auth.user);

  const menuItems = [
    { path: `/dashboard/overview`, icon: <MdDashboard className="w-6 h-6" />, title: "Dashboard" },
    { path: `/dashboard/products`, icon: <MdShoppingBag className="w-6 h-6" />, title: "Products" },
    { path: `/dashboard/buy-followers`, icon: <MdPeople className="w-6 h-6" />, title: "Buy Followers" },
    { path: `/dashboard/orders`, icon: <MdShoppingCart className="w-6 h-6" />, title: "Orders" },
    { path: `/dashboard/wallet`, icon: <MdAccountBalanceWallet className="w-6 h-6" />, title: "Wallet" },
  ];

  // Handle Logout
  const handleLogout = () => {
    dispatch(logout()); // Dispatch the logout action
    navigate("/login"); // Redirect to the login page
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white h-full shadow-lg ${isOpen ? "w-64" : "w-20"} transition-width duration-300`}>
        <div className="p-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 w-full flex items-center justify-center"
          >
            <MdDashboard className={`w-6 h-6 ${!isOpen && "mx-auto"}`} />
            {isOpen && <span className="ml-2">Logbase</span>}
          </button>
        </div>

        {/* User Information */}
        {isOpen && user && (
          <div className="p-4 bg-gray-50 rounded-lg shadow mt-4">
            <h3 className="text-sm font-semibold text-gray-700">Welcome,</h3>
            <p className="text-gray-600">{user.name}</p>
            <p className="text-gray-500 text-xs">{user.email}</p>
          </div>
        )}

        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center p-4 hover:bg-gray-100 ${
                location.pathname === item.path ? "bg-gray-100" : ""
              }`}
            >
              {item.icon}
              {isOpen && <span className="ml-2">{item.title}</span>}
            </Link>
          ))}
        </nav>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-auto p-4 w-full flex items-center hover:bg-gray-100"
        >
          <MdExitToApp className="w-6 h-6" />
          {isOpen && <span className="ml-2">Logout</span>}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-2xl font-semibold mb-6">
            {menuItems.find((item) => item.path === location.pathname)?.title || "Dashboard"}
          </h1>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
