import React, { useState, useEffect } from 'react';
import { createAvatar } from '@dicebear/core';
import { adventurer, bigSmile  } from '@dicebear/collection';


const AvatarSelection = ({ onAvatarSelect }) => {
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  useEffect(() => {
    // Generate multiple avatars
    const seedsAd = ['George','Liam','Kingston','Maria', 'Alice', 'Bob', 'Charlie', 'Emery', 'Jameson','Avery', 'Sarah'];
    const generatedAvatarsAd = seedsAd.map(seed => {
      const avatar = createAvatar(adventurer, {
        seed,
        size: 50,
      });
      return avatar.toString(); // Return the SVG string
    });
    const seedsBs = ['Andrea', 'Sawyer', 'Maria', 'Andrea', 'Avery', 'Caleb','Sarah'];
    const generatedAvatarsBs = seedsBs.map(seed => {
      const avatar = createAvatar(bigSmile, {
        seed,
        size: 50,
      });
      return avatar.toString(); // Return the SVG string
    });
    const avatarList = [...generatedAvatarsAd, ...generatedAvatarsBs];
    setAvatars(avatarList);
  }, []);

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
    onAvatarSelect(avatar); // Notify parent component when an avatar is selected
  };

  return (
    <div className="avatar-selection">
      <h3>Select Your Avatar</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {avatars.map((avatar, index) => (
          <div 
            key={index} 
            onClick={() => handleAvatarClick(avatar)} 
            className="avatar list"
            style={{ 
              cursor: 'pointer', 
              margin: '5px',
              border: selectedAvatar === avatar ? '3px solid #28E3DE' : 'none', }}
          >
            <div dangerouslySetInnerHTML={{ __html: avatar }} />
          </div>
        ))}
      </div>

      {selectedAvatar && (
        <div className="selected-avatar">
          <h3>Your selected avatar:</h3>
          <div dangerouslySetInnerHTML={{ __html: selectedAvatar }} />
        </div>
      )}
    </div>
  );
};

export default AvatarSelection;