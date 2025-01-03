import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../Features/authSlice"; // Ensure correct path to authSlice
import "./ForgotPasswordForm.css";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // For success message
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email input
    if (!email) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    try {
      // Dispatch forgotPassword action with email
      const response = await dispatch(forgotPassword(email));

      // Check if response contains success message
      if (response?.message) {
        setSuccessMessage(response.message); // Show success message
        setErrorMessage(""); // Clear error message

        // Redirect to login page immediately after success
        navigate("/login");
      }
    } catch (error) {
      // Handle error case
      setSuccessMessage(""); // Clear success message if error occurs
      setErrorMessage("An error occurred while requesting the password reset.");
      console.error("Error during forgot password request:", error);
    }
  };

  return (
    <div className="forgot-password-card">
      <h1 className="forgot-password-title">Forgot Password</h1>
      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">E-Mail</label>
          <input
            required
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
          />
        </div>

        {/* Display error message */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        
        {/* Display success message */}
        {successMessage && <p className="success-message">{successMessage}</p>}

        {/* Submit Button */}
        <button type="submit" className="reset-password-button">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
