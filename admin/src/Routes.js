import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./Hooks/ProtectedRoute";
import Home from "./Pages/Home/Home";
import Users from "./Pages/Users/Users";
import Settings from "./Pages/Settings";

const Routess = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Users />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routess;
