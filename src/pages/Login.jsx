import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
import PexelsVideoPlayer from '../components/Video';
import "./styles/styles.css";



function Login() {
  // State hooks for email and password input values
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  // Event handler for the form submission (login button)
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!userName || !password) {
      alert("Please fill out the required fields of User Name & Password.");
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters long.');
      window.location.reload(); // Refresh the page if password is invalid
      return;
    }
  try {
    const response = await axios.post("http://localhost:5001/api/auth/login", { userName, password },
      {
        validateStatus: (status) => status >= 200 && status < 500, // Treat statuses 200-499 as valid for error messaging
      }
    );
      const data = response.data;
      console.log("Response", data, response)
      if (response.status === 200) {
        localStorage.setItem('token', data.token);
        navigate("/api/user/");
      } else if (response.status === 400 && data.message){
        alert(data.message)
      } else if (response.status === 401 && data.message){
        alert(data.message)
      } 
      else {
        alert("Your login failed. Please signup or contact your admin member for access.")
      }
  } catch (err) {
    console.log(err);
    alert("An error happened during the login process. This could be caused by server connection issues.");
  }
  };

  return (
    <section className="vh-100 vw-80" style={{backgroundColor: "black"}}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-white">
            <div className="text-md-center mt-4 px-5 ms-xl-4">
            <img 
                src="/ppals_logo.png" 
                alt="PresentPals Logo" 
                style={{ width: '225px', height: '80px' }} 
              />
            </div>

            <div className="d-flex text-md-center align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5">
              <form style={{ width: '23rem', color: '#28E3DA'  }} onSubmit={handleSubmit}>

                <h3 className="fw-bold mb-3 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>

                {/* Email Input */}
                <div className="form-outline mb-4">
                  <input
                    type="text"
                    id="form2Example18"
                    className="form-control form-control-lg"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)} // Bind email input to state
                  />
                  <label className="form-label" htmlFor="form2Example18">User Name</label>
                </div>

                {/* Password Input */}
                <div className="form-outline mb-4">
                  <input
                    type="password"
                    id="form2Example28"
                    className="form-control form-control-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
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

                <p className="small mb-1 pb-lg-2 " style={{ color: '#28E3DA' }}>
                  Don't have an account? 
                  <br></br>
                  <Link className="fw-bolder" to="/api/auth/signup" style={{ color: '#28E3DA' }}>Sign Up Here.</Link>
                </p>

                <p className="small mb-5 pb-lg-2 " style={{ color: '#28E3DA' }}>Forgot your username or password? <br></br>
                Please contact your admin family or friend member.
                </p>
              </form>
            </div>
          </div>

          {/* Video Section */}
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
