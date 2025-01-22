import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { MdDashboard, MdShoppingBag, MdVerifiedUser, MdShoppingCart, MdWallet } from 'react-icons/md';

const DashboardLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();

  const menuItems = [
    { path: '/user/dashboard', icon: <MdDashboard size={20} />, title: 'Dashboard' },
    { path: '/user/dashboard/products', icon: <MdShoppingBag size={20} />, title: 'Products' },
    { path: '/user/dashboard/followers', icon: <MdVerifiedUser size={20} />, title: 'Buy Followers' },
    { path: '/user/dashboard/orders', icon: <MdShoppingCart size={20} />, title: 'Orders' },
    { path: '/user/dashboard/wallet', icon: <MdWallet size={20} />, title: 'Wallet' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300`}>
        <div className="h-20 flex items-center justify-between px-4">
          <h2 className={`text-xl font-semibold ${!isOpen && 'hidden'}`}>Dashboard</h2>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        
        <nav className="mt-8">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-3 ${
                location.pathname === item.path ? 'bg-blue-50 text-blue-600' : 'text-gray-600'
              } hover:bg-blue-50 hover:text-blue-600 transition-colors`}
            >
              <span className="inline-block">{item.icon}</span>
              <span className={`ml-4 ${!isOpen && 'hidden'}`}>{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-x-hidden overflow-y-auto">
        <header className="bg-white shadow-sm">
          <div className="h-20 px-6 flex items-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              {menuItems.find(item => item.path === location.pathname)?.title || 'Dashboard'}
            </h1>
          </div>
        </header>
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
