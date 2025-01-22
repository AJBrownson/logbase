import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { MdDashboard, MdShoppingBag, MdPeople, MdShoppingCart, MdAccountBalanceWallet } from 'react-icons/md';

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const userId = "user123";

  const menuItems = [
    { path: `/dashboard/${userId}`, icon: <MdDashboard className="w-6 h-6" />, title: 'Dashboard' },
    { path: `/dashboard/${userId}/products`, icon: <MdShoppingBag className="w-6 h-6" />, title: 'Products' },
    { path: `/dashboard/${userId}/buy-followers`, icon: <MdPeople className="w-6 h-6" />, title: 'Buy Followers' },
    { path: `/dashboard/${userId}/orders`, icon: <MdShoppingCart className="w-6 h-6" />, title: 'Orders' },
    { path: `/dashboard/${userId}/wallet`, icon: <MdAccountBalanceWallet className="w-6 h-6" />, title: 'Wallet' },

  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white h-full shadow-lg ${isOpen ? 'w-64' : 'w-20'} transition-width duration-300`}>
        <div className="p-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 w-full flex items-center justify-center"
          >
            <MdDashboard className={`w-6 h-6 ${!isOpen && 'mx-auto'}`} />
            {isOpen && <span className="ml-2">Logbase</span>}
          </button>
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center p-4 hover:bg-gray-100 ${
                location.pathname === item.path ? 'bg-gray-100' : ''
              }`}
            >
              {item.icon}
              {isOpen && <span className="ml-2">{item.title}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <h1 className="text-2xl font-semibold mb-6">
            {menuItems.find(item => item.path === location.pathname)?.title || 'Dashboard'}
          </h1>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;