import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./temp/Login.jsx";
import Register from "./temp/Register.jsx";
import CitizenPortal from "./temp/CitizenPortal.jsx";
import AuthorityDashboard from "./temp/AuthorityDashboard.jsx";
import AdminDashboard from "./temp/AdminDashboard.jsx";
import Home from "./temp/Home/Home";
import ContactUs from "./temp/home/ContactUs";
import PageLoader from "./components/PageLoader";
import RegisterSuccess from "./temp/RegisterSuccess";
import AdminLogout from "./temp/AdminLogout";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/citizen" element={<CitizenPortal />} />
        <Route path="/authority" element={<AuthorityDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/register-success" element={<RegisterSuccess />} />
        <Route path="/admin/logout" element={<AdminLogout darkMode={true} />} />
        <Route path="/forgot-password"element={<ForgotPassword />}/>
        <Route path="/verify-email"element={<VerifyEmail />}/>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />      
      </Routes>
    </BrowserRouter>
  );
}

export default App;