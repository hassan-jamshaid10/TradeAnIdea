import React, { useEffect } from "react";
import "./Profile.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfile } from "../../Features/profileSlice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { name, email, loading, error } = useSelector((state) => state.profile);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchProfile());
    } else {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [dispatch, isAuthenticated, navigate]);

  const handleViewIdeas = () => {
    navigate("/all"); // Navigate to the ideas page
  };

  return (
    <div className="profile-container">
      <h1>User Profile</h1>
      {loading ? (
        <p>Loading user data...</p>
      ) : error ? (
        <p className="error-message">Error: {error}</p>
      ) : (
        <div className="user-data">
          <p>
            <strong>Name:</strong> {name || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {email || "N/A"}
          </p>
        </div>
      )}
      <button className="view-ideas-btn" onClick={handleViewIdeas}>
        View Ideas
      </button>
    </div>
  );
};

export default Profile;
