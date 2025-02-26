import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate, Link } from "react-router-dom";
//import "../themes/styles.css";



function Signup() {
  // State hooks for email and password input values
  const [firstname, setFirstName] = useState('')
  const [lastname, setLastName] = useState('')
  const [accountEmail, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

// Event handler for the form submission (login button)
  const handleSubmit = (e) => {
    e.preventDefault()
try {
    axios.post("http://localhost:3001/api/auth/signup", { firstname, lastname, accountEmail, password })
    .then(result => {
      console.log(result)
      if (result.data === "Success") {
        navigate("/api/user/")
      }
      else {
        alert("Your signup failed. Please re enter new signup details.")
      }
    })
} catch (err) {
    console.log(err);
    alert("An error happened during the signup process. Please try again.");
  }
 };

 return (
    <section
      className="vh-100 vw-100 bg-image"
      style={{ backgroundImage: 'url(/test-image.png)', backgroundSize: 'cover',  backgroundRepeat: 'no-repeat',height: '100vh', width: '100%',  }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-250">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: '10px' }}>
                <div className="card-body p-1 d-flex flex-column align-items-center">
                  <img 
                   src='/test2-image.png'
                   alt='PresentPals logo'
                   style={{width: "150px", height: "130px", borderRadius: '10px' }}/>
                  <h2 className="text-uppercase text-center mb-5">Sign Up To Presentpals</h2>

                  <form style={{ width: '20rem' }} onSubmit={handleSubmit}>
                    {/* First Name */}
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example1cg"
                        className="form-control form-control-lg"
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example1cg">
                        Your First Name
                      </label>
                    </div>

                    {/* Last Name */}
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example2cg"
                        className="form-control form-control-lg"
                        value={lastname}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example2cg">
                        Your Last Name
                      </label>
                    </div>

                    {/* Email Input */}
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3cg"
                        className="form-control form-control-lg"
                        value={accountEmail}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example3cg">
                        Your Email
                      </label>
                    </div>

                    {/* Password Input */}
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cg"
                        className="form-control form-control-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example4cg">
                        Password
                      </label>
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        data-mdb-button-init
                        data-mdb-ripple-init
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body" style={{ backgroundColor: '#28E3DA', borderColor: '#28E3DA' }}
                      >
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Have already an account?{' '}
                      <Link className="fw-bold text-body" to="/api/auth/login">
                        <u>Login here</u>
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;