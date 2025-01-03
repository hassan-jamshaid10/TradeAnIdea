import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../../../Features/authSlice"; // Ensure correct path to authSlice
import "./ForgotPasswordForm.css";

const ResetPasswordForm = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [token, setToken] = useState(null); // To store the token
  const [loading, setLoading] = useState(false); // Loading state to prevent multiple clicks
  const [showNotification, setShowNotification] = useState(false); // State for showing notification
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation(); // Use useLocation to access the URL query params

  // Extract token from the query string when the component mounts
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const tokenFromUrl = queryParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setErrorMessage("Invalid or missing token.");
    }
  }, [location]);

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure passwords match
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    // Ensure password is at least 8 characters long
    if (newPassword.length < 8) {
      setErrorMessage("Password should be at least 8 characters long.");
      return;
    }

    if (!token) {
      setErrorMessage("Token is missing or invalid.");
      return;
    }

    try {
      // Set loading state to true to prevent further clicks
      setLoading(true);

      // Prepare the payload with the token, newPassword, and confirmPassword
      const passwordData = {
        token: token,        // Get token from URL
        newPassword,        // User's new password
        confirmPassword,    // User's password confirmation
      };

      // Dispatch the resetPassword action
      const response = await dispatch(resetPassword(passwordData));

      // Check if the response contains a message and handle success
      if (response?.message) {
        // Display success message and reset the form fields
        setSuccessMessage(response.message);
        setErrorMessage(""); // Clear any error if reset is successful

        // Show success notification
        setShowNotification(true);

        // Clear the form fields after a successful reset
        setNewPassword("");
        setConfirmPassword("");

        // Redirect to login after the reset is complete
        setTimeout(() => {
          navigate("/login");
        }, 2000); // You can adjust the timeout to your preference
      }
    } catch (error) {
      setSuccessMessage(""); // Clear any success message
      setErrorMessage("An error occurred during the password reset process.");
      console.error("Error during password reset:", error);
    } finally {
      // Reset loading state after the request is complete
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-card">
      <h1 className="forgot-password-title">Reset Password</h1>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            required
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder="Enter new password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            required
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm your new password"
          />
        </div>

        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button 
          type="submit" 
          className="reset-password-button" 
          disabled={loading} // Disable the button when loading
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      {/* Notification Popup */}
      {showNotification && (
        <div className="notification-popup">
          <p>{successMessage}</p> {/* Use the message from the response */}
        </div>
      )}
    </div>
  );
};

export default ResetPasswordForm;
