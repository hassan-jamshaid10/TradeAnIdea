import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import {  useDispatch, useSelector } from 'react-redux';
import { fetchIdeaDetails, addCommentToIdea } from '../../Features/IdeaDetailsSlice'; // Import actions
import './Detail.css';

const Detail = () => {
  const dispatch = useDispatch();
  const { ideaId } = useParams();  // Extract the ideaId from the URL
  const { idea, comments, loading, error } = useSelector((state) => state.ideaDetails);
  const [commentInput, setCommentInput] = useState('');

  // Fetch idea details when the ideaId changes
  useEffect(() => {
    if (ideaId) {
      dispatch(fetchIdeaDetails()); // Dispatch action to fetch idea details by ID
    }
  }, [dispatch, ideaId]); // Dependency on ideaId ensures refetch when it changes

  const handleAddComment = () => {
    if (commentInput.trim()) {
      dispatch(addCommentToIdea({ ideaId: id, commentText: commentInput }));
      setCommentInput(''); // Clear the input after submitting
    }
  };

  return (
    <div className="detail-page">
      {idea ? (
        <>
          <h1 className="idea-name">{idea.idea_name}</h1>
          <p className="idea-description">{idea.description}</p>
          <h4>Presented by:</h4>
          <h5>{idea.userName}</h5>
          <p>{idea.userEmail}</p>

          <hr />

          {/* Comment section */}
          <div className="comment-section">
            <h2>Comments</h2>
            <ul className="comment-list">
              {comments?.map((comment) => (
                <li key={comment.commentId} className="comment-item">
                  {comment.text}
                </li>
              ))}
            </ul>

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
      )}
    </div>
  );
};

export default Detail;
