import React, { useState } from 'react'

const  SignOut = () => {

  const [logoutMessage, setLogoutMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    sessionStorage.clear();
    setLogoutMessage("Logged Out Successfully !!")
  }
  
  return (
    <div className="container mt-7">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header">
              <h3>Log Out</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                
                <button type="submit" className="btn btn-primary btn-lg mt-3">
                  Log Out
                </button>
              </form>
              {/* {loginMessage && <p className="mt-3">{loginMessage}</p>} */}
              {logoutMessage && (
                <div
                  className={`alert ${
                    logoutMessage.includes("Successfully")
                      ? "alert-success"
                      : "alert-danger"
                  } mt-3`}
                  role="alert"
                >
                  {logoutMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignOut