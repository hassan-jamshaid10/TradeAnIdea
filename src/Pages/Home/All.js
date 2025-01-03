import React, { useState } from "react";
import "./All.css";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";

export const ideas = [
  {
    id: 1,
    name: "Smart Recycling App",
    description:
      "A Smart Recycling App aims to promote environmentally friendly practices by making recycling more convenient and efficient. The app could use a combination of AI, machine learning, and barcode scanning to educate users about recyclable materials, suggest proper disposal methods, and track the impact of their recycling habits.",
    Pname: "Ali",
    Pemail: "Ali@gmail.com",
    category: "Environment",
  },
  {
    id: 2,
    name: "AI Personal Assistant",
    description:
      "An AI Personal Assistant uses advanced artificial intelligence to provide users with tailored help for managing their daily tasks, schedules, emails, reminders, and more. The app leverages natural language processing (NLP) to understand user queries and machine learning to improve responses and predictions.",
    Pname: "Abbas",
    Pemail: "Abbas@gmail.com",
    category: "Technology",
  },
  {
    id: 3,
    name: "Remote Workout Platform",
    description:
      "A Remote Workout Platform focuses on providing virtual fitness experiences, allowing users to engage in workout routines from the comfort of their homes or anywhere with an internet connection. The platform could offer live and on-demand classes, personalized fitness plans, and community engagement features.",
    Pname: "Ahmed",
    Pemail: "Ahmed@gmail.com",
    category: "Health",
  },
];

const truncateDescription = (text, limit) => {
  return text.length > limit ? `${text.substring(0, limit)}...` : text;
};

const All = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };
  
  const filteredIdeas = ideas.filter(
    (idea) =>
      idea.name.toLowerCase().includes(searchQuery) ||
      idea.description.toLowerCase().includes(searchQuery) ||
      idea.Pname.toLowerCase().includes(searchQuery) ||
      idea.category.toLowerCase().includes(searchQuery) // Include category in search
  );
  
  const navigate = useNavigate();
  
  const handleDetailPage = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <>
      <div className="search-input">
        <FaSearch className="search-icon" />
        <input
          type="text"
          className="search-bar"
          placeholder="Search about ideas..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      
      <div className="ideas-page">
        <div className="header">
          <h1 className="ideas-title">Ideas List</h1>
        </div>
        <div className="ideas-container">
          {filteredIdeas.length > 0 ? (
            filteredIdeas.map((idea) => (
              <div key={idea.id} className="idea-card">
                <h2 className="idea-name">{idea.name}</h2>
                <p className="idea-description">
                  {truncateDescription(idea.description, 100)}
                </p>
                <p className="idea-category">
                  <strong>Category:</strong> {idea.category}
                </p>
                <p> <strong>Presented By: </strong>{idea.Pname}</p>
                <p>{idea.Pemail}</p>
                
                <button
                  className="read-more-btn"
                  onClick={() => handleDetailPage(idea.id)}
                >
                  Read More
                </button>
              </div>
            ))
          ) : (
            <p className="no-results">No ideas found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default All;
