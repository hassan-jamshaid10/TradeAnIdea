import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { fetchIdeas } from "../../Features/GetIdeasSlice"; // Import fetchIdeas action
import "./All.css"
const truncateDescription = (text, limit) => {
  return text.length > limit ? `${text.substring(0, limit)}...` : text;
};

const All = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { ideas, loading, error } = useSelector((state) => state.ideas);

  console.log(token, isAuthenticated); // Check values of token and isAuthenticated

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchIdeas()); // Fetch ideas without passing token
    } else {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [dispatch, isAuthenticated, navigate]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredIdeas = ideas.filter(
    (idea) =>
      (idea.ideaName?.toLowerCase().includes(searchQuery) || '') ||
      (idea.description?.toLowerCase().includes(searchQuery) || '') ||
      (idea.user?.name?.toLowerCase().includes(searchQuery) || '') ||
      (idea.user?.email?.toLowerCase().includes(searchQuery) || '')
  );

  const handleDetailPage = (id) => {
    navigate(`/detail/${id}`);  // Navigate to the detail page with the idea id
  };

  const renderError = error && typeof error === "object" && error.message ? error.message : error;

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
          {loading ? (
            <p>Loading...</p>
          ) : renderError ? (
            <p>Error: {renderError}</p>  
          ) : filteredIdeas.length > 0 ? (
            filteredIdeas.map((idea) => (
              <div key={idea.id} className="idea-card">
                <h2 className="idea-name">{idea.ideaName}</h2>
                <p className="idea-description">
                  {truncateDescription(idea.description, 100)}
                </p>
                <p>
                  <strong>Presented By: </strong>{idea.user.name}
                </p>
                <p>{idea.user.email}</p>

                <button
                  className="read-more-btn"
                  onClick={() => handleDetailPage(idea.id)}  // Call handleDetailPage with the idea's id
                >
                  Read More
                </button>

                {idea.comments.length > 0 && (
                  <div className="comments-section">
                    <h3>Comments:</h3>
                    {idea.comments.map((comment) => (
                      <div key={comment.id} className="comment">
                        <p>{comment.text}</p>
                        <span>{new Date(comment.createdAt).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                )}
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
