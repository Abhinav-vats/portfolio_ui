import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import OTPVerification from "./Components/OTPVerification/OTPVerification";
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login/Login";
import NavbarOff from "./Components/Navbar/Navbar";
import Dashboard from "./Components/Dashboard/Dashboard";
import { AuthProvider } from "./Components/AuthContext/AuthContext";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute";
import SignOut from "./Components/Line/SignOut";

// import { Route, Router } from 'react-router-dom';

const App = () => {
  const [registered, setRegistered] = useState(false);
  const [randomKey, setRandomKey] = useState("");
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");

  const handleLogin = async ({ token }) => {
    // try {
    //   // Make API call to register user
    //   // Replace with actual API endpoint and fetch request
    //   const response = await fetch(
    //     "http://localhost:8081/authenticate/v1/login",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ email, password }),
    //     }
    //   );
    //   if (response.status === 200) {
    //     const data = await response.json();
    //     if (data.status === "success") {
          setToken(token); // Store token for other service call

          sessionStorage.setItem("authorizationToken", token)
          return true; // Redirect to dashboard
  };

  const handleRegistration = async ({ name, email, password }) => {
    try {
      // Make API call to register user
      // Replace with actual API endpoint and fetch request
      const response = await fetch(
        "http://localhost:8081/authenticate/v1/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        if (data.status === "success") {
          setRandomKey(data.result.randomKey); // Store email for OTP verification
          setRegistered(true); // Redirect to OTP verification page
        } else {
          alert(data.reason); // Display error message if registration fails
        }
      }
    } catch (error) {
      console.error("Error registering user:", error);
      alert("Failed to register user. Please try again.");
    }
  };

  const handleVerifyOTP = async (otp) => {
    try {
      // Make API call to verify OTP
      // Replace with actual API endpoint and fetch request
      const response = await fetch(
        "http://localhost:8081/authenticate/v1/verifyOtp/" +
          randomKey +
          "/" +
          otp,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      if (response.status === 200 && data.status === "success") {
        setRandomKey("");
        return { status: true };
        // Display success message
        // Redirect user to another page or perform further actions
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }

    return { status: false };
  };

  const handleResendOTPService = async () => {
    try {
      // Make API call to verify OTP
      // Replace with actual API endpoint and fetch request
      const response = await fetch(
        "http://localhost:8081/authenticate/v1/resendOtp/" + randomKey,
        {
          method: "GET",
        }
      );
      if (response.status === 200) {
        const data = await response.json();
        if (data.status === "success") {
          setRandomKey(data.result.randomKey); // Store email for OTP verification
          setRegistered(true); // Redirect to OTP verification page
        } else {
          alert(data.reason); // Display error message if registration fails
        }
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }

    return { status: false };
  };

  const handleUserDetail = async () => {
    try {
      // Make API call to verify OTP
      // Replace with actual API endpoint and fetch request
      const response = await fetch(
        "http://localhost:8081/authenticate/v1/userDetails",
        {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        }
      );
      const data = await response.json();
      if (response.status === 200 && data.status === "success") {
        setUsername(data.result.name);
        // Display success message
        // Redirect user to another page or perform further actions
      }
    } catch (error) {
      console.error("Error Fetching user details", error);
    }
  };

  return (
    <AuthProvider>
      <Router>
      <NavbarOff username={username} />
        <div className="container mt-4">
          <Routes>
            <Route
              path="/login"
              element={
                <PrivateRoute>
                  <Login handleLogin={handleLogin} />
                </PrivateRoute>
              }
            />
            <Route
              path="/register"
              element={
                registered ? (
                  <Navigate to="/verify-otp" replace />
                ) : (
                  <RegistrationForm handleRegistration={handleRegistration} />
                )
              }
            />
            <Route
              path="/verify-otp"
              element={
                registered ? (
                  <OTPVerification
                    handleVerifyOTP={handleVerifyOTP}
                    handleResendOTPService={handleResendOTPService}
                  />
                ) : (
                  <Navigate to="/register" replace />
                )
                // <OTPVerification handleVerifyOTP={handleVerifyOTP}  />
              }
            />
            <Route
              path="/dashboard"
              element={
                  <Dashboard handleUserDetail={handleUserDetail} />
              }
            />
            <Route
              path="/signout"
              element={
                  <SignOut/>
              }
            />
            {/* <Route path="/about" component={About} /> */}
            {/* <Route path="/projects" component={Projects} /> */}
            {/* <Route path="/contact" component={Contact} /> */}
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
