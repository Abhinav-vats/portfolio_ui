import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { LoginSignup } from "./Components/LoginSignup/LoginSignup";
import Navbar from "./Components/Navbar/Navbar";
import OTPVerification from "./Components/OTPVerification/OTPVerification";
import RegistrationForm from "./Components/RegistrationForm/RegistrationForm";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login/Login";

// import { Route, Router } from 'react-router-dom';

const App = () => {
  const [registered, setRegistered] = useState(false);
  const [randomKey, setRandomKey] = useState("");

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
        const data =await  response.json();
        if (data.status==="success") {
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
      if (response.status === 200 && data.status==="success") {
        return { status:true };
        // Display success message
        // Redirect user to another page or perform further actions
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
    }

    return { status:false };
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/loginOld" element={<LoginSignup />} />
          <Route path="/login" element={<Login />} />
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
            element={<OTPVerification handleVerifyOTP={handleVerifyOTP} />}
          />
          {/* <Route path="/about" component={About} /> */}
          {/* <Route path="/projects" component={Projects} /> */}
          {/* <Route path="/contact" component={Contact} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
