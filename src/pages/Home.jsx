import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import "./styles/styles.css";

function Home() {
  return (
    <div
      className="position-relative vh-100 vw-100 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: "url('/BackgroundPres.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="position-absolute top-0 bg-black rounded shadow-lg text-center"
        style={{ width: "400px", gap: "5px", padding: "20px" }}
      >
        <img
          src="/ppals_logo.png"
          alt="ppals_logo"
          className="img-fluid rounded-top"
        />
        <h3>Welcome to PresentPals.</h3>
        <p className="mt-3">
          {" "}
          Have your family & friends always asked what presents do your children
          want for their birthday ? 
          </p>
          <p>
            Dont know what to buy your niece or friends child for Christmas ?
          </p>
        
      </div>
      <div className="flex-box d-flex flex-column justify-content-center align-items-center mt-5">
        <a href="/api/auth/signup" className="btn custom-btn mt-5"style={{ color: "black", fontWeight: "bold", important: "true", fontSize: "3rem", padding: "10px 20px", borderRadius: "10px",}}>
          Sign Up Now
        </a>
        <a href="/api/auth/login" className="btn custom-btn mt-3"style={{ color: "black", fontWeight: "bold", important: "true", fontSize: "3rem", padding: "10px 20px", borderRadius: "10px",}}>
          Log In Now
        </a>
      </div>
      <div className="home-text">
      <p
        className="scrolling-text"
        style={{ color: "#28e3da", fontWeight: "bold", important: "true" }}
      >
        The simple Gift List App, your family and friends both children and adults can use to simplify the gifting situations for group events.
      </p>
      </div>
    </div>
  );
}

export default Home;
