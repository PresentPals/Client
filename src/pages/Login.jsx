import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import PexelsVideoPlayer from '../components/Video';
// import "../themes/styles.css";
// import "../public/images/logo";


function Login() {
  // State hooks for email and password input values
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  // Event handler for the form submission (login button)
  const handleSubmit = (e) => {
    e.preventDefault()
  try {
    axios.post("http://localhost:3001/api/auth/login", { email, password })
    .then(result => {
      console.log(result)
      if (result.data === "Success") {
        navigate("/api/giftlist")
      }
      else {
        alert("Your login failed. Please signup or contact your admin member for access.")
      }
    })
  } catch (err) {
    console.log(err);
    alert("An error happened during the login process. Please try again.");
  }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-white">
            <div className="px-5 ms-xl-4">
            <img 
                src="../public/images/logo" 
                alt="PresentPals Logo" 
                style={{ width: '50px', height: '50px', marginRight: '10px' }} 
              />
            </div>

            <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form style={{ width: '23rem' }} onSubmit={handleSubmit}>

                <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>

                {/* Email Input */}
                <div className="form-outline mb-4">
                  <input
                    type="email"
                    id="form2Example18"
                    className="form-control form-control-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} // Bind email input to state
                  />
                  <label className="form-label" htmlFor="form2Example18">Email address</label>
                </div>

                {/* Password Input */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form2Example28"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} // Bind password input to state
                  />
                  <label className="form-label" htmlFor="form2Example28">Password</label>
                </div>

                {/* Login Button */}
                <div className="pt-1 mb-4">
                  <button
                    type="submit"
                    className="btn btn-info btn-lg btn-block" style={{ backgroundColor: '#28E3DA', borderColor: '#28E3DA' }}
                  >
                    Login
                  </button>
                </div>

                <p className="small mb-5 pb-lg-2 ">
                  <a  href="#!" style={{ color: '#28E3DA' }}>Forgot password?</a>
                </p>
                <p>
                  Don't have an account? <a href="#!" style={{ color: '#28E3DA' }}>Sign Up Here.</a>
                </p>

              </form>
            </div>
          </div>

          {/* Image Section */}
          <div className="col-sm-6 px-0 d-none d-sm-block">
            <div alt="Login video"
              className="w-100 vh-100"
              style={{ objectFit: 'cover', objectPosition: 'left' }}>
            <PexelsVideoPlayer videoId="6099405" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
