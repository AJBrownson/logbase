import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutes = () => {
  const user = useSelector((state) => state.auth.user);

  return user ? <Outlet /> : <Navigate to="/loginSignUp" replace />;
};

export default ProtectedRoutes;
