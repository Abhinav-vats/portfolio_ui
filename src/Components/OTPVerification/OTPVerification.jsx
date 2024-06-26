import React, { useState, useRef, useEffect } from "react";
import { Navigate } from "react-router-dom"; // Assuming you use React Router
import "./OTPVerification.css";

const OTPVerification = ({ handleVerifyOTP, handleResendOTPService }) => {
  const [otp, setOTP] = useState(["", "", "", "", "", ""]);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const inputRefs = useRef([]);
  const [timer, setTimer] = useState(30); // 5 minutes = 300 seconds
  const [resendVisible, setResendVisible] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    startTimer();

    return () => clearInterval(timerRef.current);
  }, []);

  const startTimer = () => {
    setTimer(30);
    setResendVisible(false);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
  };

  useEffect(() => {
    if (timer === 0) {
      clearInterval(timerRef.current);
      setResendVisible(true);
    }
  }, [timer]);

  const handleInputChange = (index, value) => {
    // Ensure only numbers are entered
    if (/^\d*$/.test(value)) {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      // Move focus to the next input box after entering a digit
      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    // Prevent non-numeric characters
    if (!/^\d$/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
      e.preventDefault();
    }

    // Move focus to the previous input box on Backspace when the current box is empty
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      index > 0 &&
      otp[index] === "" &&
      e.target.value === ""
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join(""); // Combine array elements into a single string
    const success = await handleVerifyOTP(otpCode);
    if (success.status) {
      setVerificationMessage("OTP verified successfully!");
      setTimeout(() => setRedirect(true), 1000); // Redirect after 2 seconds
    } else {
      setVerificationMessage("Invalid OTP. Please try again.");
      // Clear OTP input on failure
      setOTP(["", "", "", "", "", ""]);
      inputRefs.current[0].focus(); // Focus back on the first input box
    }
  };

  const handleResendOTP = async () => {
    const success = await handleResendOTPService();
    if (success.status) {
      startTimer(); // Restart the timer
      setOTP(new Array(6).fill(""));
      console.log("OTP resent to email");
    }
  };

  if (redirect) {
    return <Navigate to="/login" />; // Redirect to dashboard or any other page after OTP verification
  }

  return (
    <div
      className="container mt-5 d-flex justify-content-center align-items-center"
      style={{ width: "100%", height: "70vh" }}
    >
      <div className="card shadow" style={{ maxWidth: "600px", width: "100%" }}>
        <div className="card-header bg-primary text-white text-center">
          <h3>OTP Verification</h3>
        </div>
        <div className="card-body">
          <p className="card-text text-center">
            Enter the OTP sent to your registered email.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="d-flex justify-content-center mb-3">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  className="form-control otp-input"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)} // Store reference to each input element
                  required
                  style={{
                    width: "40px",
                    height: "40px",
                    margin: "0 5px",
                    textAlign: "center",
                  }}
                />
              ))}
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary btn-lg">
                Verify OTP
              </button>
            </div>
          </form>
          {verificationMessage && (
            <div
              className={`alert ${
                verificationMessage.includes("successfully")
                  ? "alert-success"
                  : "alert-danger"
              } mt-3`}
              role="alert"
            >
              {verificationMessage}
            </div>
          )}

          {resendVisible ? (
            <button onClick={handleResendOTP} className="btn btn-link mt-3">
              Resend OTP
            </button>
          ) : (
            <p className="mt-3">
              Resend OTP in {Math.floor(timer / 60)}:
              {(timer % 60).toString().padStart(2, "0")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
