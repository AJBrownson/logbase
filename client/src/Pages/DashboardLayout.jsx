import React, { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../Features/Auth/authSlice";
import {
  MdDashboard,
  MdShoppingBag,
  MdAccountBalanceWallet,
  MdExitToApp,
  MdMenu,
  MdClose,
} from "react-icons/md";
import WhatsAppChat from "../Components/WhatsAppButton/WhatsAppButton";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const menuItems = [
    { path: `/dashboard/overview`, icon: <MdDashboard className="w-6 h-6" />, title: "Dashboard" },
    { path: `/dashboard/products`, icon: <MdShoppingBag className="w-6 h-6" />, title: "Products" },
    // { path: `/dashboard/buy-followers`, icon: <MdPeople className="w-6 h-6" />, title: "Buy Followers" },
    {
      icon: <MdAccountBalanceWallet className="w-6 h-6" />,
      title: (
        <span className="flex items-center">
          Wallet
          <span className="ml-2 px-2 py-1 text-xs font-semibold bg-[#25D366] text-black rounded-md">
            Coming Soon
          </span>
        </span>
      ),
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/loginSignUp");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity md:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-50 bg-white h-full shadow-lg w-64 transition-transform md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:w-64`}
      >
        {/* Logo */}
        <div className="p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#25D366]">Logsbase</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
          >
            <MdClose className="w-6 h-6" />
          </button>
        </div>

        {/* User Information */}
        {user && (
          <div className="p-4 bg-gray-50 rounded-lg shadow">
            <h3 className="text-sm font-semibold text-gray-700">Welcome, {user.name}</h3>
            <p className="text-gray-500 text-xs">{user.email}</p>
          </div>
        )}

        <nav className="mt-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center p-4 hover:bg-gray-100 ${
                location.pathname === item.path ? "bg-gray-100" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span className="ml-2">{item.title}</span>
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-auto p-4 w-full flex items-center hover:bg-gray-100"
        >
          <MdExitToApp className="w-6 h-6" />
          <span className="ml-2">Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          {/* Mobile Header */}
          <div className="flex items-center justify-between md:hidden mb-4">
            <h2 className="text-xl font-bold text-gray-800">Logsbase</h2>
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <MdMenu className="w-6 h-6" />
            </button>
          </div>

          <h1 className="text-2xl font-semibold mb-6">
            {menuItems.find((item) => item.path === location.pathname)?.title || "Dashboard"}
          </h1>

          <Outlet />
        </div>

        <WhatsAppChat />
      </div>
    </div>
  );
};

export default DashboardLayout;



// import React, { useState } from "react";
// import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../Features/Auth/authSlice";
// import {
//   MdDashboard,
//   MdShoppingBag,
//   MdPeople,
//   MdShoppingCart,
//   MdAccountBalanceWallet,
//   MdExitToApp,
//   MdMenu,
//   MdClose,
// } from "react-icons/md";

// const DashboardLayout = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Get the user's data from the Redux store
//   const user = useSelector((state) => state.auth.user);

//   const menuItems = [
//     { path: `/dashboard/overview`, icon: <MdDashboard className="w-6 h-6" />, title: "Dashboard" },
//     { path: `/dashboard/products`, icon: <MdShoppingBag className="w-6 h-6" />, title: "Products" },
//     { path: `/dashboard/buy-followers`, icon: <MdPeople className="w-6 h-6" />, title: "Buy Followers" },
//     // { path: `/dashboard/orders`, icon: <MdShoppingCart className="w-6 h-6" />, title: "Orders" },
//     // { path: `/dashboard/wallet`, icon: <MdAccountBalanceWallet className="w-6 h-6" />, title: "Wallet" },
//     {
//       // path: `/dashboard/wallet`,
//       icon: <MdAccountBalanceWallet className="w-6 h-6" />,
//       title: (
//         <span className="flex items-center">
//           Wallet
//           <span className="ml-2 px-2 py-1 text-xs font-semibold bg-[#25D366] text-black rounded-md">
//             Coming Soon
//           </span>
//         </span>
//       ),
//     },
//   ];

//   // Handle Logout
//   const handleLogout = () => {
//     dispatch(logout()); // Dispatch the logout action
//     navigate("/loginSignUp"); // Redirect to the login page
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Sidebar */}
//       <div className={`bg-white h-full shadow-lg ${isOpen ? "w-64" : "w-20"} transition-width duration-300`}>
//         <div className="p-4">
//           <button
//             onClick={() => setIsOpen(!isOpen)}
//             className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 w-full flex items-center justify-center"
//           >
//             {isOpen ? <MdClose className="w-6 h-6" /> : <MdMenu className="w-6 h-6" />}
//             {/* {isOpen && <span className="ml-2">Logbase</span>} */}
//           </button>
//         </div>

//         {/* User Information */}
//         {isOpen && user && (
//           <div className="p-4 bg-gray-50 rounded-lg shadow">
//             <h3 className="text-sm font-semibold text-gray-700">Welcome, {user.name}</h3>
//             <p className="text-gray-500 text-xs">{user.email}</p>
//           </div>
//         )}

//         <nav className="mt-4">
//           {menuItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`flex items-center p-4 hover:bg-gray-100 ${
//                 location.pathname === item.path ? "bg-gray-100" : ""
//               }`}
//             >
//               {item.icon}
//               {isOpen && <span className="ml-2">{item.title}</span>}
//             </Link>
//           ))}
//         </nav>


//         <button
//           onClick={handleLogout}
//           className="mt-auto p-4 w-full flex items-center hover:bg-gray-100"
//         >
//           <MdExitToApp className="w-6 h-6" />
//           {isOpen && <span className="ml-2">Logout</span>}
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-auto">
//         <div className="p-8">
//           <h1 className="text-2xl font-semibold mb-6">
//             {menuItems.find((item) => item.path === location.pathname)?.title || "Dashboard"}
//           </h1>
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;
