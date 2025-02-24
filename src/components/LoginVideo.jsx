import React from 'react';
import "../public/images/PresentPals_Animated_Logo.mp4"

const LoginVideo = () => {
  return (
    <div className="video-container">
      <video width="100%" height="auto" autoPlay loop muted>
        <source src="../public/images/PresentPals_Animated_Logo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default LoginVideo;