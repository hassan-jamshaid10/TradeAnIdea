import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../src/Features/authSlice";

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, token } = useSelector((state) => state.auth);

  useEffect(() => {
    // If there's no token but the user is marked as authenticated, log them out
    if (!token && isAuthenticated) {
      dispatch(logout());
    }
  }, [token, isAuthenticated, dispatch]);

  // If the user is not authenticated or the token is missing, redirect to the login page
  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  // If the user is authenticated and the token is valid, render the protected component
  return children;
};

export default ProtectedRoute;
