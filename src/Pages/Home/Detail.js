import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIdeaDetails, addCommentToIdea } from '../../Features/IdeaDetailsSlice'; // Import actions
import './Detail.css';

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { idea, comments, loading, error } = useSelector((state) => state.ideaDetails);
  const [commentInput, setCommentInput] = useState('');
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility

  useEffect(() => {
    dispatch(fetchIdeaDetails(id)); // Fetch idea details when the component mounts
  }, [dispatch, id]);

  const handleAddComment = () => {
    if (commentInput.trim()) {
      dispatch(addCommentToIdea({ ideaId: id, commentText: commentInput }));
      setCommentInput(''); // Clear the input after submitting
      setShowPopup(true); // Show the popup when a comment is added

      // Hide the popup after 3 seconds
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  };

  return (
    <div className="detail-page">
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}

      {idea && (
        <>
          <h1 className="idea-name">{idea.idea_name}</h1>
          <p className="idea-description">{idea.description}</p>

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

          <h4>Presented by:</h4>
          <h5>{idea.userName}</h5>
          <p>{idea.userEmail}</p>

          <hr />

          <div className="comment-section">

            {/* Add new comment */}
            <textarea
              className="comment-box"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Add your comment here..."
            ></textarea>
            <button className="add-comment-btn" onClick={handleAddComment}>
              Add Comment
            </button>
          </div>

          {/* Popup Notification */}
          {showPopup && (
            <div className="popup">
              <p>New comment added successfully!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Detail;
