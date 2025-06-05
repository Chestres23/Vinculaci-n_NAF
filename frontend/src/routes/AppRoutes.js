// src/routes/AppRoutes.js
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/dashboard/Dashboard";
import Login from "../components/auth/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/*" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default AppRoutes;
