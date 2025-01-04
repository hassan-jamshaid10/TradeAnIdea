import React, { useState, useEffect } from "react";
import "./SignUpForm.css";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../../Features/authSlice"; // Ensure correct path to authSlice
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { status, error } = useSelector((state) => state.auth);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleNameChange = (e) => {
    setName(e.target.value);
    setErrorMessage(""); // Clear error message when user changes input
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage(""); // Clear error message when user changes input
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage(""); // Clear error message when user changes input
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setErrorMessage(""); // Clear error message when user changes input
  };

  const handleSubmit = async () => {
    if (!name || !email || !password) {
      setErrorMessage("Kindly fill all the fields");
      return;
    }

    // Ensure the email ends with @gmail.com
    if (!email.endsWith('@gmail.com')) {
      setErrorMessage("Please enter a valid Gmail address");
      return;
    }
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
      );
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Prepare the user data with confirmPassword
    const userData = { name, email, password, confirmPassword };

    console.log("Dispatching signup with user data:", userData); // Log user data

    try {
      // Dispatch signup action
      const action = await dispatch(signup(userData));
      console.log("Signup action response:", action); // Log the response from the action

      // Check if signup was successful and redirect to login page
      if (action.type === "auth/signup/fulfilled") {
        console.log("Signup successful, redirecting to login page...");
        navigate("/login");
      } else {
        // If there's an error, display the error message from the state
        setErrorMessage(error || "Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setErrorMessage("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="signup-card">
      <h1 className="signup-title">Sign Up</h1>
      <form className="signup-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Set Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Set a password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm your password"
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button
          type="button"
          className="signup-button"
          onClick={handleSubmit}
          disabled={status === 'loading'} // Disable the button when signup is in progress
        >
          {status === 'loading' ? "Signing Up..." : "Sign Up"}
        </button>
        <p className="already-account">
          Already have an account?{" "}
          <a href="/login" className="login-link">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignUpForm;
