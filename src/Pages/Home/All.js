import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { fetchIdeas } from "../../Features/GetIdeasSlice"; // Import fetchIdeas action
import "./All.css";

const truncateDescription = (text, limit) => {
  return text.length > limit ? `${text.substring(0, limit)}...` : text;
};

const All = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get token and authentication status from Redux store
  const { token, isAuthenticated } = useSelector((state) => state.auth); 
  const { ideas, loading, error } = useSelector((state) => state.ideas);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      // Dispatch the action with the token
      dispatch(fetchIdeas(token)); // Pass token to fetchIdeas action
    } else {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [dispatch, isAuthenticated, navigate, token]);

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
    navigate(`/detail/${id}`);
  };

  // Check for object error and render its message
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
              <div key={idea.ideaId} className="idea-card">
                <h2 className="idea-name">{idea.ideaName}</h2>
                <p className="idea-description">
                  {truncateDescription(idea.description, 100)}
                </p>

                {/* Display Betterment, Category, and SDG */}
                {idea.betterment && (
                  <p>
                    <strong>Betterment: </strong>{idea.betterment}
                  </p>
                )}
                {idea.category && (
                  <p>
                    <strong>Category: </strong>{idea.category}
                  </p>
                )}
                {idea.sdg && (
                  <p>
                    <strong>SDG: </strong>{idea.sdg}
                  </p>
                )}

                <p>
                  <strong>Presented By: </strong>{idea.user.name}
                </p>
                <p>{idea.user.email}</p>

                <button
                  className="read-more-btn"
                  onClick={() => handleDetailPage(idea.ideaId)}
                >
                  Read More
                </button>

                {idea.comments.length > 0 && (
                  <div className="comments-section">
                    <h3>Comments:</h3>
                    {idea.comments.map((comment) => (
                      <div key={comment.commentId} className="comment">
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
