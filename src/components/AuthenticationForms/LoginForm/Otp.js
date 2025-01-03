import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateOTP } from "../../../Features/authSlice";  // Ensure correct path to authSlice
import "./LoginForm.css";  // Using the same CSS as provided

const OTPValidation = () => {
  const [otp, setOtp] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Access token and OTP expiration time from Redux store (after login)
  const token = useSelector((state) => state.auth.token);  // Access token from Redux store
  const otpExpiration = useSelector((state) => state.auth.otpExpiration);  // Access OTP expiration from Redux
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Log OTP expiration to ensure it's fetched correctly from Redux
  console.log("OTP Expiration time from Redux store:", otpExpiration);

  // Check if OTP has expired
  useEffect(() => {
    if (otpExpiration && new Date(otpExpiration) < new Date()) {
      setErrorMessage("OTP has expired. Please request a new OTP.");
    }
  }, [otpExpiration]);

  const handleOTPChange = (e) => {
    setOtp(e.target.value);
  };

  const handleValidateOTP = async () => {
    if (!otp) {
      setErrorMessage("OTP is required!");
      return;
    }

    if (otpExpiration && new Date(otpExpiration) < new Date()) {
      setErrorMessage("OTP has expired. Please request a new OTP.");
      return;
    }

    // Ensure the payload only contains the OTP entered by the user
    const payload = {
      otp: otp, // OTP entered by the user
    };

    try {
      // Dispatch action to validate OTP (Authorization token will be automatically included in the headers via getState)
      const response = await dispatch(validateOTP(payload)).unwrap();

      if (response && response.token) {
        // If OTP validation is successful, navigate to the options page
        navigate("/option");
      } else {
        // Handle unexpected response structure
        setErrorMessage("Unexpected response from the server.");
      }
    } catch (error) {
      // Handle OTP validation errors
      console.error("OTP validation failed:", error);
      setErrorMessage(error.message || "OTP validation failed. Please try again.");
    }
  };

  return (
    <div className="login-card">
      <h2 className="login-header">Validate OTP</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="otp">OTP</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={handleOTPChange}
            placeholder="Enter the OTP sent to your email"
            required
          />
        </div>
        <button
          type="button"
          className="login-button"
          onClick={handleValidateOTP}
        >
          Validate OTP
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </form>
    </div>
  );
};

export default OTPValidation;
