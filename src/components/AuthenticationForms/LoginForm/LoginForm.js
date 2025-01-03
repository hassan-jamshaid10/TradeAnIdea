// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import "./LoginForm.css";

// const LoginForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//   };

//   const navigate = useNavigate();
//   const HandleClick = () => {
//     // if (!email.endsWith("@gmail.com")) {
//     //   setErrorMessage("Email must end with @gmail.com");
//     //   return;
//     // }
//     if (!email || !password) {
//       setErrorMessage("E-mail and password both should be filled!");
//       return;
//     }
//     if (!passwordRegex.test(password)) {
//       setErrorMessage(
//         "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"
//       );
//       return;
//     }
//     localStorage.setItem("authToken","gdht");
//     navigate("/option");
//   };

//   return (
//     <div className="login-card">
//       <h2 className="login-header">Login</h2>
//       <form className="login-form">
//         <div className="form-group">
//           <label htmlFor="email">E-Mail</label>
//           <input
//             type="email"
//             id="email"
//             value={email}
//             onChange={handleEmailChange}
//             placeholder="Enter your email"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={handlePasswordChange}
//             placeholder="Enter your password"
//             required
//           />
//         </div>
//         <Link to="/forgot" className="forgot-link">Forgot Password?</Link>
//         <button type="button" className="login-button" onClick={HandleClick}>
//           Login
//         </button>
//         {errorMessage && <p className="error-message">{errorMessage}</p>}
//         <Link to="/signUp" className="signup-link">Create An Account</Link>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../../Features/authSlice"; // Adjust the path to your authSlice
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import "./LoginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleClick = async () => {
    if (!email || !password) {
      setErrorMessage("E-mail and password both should be filled!");
      return;
    }

    try {
      // Dispatch the login action and handle async login
      const loginResponse = await dispatch(login({ email, password })).unwrap();

      console.log('Login Success:', loginResponse);

      // Since the response contains only a token, you should not try to access user.email directly
      if (loginResponse && loginResponse.token) {
        // Show success notification for OTP
        toast.success("OTP sent to your email!");

        // Navigate to the OTP validation page
        navigate("/validate-otp");
      } else {
        // Handle unexpected response structure
        setErrorMessage("Unexpected response from the server.");
        toast.error("Unexpected response from the server.");
      }
    } catch (error) {
      console.log('Login Error:', error);
      // Handle login errors from the authSlice
      setErrorMessage(error.message || "Invalid email or password.");
      toast.error(error.message || "Invalid email or password.");
    }
  };

  return (
    <div className="login-card">
      <h2 className="login-header">Login</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <Link to="/forgot" className="forgot-link">
          Forgot Password?
        </Link>
        <button type="button" className="login-button" onClick={handleClick}>
          Login
        </button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Link to="/signUp" className="signup-link">
          Create An Account
        </Link>
      </form>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default LoginForm;

