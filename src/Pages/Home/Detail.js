import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';  // Import useParams to extract URL parameters
import { fetchIdeaDetails, addCommentToIdea } from '../../Features/IdeaDetailsSlice'; // Import actions
import './Detail.css';

const Detail = () => {
  const dispatch = useDispatch();
  const { ideaId } = useParams();  // Extract the ideaId from the URL
  const { idea, comments, loading, error } = useSelector((state) => state.ideaDetails);
  const token = useSelector((state) => state.auth.token); // Get token from Redux store
  const [commentInput, setCommentInput] = useState(''); // Comment input state

  // Fetch idea details when the ideaId changes
  useEffect(() => {
    if (ideaId) {
      dispatch(fetchIdeaDetails()); // Dispatch action to fetch idea details by ID
    }
  }, [dispatch, ideaId]); // Dependency on ideaId ensures refetch when it changes

  const handleAddComment = () => {
    if (commentInput.trim()) {
      // Ensure token exists before dispatching the addComment action
      if (token) {
        dispatch(addCommentToIdea({ ideaId, commentText: commentInput }));
        setCommentInput(''); // Clear the comment input after adding
      } else {
        console.error('No token found!');
        alert('You must be logged in to comment');
      }
    } else {
      alert('Please write a comment before submitting.');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error.message || 'An error occurred while fetching idea details.'}</p>;
  }

  return (
    <div className="detail-page">
      {idea ? (
        <>
          <h1 className="idea-name">{idea.idea_name}</h1>
          <p className="idea-description">{idea.description}</p>

          {/* Display Betterment and Category */}
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

          <h4>Presented by:</h4>
          <h5>{idea.userName}</h5>
          <p>{idea.userEmail}</p>

          <hr />

          {/* Comment section */}
          <div className="comment-section">
            <h2>Comments</h2>
            <ul className="comment-list">
              {comments?.length > 0 ? (
                comments.map((comment) => (
                  <li key={comment.commentId} className="comment-item">
                    <p>{comment.text}</p>
                    <span>{new Date(comment.createdAt).toLocaleString()}</span>
                  </li>
                ))
              ) : (
                <p>No comments yet.</p>
              )}
            </ul>

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
        </>
      ) : (
        <p>Idea not found.</p>
      )}
    </div>
  );
};

export default Detail;
