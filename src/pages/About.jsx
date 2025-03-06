import React from 'react';
import HamburgerMenu from "../components/HamburgerMenu";
import LoginVideo from '../components/LoginVideo';
import "./styles/styles.css";

function About() {
    return (
        <div>
  <HamburgerMenu />
  <div 
    className="d-flex flex-column justify-content-center align-items-center text-center px-3"
    style={{ minHeight: "100vh" }}  
  >
    <img src="../ppals_logo.png" style={{ maxWidth: "80%", height: "auto" }} />
    <h1>About PresentPals.</h1>
    <h3>Welcome:</h3>
    <p style={{ maxWidth: "90%", fontSize: "1rem" }}>
      This application is primarily designed with families in mind—particularly parents, grandparents, 
      and other family members who want to make gift-giving easier and more meaningful. However, it’s also 
      beneficial for groups beyond just families. 
      <br /><br />
      Parents and grandparents can create accounts, set up customized profiles for their children (ages 8-17), 
      and start building personalised Wishlists. Once a wishlist is ready, the admin user (parent or grandparent) 
      can easily share it with other family members, who can then purchase the perfect gift online directly 
      through the provided links. It’s a simple, eco-friendly way to ensure the right gift is chosen, while 
      saving time and reducing waste.
    </p>
    
    <div style={{ width: "100%", maxWidth: "600px", height: "auto" }}>
      <LoginVideo />
    </div>
  </div>
</div>
    )
}

export default About;
