import React, { useState } from 'react';
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import PexelsVideoPlayer from '../components/Video';
import "../themes/styles.css";
import "../public/images/logo";


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
    <section class="vh-100 bg-image"
  style="background-image: url('https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp');">
  <div class="mask d-flex align-items-center h-100 gradient-custom-3">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style="border-radius: 15px;">
            <div class="card-body p-5">
              <h2 class="text-uppercase text-center mb-5">Sign Up To Presentpals</h2>

              <form style={{ width: '23rem' }} onSubmit={handleSubmit}>
                
                {/* First Name */}
                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="text" id="form3Example1cg" class="form-control form-control-lg" value={firstname} onChange={(e) => setFirstName(e.target.value)}/>
                  <label class="form-label" for="form3Example1cg">Your First Name</label>
                </div>

                {/* Last Name */}
                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="text" id="form3Example1cg" class="form-control form-control-lg" value={lastname} onChange={(e) => setLastName(e.target.value)}/>
                  <label class="form-label" for="form3Example1cg">Your Last Name</label>
                </div>

                {/* Email Input */}
                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="email" id="form3Example3cg" class="form-control form-control-lg" value={accountEmail} onChange={(e) => setEmail(e.target.value)}/>
                  <label class="form-label" for="form3Example3cg">Your Email</label>
                </div>

                <div data-mdb-input-init class="form-outline mb-4">
                  <input type="password" id="form3Example4cg" class="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)}/>
                  <label class="form-label" for="form3Example4cg">Password</label>
                </div>

                <div class="form-check d-flex justify-content-center mb-5">
                  <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                  <label class="form-check-label" for="form2Example3g">
                    I agree all statements in <a href="#!" class="text-body"><u>Terms of service</u></a>
                  </label>
                </div>

                <div class="d-flex justify-content-center">
                  <button  type="submit" data-mdb-button-init
                    data-mdb-ripple-init class="btn btn-success btn-block btn-lg gradient-custom-4 text-body">Register</button>
                </div>

                <p class="text-center text-muted mt-5 mb-0">Have already an account? <a href="#!"
                    class="fw-bold text-body"><u>Login here</u></a></p>

              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}