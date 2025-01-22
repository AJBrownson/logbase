import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./App.css";

import { Toaster } from "react-hot-toast";
import Footer from "../src/Components/Footer/Footer";
import Header from "../src/Components/Header/Navbar";
import Contact from "../src/Pages/Contact";
import Home from "../src/Pages/Home";
import Shop from "../src/Pages/Shop";
import ResetPass from "./Components/Authentication/Reset/ResetPass";
import VerifyPage from "./Components/Authentication/Verify/VerifyPage";
// import Popup from "./Components/PopupBanner/Popup";
import ScrollToTop from "./Components/ScrollButton/ScrollToTop";
import ShoppingCart from "./Components/ShoppingCart/ShoppingCart";
import Authentication from "./Pages/Authentication";
import NotFound from "./Pages/NotFound";
import ProductDetails from "./Pages/ProductDetails";
import TermsConditions from "./Pages/TermsConditions";
import DashboardLayout from "./Pages/DashboardLayout"
import AvailableProducts from "./Components/Dashboard/AvailableProducts";
import Dashboard from "./Pages/Dashboard";




const App = () => {
  return (
    <>
      {/* <Popup /> */}
      <ScrollToTop />
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verify-email/:token" element={<VerifyPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="user" element={<DashboardLayout />}>

          <Route path="dashboard" element={<Dashboard />} />
            <Route path="products" element={<AvailableProducts />} />
            <Route path="buy-followers" element={<AvailableProducts />} />
            <Route path="orders" element={<AvailableProducts />} />
            <Route path="wallet" element={<AvailableProducts />} />
          </Route>

          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/loginSignUp" element={<Authentication />} />
          <Route path="/resetPassword" element={<ResetPass />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <Footer /> */}
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;
