import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileOption.css';

const ProfileOption = () => {
    const navigate = useNavigate();
  const handleProfile1 = () => {
    console.log("View All Ideas clicked");
    navigate('/profile1')
  };

  const handleProfile2 = () => {
    console.log("Propose Your Idea clicked");
    navigate('/profile2')
  };

  return (
    <div className="option-page">
      <h1>Edit your Profile</h1>
      <div className="cards-container">
        {/* Card 1 */}
        <div className="card">
          <h2>Individual User</h2>
          <button onClick={handleProfile1}>Edit Profile</button>
        </div>
        {/* Card 2 */}
        <div className="card">
          <h2>Company</h2>
          <button onClick={handleProfile2}>Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default ProfileOption;
