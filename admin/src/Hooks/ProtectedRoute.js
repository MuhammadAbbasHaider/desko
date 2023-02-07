import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext();

  if (!user) return <Navigate to={"/login"} />;

  return <>{children}</>;
};

export default ProtectedRoute;
