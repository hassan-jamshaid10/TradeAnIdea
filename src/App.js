import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Pages/Home/Header";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Authentication/Login";
import SignUp from "./Pages/Authentication/SignUp";
import ForgotPassword from "./Pages/Authentication/ForgotPassword";
import About from "./Pages/Home/About";
import Services from "./Pages/Home/Services";
// import List from "./Pages/Home/List";
import IdeaForm from "./Pages/Home/IdeaForm";
import All from "./Pages/Home/All";
import Detail from "./Pages/Home/Detail";
import Option from "./Pages/Home/Option";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Footer from "./Pages/Home/Footer";
import Profile from "./Pages/Home/Profile";
import OTPValidation from './components/AuthenticationForms/LoginForm/Otp';

import { useSelector } from "react-redux";
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component

import './App.css';
import ResetPasswordForm from './components/AuthenticationForms/ForgotPasswordForm/ResetPassword';
import ResetPassword from './Pages/Authentication/ResetPassword';
import OTPPage from './Pages/Authentication/OTPPage';

function App() {
  return (
    <>
      <Router>
        {/* <Header /> */}
        <main>
          <Routes>
          <Route path="/forgot" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/validate-otp" element={<ProtectedRoute><OTPPage/></ProtectedRoute>} />
            <Route path="/signUp" element={<SignUp />} />

            
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/all" element={<All />} />

            {/* Protected Routes */}
            <Route path="/form" element={<ProtectedRoute><IdeaForm /></ProtectedRoute>} />
            <Route path="/detail/:id" element={<ProtectedRoute><Detail /></ProtectedRoute>} />
            <Route path="/option" element={<ProtectedRoute><Option /></ProtectedRoute>} />
          </Routes>
        </main>
        {/* <Footer /> */}
      </Router>
    </>
  );
}

export default App;
