import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./styles/styles.css";

function Signup() {
  // State hooks for email and password input values
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [accountEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();



  // Event handler for the form submission (login button)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (!userName || !password || !firstname || !lastname ||  !accountEmail) {
        alert("Please fill out the required fields of User Name, First Name, Last Name, Your Email & Password.");
        return;
      }

      if (password.length < 8) {
        alert('Password must be at least 8 characters long.');
        window.location.reload(); // Refresh the page if password is invalid
        return;
      }

      const response = await axios
        .post("http://localhost:5001/api/auth/signup", {
          userName,
          firstname,
          lastname,
          accountEmail,
          password,
        },
        {
          validateStatus: (status) => status >= 200 && status < 500, // Treat statuses 200-499 as valid
        });
          const data = response.data;
            if (response.status === 201 && data.message) {
              alert(data.message)
            } else if (response.status === 400 && data.message){
              alert(data.message)
            } else {
              alert("Your signup failed. Please re enter new signup details.")
            }
      } catch (err) {
          console.log(err);
          alert("An error happened during the signup process. Please try again.");
        }
      };

  return (
    <section
      className="vh-100 vw-100 bg-image"
      style={{
        backgroundImage: "url(/test-image.png)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100%",
      }}
    >
      <div className="mask d-flex align-items-center h-100 gradient-custom-3">
        <div className="container h-250">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6">
              <div className="card" style={{ borderRadius: "10px", width: "22rem" }}>
                <div className="card-body p-3 d-flex flex-column align-items-center">
                  <img
                    src="/ppals_logo.png"
                    alt="PresentPals logo"
                    style={{
                      width: "300px",
                      height: "130px",
                      borderRadius: "10px",
                    }}
                  />
                  <h2 className="text-uppercase text-center mb-3">
                    Sign Up To Presentpals
                  </h2>

                  <form style={{ width: "20rem" }} onSubmit={handleSubmit}>
                    {/* User Name */}
                    <div data-mdb-input-init className="form-outline mb-1">
                      <input
                        type="text"
                        id="form3Example0cg"
                        className="form-control form-control-lg"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                      <label className="form-label" htmlFor="form3Example0cg">
                        Your User Name
                      </label>
                    </div>
                    {/* First Name */}
                    <div data-mdb-input-init className="form-outline mb-1 ">
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
                    <div data-mdb-input-init className="form-outline mb-1">
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
                    <div data-mdb-input-init className="form-outline mb-1">
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
                    <div data-mdb-input-init className="form-outline mb-1">
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
                        className="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        style={{
                          backgroundColor: "#28E3DA",
                          borderColor: "#28E3DA",
                        }}
                      >
                        Register
                      </button>
                    </div>

                    <p className="text-center text-muted mt-5 mb-0">
                      Already Have A User Name & Password ?{" "}
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
