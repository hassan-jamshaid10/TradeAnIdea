import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Option.css';

const Option = () => {
    const navigate = useNavigate();
  const handleViewAllIdeas = () => {
    console.log("View All Ideas clicked");
    navigate('/all')
  };

  const handleProposeIdea = () => {
    console.log("Propose Your Idea clicked");
    navigate('/form')
  };

  return (
    <div className="option-page">
      <h1>Ideas Portal</h1>
      <div className="cards-container">
        {/* Card 1 */}
        <div className="card">
          <h2>View All Ideas</h2>
          <p>Explore all the creative ideas shared by others to align with the SDGs.</p>
          <button onClick={handleViewAllIdeas}>View Ideas</button>
        </div>
        {/* Card 2 */}
        <div className="card">
          <h2>Propose Your Idea</h2>
          <p>Share your innovative ideas to make a positive impact on society and the environment.</p>
          <button onClick={handleProposeIdea}>Propose Idea</button>
        </div>
      </div>
    </div>
  );
};

export default Option;
